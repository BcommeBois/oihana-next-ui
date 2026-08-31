'use client' ;

import { useState } from 'react' ;

import Alert         from '@/components/Alert' ;
import Button        from '@/components/Button' ;
import InputGeoPoint from '@/components/maps/InputGeoPoint' ;
import MapPicker     from '@/components/maps/MapPicker' ;

import InputAddressSearch from '@/components/inputs/InputAddressSearch' ;
import InputCoordinate     from '@/components/inputs/InputCoordinate' ;

import ban from '@/helpers/geo/adapters/ban' ;

import Section from '@/demo/charts/Section' ;

import { CENTRE , PARIS } from './places' ;

import config from '@/@configs' ;

import formatCoordinates from '@/helpers/geo/formatCoordinates' ;
import fromSchema        from '@/helpers/geo/fromSchema' ;

const NOTRE_DAME = fromSchema( PARIS ) ;

const MapPickerDemo = () =>
{
    const mapStyle = config?.ui?.map?.style ;

    const [ point    , setPoint    ] = useState( { latitude : NOTRE_DAME.latitude , longitude : NOTRE_DAME.longitude } ) ;
    const [ blank    , setBlank    ] = useState( null ) ;
    const [ dragging , setDragging ] = useState( null ) ;
    const [ alone    , setAlone    ] = useState( { latitude : 48.8566 , longitude : 2.3522 } ) ;
    const [ searched , setSearched  ] = useState( null ) ;
    const [ address  , setAddress   ] = useState( null ) ;

    if ( !mapStyle )
    {
        return (
            <Alert level="warning">
                { `NEXT_PUBLIC_MAP_STYLE n'est pas défini. Ajoutez-le à votre .env.local — la valeur par défaut est dans .env.example — puis redémarrez le serveur de développement.` }
            </Alert>
        ) ;
    }

    return (
        <div className="flex flex-col gap-8">

            <Section
                title       = "Deux entrées, une valeur"
                description = "Tapez dans un champ ou glissez le marqueur : les deux écrivent le même point, et chacun suit l'autre. Le champ ne lâche ce qu'il tient qu'en perdant le focus — « 48.8 » n'est pas encore une latitude."
            >
                <InputGeoPoint
                    mapStyle = { mapStyle }
                    onChange = { setPoint }
                    value    = { point }
                />

                <div className="flex flex-wrap items-center gap-3">
                    <p className="font-mono text-sm tabular-nums">
                        { formatCoordinates( point ) || '—' }
                    </p>
                    <Button onClick={ () => setPoint( { ...NOTRE_DAME } ) } size="sm" style="outline">
                        Revenir à Notre-Dame
                    </Button>
                </div>

                <p className="text-sm text-base-content/60">
                    { `La valeur enregistrée n'est pas arrondie : glissez le marqueur et regardez les décimales du champ contre celles de la ligne ci-dessus. L'affichage arrondit à six décimales — onze centimètres — mais ce qui est stocké garde tout, sinon le point avancerait un peu à chaque aller-retour.` }
                </p>
            </Section>

            <Section
                title       = "Chercher, puis corriger"
                description = "Le geste métier complet : on tape une adresse, on choisit une suggestion, le point se place — puis on glisse le marqueur parce que le géocodeur est tombé au milieu de la rue. Le géocodeur est injecté : ici la Base Adresse Nationale, gratuite et sans clé."
            >
                <InputGeoPoint
                    geocode         = { ban }
                    mapProps        = {{ ...CENTRE , zoom : 11 }}
                    mapStyle        = { mapStyle }
                    onChange        = { setSearched }
                    onSelectAddress = { setAddress }
                    searchProps     = {{ label : 'Adresse' , placeholder : '8 boulevard du Port, Amiens' }}
                    value           = { searched }
                />

                {
                    address && (
                        <p className="text-sm text-base-content/60">
                            { `Le géocodeur rend un Place entier, pas seulement un point : ${ address.address?.streetAddress ?? '—' } · ${ address.address?.postalCode ?? '' } ${ address.address?.addressLocality ?? '' }` }
                        </p>
                    )
                }
            </Section>

            <Section
                title       = "Le champ de recherche seul"
                description = "« InputAddressSearch » vit chez les inputs et n'apporte aucune dépendance carte. C'est un combobox : flèches pour parcourir, Entrée pour choisir, Échap pour fermer, et le focus ne quitte jamais le champ."
            >
                <InputAddressSearch
                    geocode     = { ban }
                    label       = "Adresse"
                    onSelect    = { setAddress }
                    placeholder = "Tapez au moins trois caractères"
                />
                {
                    address && (
                        <p className="font-mono text-xs text-base-content/60">
                            { `${ address.name } → ${ formatCoordinates( fromSchema( address ) ) }` }
                        </p>
                    )
                }
            </Section>

            <Section
                title       = "Un point à moitié rempli ne dessine rien"
                description = "Videz un des deux champs : le marqueur disparaît et la carte reste où elle est. Un point à « 48.85 , 0 » est un vrai endroit au large du Ghana, et l'afficher serait une invention."
            >
                <InputGeoPoint
                    mapProps = {{ ...CENTRE , zoom : 10 }}
                    mapStyle = { mapStyle }
                    onChange = { setBlank }
                    value    = { blank }
                />
            </Section>

            <Section
                title       = "La carte seule"
                description = "« MapPicker » sans les champs : une fiche lieu où l'on corrige la position à la souris n'a pas besoin de saisie."
            >
                <MapPicker
                    height    = { 320 }
                    mapStyle  = { mapStyle }
                    onChange  = { setPoint }
                    onDrag    = { setDragging }
                    value     = { point }
                />
                <p className="font-mono text-xs text-base-content/60">
                    { dragging ? `pendant le glissé : ${ formatCoordinates( dragging ) }` : 'glissez le marqueur pour suivre la position en continu' }
                </p>
            </Section>

            <Section
                title       = "Le champ seul"
                description = "« InputCoordinate » vit dans components/inputs et n'apporte aucune dépendance : un formulaire qui n'affiche pas de carte peut s'en servir. Les bornes viennent de l'axe — au-delà de ±90 une latitude n'existe pas."
            >
                <div className="grid gap-3 sm:grid-cols-2">
                    <InputCoordinate
                        axis     = "latitude"
                        helper   = "Essayez 120 : la valeur est ramenée à 90 en quittant le champ"
                        label    = "Latitude"
                        onChange = { ( latitude ) => setAlone( ( current ) => ({ ...current , latitude }) ) }
                        value    = { alone?.latitude ?? null }
                    />
                    <InputCoordinate
                        axis     = "longitude"
                        helper   = "Les séparateurs de milliers sont interdits, le signe est permis"
                        label    = "Longitude"
                        onChange = { ( longitude ) => setAlone( ( current ) => ({ ...current , longitude }) ) }
                        value    = { alone?.longitude ?? null }
                    />
                </div>
            </Section>

        </div>
    ) ;
} ;

MapPickerDemo.displayName = 'MapPickerDemo' ;

export default MapPickerDemo ;

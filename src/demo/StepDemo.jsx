'use client' ;

import { useState } from 'react' ;

import Badge from '@/components/Badge' ;
import Button from '@/components/Button' ;
import Step from '@/components/steps/Step' ;
import Steps from '@/components/steps/Steps' ;

import Container from '@/display/Container' ;

import { colors , directions } from '@/themes/components/step' ;

import
{
    MdCheck          as CheckIcon ,
    MdCreditCard     as PaymentIcon ,
    MdLocalShipping  as ShippingIcon ,
    MdShoppingCart   as CartIcon ,
}
from 'react-icons/md' ;

const FUNNEL =
[
    { id : 'cart'     , label : 'Panier' } ,
    { id : 'address'  , label : 'Livraison' } ,
    { id : 'payment'  , label : 'Paiement' } ,
    { id : 'review'   , label : 'Confirmation' } ,
] ;

const ColorRow = ({ allowNone = false , label , onChange , value }) =>
(
    <div className="flex flex-wrap items-center gap-2">
        <span className="w-32 text-sm font-semibold">{ label }</span>

        { allowNone && (
            <Button
                size    = "sm"
                color   = { value ? 'neutral' : 'primary' }
                style   = { value ? 'outline' : undefined }
                onClick = { () => onChange( undefined ) }
            >
                aucune
            </Button>
        ) }

        { colors.map( item =>
        (
            <Button
                key     = { item }
                size    = "sm"
                color   = { value === item ? 'primary' : 'neutral' }
                style   = { value === item ? undefined : 'outline' }
                onClick = { () => onChange( item ) }
            >
                { item }
            </Button>
        ) ) }
    </div>
) ;

ColorRow.displayName = 'ColorRow' ;

/**
 * The flagship : `current` drives the colouring, the three states are told apart, and
 * a reached step can be clicked to go back.
 */
const FunnelSection = () =>
{
    const [ current       , setCurrent       ] = useState( 1 ) ;
    const [ color         , setColor         ] = useState( 'success' ) ;
    const [ currentColor  , setCurrentColor  ] = useState( 'primary' ) ;
    const [ upcomingColor , setUpcomingColor ] = useState( undefined ) ;

    const items = FUNNEL.map( ( item , index ) =>
    ({
        ...item ,
        // Only a step already reached can be jumped back to.
        onClick : index <= current ? () => setCurrent( index ) : undefined ,
    }) ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Tunnel de commande</h2>

            <p className="text-sm text-base-content/70">
                En daisyUI brut, il faut poser <code className="badge badge-sm">step-primary</code> à
                la main sur chaque étape franchie. Ici c'est
                <code className="badge badge-sm">current</code> qui pilote — avec trois couleurs
                distinctes, pour que « franchie », « en cours » et « à venir » ne se confondent pas.
            </p>

            <Steps
                ariaLabel     = "Tunnel de commande"
                className     = "w-full"
                color         = { color }
                current       = { current }
                currentColor  = { currentColor }
                direction     = { { xs : 'vertical' , md : 'horizontal' } }
                items         = { items }
                upcomingColor = { upcomingColor }
            />

            <div className="flex flex-wrap items-center gap-2">
                <Button
                    size     = "sm"
                    style    = "outline"
                    disabled = { current === 0 }
                    onClick  = { () => setCurrent( n => Math.max( 0 , n - 1 ) ) }
                >
                    Précédent
                </Button>

                <Button
                    size     = "sm"
                    color    = "primary"
                    disabled = { current === FUNNEL.length - 1 }
                    onClick  = { () => setCurrent( n => Math.min( FUNNEL.length - 1 , n + 1 ) ) }
                >
                    Suivant
                </Button>

                <Badge color="accent">current = { current } ({ FUNNEL[ current ].id })</Badge>
            </div>

            <div className="flex flex-col gap-3 p-4 rounded-box bg-base-100">
                <ColorRow label="color"         value={ color }         onChange={ setColor } />
                <ColorRow label="currentColor"  value={ currentColor }  onChange={ setCurrentColor } />
                <ColorRow label="upcomingColor" value={ upcomingColor } onChange={ setUpcomingColor } allowNone />
            </div>

            <p className="text-xs text-base-content/60">
                daisyUI ne teinte le trait de liaison qu'<strong>entre deux étapes de même
                couleur</strong> : donner une couleur propre à l'étape en cours ramènerait donc le
                segment qui y mène au gris, terminant la barre une étape trop tôt alors que ce
                chemin a bien été parcouru. Le trait qui rejoint l'étape en cours est donc coloré
                avec <code className="badge badge-sm">color</code>, indépendamment de la pastille —
                la barre va jusqu'où l'utilisateur en est, et seule la pastille marque l'état.
            </p>

            <p className="text-xs text-base-content/60">
                Les libellés des étapes déjà franchies sont cliquables — retour en arrière. Les
                suivantes ne le sont pas. L'étape en cours porte
                <code className="badge badge-sm">aria-current="step"</code>.
            </p>

        </Container>
    ) ;
} ;

FunnelSection.displayName = 'FunnelSection' ;

const BubbleSection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Contenu de la pastille</h2>

        <p className="text-sm text-base-content/70">
            Trois mécanismes qui s'excluent : le compteur CSS par défaut,
            <code className="badge badge-sm">content</code> qui alimente
            <code className="badge badge-sm">data-content</code>, ou
            <code className="badge badge-sm">icon</code> qui <strong>remplace</strong> la pastille —
            dès qu'une icône est là, le pseudo-élément et son compteur s'effacent.
        </p>

        <div className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
                <Badge color="neutral">compteur automatique</Badge>
                <Steps className="w-full" color="neutral" current={ 3 } items={ FUNNEL } />
            </div>

            <div className="flex flex-col gap-2">
                <Badge color="neutral">content — y compris la chaîne vide</Badge>
                { /* En mode enfants, `color` et `current` ne s'appliquent pas : chaque Step se gouverne. */ }
                <Steps className="w-full">
                    <Step color="neutral" content="?" label="Question" />
                    <Step color="neutral" content="!" label="Alerte" />
                    <Step color="neutral" content="✓" label="Validé" />
                    <Step color="neutral" content="" label="Vide" />
                    <Step color="neutral" content="★" label="Favori" />
                </Steps>
            </div>

            <div className="flex flex-col gap-2">
                <Badge color="neutral">icon</Badge>
                <Steps className="w-full">
                    <Step color="success" icon={ <CheckIcon /> }    label="Panier" />
                    <Step color="success" icon={ <CartIcon /> }     label="Livraison" />
                    <Step color="primary" icon={ <ShippingIcon /> } label="Expédition" />
                    <Step icon={ <PaymentIcon /> } label="Paiement" />
                </Steps>
            </div>

        </div>

        <p className="text-xs text-base-content/60">
            La pastille étant générée par le CSS, elle n'est ni sélectionnable ni annoncée de
            façon fiable : c'est le libellé qui doit porter le sens, jamais le numéro.
        </p>

    </Container>
) ;

BubbleSection.displayName = 'BubbleSection' ;

const DirectionSection = () =>
{
    const [ direction , setDirection ] = useState( 'horizontal' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Direction</h2>

            <div className="flex flex-wrap items-center gap-2 p-4 rounded-box bg-base-100">
                <span className="w-32 text-sm font-semibold">direction</span>
                { directions.map( value =>
                (
                    <Button
                        key     = { value }
                        size    = "sm"
                        color   = { direction === value ? 'primary' : 'neutral' }
                        style   = { direction === value ? undefined : 'outline' }
                        onClick = { () => setDirection( value ) }
                    >
                        { value }
                    </Button>
                ) ) }
            </div>

            <Steps className="w-full" current={ 1 } direction={ direction } items={ FUNNEL } />

            <p className="text-sm text-base-content/70">
                Et la forme responsive, via le même helper que les tailles de
                <code className="badge badge-sm">Tabs</code> :
                <code className="badge badge-sm">{ `direction={{ xs: 'vertical', lg: 'horizontal' }}` }</code>.
                Empilé sur mobile — ce qui vaut mieux qu'un défilement latéral, puisque
                <code className="badge badge-sm">.steps</code> est en
                <code className="badge badge-sm">overflow: auto hidden</code>.
            </p>

            <Steps
                className = "w-full"
                current   = { 1 }
                direction = { { xs : 'vertical' , lg : 'horizontal' } }
                items     = { FUNNEL }
            />

        </Container>
    ) ;
} ;

DirectionSection.displayName = 'DirectionSection' ;

const FreeColorSection = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Couleurs libres</h2>

        <p className="text-sm text-base-content/70">
            Sans <code className="badge badge-sm">current</code>, aucune couleur n'est imposée :
            chaque étape porte la sienne. C'est le mode « brut », utile pour un état qui n'est pas
            une progression linéaire.
        </p>

        <Steps
            className = "w-full"
            items     = {[
                { id : 'a' , label : 'Aller sur la lune' , color : 'info' } ,
                { id : 'b' , label : 'Rétrécir la lune'  , color : 'info' } ,
                { id : 'c' , label : 'Attraper la lune'  , color : 'info' } ,
                { id : 'd' , label : 'Échec'             , color : 'error' , content : '?' } ,
            ]}
        />

    </Container>
) ;

FreeColorSection.displayName = 'FreeColorSection' ;

/**
 * Demo: `Steps` / `Step` — an ordered process on DaisyUI's `steps`.
 *
 * @returns {React.JSX.Element}
 */
const StepDemo = () =>
{
    return (
        <>
            <FunnelSection />
            <BubbleSection />
            <DirectionSection />
            <FreeColorSection />
        </>
    ) ;
} ;

StepDemo.displayName = 'StepDemo' ;

export default StepDemo ;

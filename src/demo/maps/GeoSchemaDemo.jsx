'use client' ;

import CodeBlock from '@/components/typography/CodeBlock' ;
import Section   from '@/demo/charts/Section' ;

import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism' ;

import formatCoordinates from '@/helpers/geo/formatCoordinates' ;
import fromSchema        from '@/helpers/geo/fromSchema' ;
import parseGeoShape     from '@/helpers/geo/parseGeoShape' ;
import toGeoJSON         from '@/helpers/geo/toGeoJSON' ;

/**
 * The adapter, read as text.
 *
 * A latitude and a longitude the wrong way round still draw : the point lands
 * somewhere plausible and the mistake surfaces days later. Printing the figures
 * beside the payload they came from is the only way to catch that before a map
 * hides it.
 */

const NOTRE_DAME =
{
    '@type' : 'Place' ,
    name    : 'Notre-Dame de Paris' ,
    geo     : { '@type' : 'GeoCoordinates' , latitude : 48.852968 , longitude : 2.349902 } ,
} ;

const RUNGIS =
{
    '@type'   : 'Warehouse' ,
    name      : 'Entrepôt de Rungis' ,
    latitude  : 48.748900 ,
    longitude : 2.360600 ,
} ;

const BORDEAUX =
{
    '@type'   : 'GeoCoordinates' ,
    latitude  : '44.837789' ,
    longitude : '-0.579180' ,
    elevation : 20 ,
} ;

const OUT_OF_RANGE =
{
    '@type'   : 'Place' ,
    name      : 'Coordonnée impossible' ,
    latitude  : 148.5 ,
    longitude : 2.35 ,
} ;

const DISAGREEING =
{
    '@type'   : 'Place' ,
    name      : 'Deux sources qui divergent' ,
    geo       : { latitude : 48.852968 , longitude : 2.349902 } ,
    latitude  : 44.837789 ,
    longitude : -0.579180 ,
} ;

const POLYGON = { '@type' : 'GeoShape' , polygon : '48.845 2.32 48.865 2.32 48.865 2.37 48.845 2.37' } ;
const CIRCLE  = { '@type' : 'GeoShape' , circle  : '48.8566 2.3522 1500' } ;
const BOX     = { '@type' : 'GeoShape' , box     : '48.80 2.25 48.90 2.42' } ;

/**
 * A payload and what the adapter makes of it, side by side.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The result.
 * @param {string} props.label - What the row demonstrates.
 * @param {*} props.source - The payload.
 */
const Row = ( { children , label , source } ) => (
    <div className="grid gap-3 rounded-box bg-base-100 p-4 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1">
            <p className="text-xs font-semibold uppercase text-base-content/50">{ label }</p>
            <CodeBlock className="text-xs!" language="json" style={ oneDark }>
                { JSON.stringify( source , null , 2 ) }
            </CodeBlock>
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-1">
            { children }
        </div>
    </div>
) ;

/**
 * The adapter's output, or the fact that there is none.
 *
 * @param {Object} props
 * @param {Object|null} props.point - What `fromSchema` returned.
 */
const Point = ( { point } ) => point
    ? (
        <>
            <p className="font-mono text-lg tabular-nums">
                { formatCoordinates( point ) }
            </p>
            <p className="font-mono text-xs text-base-content/60">
                { formatCoordinates( point , { format : 'dms' , digits : 1 } ) }
            </p>
            <p className="text-xs text-base-content/50">
                { `latitude ${ point.latitude } · longitude ${ point.longitude }` }
                { point.elevation !== null && ` · altitude ${ point.elevation } m` }
            </p>
        </>
    )
    : <p className="font-mono text-sm text-warning">null</p> ;

/**
 * A geometry, dumped.
 *
 * @param {Object} props
 * @param {Object|null} props.feature - What `parseGeoShape` returned.
 */
const Geometry = ( { feature } ) => feature
    ? (
        <CodeBlock className="text-xs!" language="json" style={ oneDark }>
            { JSON.stringify( feature , null , 2 ) }
        </CodeBlock>
    )
    : <p className="font-mono text-sm text-warning">null</p> ;

const GeoSchemaDemo = () =>
{
    const collection = toGeoJSON
    (
        [ NOTRE_DAME , RUNGIS , OUT_OF_RANGE ] ,
        { properties : ( place ) => ({ name : place.name }) } ,
    ) ;

    return (
        <div className="flex flex-col gap-8">

            <Section
                title       = "Un point, quelle que soit la forme de la source"
                description = "L'adaptateur lit les propriétés, jamais « @type » — un objet qui porte une latitude et une longitude est un point, quel que soit son nom."
            >
                <div className="flex flex-col gap-3">
                    <Row label="Place avec geo" source={ NOTRE_DAME }>
                        <Point point={ fromSchema( NOTRE_DAME ) } />
                    </Row>
                    <Row label="Warehouse à plat" source={ RUNGIS }>
                        <Point point={ fromSchema( RUNGIS ) } />
                    </Row>
                    <Row label="GeoCoordinates, valeurs en chaînes" source={ BORDEAUX }>
                        <Point point={ fromSchema( BORDEAUX ) } />
                    </Row>
                    <Row label="Latitude hors bornes" source={ OUT_OF_RANGE }>
                        <Point point={ fromSchema( OUT_OF_RANGE ) } />
                        <p className="text-xs text-base-content/50">
                            { `Rendu « null » plutôt qu'une exception : une carte à laquelle il manque un point reste une carte.` }
                        </p>
                    </Row>
                </div>
            </Section>

            <Section
                title       = "Quand une Place dit deux choses"
                description = "Le même objet porte « geo » et ses propres latitude/longitude, avec des valeurs différentes. « prefer » décide laquelle gagne."
            >
                <Row label="Place portant les deux" source={ DISAGREEING }>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase text-base-content/50">
                                { `Par défaut — prefer : 'geo'` }
                            </p>
                            <Point point={ fromSchema( DISAGREEING ) } />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase text-base-content/50">
                                { `Forcé — prefer : 'flat'` }
                            </p>
                            <Point point={ fromSchema( DISAGREEING , { prefer : 'flat' } ) } />
                        </div>
                    </div>
                </Row>
            </Section>

            <Section
                title       = "Les géométries, et l'inversion des axes"
                description = "schema.org écrit « latitude longitude » en texte, GeoJSON écrit « [ longitude , latitude ] » en tableau. C'est ici, et nulle part ailleurs, que la bascule a lieu."
            >
                <div className="flex flex-col gap-3">
                    <Row label="Polygon — l'anneau est refermé" source={ POLYGON }>
                        <Geometry feature={ parseGeoShape( POLYGON ) } />
                    </Row>
                    <Row label="Circle — un Point plus un rayon" source={ CIRCLE }>
                        <Geometry feature={ parseGeoShape( CIRCLE ) } />
                    </Row>
                    <Row label="Box — deux coins, quatre côtés" source={ BOX }>
                        <Geometry feature={ parseGeoShape( BOX ) } />
                    </Row>
                </div>
            </Section>

            <Section
                title       = "La collection GeoJSON"
                description = "Ce qu'une source vectorielle consommera au lot 2. Le point hors bornes est écarté, il n'atterrit pas à zéro."
            >
                <CodeBlock className="text-xs!" language="json" showLineNumbers style={ oneDark }>
                    { JSON.stringify( collection , null , 2 ) }
                </CodeBlock>
            </Section>

        </div>
    ) ;
} ;

GeoSchemaDemo.displayName = 'GeoSchemaDemo' ;

export default GeoSchemaDemo ;

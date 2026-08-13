'use client' ;

import { useEffect , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import CategoryBar from '@/components/metrics/CategoryBar' ;
import Container   from '@/display/Container' ;
import Divider     from '@/components/Divider' ;

import { QUALITATIVE_COLORS } from '@/themes/components/categoryBar' ;

import Section from '@/demo/charts/Section' ;

// A bullet's bands are cumulative ranges — poor up to 50, fair up to 80, good up to 100.
const BANDS = [ 50 , 30 , 20 ] ;

const STORAGE =
[
    { key : 'documents' , value : 42  , color : 'primary'   } ,
    { key : 'photos'    , value : 28  , color : 'secondary' } ,
    { key : 'videos'    , value : 18  , color : 'accent'    } ,
    { key : 'free'      , value : 112 , color : 'base-300'  } ,
] ;

/**
 * Interpolates a locale pattern, and keeps quiet when the locale has not resolved yet.
 *
 * @param {string} [pattern] - The locale pattern, with `{0}` placeholders.
 * @param {...*} args - The values to interpolate.
 * @returns {string | undefined} The formatted string.
 */
const t = ( pattern , ...args ) => pattern ? format( pattern , ...args ) : undefined ;

/**
 * CategoryBar demo.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.metrics.categoryBar'] - Dot notation path to the demo locale.
 */
const CategoryBarDemo = ( { path = 'demo.metrics.categoryBar' } ) =>
{
    const locale = useI18n( path ) ;

    const { bullet , colors , compare , description , domain , edges , labels , legend , marker : markerLocale , measureColors , simple , sizes , storage , title } = locale ;

    const [ marker , setMarker ] = useState( 65 ) ;

    // Shows the marker easing to its new position rather than jumping.
    useEffect( () =>
    {
        const interval = setInterval( () => setMarker( Math.round( Math.random() * 100 ) ) , 2500 ) ;
        return () => clearInterval( interval ) ;
    } , [] ) ;

    const items = STORAGE.map( item => ({
        ...item ,
        name    : storage?.[ item.key ] ,
        tooltip : t( storage?.tooltip , storage?.[ item.key ] , item.value ) ,
    }) ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-8" maxWidth="max-w-4xl">

            <header className="flex flex-col gap-1" id="categoryBar">
                <h2 className="text-2xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <Divider />

            <Section title={ simple?.title } description={ simple?.description }>
                <CategoryBar values={ [ 70 , 18 , 12 ] } />
            </Section>

            <Divider />

            <Section title={ sizes?.title } description={ sizes?.description }>
                <div className="flex flex-col gap-4">
                    <CategoryBar values={ [ 55 , 30 , 15 ] } size="xs" />
                    <CategoryBar values={ [ 55 , 30 , 15 ] } size="sm" />
                    <CategoryBar values={ [ 55 , 30 , 15 ] } size="md" />
                    <CategoryBar values={ [ 55 , 30 , 15 ] } size="lg" />
                    <CategoryBar values={ [ 55 , 30 , 15 ] } size="xl" />
                    <CategoryBar values={ [ 55 , 30 , 15 ] } size={ { xs : 'xs' , lg : 'lg' } } />
                </div>
            </Section>

            <Divider />

            <Section title={ labels?.title } description={ labels?.description }>
                <div className="flex flex-col gap-6">
                    <CategoryBar values={ [ 55 , 30 , 15 ] } showLabels />
                    <CategoryBar values={ [ 10 , 5 , 5 , 5 , 5 , 5 , 50 , 15 ] } showLabels />
                    <CategoryBar values={ [ 5 , 95 ] } showLabels />
                </div>
            </Section>

            <Divider />

            <Section title={ markerLocale?.title } description={ markerLocale?.description }>
                <div className="flex flex-col gap-6">
                    <CategoryBar
                        values = { [ 60 , 10 , 15 , 15 ] }
                        marker = { { value : 65 , tooltip : t( markerLocale?.goal , 65 ) } }
                        showLabels
                    />
                    <CategoryBar
                        values = { [ 25 , 25 , 25 , 25 ] }
                        marker = { { value : marker , tooltip : `${ marker } %` , animated : true } }
                        showLabels
                    />
                </div>
            </Section>

            <Divider />

            <Section title={ legend?.title } description={ legend?.description }>
                <CategoryBar
                    items          = { items }
                    showLegend
                    size           = "lg"
                    valueFormatter = { value => t( storage?.unit , value ) ?? String( value ) }
                />
            </Section>

            <Divider />

            <Section title={ bullet?.title } description={ bullet?.description }>
                <div className="flex flex-col gap-6">
                    <CategoryBar
                        colors  = { QUALITATIVE_COLORS }
                        marker  = {{ tooltip : t( markerLocale?.goal , 90 ) , value : 90 }}
                        measure = {{ tooltip : t( bullet?.current , 82 ) , value : 82 }}
                        showLabels
                        size    = "xl"
                        values  = { BANDS }
                    />
                    {/*
                        Saturated bands are the one case the ring earns its keep : `info`
                        sits close to the warning band it crosses, and the `base-100` ring
                        is what keeps the two apart.
                    */}
                    <CategoryBar
                        colors  = { [ 'error' , 'warning' , 'success' ] }
                        marker  = {{ tooltip : t( markerLocale?.goal , 90 ) , value : 90 }}
                        measure = {{ color : 'info' , ring : true , value : 45 }}
                        size    = "xl"
                        values  = { BANDS }
                    />
                </div>
            </Section>

            <Divider />

            <Section title={ measureColors?.title } description={ measureColors?.description }>
                <div className="flex flex-col gap-4">
                    { [ 'primary' , 'info' , 'success' , 'bg-base-content/70' , '#4E79A7' ].map( color => (
                        <div className="flex items-center gap-4" key={ color }>
                            <code className="w-40 shrink-0 text-xs text-base-content/60">{ color }</code>
                            <CategoryBar
                                className = "flex-1"
                                colors    = { QUALITATIVE_COLORS }
                                marker    = {{ value : 90 }}
                                measure   = {{ color , value : 82 }}
                                size      = "xl"
                                values    = { BANDS }
                            />
                        </div>
                    ) ) }
                </div>
            </Section>

            <Divider />

            <Section title={ domain?.title } description={ domain?.description }>
                <CategoryBar
                    colors  = { QUALITATIVE_COLORS }
                    marker  = {{ tooltip : t( markerLocale?.goal , 90 ) , value : 90 }}
                    max     = { 140 }
                    measure = { 82 }
                    showLabels
                    size    = "xl"
                    values  = { BANDS }
                />
            </Section>

            <Divider />

            {/*
                The argument for the shape : one scale, three rows, and the comparison is
                immediate. Three gauges of the same data would take ten times the room and
                still not line up.
            */}
            <Section title={ compare?.title } description={ compare?.description }>
                <div className="flex flex-col gap-4">
                    { [
                        { key : 'sales'        , measure : 82 , target : 90 } ,
                        { key : 'margin'       , measure : 45 , target : 70 } ,
                        { key : 'satisfaction' , measure : 96 , target : 85 } ,
                    ].map( item => (
                        <div className="flex flex-col gap-1" key={ item.key }>
                            <div className="flex items-baseline justify-between text-sm">
                                <span className="font-medium">{ compare?.[ item.key ] }</span>
                                <span className="tabular-nums text-base-content/60">{ `${ item.measure } / ${ item.target }` }</span>
                            </div>
                            <CategoryBar
                                colors  = { QUALITATIVE_COLORS }
                                marker  = {{ tooltip : t( markerLocale?.goal , item.target ) , value : item.target }}
                                measure = { item.measure }
                                size    = "lg"
                                values  = { BANDS }
                            />
                        </div>
                    ) ) }
                </div>
            </Section>

            <Divider />

            <Section title={ colors?.title } description={ colors?.description }>
                <CategoryBar
                    values = { [ 40 , 35 , 25 ] }
                    colors = { [ '#4E79A7' , '#F28E2C' , '#E15759' ] }
                    size   = "lg"
                />
            </Section>

            <Divider />

            <Section title={ edges?.title } description={ edges?.description }>
                <div className="flex flex-col gap-6">
                    <CategoryBar values={ [ 0 , 0 ] } showLabels />
                    <CategoryBar values={ [ 70.1 , 18.3 , 11.6 ] } showLabels />
                    <CategoryBar values={ [ 0 , 50 , 50 ] } showLabels />
                </div>
            </Section>

        </Container>
    ) ;
} ;

export default CategoryBarDemo ;

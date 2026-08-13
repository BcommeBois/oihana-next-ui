'use client' ;

import { useEffect , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import CategoryBar from '@/components/metrics/CategoryBar' ;
import Container   from '@/display/Container' ;
import Divider     from '@/components/Divider' ;

import Section from '@/demo/charts/Section' ;

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

    const { colors , description , edges , labels , legend , marker : markerLocale , simple , sizes , storage , title } = locale ;

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

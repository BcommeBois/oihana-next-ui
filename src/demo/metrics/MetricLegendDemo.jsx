'use client' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import CategoryBar  from '@/components/metrics/CategoryBar' ;
import Container    from '@/display/Container' ;
import Divider      from '@/components/Divider' ;
import MetricLegend from '@/components/metrics/MetricLegend' ;
import Sparkline    from '@/components/metrics/Sparkline' ;

import Section from '@/demo/charts/Section' ;

/**
 * Interpolates a locale pattern, and keeps quiet when the locale has not resolved yet.
 *
 * @param {string} [pattern] - The locale pattern, with `{0}` placeholders.
 * @param {...*} args - The values to interpolate.
 * @returns {string | undefined} The formatted string.
 */
const t = ( pattern , ...args ) => pattern ? format( pattern , ...args ) : undefined ;

/**
 * Deterministic series, so the server and the client draw the same curve.
 *
 * @param {number} seed - Shifts the waveform.
 * @param {number} scale - Multiplies the amplitude.
 * @returns {number[]} The series.
 */
const makeSeries = ( seed , scale ) => Array.from( { length : 24 } , ( _ , index ) =>
    Math.round( ( 50 + Math.sin( seed + index / 2.2 ) * 20 + Math.sin( seed * 2 + index ) * 6 ) * scale ) ,
) ;

const VISITS = makeSeries( 1 , 1 ) ;
const SALES  = makeSeries( 3 , 0.6 ) ;
const ERRORS = makeSeries( 5 , 0.25 ) ;

const STORAGE = [ 42 , 18 , 12 , 28 ] ;

/**
 * MetricLegend demo.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.metrics.metricLegend'] - Dot notation path to the demo locale.
 */
const MetricLegendDemo = ( { path = 'demo.metrics.metricLegend' } ) =>
{
    const { bar , colors , description , markers , orientation , series , simple , sizes , sparklines , title } = useI18n( path ) ;

    const storage =
    [
        { color : 'primary'   , key : 'documents' , name : simple?.documents , value : STORAGE[ 0 ] } ,
        { color : 'secondary' , key : 'photos'    , name : simple?.photos    , value : STORAGE[ 1 ] } ,
        { color : 'accent'    , key : 'videos'    , name : simple?.videos    , value : STORAGE[ 2 ] } ,
        { color : 'base-300'  , key : 'free'      , name : simple?.free      , value : STORAGE[ 3 ] } ,
    ] ;

    const unit = value => t( simple?.unit , value ) ?? String( value ) ;

    const seriesItems =
    [
        { color : 'primary' , key : 'visits' , name : series?.visits , tooltip : series?.visitsTip } ,
        { color : 'accent'  , key : 'sales'  , name : series?.sales  , tooltip : series?.salesTip  } ,
        { color : 'error'   , key : 'errors' , name : series?.errors , tooltip : series?.errorsTip } ,
    ] ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-8" maxWidth="max-w-4xl">

            <header className="flex flex-col gap-1" id="metricLegend">
                <h2 className="text-2xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <Divider />

            <Section title={ simple?.title } description={ simple?.description }>
                <MetricLegend items={ storage } valueFormatter={ unit } />
            </Section>

            <Divider />

            <Section title={ markers?.title } description={ markers?.description }>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ markers?.dot }</p>
                        <MetricLegend items={ seriesItems } />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ markers?.square }</p>
                        <MetricLegend items={ seriesItems } marker="square" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ markers?.line }</p>
                        <MetricLegend items={ seriesItems } marker="line" />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ orientation?.title } description={ orientation?.description }>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ orientation?.vertical }</p>
                        <MetricLegend items={ storage } orientation="vertical" valueFormatter={ unit } />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ orientation?.responsive }</p>
                        <MetricLegend
                            items          = { storage }
                            orientation    = {{ xs : 'vertical' , md : 'horizontal' }}
                            valueFormatter = { unit }
                        />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ sizes?.title } description={ sizes?.description }>
                <div className="flex flex-col gap-3">
                    <MetricLegend items={ storage } size="xs" valueFormatter={ unit } />
                    <MetricLegend items={ storage } size="sm" valueFormatter={ unit } />
                    <MetricLegend items={ storage } size="md" valueFormatter={ unit } />
                </div>
            </Section>

            <Divider />

            <Section title={ series?.title } description={ series?.description }>
                <MetricLegend items={ seriesItems } />
            </Section>

            <Divider />

            {/*
                The recipe the `line` marker exists for : several sparklines in one tile,
                each identified by a stroke of its own colour rather than by a label
                squeezed next to a glyph 24 pixels tall.
            */}
            <Section title={ sparklines?.title } description={ sparklines?.description }>
                <div className="flex max-w-md flex-col gap-3 rounded-box bg-base-100 p-4">
                    <Sparkline color="primary" data={ VISITS } showLast />
                    <Sparkline color="accent"  data={ SALES }  showLast />
                    <Sparkline color="error"   data={ ERRORS } showLast />
                    <MetricLegend items={ seriesItems } marker="line" />
                </div>
            </Section>

            <Divider />

            <Section title={ bar?.title } description={ bar?.description }>
                <CategoryBar
                    items          = { storage }
                    legendProps    = {{ marker : 'square' }}
                    showLegend
                    valueFormatter = { unit }
                />
            </Section>

            <Divider />

            <Section title={ colors?.title } description={ colors?.description }>
                <MetricLegend
                    items={[
                        { color : '#4E79A7' , key : 'a' , name : colors?.first  , value : 62 } ,
                        { color : '#F28E2C' , key : 'b' , name : colors?.second , value : 24 } ,
                        { color : '#E15759' , key : 'c' , name : colors?.third  , value : 14 } ,
                    ]}
                    valueFormatter = { value => `${ value } %` }
                />
            </Section>

        </Container>
    ) ;
} ;

export default MetricLegendDemo ;

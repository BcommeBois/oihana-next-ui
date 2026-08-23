'use client' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container   from '@/display/Container' ;
import Divider     from '@/components/Divider' ;
import MetricScale from '@/components/metrics/MetricScale' ;

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
 * The ramp the charts fall back on — `NIVO_SEQUENTIAL_COLORS`, four buckets.
 * @type {string[]}
 */
const NIVO_RAMP = [ '#61CDBB' , '#97E3D5' , '#E8C1A0' , '#F47560' ] ;

/**
 * A ramp of theme tokens, to show they resolve to classes rather than styles.
 * @type {string[]}
 */
const TOKEN_RAMP = [ 'base-300' , 'info' , 'primary' , 'secondary' , 'accent' ] ;

/**
 * Ten buckets, to show what thinning is for.
 * @type {string[]}
 */
const LONG_RAMP = Array.from( { length : 10 } , ( _ , index ) =>
    `color-mix(in oklch, var(--color-primary) ${ 15 + index * 9 }%, var(--color-base-100))` ,
) ;

/**
 * MetricScale demo.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.metrics.metricScale'] - Dot notation path to the demo locale.
 */
const MetricScaleDemo = ( { path = 'demo.metrics.metricScale' } ) =>
{
    const { bounds , colors , description , orientation , simple , sizes , ticks , title } = useI18n( path ) ;

    const unit = value => t( simple?.unit , value ) ?? String( value ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-8" maxWidth="max-w-4xl">

            <header className="flex flex-col gap-1" id="metricScale">
                <h2 className="text-2xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <Divider />

            <Section title={ simple?.title } description={ simple?.description }>
                <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 240 } valueFormatter={ unit } />
            </Section>

            <Divider />

            <Section title={ orientation?.title } description={ orientation?.description }>
                <div className="flex flex-wrap items-start gap-10">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-base-content/60">{ orientation?.horizontal }</span>
                        <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 240 } />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-base-content/60">{ orientation?.vertical }</span>
                        <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 240 } orientation="vertical" />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ sizes?.title } description={ sizes?.description }>
                <div className="flex flex-col gap-4">
                    <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 240 } size="xs" />
                    <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 240 } size="sm" />
                    <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 240 } size="md" />
                </div>
            </Section>

            <Divider />

            <Section title={ ticks?.title } description={ ticks?.description }>
                <div className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-base-content/60">{ ticks?.all }</span>
                        <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 240 } ticks />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-base-content/60">{ ticks?.thinned }</span>
                        <MetricScale colors={ LONG_RAMP } min={ 0 } max={ 240 } ticks={ 4 } />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-base-content/60">{ ticks?.uneven }</span>
                        <MetricScale
                            colors         = { NIVO_RAMP }
                            min            = { 12 }
                            max            = { 37 }
                            ticks
                            valueFormatter = { value => value.toFixed( 1 ) }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-base-content/60">{ ticks?.vertical }</span>
                        <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 240 } orientation="vertical" ticks />
                    </div>

                </div>
            </Section>

            <Divider />

            <Section title={ bounds?.title } description={ bounds?.description }>
                <MetricScale colors={ NIVO_RAMP } />
            </Section>

            <Divider />

            <Section title={ colors?.title } description={ colors?.description }>
                <div className="flex flex-wrap items-start gap-10">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-base-content/60">{ colors?.tokens }</span>
                        <MetricScale colors={ TOKEN_RAMP } min={ 0 } max={ 100 } />
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-base-content/60">{ colors?.css }</span>
                        <MetricScale colors={ NIVO_RAMP } min={ 0 } max={ 100 } />
                    </div>
                </div>
            </Section>

        </Container>
    ) ;
} ;

export default MetricScaleDemo ;

'use client' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Sparkline from '@/components/metrics/Sparkline' ;
import Stat      from '@/components/stats/Stat' ;
import Stats     from '@/components/stats/Stats' ;

import Section from '@/demo/charts/Section' ;

/**
 * Deterministic series, so the server and the client draw the same curve.
 *
 * @param {number} length - How many points.
 * @param {number} seed - Shifts the waveform.
 * @param {number} slope - Drift per point ; negative trends down.
 * @returns {number[]} The series.
 */
const makeSeries = ( length , seed , slope = 0 ) => Array.from( { length } , ( _ , index ) =>
    Math.round( 50 + Math.sin( seed + index / 2.4 ) * 18 + Math.sin( seed * 2 + index / 1.1 ) * 7 + index * slope ) ,
) ;

const SERIES  = makeSeries( 30 , 1 ) ;
const RISING  = makeSeries( 30 , 2 , 1.4 ) ;
const FALLING = makeSeries( 30 , 3 , -1.4 ) ;
const FLAT    = Array.from( { length : 20 } , () => 42 ) ;
const GAPPED  = SERIES.map( ( value , index ) => index > 9 && index < 14 ? null : value ) ;

// Two series of different levels, both comfortably inside [0, 100] : the shared-scale
// point only lands when nothing runs off the scale being shared.
const BUSY  = makeSeries( 24 , 4 ).map( value => Math.round( value * 0.7 + 24 ) ) ;
const QUIET = makeSeries( 24 , 5 ).map( value => Math.round( value * 0.3 + 6 ) ) ;

/**
 * Sparkline demo.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.metrics.sparkline'] - Dot notation path to the demo locale.
 */
const SparklineDemo = ( { path = 'demo.metrics.sparkline' } ) =>
{
    const { description , domain , edges , fill , recipe , sizes , title , trend , variants } = useI18n( path ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-8" maxWidth="max-w-4xl">

            <header className="flex flex-col gap-1" id="sparkline">
                <h2 className="text-2xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <Divider />

            <Section title={ variants?.title } description={ variants?.description }>
                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ variants?.line }</p>
                        <Sparkline data={ SERIES } showLast />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ variants?.area }</p>
                        <Sparkline data={ SERIES } variant="area" showLast />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ variants?.bar }</p>
                        <Sparkline data={ SERIES } variant="bar" />
                    </div>
                </div>
            </Section>

            <Divider />

            {/*
                Constrained on purpose : stretched to a full-width container a sparkline
                sits at a 25:1 ratio, where every curve flattens into the same line and
                the heights become impossible to tell apart. Tufte's own sit nearer 4:1.
            */}
            <Section title={ sizes?.title } description={ sizes?.description }>
                <div className="flex max-w-sm flex-col gap-4">
                    <Sparkline data={ SERIES } size="xs" />
                    <Sparkline data={ SERIES } size="sm" />
                    <Sparkline data={ SERIES } size="md" />
                    <Sparkline data={ SERIES } size="lg" />
                    <Sparkline data={ SERIES } size={ { xs : 'lg' , lg : 'xs' } } />
                    <Sparkline data={ SERIES } className="w-32" />
                </div>
            </Section>

            <Divider />

            <Section title={ domain?.title } description={ domain?.description }>
                <div className="flex max-w-md flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ domain?.auto }</p>
                        <Sparkline data={ SERIES } variant="area" size="lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ domain?.zero }</p>
                        <Sparkline data={ SERIES } variant="area" size="lg" min={ 0 } />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ domain?.shared }</p>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Sparkline data={ BUSY } variant="bar" min={ 0 } max={ 100 } />
                            <Sparkline data={ QUIET } variant="bar" min={ 0 } max={ 100 } />
                        </div>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ fill?.title } description={ fill?.description }>
                <div className="grid gap-6 sm:grid-cols-3">
                    <Sparkline data={ SERIES } variant="area" fill="gradient" size="lg" />
                    <Sparkline data={ SERIES } variant="area" fill="solid" size="lg" />
                    <Sparkline data={ SERIES } variant="area" fill="none" size="lg" />
                </div>
            </Section>

            <Divider />

            <Section title={ trend?.title } description={ trend?.description }>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-semibold uppercase text-base-content/50">{ trend?.up }</p>
                            <Sparkline data={ RISING } colorByTrend showLast variant="area" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-semibold uppercase text-base-content/50">{ trend?.down }</p>
                            <Sparkline data={ FALLING } colorByTrend showLast variant="area" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs font-semibold uppercase text-base-content/50">{ trend?.flat }</p>
                            <Sparkline data={ FLAT } colorByTrend showLast variant="area" />
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        <Sparkline data={ SERIES } color="secondary" variant="bar" />
                        <Sparkline data={ SERIES } color="accent" showLast />
                        <Sparkline data={ SERIES } color="#4E79A7" variant="area" />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ edges?.title } description={ edges?.description }>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ edges?.empty }</p>
                        <Sparkline data={ [] } />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ edges?.single }</p>
                        <Sparkline data={ [ 42 ] } showLast />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ edges?.constant }</p>
                        <Sparkline data={ FLAT } variant="bar" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ edges?.gaps }</p>
                        <Sparkline data={ GAPPED } showLast />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ edges?.connected }</p>
                        <Sparkline data={ GAPPED } connectNulls showLast />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ edges?.clamped }</p>
                        <Sparkline data={ SERIES } min={ 40 } max={ 60 } showLast />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ recipe?.title } description={ recipe?.description }>
                <Stats className="w-full" direction={ { xs : 'vertical' , md : 'horizontal' } }>
                    <Stat
                        title       = { recipe?.visitors }
                        value       = "12 480"
                        description = { recipe?.period }
                        figure      = { <Sparkline data={ RISING } className="w-24" colorByTrend showLast /> }
                    />
                    <Stat
                        title       = { recipe?.revenue }
                        value       = "48 210 €"
                        description = { recipe?.period }
                        figure      = { <Sparkline data={ SERIES } className="w-24" variant="area" showLast /> }
                    />
                    <Stat
                        title       = { recipe?.errors }
                        value       = "312"
                        description = { recipe?.period }
                        figure      = { <Sparkline data={ FALLING } className="w-24" color="error" variant="bar" /> }
                    />
                </Stats>
            </Section>

        </Container>
    ) ;
} ;

export default SparklineDemo ;

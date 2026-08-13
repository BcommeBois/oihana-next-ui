'use client' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;
import Delta     from '@/components/metrics/Delta' ;
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

const RISING  = makeSeries( 30 , 2 , 1.4 ) ;
const STEADY  = makeSeries( 30 , 1 ) ;
const FALLING = makeSeries( 30 , 3 , -1.4 ) ;

/**
 * Interpolates a locale pattern, and keeps quiet when the locale has not resolved yet.
 *
 * @param {string} [pattern] - The locale pattern, with `{0}` placeholders.
 * @param {...*} args - The values to interpolate.
 * @returns {string | undefined} The formatted string.
 */
const t = ( pattern , ...args ) => pattern ? format( pattern , ...args ) : undefined ;

/**
 * A labelled row of examples.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The examples.
 * @param {string} [props.label] - The row label.
 */
const Row = ( { children , label } ) => (
    <div className="flex flex-col gap-2">
        { label ? <p className="text-xs font-semibold uppercase text-base-content/50">{ label }</p> : null }
        <div className="flex flex-wrap items-center gap-3">{ children }</div>
    </div>
) ;

/**
 * Delta demo.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.metrics.delta'] - Dot notation path to the demo locale.
 */
const DeltaDemo = ( { path = 'demo.metrics.delta' } ) =>
{
    const { description , formats , fromTo , inverted , missing , neutral , recipe , simple , title , variants } = useI18n( path ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-8" maxWidth="max-w-4xl">

            <header className="flex flex-col gap-1" id="delta">
                <h2 className="text-2xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <Divider />

            <Section title={ simple?.title } description={ simple?.description }>
                <Row>
                    <Delta value={ 0.124 } />
                    <Delta value={ -0.083 } />
                    <Delta value={ 0 } />
                </Row>
            </Section>

            <Divider />

            <Section title={ inverted?.title } description={ inverted?.description }>
                <div className="flex flex-col gap-4">
                    <Row label={ inverted?.normal }>
                        <Delta value={ 0.124 } />
                        <Delta value={ -0.083 } />
                    </Row>
                    <Row label={ inverted?.reverse }>
                        <Delta value={ 0.124 } inverted />
                        <Delta value={ -0.083 } inverted />
                    </Row>
                </div>
            </Section>

            <Divider />

            <Section title={ variants?.title } description={ variants?.description }>
                <div className="flex flex-col gap-4">
                    <Row label="badge">
                        <Delta value={ 0.124 } size="sm" />
                        <Delta value={ 0.124 } />
                        <Delta value={ 0.124 } size="lg" />
                        <Delta value={ -0.083 } style="outline" />
                        <Delta value={ -0.083 } style="ghost" />
                        <Delta value={ 0.124 } showIcon={ false } />
                    </Row>
                    <Row label="text">
                        <Delta value={ 0.124 } variant="text" />
                        <Delta value={ -0.083 } variant="text" />
                        <Delta value={ 0 } variant="text" />
                    </Row>
                </div>
            </Section>

            <Divider />

            <Section title={ formats?.title } description={ formats?.description }>
                <div className="flex flex-col gap-4">
                    <Row label={ formats?.percent }>
                        <Delta value={ 0.124 } />
                        <Delta value={ 1.5 } />
                    </Row>
                    <Row label={ formats?.number }>
                        <Delta value={ 1380 } format="number" />
                        <Delta value={ -225 } format="number" />
                    </Row>
                    <Row label={ formats?.custom }>
                        <Delta
                            value          = { 12 }
                            format         = "number"
                            valueFormatter = { value => t( formats?.points , value > 0 ? `+${ value }` : value ) ?? String( value ) }
                        />
                    </Row>
                </div>
            </Section>

            <Divider />

            <Section title={ neutral?.title } description={ neutral?.description }>
                <div className="flex flex-col gap-4">
                    <Row label={ neutral?.without }>
                        <Delta value={ 0.002 } />
                        <Delta value={ -0.004 } />
                    </Row>
                    <Row label={ neutral?.with }>
                        <Delta value={ 0.002 } neutralThreshold={ 0.05 } />
                        <Delta value={ -0.004 } neutralThreshold={ 0.05 } />
                        <Delta value={ 0.12 } neutralThreshold={ 0.05 } />
                    </Row>
                </div>
            </Section>

            <Divider />

            <Section title={ fromTo?.title } description={ fromTo?.description }>
                <div className="flex flex-col gap-4">
                    <Row label={ fromTo?.growth }>
                        <Delta from={ 11100 } to={ 12480 } />
                        <Delta from={ 11100 } to={ 12480 } format="number" />
                    </Row>
                    <Row label={ fromTo?.drop }>
                        <Delta from={ 840 } to={ 615 } />
                    </Row>
                    <Row label={ fromTo?.negative }>
                        <Delta from={ -200 } to={ -50 } />
                    </Row>
                    <Row label={ fromTo?.zero }>
                        <Delta from={ 0 } to={ 320 } />
                        <Delta from={ 0 } to={ 320 } format="number" />
                    </Row>
                </div>
            </Section>

            <Divider />

            <Section title={ missing?.title } description={ missing?.description }>
                <Row>
                    <Delta />
                    <Delta variant="text" />
                </Row>
            </Section>

            <Divider />

            <Section title={ recipe?.title } description={ recipe?.description }>
                <Stats className="w-full" direction={ { xs : 'vertical' , md : 'horizontal' } }>
                    <Stat
                        title       = { recipe?.visitors }
                        value       = "12 480"
                        description = {
                            <span className="flex items-center gap-2">
                                <Delta from={ 11100 } to={ 12480 } variant="text" />
                                <span className="text-base-content/50">{ recipe?.since }</span>
                            </span>
                        }
                        figure      = { <Sparkline data={ RISING } className="w-24" colorByTrend showLast /> }
                    />
                    <Stat
                        title       = { recipe?.revenue }
                        value       = "48 210 €"
                        description = {
                            <span className="flex items-center gap-2">
                                <Delta value={ 0.042 } variant="text" />
                                <span className="text-base-content/50">{ recipe?.since }</span>
                            </span>
                        }
                        figure      = { <Sparkline data={ STEADY } className="w-24" variant="area" showLast /> }
                    />
                    <Stat
                        title       = { recipe?.errors }
                        value       = "0,8 %"
                        description = {
                            <span className="flex items-center gap-2">
                                <Delta value={ -0.31 } inverted variant="text" />
                                <span className="text-base-content/50">{ recipe?.since }</span>
                            </span>
                        }
                        figure      = { <Sparkline data={ FALLING } className="w-24" color="success" variant="bar" /> }
                    />
                </Stats>
            </Section>

        </Container>
    ) ;
} ;

export default DeltaDemo ;

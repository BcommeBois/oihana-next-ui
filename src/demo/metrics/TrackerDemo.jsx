'use client' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Tracker   from '@/components/metrics/Tracker' ;

import Section from '@/demo/charts/Section' ;

const DAYS = 90 ;

/**
 * Interpolates a locale pattern, and keeps quiet when the locale has not resolved yet.
 *
 * @param {string} [pattern] - The locale pattern, with `{0}` placeholders.
 * @param {...*} args - The values to interpolate.
 * @returns {string | undefined} The formatted string.
 */
const t = ( pattern , ...args ) => pattern ? format( pattern , ...args ) : undefined ;

/**
 * Deterministic history, so the server and the client agree on what happened.
 *
 * @param {number} index - The day index, oldest first.
 * @returns {string} The status key.
 */
const getStatusKey = ( index ) =>
{
    if ( index === 12 || index === 61 ) return 'down' ;
    if ( index === 34 || index === 35 || index === 78 ) return 'slow' ;
    if ( index >= 45 && index <= 48 ) return 'unknown' ;
    return 'up' ;
} ;

const STATUSES =
{
    up      : 'success' ,
    slow    : 'warning' ,
    down    : 'error' ,
    unknown : 'base-300' ,
} ;

const HISTORY = Array.from( { length : DAYS } , ( _ , index ) => ({
    day    : DAYS - index ,
    key    : `day-${ index }` ,
    status : getStatusKey( index ) ,
}) ) ;

const UPTIME = ( ( HISTORY.filter( entry => entry.status === 'up' ).length / DAYS ) * 100 ).toFixed( 1 ) ;

const SHORT =
[
    { key : 's1' , status : 'success'  } ,
    { key : 's2' , status : 'success'  } ,
    { key : 's3' , status : 'warning'  } ,
    { key : 's4' , status : 'error'    } ,
    { key : 's5' , status : 'info'     } ,
    { key : 's6' , status : 'neutral'  } ,
    { key : 's7' , status : 'base-300' } ,
    { key : 's8' , status : 'success'  } ,
] ;

/**
 * Tracker demo.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.metrics.tracker'] - Dot notation path to the demo locale.
 */
const TrackerDemo = ( { path = 'demo.metrics.tracker' } ) =>
{
    const { bounds , colors , day , description , legend , limit , responsive , simple , sizes , statuses , title } = useI18n( path ) ;

    const data = HISTORY.map( entry => ({
        key     : entry.key ,
        status  : STATUSES[ entry.status ] ,
        tooltip : t( day?.[ entry.status ] , `J-${ entry.day }` ) ,
    }) ) ;

    // Counted here rather than by the component : the strip drops the blocks that do not
    // fit, so a count it derived would describe either the period or the screen — and
    // never obviously which of the two.
    const legendItems = [ 'up' , 'slow' , 'down' , 'unknown' ].map( key => ({
        key ,
        name   : legend?.[ key ] ,
        status : STATUSES[ key ] ,
        value  : HISTORY.filter( entry => entry.status === key ).length ,
    }) ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-8" maxWidth="max-w-4xl">

            <header className="flex flex-col gap-1" id="tracker">
                <h2 className="text-2xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <Divider />

            <Section title={ simple?.title } description={ simple?.description }>
                <Tracker data={ data } hoverEffect />
            </Section>

            <Divider />

            <Section title={ statuses?.title } description={ statuses?.description }>
                <Tracker data={ SHORT } size="lg" />
            </Section>

            <Divider />

            <Section title={ sizes?.title } description={ sizes?.description }>
                <div className="flex flex-col gap-4">
                    <Tracker data={ data } size="xs" />
                    <Tracker data={ data } size="sm" />
                    <Tracker data={ data } size="md" />
                    <Tracker data={ data } size="lg" />
                    <Tracker data={ data } size={ { xs : 'lg' , lg : 'sm' } } />
                </div>
            </Section>

            <Divider />

            <Section title={ bounds?.title } description={ bounds?.description }>
                <Tracker
                    data       = { data }
                    endLabel   = { bounds?.end }
                    hoverEffect
                    startLabel = { visible => t( bounds?.start , visible ) }
                    summary    = { t( bounds?.summary , UPTIME ) }
                />
            </Section>

            <Divider />

            <Section title={ legend?.title } description={ legend?.description }>
                <Tracker
                    data       = { data }
                    endLabel   = { bounds?.end }
                    hoverEffect
                    legend     = { legendItems }
                    startLabel = { visible => t( bounds?.start , visible ) }
                    summary    = { t( bounds?.summary , UPTIME ) }
                />
            </Section>

            <Divider />

            <Section title={ responsive?.title } description={ responsive?.description }>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ responsive?.narrow }</p>
                        <div className="max-w-[200px]">
                            <Tracker data={ data } endLabel={ bounds?.end } startLabel={ visible => t( bounds?.start , visible ) } />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ responsive?.medium }</p>
                        <div className="max-w-[420px]">
                            <Tracker data={ data } endLabel={ bounds?.end } startLabel={ visible => t( bounds?.start , visible ) } />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ responsive?.wide }</p>
                        <Tracker data={ data } endLabel={ bounds?.end } startLabel={ visible => t( bounds?.start , visible ) } />
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ limit?.title } description={ limit?.description }>
                <Tracker data={ data } hoverEffect maxBlocks={ 30 } size="lg" />
            </Section>

            <Divider />

            <Section title={ colors?.title } description={ colors?.description }>
                <Tracker
                    data = { data.map( ( entry , index ) => ({
                        ...entry ,
                        status : index % 7 === 0 ? '#F28E2C' : '#4E79A7' ,
                    }) ) }
                />
            </Section>

        </Container>
    ) ;
} ;

export default TrackerDemo ;

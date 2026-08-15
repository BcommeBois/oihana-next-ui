'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n.js' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import SchedulerWeekDemo   from '@/demo/scheduler/SchedulerWeekDemo' ;

/**
 * Scheduler — the time grid.
 *
 * Days across, hours down, events as placed rectangles — the view that finally
 * exercises the overlap calculation and the time-to-pixel scale. It serves Day
 * and Week alike : the window says which.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.schedulerWeek'] - Dot notation path to the page locale.
 */
const SchedulerWeekShowcase = ( { path = 'app.lab.schedulerWeek' } ) =>
{
    const { description , title } = useI18n( path ) ;

    return (
        <Page full className="gap-8 p-2 sm:p-8">

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="inline-block bg-linear-to-r from-secondary to-primary bg-clip-text text-4xl font-bold text-transparent">
                    { title }
                </h1>
                <p className="mt-2 italic text-base-content/60">
                    { description }
                </p>
            </Container>

            <SchedulerWeekDemo />


        </Page>
    ) ;
} ;

export default SchedulerWeekShowcase ;

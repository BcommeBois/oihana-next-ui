'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n.js' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import SchedulerTimelineDemo from '@/demo/scheduler/SchedulerTimelineDemo' ;

/**
 * Scheduler — the resource timeline.
 *
 * The week grid with its axis pivoted : time across, resources down. The rows
 * come from a declared list rather than from the events, which is what lets a
 * room free all day still say so.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.schedulerTimeline'] - Dot notation path to the page locale.
 */
const SchedulerTimelineShowcase = ( { path = 'app.lab.schedulerTimeline' } ) =>
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

            <SchedulerTimelineDemo />

        </Page>
    ) ;
} ;

export default SchedulerTimelineShowcase ;

'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n.js' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import SchedulerMonthDemo from '@/demo/scheduler/SchedulerMonthDemo' ;

/**
 * Scheduler — the month view.
 *
 * Six weeks with events laid on rails, and what a cell does when they do not all
 * fit. The calculation everything is drawn from lives on its own page,
 * `lab/schedulerModel`, since it is a reference rather than a component.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.schedulerMonth'] - Dot notation path to the page locale.
 */
const SchedulerMonthShowcase = ( { path = 'app.lab.schedulerMonth' } ) =>
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

            <SchedulerMonthDemo />

        </Page>
    ) ;
} ;

export default SchedulerMonthShowcase ;

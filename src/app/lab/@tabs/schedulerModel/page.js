'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n.js' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import ScheduleModelDemo from '@/demo/scheduler/ScheduleModelDemo' ;

/**
 * Scheduler — the model and its adapter.
 *
 * A reference page rather than a component showcase : it shows what comes out of
 * `helpers/schedule`, so the numbers can be checked before anything is drawn from
 * them. The views live on their own pages.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.schedulerModel'] - Dot notation path to the page locale.
 */
const SchedulerModelShowcase = ( { path = 'app.lab.schedulerModel' } ) =>
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

            <ScheduleModelDemo />

        </Page>
    ) ;
} ;

export default SchedulerModelShowcase ;

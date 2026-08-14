'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n.js' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import ScheduleModelDemo from '@/demo/scheduler/ScheduleModelDemo' ;

/**
 * Scheduler showcase page.
 *
 * The event calendar family, built on a headless core. The page grows one lot at
 * a time and opens on the calculation rather than on a view, because everything
 * drawn later is read off it.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.scheduler'] - Dot notation path to the page locale.
 */
const SchedulerShowcase = ( { path = 'app.lab.scheduler' } ) =>
{
    const { description , title } = useI18n( path ) ;

    return (
        <Page full className="gap-8">

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

export default SchedulerShowcase ;

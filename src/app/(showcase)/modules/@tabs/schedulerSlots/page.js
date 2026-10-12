'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n.js' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import SlotPickerDemo from '@/demo/scheduler/SlotPickerDemo' ;

/**
 * Scheduler — free slots.
 *
 * The other views show what is taken and move it ; this one works out what is
 * left. Booking is not editing : there is nothing to edit yet, and the whole
 * question is finding where a new thing may go.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.schedulerSlots'] - Dot notation path to the page locale.
 */
const SchedulerSlotsShowcase = ( { path = 'app.lab.schedulerSlots' } ) =>
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

            <SlotPickerDemo />

        </Page>
    ) ;
} ;

export default SchedulerSlotsShowcase ;

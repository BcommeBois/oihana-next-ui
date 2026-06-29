'use client' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Page      from '@/display/Page' ;

import TimeDemo from '@/demo/times/TimeDemo' ;

/**
 * Time components showcase page (lab/times).
 */
const Times = () =>
(
    <Page className="gap-8" maxWidth="max-w-7xl">

        <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Time Components
            </h1>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                Our own column time picker on the Time class — the standalone TimeColumns and the
                InputTimePicker (masked field + popover). No analog clock.
            </p>
        </Container>

        <Divider />

        <TimeDemo />

    </Page>
) ;

export default Times ;

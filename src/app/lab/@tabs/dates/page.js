'use client' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Page      from '@/display/Page' ;

import DateDemo           from '@/demo/dates/DateDemo' ;
import MonthYearDemo      from '@/demo/dates/MonthYearDemo' ;
import PickersInModalDemo from '@/demo/dates/PickersInModalDemo' ;

/**
 * Date components showcase page (lab/dates).
 */
const Dates = () =>
(
    <Page className="gap-8" maxWidth="max-w-7xl">

        <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                Date Components
            </h1>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                Our own dayjs-based calendar — single date and range, one or two months, with
                shortcuts — the three grid pickers that select a period without ever showing a
                day, and the field pickers built on both.
            </p>
        </Container>

        <Divider />

        <DateDemo />

        <Divider />

        {/* Beside the three field pickers it guards — inert/top-layer regression */}
        <PickersInModalDemo />

        <Divider />

        <MonthYearDemo />

    </Page>
) ;

export default Dates ;

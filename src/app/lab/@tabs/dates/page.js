'use client' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Page      from '@/display/Page' ;

import DateDemo           from '@/demo/dates/DateDemo' ;
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
                shortcuts — and the two field pickers built on it, InputDatePicker and
                InputDateRangePicker.
            </p>
        </Container>

        <Divider />

        <DateDemo />

        <Divider />

        {/* Popover-based pickers nested inside a Modal — inert/top-layer regression */}
        <Container className="flex flex-col gap-8 bg-base-200/60 p-4 sm:p-8 rounded-box" maxWidth="max-w-5xl">
            <PickersInModalDemo />
        </Container>

    </Page>
) ;

export default Dates ;

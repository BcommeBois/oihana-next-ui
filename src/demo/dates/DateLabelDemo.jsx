'use client' ;

/**
 * A date written for a reader : in full, in a sentence the screen owns, or
 * against the clock.
 *
 * 🚨 **The demo reads no clock during a render.** Its records carry fixed
 * instants, because a `Date.now()` called while rendering is called twice —
 * once on the server, once again at hydration — and the two differ by the
 * time between them. That is the very mismatch `DateLabel` exists to close,
 * and a demo that fell into it would report the component as broken.
 *
 * The one example that must move takes its instant AFTER mount, from an
 * effect : it renders nothing on the server, so there is nothing to disagree
 * with.
 *
 * @module demo/dates/DateLabelDemo
 */

import { useEffect , useState } from 'react' ;

import { MdOutlineFlag , MdOutlineInventory2 } from 'react-icons/md' ;

import Divider   from '@/components/Divider' ;
import DateLabel from '@/components/labels/DateLabel' ;
import MetaDates from '@/components/labels/MetaDates' ;

import Container from '@/display/Container' ;

/** The demo ticks faster than a real screen would, so the move can be watched. */
const DEMO_TICK = 5000 ;

/**
 * Fixed instants — the same on the server and in the browser, whatever the
 * second the page is rendered on.
 */
const RECORD =
{
    created  : '2026-09-16T10:32:05.000Z' ,
    modified : '2026-09-22T08:15:00.000Z' ,
    openedAt : '2026-09-23T17:45:00.000Z' ,
} ;

/**
 * A day served alone — no hour, no zone — as some APIs send a date that only
 * ever was a day.
 * @type {string}
 */
const DAY_ALONE = '2017-05-31' ;

/**
 * A date taken after mount, so it starts at « a few seconds ago » and moves
 * while it is watched.
 *
 * `now` is `null` on the server AND through the hydration pass — the two
 * renders that must agree — so the label writes nothing but its icon until
 * the effect has run.
 */
const LiveExample = () =>
{
    const [ since , setSince ] = useState( null ) ;

    useEffect( () => { setSince( Date.now() ) ; } , [] ) ;

    return <DateLabel label="Opened : {0}" relative tick={ DEMO_TICK } value={ since } /> ;
} ;

const DateLabelDemo = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Date label</h2>

        <Divider>Written in full</Divider>

        <div className="flex flex-col gap-2">
            <DateLabel value={ RECORD.created } />
            <DateLabel pattern="L" value={ RECORD.created } />
            <DateLabel pattern="LLL" value={ RECORD.created } />
            <DateLabel pattern="L" showIcon={ false } value={ RECORD.created } />
        </div>

        <Divider>In a sentence the screen owns</Divider>

        <div className="flex flex-col gap-2">
            <DateLabel Icon={ MdOutlineFlag } label="Opened : {0}" value={ RECORD.openedAt } />
            <DateLabel Icon={ MdOutlineInventory2 } label="Last counted : {0}" pattern="L" value={ RECORD.modified } />
        </div>

        <Divider>A day served alone</Divider>

        <p className="text-sm text-base-content/70 max-w-2xl">
            « { DAY_ALONE } » names a day, with no hour and no zone. It is read in the application&apos;s
            time zone, so a server running UTC and a browser elsewhere write the same text. With a
            pattern carrying the hour it still reads midnight — an hour nobody stated ; <code>datePattern</code> writes
            such a value without it.
        </p>

        <div className="flex flex-col gap-2">
            <DateLabel label="Created : {0}" pattern="L LTS" value={ DAY_ALONE } />
            <DateLabel datePattern="L" label="Created : {0}" pattern="L LTS" value={ DAY_ALONE } />
            <MetaDates datePattern="L" value={ { created : DAY_ALONE , modified : RECORD.modified } } />
        </div>

        <Divider>Against the clock</Divider>

        <p className="text-sm text-base-content/70 max-w-2xl">
            Reload and watch these two : they are written in full for an instant — what the server
            sent — then turn relative, once the page is past hydration.
        </p>

        <div className="flex flex-col gap-2">
            <DateLabel relative value={ RECORD.modified } />
            <DateLabel relative value={ RECORD.created } />
        </div>

        <Divider>And it moves</Divider>

        <p className="text-sm text-base-content/70 max-w-2xl">
            This one takes its instant after mount, so it starts at « a few seconds ago » and moves
            on its own — every { DEMO_TICK / 1000 } seconds here, once a minute by default. It
            carries nothing but its icon until the effect has run.
        </p>

        <LiveExample />

        <Divider>Nothing to write</Divider>

        <div className="flex flex-col gap-2">
            <span className="text-sm text-base-content/70">No date, no stand-in : a lone icon.</span>
            <DateLabel value={ null } />
            <span className="text-sm text-base-content/70">No date, with a stand-in :</span>
            <DateLabel empty="Never" value={ null } />
            <span className="text-sm text-base-content/70">An unreadable date, with a stand-in :</span>
            <DateLabel empty="Unknown" value="not-a-date" />
        </div>

        <h2 className="text-3xl font-bold mt-4">Meta dates</h2>

        <Divider>The pair</Divider>

        <div className="flex flex-col gap-3">
            <MetaDates value={ RECORD } />
            <MetaDates relative value={ RECORD } />
        </div>

        <Divider>One of the two, under another name</Divider>

        <div className="flex flex-col gap-3">
            <MetaDates showModified={ false } value={ RECORD } />
            <MetaDates createdMember="openedAt" showModified={ false } value={ RECORD } />
            <MetaDates showCreated={ false } showIcon={ false } value={ RECORD } />
        </div>

        <Divider>Narrow</Divider>

        <p className="text-sm text-base-content/70 max-w-2xl">
            The pair wraps rather than overflowing — the box below is 260 px wide.
        </p>

        <div className="w-[260px] rounded-box border border-base-300 p-3">
            <MetaDates value={ RECORD } />
        </div>

        <Divider>Nothing at all</Divider>

        <p className="text-sm text-base-content/70">
            A record carrying neither date renders nothing — there is no row below this line.
        </p>
        <MetaDates value={ {} } />

    </Container>
) ;

DateLabelDemo.displayName = 'DateLabelDemo' ;

export default DateLabelDemo ;

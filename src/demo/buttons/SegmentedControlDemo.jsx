'use client' ;

/**
 * Two or three joined buttons choosing how the same content is read.
 *
 * @module demo/buttons/SegmentedControlDemo
 */

import { useState } from 'react' ;

import { MdCalendarViewDay , MdCalendarViewMonth , MdCalendarViewWeek } from 'react-icons/md' ;

import Divider          from '@/components/Divider' ;
import SegmentedControl from '@/components/SegmentedControl' ;

import Container from '@/display/Container' ;

const READINGS =
[
    { key : 'cumulative' , label : 'Running total' } ,
    { key : 'monthly'    , label : 'By month' } ,
] ;

const SCALES =
[
    { key : 'day'   , label : 'Day' } ,
    { key : 'week'  , label : 'Week' } ,
    { key : 'month' , label : 'Month' } ,
] ;

const ICON_SCALES =
[
    { key : 'day'   , label : <MdCalendarViewDay className="size-4" />   , title : 'Day' } ,
    { key : 'week'  , label : <MdCalendarViewWeek className="size-4" />  , title : 'Week' } ,
    { key : 'month' , label : <MdCalendarViewMonth className="size-4" /> , title : 'Month' } ,
] ;

const WITH_DISABLED =
[
    { key : 'all'      , label : 'All' } ,
    { key : 'mine'     , label : 'Mine' } ,
    { key : 'archived' , disabled : true , label : 'Archived' } ,
] ;

const SegmentedControlDemo = () =>
{
    const [ reading , setReading ] = useState( 'cumulative' ) ;
    const [ scale   , setScale   ] = useState( 'week' ) ;
    const [ icon    , setIcon    ] = useState( 'week' ) ;
    const [ scope   , setScope   ] = useState( 'all' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Segmented control</h2>

            <p className="text-sm text-base-content/70 max-w-2xl">
                A group of toggles, not a tab bar : there is no panel, only a reading that changes in
                place. Each button carries <code>aria-pressed</code>, so the chosen one announces
                itself to a reader who cannot see the highlight.
            </p>

            <Divider>Two choices</Divider>

            <div className="flex flex-wrap items-center gap-4">
                <SegmentedControl
                    ariaLabel = "How the comparison is read"
                    items     = { READINGS }
                    onChange  = { setReading }
                    value     = { reading }
                />
                <span className="text-sm text-base-content/60">chosen : { reading }</span>
            </div>

            <Divider>Three, and the sizes</Divider>

            <div className="flex flex-col gap-3">
                <SegmentedControl items={ SCALES } onChange={ setScale } size="xs" value={ scale } />
                <SegmentedControl items={ SCALES } onChange={ setScale } size="sm" value={ scale } />
                <SegmentedControl items={ SCALES } onChange={ setScale } size="md" value={ scale } />
                <SegmentedControl items={ SCALES } onChange={ setScale } size="lg" value={ scale } />
            </div>

            <Divider>Another colour, and daisyUI's plain active look</Divider>

            <div className="flex flex-wrap items-center gap-4">
                <SegmentedControl activeColor="secondary" items={ SCALES } onChange={ setScale } value={ scale } />
                <SegmentedControl activeColor="accent"    items={ SCALES } onChange={ setScale } value={ scale } />
                <SegmentedControl activeColor={ null }    items={ SCALES } onChange={ setScale } value={ scale } />
            </div>

            <Divider>Icons alone</Divider>

            <p className="text-sm text-base-content/70 max-w-2xl">
                A segment whose label is an icon names itself through <code>title</code> — hover one,
                and check with a screen reader that it is announced.
            </p>

            <SegmentedControl items={ ICON_SCALES } onChange={ setIcon } value={ icon } />

            <Divider>A choice shown but not offered</Divider>

            <div className="flex flex-wrap items-center gap-4">
                <SegmentedControl items={ WITH_DISABLED } onChange={ setScope } value={ scope } />
                <span className="text-sm text-base-content/60">chosen : { scope }</span>
            </div>

            <Divider>Nothing to choose from</Divider>

            <p className="text-sm text-base-content/70">
                An empty list renders nothing — there is no group below this line.
            </p>
            <SegmentedControl items={ [] } />

        </Container>
    ) ;
} ;

SegmentedControlDemo.displayName = 'SegmentedControlDemo' ;

export default SegmentedControlDemo ;

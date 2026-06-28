import dayjs from './configureDayjs' ;

/**
 * Default range shortcuts. Each `value()` is computed fresh on click so "today"
 * is always current. Values are native `Date` pairs `{ from, to }`.
 *
 * @returns {{ id: string, label: string, value: () => { from: Date, to: Date } }[]}
 */
export const getRangeShortcuts = () =>
[
    {
        id    : 'today' ,
        label : 'Today' ,
        value : () => { const d = dayjs().startOf( 'day' ) ; return { from : d.toDate() , to : d.toDate() } ; } ,
    } ,
    {
        id    : 'yesterday' ,
        label : 'Yesterday' ,
        value : () => { const d = dayjs().startOf( 'day' ).subtract( 1 , 'day' ) ; return { from : d.toDate() , to : d.toDate() } ; } ,
    } ,
    {
        id    : 'last7' ,
        label : 'Last 7 days' ,
        value : () => ({ from : dayjs().startOf( 'day' ).subtract( 6 , 'day' ).toDate() , to : dayjs().startOf( 'day' ).toDate() }) ,
    } ,
    {
        id    : 'last30' ,
        label : 'Last 30 days' ,
        value : () => ({ from : dayjs().startOf( 'day' ).subtract( 29 , 'day' ).toDate() , to : dayjs().startOf( 'day' ).toDate() }) ,
    } ,
    {
        id    : 'thisMonth' ,
        label : 'This month' ,
        value : () => ({ from : dayjs().startOf( 'month' ).toDate() , to : dayjs().endOf( 'month' ).startOf( 'day' ).toDate() }) ,
    } ,
    {
        id    : 'lastMonth' ,
        label : 'Last month' ,
        value : () => { const m = dayjs().subtract( 1 , 'month' ) ; return { from : m.startOf( 'month' ).toDate() , to : m.endOf( 'month' ).startOf( 'day' ).toDate() } ; } ,
    } ,
] ;

/**
 * Default single-date shortcuts. Each `value()` returns a native `Date`.
 *
 * @returns {{ id: string, label: string, value: () => Date }[]}
 */
export const getSingleShortcuts = () =>
[
    { id : 'today'     , label : 'Today'     , value : () => dayjs().startOf( 'day' ).toDate() } ,
    { id : 'yesterday' , label : 'Yesterday' , value : () => dayjs().startOf( 'day' ).subtract( 1 , 'day' ).toDate() } ,
    { id : 'tomorrow'  , label : 'Tomorrow'  , value : () => dayjs().startOf( 'day' ).add( 1 , 'day' ).toDate() } ,
] ;

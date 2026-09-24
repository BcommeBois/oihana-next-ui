'use client' ;

/**
 * A sortable table whose headers say what they sort on, and cells whose
 * missing measures say why.
 *
 * The two are shown together because that is where they meet : a table of
 * figures is exactly the place where a column is sorted and where a measure
 * may be absent.
 *
 * @module demo/layouts/TableSortHeaderDemo
 */

import { useMemo , useState } from 'react' ;

import Divider         from '@/components/Divider' ;
import Measure         from '@/components/labels/Measure' ;
import TableSortHeader from '@/components/layouts/TableSortHeader' ;

import Container from '@/display/Container' ;

/** A finite number reads as a figure ; everything else is a missing measure. */
const ROWS =
[
    { key : 'a' , name : 'Northern branch' , orders : 128 , rate : 0.184 , total : 42_500 } ,
    { key : 'b' , name : 'Eastern branch'  , orders : 96  , rate : null  , total : 31_200 , why : 'No cost price was published for this branch.' } ,
    { key : 'c' , name : 'Southern branch' , orders : 204 , rate : 0.231 , total : 58_940 } ,
    { key : 'd' , name : 'Western branch'  , orders : 0   , rate : NaN   , total : null   , why : 'This branch opened after the period ended.' } ,
] ;

const COLUMNS =
[
    { align : 'text-left'  , column : 'name'   , label : 'Branch' } ,
    { align : 'text-right' , column : 'orders' , label : 'Orders' } ,
    { align : 'text-right' , column : 'total'  , label : 'Total' } ,
    { align : 'text-right' , column : 'rate'   , label : 'Margin rate' } ,
] ;

const asNumber = value => Number.isFinite( value ) ? value : Number.NEGATIVE_INFINITY ;

const formatTotal = value => `${ value.toLocaleString( 'en-GB' ) } €` ;
const formatRate  = value => `${ ( value * 100 ).toFixed( 1 ) } %` ;

const TableSortHeaderDemo = () =>
{
    const [ sort , setSort ] = useState( { ascending : false , column : 'total' } ) ;

    const toggle = column => setSort( current => (
        { ascending : current.column === column ? !current.ascending : true , column }
    ) ) ;

    const rows = useMemo( () =>
    {
        const sorted = [ ...ROWS ].sort( ( a , b ) =>
            sort.column === 'name'
                ? String( a.name ).localeCompare( String( b.name ) )
                : asNumber( a[ sort.column ] ) - asNumber( b[ sort.column ] )
        ) ;

        return sort.ascending ? sorted : sorted.reverse() ;
    }
    , [ sort ] ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Table sort header</h2>

            <p className="text-sm text-base-content/70 max-w-2xl">
                Click a header to sort on it, click it again to turn it over. The state lives on the
                <code> &lt;th&gt; </code>, where <code>aria-sort</code> is actually defined — inspect
                the header row and read the attribute on the cell, not on the button inside it.
            </p>

            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            { COLUMNS.map( ( { align , column , label } ) => (
                                <TableSortHeader
                                    ascending = { sort.ascending }
                                    className = { align }
                                    column    = { column }
                                    key       = { column }
                                    label     = { label }
                                    onSort    = { toggle }
                                    sort      = { sort.column }
                                />
                            ) ) }
                        </tr>
                    </thead>
                    <tbody>
                        { rows.map( row => (
                            <tr key={ row.key }>
                                <td>{ row.name }</td>
                                <td className="text-right">{ row.orders }</td>
                                <td className="text-right">
                                    <Measure format={ formatTotal } hint={ row.why } value={ row.total } />
                                </td>
                                <td className="text-right">
                                    <Measure format={ formatRate } hint={ row.why } value={ row.rate } />
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            </div>

            <Divider>Measure, on its own</Divider>

            <p className="text-sm text-base-content/70 max-w-2xl">
                Only a finite number is written. A missing measure is a dash — never a zero, which
                would claim the measure was taken and came out empty.
            </p>

            <ul className="flex flex-col gap-1 text-sm">
                <li>a figure : <Measure format={ formatTotal } value={ 42_500 } /></li>
                <li>zero, which IS a figure : <Measure format={ formatTotal } value={ 0 } /></li>
                <li>null : <Measure value={ null } /></li>
                <li>undefined : <Measure value={ undefined } /></li>
                <li>NaN : <Measure value={ NaN } /></li>
                <li>Infinity : <Measure value={ Number.POSITIVE_INFINITY } /></li>
                <li>with a reason (hover the dash) : <Measure hint="Nothing was published for this period." value={ null } /></li>
                <li>another stand-in : <Measure placeholder="n/a" value={ null } /></li>
            </ul>

        </Container>
    ) ;
} ;

TableSortHeaderDemo.displayName = 'TableSortHeaderDemo' ;

export default TableSortHeaderDemo ;

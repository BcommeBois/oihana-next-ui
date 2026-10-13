'use client' ;

import { useRef , useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdPersonAdd , MdSearch } from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Alert              from '@/components/Alert' ;
import Badge              from '@/components/Badge' ;
import Button             from '@/components/Button' ;
import ClearFiltersChip   from '@/components/filters/ClearFiltersChip' ;
import EmptyState         from '@/components/EmptyState' ;
import FilterChip         from '@/components/filters/FilterChip' ;
import InitialsAvatar     from '@/components/avatars/InitialsAvatar' ;
import Input              from '@/components/inputs/Input' ;
import OptionFilterPicker from '@/components/filters/OptionFilterPicker' ;
import Pagination         from '@/components/paginations/Pagination' ;
import SegmentedControl   from '@/components/SegmentedControl' ;
import SidePanel          from '@/components/panels/SidePanel' ;
import useModal           from '@/components/modals/hooks/useModal' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import foldText from '@/helpers/strings/foldText' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { DAY , UsedComponents } from '@/demo/scenarios/shared' ;

import CustomerSheet , { STATUS_COLORS } from './CustomerSheet' ;
import NewCustomerModal from './NewCustomerModal' ;
import { useCrm } from './CrmProvider' ;
import { SECTORS , STATUSES } from './data' ;

const LIMIT = 10 ;

const SORTS = [ 'name' , 'revenue' , 'recent' ] ;

/**
 * The components the screen is built of, and the page that shows each one.
 */
const USED =
[
    { href : '/components/filters'   , name : 'OptionFilterPicker' } ,
    { href : '/components/filters'   , name : 'FilterChip' } ,
    { href : '/components/pagination' , name : 'Pagination' } ,
    { href : '/components/panels'    , name : 'SidePanel' } ,
    { href : '/components/tabs'      , name : 'Tabs' } ,
    { href : '/components/badges'    , name : 'CopyBadge' } ,
    { href : '/modules/maps'         , name : 'Map' } ,
    { href : '/components/dropzone'  , name : 'FileDropzone' } ,
    { href : '/components/textareas' , name : 'TextAreaMarkdown' } ,
    { href : '/components/modals'    , name : 'FormModal' } ,
    { href : '/modules/mapsPicker'   , name : 'InputAddressSearch' } ,
    { href : '/components/inputs?filter=tags' , name : 'InputTags' } ,
    { href : '/components/avatars'   , name : 'InitialsAvatar' } ,
] ;

/**
 * The CRM's customers : a list to search, filter and sort, a sheet per
 * customer in a side panel, and the form of a new one.
 *
 * Reads and writes the CRM's shared base : a document dropped or a note
 * written in a sheet, a customer created, are there on the other pages.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.scenarios.crm'] - Dot notation path to the CRM's demo locale.
 */
const CustomersDemo = ( { path = 'demo.scenarios.crm' } = {} ) =>
{
    const { common = {} , customers : t = {} } = useI18n( path ) ?? {} ;

    const crm = useCrm() ;

    const { formatNumber , locale } = useNumberFormat() ;

    const [ query    , setQuery    ] = useState( '' ) ;
    const [ status   , setStatus   ] = useState( '' ) ;
    const [ repId    , setRepId    ] = useState( '' ) ;
    const [ sectors  , setSectors  ] = useState( [] ) ;
    const [ sort     , setSort     ] = useState( 'name' ) ;
    const [ offset   , setOffset   ] = useState( 0 ) ;
    const [ open     , setOpen     ] = useState( null ) ;
    const [ selected , setSelected ] = useState( null ) ;
    const [ creating , setCreating ] = useState( false ) ;
    const [ created  , setCreated  ] = useState( null ) ;

    const statusRef = useRef( null ) ;
    const repRef    = useRef( null ) ;
    const sectorRef = useRef( null ) ;

    const { modalRef , open : openSheet } = useModal() ;

    if ( !crm?.ready )
    {
        return (
            <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">
                <p className="text-sm text-base-content/70">{ t.intro }</p>
            </Container>
        ) ;
    }

    const { customers , interactions , reps } = crm ;

    const lastContact = new Map() ;
    for ( const item of interactions )
    {
        lastContact.set( item.customerId , Math.max( lastContact.get( item.customerId ) ?? -Infinity , item.day ) ) ;
    }

    const repName = id => reps.find( rep => rep.id === id )?.name ;
    const date    = day => ( Number.isFinite( day ) ? new Date( day * DAY ).toLocaleDateString( locale , { day : 'numeric' , month : 'short' , timeZone : 'UTC' } ) : '—' ) ;
    const euros   = value => formatNumber( value , { currency : 'EUR' , maximumFractionDigits : 0 , style : 'currency' } ) ;

    const words = foldText( query ).split( /\s+/ ).filter( Boolean ) ;

    const matches = customers.filter( customer =>
    {
        if ( status && customer.status !== status ) { return false ; }
        if ( repId && customer.repId !== repId ) { return false ; }
        if ( sectors.length && !sectors.includes( customer.sector ) ) { return false ; }
        const text = foldText( [ customer.name , customer.contact.name , customer.address.locality , ...customer.tags ].join( ' ' ) ) ;
        return words.every( word => text.includes( word ) ) ;
    } ) ;

    const sorted = [ ...matches ].sort( ( a , b ) =>
    {
        if ( sort === 'revenue' ) { return b.revenue - a.revenue ; }
        if ( sort === 'recent' ) { return ( lastContact.get( b.id ) ?? 0 ) - ( lastContact.get( a.id ) ?? 0 ) ; }
        return a.name.localeCompare( b.name , locale ) ;
    } ) ;

    const page = sorted.slice( offset , offset + LIMIT ) ;

    const count = ( key , value ) => customers.filter( customer => customer[ key ] === value ).length ;

    // Every change to the filters brings the list back to its first page.
    const refilter = setter => value =>
    {
        setter( value ?? '' ) ;
        setOffset( 0 ) ;
        setOpen( null ) ;
    } ;

    const trigger = ( id , ref , label , active ) => (
        <Button
            active      = { active }
            activeColor = "primary"
            onClick     = { () => setOpen( current => ( current === id ? null : id ) ) }
            ref         = { ref }
            size        = "sm"
            style       = { active ? undefined : 'outline' }
        >
            { label }
        </Button>
    ) ;

    const chips =
    [
        status && { key : 'status' , label : common.statuses?.[ status ] , onClear : () => refilter( setStatus )( '' ) , onOpen : () => setOpen( 'status' ) } ,
        repId && { key : 'rep' , label : repName( repId ) , onClear : () => refilter( setRepId )( '' ) , onOpen : () => setOpen( 'rep' ) } ,
        ...sectors.map( key => ( { key : `sector-${ key }` , label : common.sectors?.[ key ] , onClear : () => refilter( setSectors )( sectors.filter( one => one !== key ) ) , onOpen : () => setOpen( 'sector' ) } ) ) ,
    ].filter( Boolean ) ;

    const customer = customers.find( one => one.id === selected ) ;

    const show = id =>
    {
        setSelected( id ) ;
        openSheet() ;
    } ;

    return (
        <Container className="flex flex-col gap-5 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <p className="text-sm text-base-content/70">{ t.intro }</p>

            { created && <Alert level="success" onClose={ () => setCreated( null ) }>{ format( t.create?.created ?? '{0}' , created ) }</Alert> }

            <div className="flex flex-wrap items-end gap-3">
                <Input
                    className   = "min-w-64 flex-1"
                    icon        = { <MdSearch /> }
                    onChange    = { refilter( setQuery ) }
                    placeholder = { t.search }
                    value       = { query }
                />
                <Button color="primary" icon={ MdPersonAdd } onClick={ () => setCreating( true ) }>{ t.add }</Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                { trigger( 'status' , statusRef , t.filters?.status?.title , !!status ) }
                { trigger( 'rep' , repRef , t.filters?.rep?.title , !!repId ) }
                { trigger( 'sector' , sectorRef , sectors.length ? `${ t.filters?.sector?.title } · ${ sectors.length }` : t.filters?.sector?.title , sectors.length > 0 ) }
                <span className="ml-auto flex items-center gap-2">
                    <span className="text-sm">{ t.sort }</span>
                    <SegmentedControl
                        ariaLabel = { t.sort }
                        items     = { SORTS.map( key => ( { key , label : t.sorts?.[ key ] } ) ) }
                        onChange  = { value => { setSort( value ) ; setOffset( 0 ) ; } }
                        value     = { sort }
                    />
                </span>
            </div>

            { chips.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                    { chips.map( chip => (
                        <FilterChip key={ chip.key } onClear={ chip.onClear } onOpen={ chip.onOpen }>{ chip.label }</FilterChip>
                    ) ) }
                    <ClearFiltersChip
                        count   = { chips.length }
                        onClick = { () =>
                        {
                            setStatus( '' ) ;
                            setRepId( '' ) ;
                            setSectors( [] ) ;
                            setOffset( 0 ) ;
                        } }
                    />
                </div>
            ) }

            <span className="text-sm text-base-content/70">{ format( t.count ?? '{0}' , matches.length ) }</span>

            { page.length === 0 ? (
                <EmptyState title={ t.empty } />
            ) : (
                <div className="overflow-x-auto rounded-box bg-base-100 shadow-sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>{ t.columns?.customer }</th>
                                <th>{ t.columns?.status }</th>
                                <th>{ t.columns?.rep }</th>
                                <th>{ t.columns?.sector }</th>
                                <th className="text-right">{ t.columns?.revenue }</th>
                                <th className="text-right">{ t.columns?.last }</th>
                            </tr>
                        </thead>
                        <tbody>
                            { page.map( row => (
                                <tr className="hover:bg-base-200/60" key={ row.id }>
                                    <td>
                                        <button className="flex items-center gap-3 text-left" onClick={ () => show( row.id ) } type="button">
                                            <InitialsAvatar name={ row.name } size="sm" />
                                            <span className="flex flex-col">
                                                <span className="font-medium link-hover">{ row.name }</span>
                                                <span className="text-xs text-base-content/60">{ row.contact.name } · { row.address.locality }</span>
                                                { row.tags.length > 0 && (
                                                    <span className="mt-1 flex flex-wrap gap-1">
                                                        { row.tags.map( tag => <Badge key={ tag } size="xs" style="ghost">{ tag }</Badge> ) }
                                                    </span>
                                                ) }
                                            </span>
                                        </button>
                                    </td>
                                    <td><Badge color={ STATUS_COLORS[ row.status ] } size="sm" style="soft">{ common.statuses?.[ row.status ] }</Badge></td>
                                    <td className="whitespace-nowrap">{ repName( row.repId ) }</td>
                                    <td>{ common.sectors?.[ row.sector ] }</td>
                                    <td className="text-right tabular-nums">{ euros( row.revenue ) }</td>
                                    <td className="text-right tabular-nums">{ date( lastContact.get( row.id ) ) }</td>
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                </div>
            ) }

            { matches.length > LIMIT && (
                <Pagination limit={ LIMIT } offset={ offset } onChange={ setOffset } total={ matches.length } />
            ) }

            <UsedComponents items={ USED } note={ common.used?.note } title={ common.used?.title } />

            <OptionFilterPicker
                anchorRef  = { statusRef }
                isOpen     = { open === 'status' }
                onClose    = { () => setOpen( null ) }
                onSelect   = { refilter( setStatus ) }
                options    = { STATUSES.map( id => ( { count : count( 'status' , id ) , id , name : common.statuses?.[ id ] } ) ) }
                path       = { `${ path }.customers.filters.status` }
                selectedId = { status }
            />

            <OptionFilterPicker
                anchorRef  = { repRef }
                isOpen     = { open === 'rep' }
                onClose    = { () => setOpen( null ) }
                onSelect   = { refilter( setRepId ) }
                options    = { reps.map( rep => ( { count : count( 'repId' , rep.id ) , id : rep.id , name : rep.name } ) ) }
                path       = { `${ path }.customers.filters.rep` }
                selectedId = { repId }
            />

            <OptionFilterPicker
                multiple
                anchorRef   = { sectorRef }
                isOpen      = { open === 'sector' }
                onApply     = { refilter( setSectors ) }
                onClose     = { () => setOpen( null ) }
                options     = { SECTORS.map( id => ( { count : count( 'sector' , id ) , id , name : common.sectors?.[ id ] } ) ) }
                path        = { `${ path }.customers.filters.sector` }
                selectedIds = { sectors }
            />

            <SidePanel ref={ modalRef } title={ customer?.name } width="w-full sm:w-[34rem]">
                { customer && <CustomerSheet common={ common } customer={ customer } key={ customer.id } t={ t.sheet ?? {} } /> }
            </SidePanel>

            { creating && (
                <NewCustomerModal
                    common    = { common }
                    onClose   = { () => setCreating( false ) }
                    onCreated = { ( _id , name ) =>
                    {
                        setCreated( name ) ;
                        setSort( 'name' ) ;
                        setOffset( 0 ) ;
                    } }
                    t         = { t.create ?? {} }
                />
            ) }

        </Container>
    ) ;
} ;

export default CustomersDemo ;

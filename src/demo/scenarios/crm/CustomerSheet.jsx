'use client' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdCall , MdEmail , MdGroups , MdPlace } from 'react-icons/md' ;

import Badge            from '@/components/Badge' ;
import CopyBadge        from '@/components/CopyBadge' ;
import FileDropzone     from '@/components/media/FileDropzone' ;
import InitialsAvatar   from '@/components/avatars/InitialsAvatar' ;
import MapView          from '@/components/maps/Map' ;
import MapMarker        from '@/components/maps/MapMarker' ;
import Tabs             from '@/components/tabs/Tabs' ;
import TextAreaMarkdown from '@/components/inputs/TextAreaMarkdown' ;

import useNumberFormat from '@/hooks/useNumberFormat' ;

import config from '@/@configs' ;

import { DAY } from '@/demo/scenarios/shared' ;

import { useCrm } from './CrmProvider' ;

/** The icon of each kind of exchange. */
const EXCHANGE_ICONS = { call : MdCall , email : MdEmail , meeting : MdGroups , visit : MdPlace } ;

/** The badge colour of each stage. */
export const STAGE_COLORS = { lost : 'error' , negotiation : 'warning' , proposal : 'primary' , prospect : 'neutral' , qualified : 'info' , won : 'success' } ;

/** The badge colour of each status. */
export const STATUS_COLORS = { customer : 'success' , inactive : 'neutral' , lead : 'info' } ;

/**
 * The body of a customer's sheet : five tabs over one customer of the CRM.
 *
 * Its documents and its notes are written back to the CRM's base, so they are
 * there again when the sheet is opened again, and on the other pages.
 *
 * @param {Object} props
 * @param {Object} props.common - The CRM's shared copy.
 * @param {Object} props.customer
 * @param {Object} props.t - The page's copy.
 */
const CustomerSheet = ( { common , customer , t } ) =>
{
    const { interactions , opportunities , patchCustomer , reps } = useCrm() ;

    const { formatNumber , locale } = useNumberFormat() ;

    const date  = day => new Date( day * DAY ).toLocaleDateString( locale , { day : 'numeric' , month : 'long' , timeZone : 'UTC' , year : 'numeric' } ) ;
    const euros = value => formatNumber( value , { currency : 'EUR' , maximumFractionDigits : 0 , style : 'currency' } ) ;

    const rep     = reps.find( item => item.id === customer.repId ) ;
    const history = interactions.filter( item => item.customerId === customer.id ).sort( ( a , b ) => b.day - a.day ) ;
    const deals   = opportunities.filter( item => item.customerId === customer.id ) ;

    // Keeps a preview address of its own for each new image : the drop zone releases its own when the sheet closes.
    const onDocuments = items =>
    {
        const known = new Map( customer.documents.map( item => [ item.id , item ] ) ) ;
        patchCustomer( customer.id , { documents : items.map( item => known.get( item.id ) ?? { ...item , url : item.file.type.startsWith( 'image/' ) ? URL.createObjectURL( item.file ) : undefined } ) } ) ;
    } ;

    const summary = (
        <div className="flex flex-col gap-4 text-sm">

            <div className="flex flex-wrap items-center gap-2">
                <Badge color={ STATUS_COLORS[ customer.status ] } style="soft">{ common.statuses?.[ customer.status ] }</Badge>
                <Badge style="outline">{ common.sectors?.[ customer.sector ] }</Badge>
                { customer.tags.map( tag => <Badge key={ tag } style="ghost">{ tag }</Badge> ) }
            </div>

            <section className="flex flex-col gap-1">
                <h5 className="font-semibold">{ t.contact }</h5>
                <span>{ customer.contact.name }</span>
                <div className="flex flex-wrap gap-2">
                    <CopyBadge style="outline" value={ customer.contact.email } />
                    <CopyBadge style="outline" value={ customer.contact.phone } />
                </div>
            </section>

            <section className="flex flex-col gap-1">
                <h5 className="font-semibold">{ t.address }</h5>
                <span>{ customer.address.streetAddress }, { customer.address.postalCode } { customer.address.locality }</span>
                { customer.geo && (
                    <MapView
                        ariaLabel = { format( t.map ?? '{0}' , customer.name ) }
                        controls  = { false }
                        height    = { 180 }
                        latitude  = { customer.geo.latitude }
                        longitude = { customer.geo.longitude }
                        mapStyle  = { config?.ui?.map?.style }
                        zoom      = { 12 }
                    >
                        <MapMarker latitude={ customer.geo.latitude } longitude={ customer.geo.longitude } title={ customer.name } />
                    </MapView>
                ) }
            </section>

            <section className="flex flex-col gap-1">
                <h5 className="font-semibold">{ t.rep }</h5>
                { rep && (
                    <span className="flex items-center gap-2">
                        <InitialsAvatar name={ rep.name } size="xs" />
                        { rep.name }
                    </span>
                ) }
            </section>

            <section className="flex flex-col gap-1">
                <h5 className="font-semibold">{ t.revenue }</h5>
                <span className="tabular-nums">{ euros( customer.revenue ) }</span>
                <span className="text-xs text-base-content/60">{ format( t.since ?? '{0}' , date( customer.since ) ) }</span>
            </section>

        </div>
    ) ;

    const historyList = history.length === 0
        ? <p className="text-sm text-base-content/60">{ t.noHistory }</p>
        : (
            <ul className="flex flex-col gap-3">
                { history.map( item =>
                {
                    const Icon = EXCHANGE_ICONS[ item.type ] ;
                    return (
                        <li className="flex gap-3" key={ item.id }>
                            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-base-200">
                                <Icon aria-hidden="true" className="size-4" />
                            </span>
                            <span className="flex flex-col">
                                <span className="text-sm font-medium">{ item.summary }</span>
                                <span className="text-xs text-base-content/60">
                                    { common.interactions?.[ item.type ] } · { date( item.day ) } · { reps.find( one => one.id === item.repId )?.name }
                                </span>
                            </span>
                        </li>
                    ) ;
                } ) }
            </ul>
        ) ;

    const dealList = deals.length === 0
        ? <p className="text-sm text-base-content/60">{ t.noDeals }</p>
        : (
            <ul className="flex flex-col divide-y divide-base-content/10">
                { deals.map( deal => (
                    <li className="flex items-center justify-between gap-3 py-2" key={ deal.id }>
                        <span className="flex flex-col">
                            <span className="text-sm font-medium">{ deal.title }</span>
                            <span className="text-xs text-base-content/60">
                                { format( ( deal.stage === 'won' || deal.stage === 'lost' ? t.closed : t.closing ) ?? '{0}' , date( deal.closeDay ) ) }
                            </span>
                        </span>
                        <span className="flex flex-col items-end gap-1">
                            <span className="text-sm font-semibold tabular-nums">{ euros( deal.amount ) }</span>
                            <Badge color={ STAGE_COLORS[ deal.stage ] } size="sm" style="soft">{ common.stages?.[ deal.stage ] }</Badge>
                        </span>
                    </li>
                ) ) }
            </ul>
        ) ;

    return (
        <Tabs
            lazy
            ariaLabel = { customer.name }
            items     =
            { [
                { content : summary , id : 'summary' , label : t.tabs?.summary } ,
                { content : historyList , id : 'history' , label : t.tabs?.history } ,
                { content : dealList , id : 'opportunities' , label : t.tabs?.opportunities } ,
                {
                    content : <FileDropzone helper={ t.documents } onChange={ onDocuments } value={ customer.documents } /> ,
                    id      : 'documents' ,
                    label   : t.tabs?.documents ,
                } ,
                {
                    content : <TextAreaMarkdown onChange={ notes => patchCustomer( customer.id , { notes } ) } previewPosition="tab" value={ customer.notes } /> ,
                    id      : 'notes' ,
                    label   : t.tabs?.notes ,
                } ,
            ] }
            contentClassName = "pt-4"
            size             = "sm"
            style            = "border"
        />
    ) ;
} ;

export default CustomerSheet ;

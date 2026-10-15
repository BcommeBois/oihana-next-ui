'use client' ;

import { createContext , use , useMemo , useState } from 'react' ;

import { usePathname , useRouter } from 'next/navigation' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import OutboxBanner   from '@/display/OutboxBanner' ;
import OutboxProvider from '@/contexts/outbox/provider' ;

import useI18n  from '@/contexts/locale/useI18n' ;
import useToast from '@/contexts/toasts/useToast' ;

import outboxErrorText from '@/helpers/outbox/outboxErrorText' ;

import httpTransport from '@/offline/outbox/httpTransport' ;

export const BENCH = '/modules/outbox' ;

export const BASE = '/api/outbox' ;

/**
 * A line of a quote gets the number the server gave the quote : the
 * substitution is the transport's business, never the queue's.
 *
 * @param {Object} item
 * @param {Object} refs
 * @returns {Object} The request.
 */
export const prepare = ( item , refs ) =>
{
    const request = item.payload ?? {} ;
    if ( item.kind !== 'line' )
    {
        return request ;
    }
    const [ quote ] = Object.values( refs ) ;
    return { ...request , body : { ...request.body , quote : quote?.id ?? null } } ;
} ;

const send = httpTransport( { base : BASE , prepare } ) ;

const OPTIONS = { backoff : { base : 5000 } } ;

const LabOutboxContext = createContext( null ) ;

/**
 * The lab's own controls over its outbox — the simulated cut, the account, the
 * log of settled items — for the test bench.
 *
 * @returns {?{ scope : string , setScope : Function , simulated : boolean , setSimulated : Function , log : Object[] , clearLog : Function }}
 */
export const useLabOutbox = () => use( LabOutboxContext ) ;

/**
 * The outbox of the lab, mounted over every showcase page : a refusal toasts
 * wherever it happens, and the banner says what waits, on any page but the
 * bench (which shows its own).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.path='demo.offline.lab'] - Dot notation path to the demo locale.
 */
const LabOutbox = ( { children , path = 'demo.offline.lab' } ) =>
{
    const t = useI18n( path ) ?? {} ;
    const errors = useI18n( 'components.outbox.errors' ) ?? {} ;
    const kinds  = useI18n( 'demo.offline.outbox.kinds' ) ?? {} ;

    const { toast } = useToast() ;

    const pathname = usePathname() ;
    const router   = useRouter() ;

    const [ scope     , setScope     ] = useState( 'A' ) ;
    const [ simulated , setSimulated ] = useState( false ) ;
    const [ log       , setLog       ] = useState( [] ) ;

    const onSettle = item =>
    {
        setLog( previous => [ { at : Date.now() , id : item.id , kind : item.kind , status : item.status } , ...previous ].slice( 0 , 8 ) ) ;
        if ( item.status === 'rejected' || item.status === 'conflict' )
        {
            toast( format( t.refused ?? '{0} : {1}' , kinds[ item.kind ] ?? item.kind , outboxErrorText( item , { errors } ) ) , 'error' ) ;
        }
    } ;

    const controls = useMemo( () => (
    {
        clearLog : () => setLog( [] ) ,
        log ,
        scope ,
        setScope ,
        setSimulated ,
        simulated ,
    } )
    , [ log , scope , simulated ] ) ;

    return (
        <LabOutboxContext value={ controls }>
            <OutboxProvider
                name     = "lab"
                online   = { simulated ? false : undefined }
                onSettle = { onSettle }
                options  = { OPTIONS }
                scope    = { scope }
                send     = { send }
            >
                { pathname !== BENCH && (
                    <div className="mx-auto w-full max-w-6xl px-4 pt-4 empty:hidden">
                        <OutboxBanner onOpen={ () => router.push( BENCH ) } />
                    </div>
                ) }
                { children }
            </OutboxProvider>
        </LabOutboxContext>
    ) ;
} ;

export default LabOutbox ;

'use client' ;

import { createContext , use , useEffect , useMemo , useState } from 'react' ;

import { useToday } from '@/demo/scenarios/shared' ;

import generate , { REPS } from './data' ;

const CrmContext = createContext( null ) ;

let lastId = 0 ;

/**
 * The CRM's base, shared by its pages.
 *
 * Mounted by the layout of `/scenarios/crm/`, above the pages : a deal moved
 * in the pipeline shows in the customer's sheet, a customer added in the list
 * shows on the map. Held in memory only — a reload starts over.
 *
 * Built once today is known, in the browser : the base is dated from it, and
 * the server must render what the first client render renders.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
const CrmProvider = ( { children } ) =>
{
    const today = useToday() ;

    const [ base , setBase ] = useState( null ) ;

    useEffect( () =>
    {
        if ( today !== null )
        {
            setBase( current => current ?? generate( today ) ) ;
        }
    } , [ today ] ) ;

    const value = useMemo( () =>
    {
        const patchCustomer = ( id , patch ) => setBase( current => (
        {
            ...current ,
            customers : current.customers.map( customer => ( customer.id === id ? { ...customer , ...( typeof patch === 'function' ? patch( customer ) : patch ) } : customer ) ) ,
        } ) ) ;

        return {
            ...base ,

            addCustomer : customer =>
            {
                const id = `customer-new-${ ++lastId }` ;
                setBase( current => ( { ...current , customers : [ { ...customer , id , since : today } , ...current.customers ] } ) ) ;
                return id ;
            } ,

            moveOpportunity : ( id , stage ) => setBase( current => (
            {
                ...current ,
                opportunities : current.opportunities.map( deal => ( deal.id === id ? { ...deal , stage } : deal ) ) ,
            } ) ) ,

            patchCustomer ,

            ready : base !== null ,
            reps  : REPS ,
            today ,
        } ;
    }
    , [ base , today ] ) ;

    return <CrmContext value={ value }>{ children }</CrmContext> ;
} ;

/**
 * The CRM's base and its actions, from a page under `/scenarios/crm/`.
 *
 * @returns {Object}
 */
export const useCrm = () => use( CrmContext ) ;

export default CrmProvider ;

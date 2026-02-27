import { useEffect, useState } from 'react' ;

/**
 * React hook to check if the component is mounted.
 * Useful for avoiding hydration mismatches in SSR.
 *
 * @returns {boolean} True if the component is mounted on the client.
 *
 * @example
 * ```js
 * const isMounted = useIsMounted() ;
 *
 * if ( !isMounted ) return null ;
 *
 * return <div>{ window.innerWidth }</div> ;
 * ```
 */
const useIsMounted = () =>
{
    const [ mounted , setMounted ] = useState( false ) ;

    useEffect( () =>
    {
        setMounted( true ) ;
    }
    , [] ) ;

    return mounted ;
} ;

export default useIsMounted ;

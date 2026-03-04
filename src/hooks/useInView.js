// hooks/useInView.js
'use client' ;

import { useEffect , useRef , useState } from 'react' ;

/**
 * Hook that detects when an element enters the viewport.
 *
 * @param {Object} [options]
 * @param {string} [options.rootMargin='0px'] - Margin around the root.
 * @param {number} [options.threshold=0] - Visibility threshold (0-1).
 * @param {boolean} [options.once=true] - Stop observing after first intersection.
 *
 * @returns {{ ref: React.RefObject, inView: boolean }}
 *
 * @example
 * ```js
 * const { ref , inView } = useInView({ rootMargin: '200px' }) ;
 * <div ref={ ref }>{ inView && <HeavyComponent /> }</div>
 * ```
 */
const useInView =
({
    once     = true ,
    rootMargin = '0px' ,
    threshold = 0 ,
}
= {}) =>
{
    /** @type {React.RefObject<HTMLDivElement>} */
    const ref = useRef( null ) ;

    const [ inView , setInView ] = useState( !once ) ;

    useEffect( () =>
    {
        const element = ref.current ;

        if ( !element )
        {
            return ;
        }

        if ( !once )
        {
            return ;
        }

        const observer = new IntersectionObserver
        (
            ( [ entry ] ) =>
            {
                if ( entry.isIntersecting )
                {
                    setInView( true ) ;
                    observer.disconnect() ;
                }
            } ,
            { rootMargin , threshold }
        ) ;

        observer.observe( element ) ;

        return () => observer.disconnect() ;
    }
    , [ once , rootMargin , threshold ] ) ;

    return { ref , inView } ;
} ;

export default useInView ;
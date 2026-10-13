'use client' ;

import { useCallback , useEffect , useRef , useState } from 'react' ;

import { renderToBlob } from '../components/documents/engine/renderer' ;

const IDLE = { blob : null , error : null , loading : false , url : null } ;

/** Releases the url a ref holds, if any. */
const revoke = ref =>
{
    if ( ref.current )
    {
        URL.revokeObjectURL( ref.current ) ;
        ref.current = null ;
    }
} ;

/**
 * Generates a PDF from a `@react-pdf/renderer` document, and again each time
 * the document changes — the live preview of a form.
 *
 * The generation waits `delay` after the last change, so a field typed into
 * does not render a document per keystroke ; and a slow generation never
 * lands after a faster one replaced it. The blob url is released when the
 * next one replaces it, and on unmount.
 *
 * ⚠️ **The element is compared by identity.** A `<Invoice data={ data } />`
 * written inline is a new element on every render, and would generate
 * forever : build it with `useMemo` on its data — or let the React Compiler
 * do it, where it is on.
 *
 * @module hooks/usePdfDocument
 *
 * @param {?React.ReactElement} element - The `<Document>` to render ; `null` generates nothing.
 * @param {Object} [options]
 * @param {number} [options.delay=300] - Milliseconds waited after a change before generating.
 * @param {boolean} [options.enabled=true] - Off, nothing is generated and the last result is released.
 *
 * @returns {{ blob : ?Blob , error : ?Error , loading : boolean , regenerate : Function , url : ?string }}
 *
 * @example
 * ```jsx
 * const element = useMemo( () => <Invoice order={ order } /> , [ order ] ) ;
 *
 * const { blob , loading } = usePdfDocument( element ) ;
 *
 * <PdfViewer source={ blob } />
 * ```
 */
const usePdfDocument = ( element , { delay = 300 , enabled = true } = {} ) =>
{
    const [ state   , setState   ] = useState( IDLE ) ;
    const [ attempt , setAttempt ] = useState( 0 ) ;

    // The url currently handed out, to release when the next one replaces it.
    const current = useRef( null ) ;

    // biome-ignore lint/correctness/useExhaustiveDependencies: `attempt` is the retry counter, listed for the re-run alone.
    useEffect( () =>
    {
        if ( !enabled || !element )
        {
            revoke( current ) ;
            setState( IDLE ) ;
            return undefined ;
        }

        let stale = false ;

        setState( previous => ( { ...previous , error : null , loading : true } ) ) ;

        const timer = setTimeout( async () =>
        {
            try
            {
                const blob = await renderToBlob( element ) ;

                if ( stale )
                {
                    return ;
                }

                revoke( current ) ;

                const url = URL.createObjectURL( blob ) ;

                current.current = url ;

                setState( { blob , error : null , loading : false , url } ) ;
            }
            catch ( error )
            {
                if ( !stale )
                {
                    setState( previous => ( { ...previous , error , loading : false } ) ) ;
                }
            }
        }
        , delay ) ;

        return () =>
        {
            stale = true ;
            clearTimeout( timer ) ;
        } ;
    }
    , [ attempt , delay , element , enabled ] ) ;

    useEffect( () => () => revoke( current ) , [] ) ;

    const regenerate = useCallback( () => setAttempt( count => count + 1 ) , [] ) ;

    return { ...state , regenerate } ;
} ;

export default usePdfDocument ;

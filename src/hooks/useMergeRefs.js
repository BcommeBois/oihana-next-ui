import { useCallback } from 'react'

/**
 * Merges multiple React refs into a single callback ref.
 * Useful when a component needs its own internal ref
 * while also supporting a forwarded external ref.
 *
 * @param {...(React.Ref<any> | null | undefined)} refs - The refs to merge.
 * @returns {React.RefCallback<any>} A unified callback ref to attach to a DOM element.
 *
 * @example
 * const internalRef = useRef(null);
 * const mergedRef = useMergeRefs(internalRef, externalRef);
 *
 * <div ref={mergedRef} />
 */
const useMergeRefs = ( ...refs ) =>
{
    return useCallback( node =>
    {
        refs.forEach( ref =>
        {
            if ( typeof ref === 'function' )
            {
                ref( node ) ;
            }
            else if ( ref != null )
            {
                ref.current = node ;
            }
        } ) ;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , refs ) ;
} ;

export default useMergeRefs ;
/**
 * Resolves a DOM element from either a React ref object or a raw element.
 *
 * Useful when an API (IntersectionObserver, ResizeObserver, …) expects a DOM
 * element but the caller may provide either a ref or the element directly.
 *
 * @param {React.RefObject<Element>|Element|null} [target] - Ref object, element or null.
 * @returns {Element|null} The resolved DOM element, or null.
 *
 * @example
 * ```js
 * resolveRefElement( myRef ) ;     // → myRef.current
 * resolveRefElement( domNode ) ;   // → domNode
 * resolveRefElement( null ) ;      // → null
 * ```
 */
const resolveRefElement = ( target ) =>
{
    if ( target && typeof target === 'object' && 'current' in target )
    {
        return target.current ;
    }
    return target ?? null ;
} ;

export default resolveRefElement ;

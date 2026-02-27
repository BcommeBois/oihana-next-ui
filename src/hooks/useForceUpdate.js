import { useReducer } from 'react' ;

/**
 * React hook to force a component re-render.
 *
 * ⚠️ Use sparingly — if you need this, consider restructuring your state.
 *
 * @returns {() => void} A function to trigger a re-render.
 *
 * @example
 * ```js
 * const forceUpdate = useForceUpdate() ;
 *
 * // After external mutation
 * externalLib.onChange( () => {
 *     forceUpdate() ;
 * } ) ;
 * ```
 */
const useForceUpdate = () =>
{
    const [ , forceUpdate ] = useReducer( ( c ) => c + 1 , 0 ) ;
    return forceUpdate ;
} ;

export default useForceUpdate ;
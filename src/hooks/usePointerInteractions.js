import { useEffect, useState } from 'react' ;

/**
 * React hook to detect if the user is currently pressing a mouse button.
 *
 * @returns {{ isPointerDown: boolean }} The current pointer state.
 *
 * @example
 * ```js
 * const { isPointerDown } = usePointerInteractions() ;
 *
 * <div className={ isPointerDown ? 'pressing' : 'idle' }>
 *     { isPointerDown ? 'Pressing...' : 'Release' }
 * </div>
 * ```
 */
const usePointerInteractions = () =>
{
    const [ isPointerDown , setIsPointerDown ] = useState( false ) ;

    useEffect( () =>
        {
            const handlePointerDown = () => setIsPointerDown( true  ) ;
            const handlePointerUp   = () => setIsPointerDown( false ) ;

            document.addEventListener( 'pointerdown' , handlePointerDown ) ;
            document.addEventListener( 'pointerup'   , handlePointerUp ) ;

            return () =>
            {
                document.removeEventListener( 'pointerdown' , handlePointerDown ) ;
                document.removeEventListener( 'pointerup'   , handlePointerUp ) ;
            } ;
        }
        , [] ) ;

    return { isPointerDown } ;
} ;

export default usePointerInteractions ;
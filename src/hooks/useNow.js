'use client' ;

import { useEffect , useState } from 'react' ;

/**
 * The current instant, refreshed on a tick.
 *
 * For anything that draws *now* — the line across a time grid, a relative
 * timestamp, a countdown. Reading `Date.now()` during a render would freeze the
 * value at the first paint and never move it again.
 *
 * **It starts at `null`, on purpose.** A server and a browser cannot render the
 * same clock, and a component that reads the time during its first render
 * mismatches on hydration — every single load. So the first value lands after
 * mount, and a consumer draws nothing until it does. That is the correct
 * behaviour anyway : an indicator that flashes at the wrong minute before
 * correcting itself is worse than one that appears a frame late.
 *
 * @module hooks/useNow
 *
 * @param {Object} [props]
 * @param {number} [props.interval=60000] - Milliseconds between ticks. One minute is enough for anything showing `HH:mm` ; a finer tick only costs renders.
 * @param {boolean} [props.enabled=true] - Stop ticking without unmounting — a hidden view has no reason to keep waking the page.
 *
 * @returns {number|null} Milliseconds since the epoch, or `null` before mount.
 *
 * @example
 * ```jsx
 * const now = useNow() ;
 *
 * { now !== null && <div style={{ top : scale.offsetOf( now ) }} /> }
 * ```
 */
const useNow = ( { interval = 60000 , enabled = true } = {} ) =>
{
    const [ now , setNow ] = useState( null ) ;

    useEffect( () =>
    {
        if ( !enabled )
        {
            return ;
        }

        setNow( Date.now() ) ;

        const id = setInterval( () => setNow( Date.now() ) , Math.max( 1000 , interval ) ) ;

        return () => clearInterval( id ) ;
    }
    , [ interval , enabled ] ) ;

    return now ;
} ;

export default useNow ;

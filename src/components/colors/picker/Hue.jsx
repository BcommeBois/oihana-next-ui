'use client' ;

import { useCallback } from 'react' ;

import clamp from 'vegas-js-core/src/maths/clamp' ;
import round from 'vegas-js-core/src/maths/round' ;

import Interactive from './Interactive' ;
import Pointer     from './Pointer' ;

/**
 * The hue track (0–360°).
 *
 * @module components/colors/picker/Hue
 *
 * @param {Object} props
 * @param {number} props.hue - Current hue, 0–360.
 * @param {(partial: { h: number }) => void} props.onChange - Emits the hue on move.
 * @param {() => void} [props.onCommit] - Called when the drag ends.
 */
const Hue = ({ hue , onChange , onCommit }) =>
{
    const handleMove = useCallback( ( interaction ) =>
    {
        onChange({ h : round( clamp( 360 * interaction.left , 0 , 360 ) ) }) ;
    }
    , [ onChange ] ) ;

    const handleKey = useCallback( ( offset ) =>
    {
        onChange({ h : clamp( hue + offset.left * 360 , 0 , 360 ) }) ;
    }
    , [ hue , onChange ] ) ;

    return (
        <div className="relative h-full w-full rounded-full">
            <Interactive
                onMove        = { handleMove }
                onMoveEnd     = { onCommit }
                onKey         = { handleKey }
                aria-label    = "Hue"
                aria-valuenow = { round( hue ) }
                aria-valuemin = { 0 }
                aria-valuemax = { 360 }
                className     = "rounded-full"
            >
                <div
                    className = "absolute inset-0 rounded-full"
                    style     = {{ background : 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }}
                />
                <Pointer top={ 0.5 } left={ hue / 360 } />
            </Interactive>
        </div>
    ) ;
} ;

Hue.displayName = 'Hue' ;

export default Hue ;

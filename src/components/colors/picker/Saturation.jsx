'use client' ;

import { useCallback } from 'react' ;

import clamp from 'vegas-js-core/src/maths/clamp' ;
import round from 'vegas-js-core/src/maths/round' ;

import Interactive from './Interactive' ;
import Pointer     from './Pointer' ;

/**
 * The saturation / brightness square. X axis = saturation, Y axis = value (brightness).
 *
 * @module components/colors/picker/Saturation
 *
 * @param {Object} props
 * @param {{ h: number, s: number, v: number, a: number }} props.hsva - Current color.
 * @param {(partial: { s: number, v: number }) => void} props.onChange - Emits saturation/value on move.
 * @param {() => void} [props.onCommit] - Called when the drag ends.
 */
const Saturation = ({ hsva , onChange , onCommit }) =>
{
    const handleMove = useCallback( ( interaction ) =>
    {
        onChange({
            s : round( clamp( interaction.left * 100 , 0 , 100 ) ) ,
            v : round( clamp( 100 - interaction.top * 100 , 0 , 100 ) ) ,
        }) ;
    }
    , [ onChange ] ) ;

    const handleKey = useCallback( ( offset ) =>
    {
        onChange({
            s : clamp( hsva.s + offset.left * 100 , 0 , 100 ) ,
            v : clamp( hsva.v - offset.top  * 100 , 0 , 100 ) ,
        }) ;
    }
    , [ hsva.s , hsva.v , onChange ] ) ;

    return (
        <div className="relative h-full w-full rounded-box">
            <Interactive
                onMove         = { handleMove }
                onMoveEnd      = { onCommit }
                onKey          = { handleKey }
                aria-label     = "Saturation and brightness"
                aria-valuetext = { `Saturation ${ round( hsva.s ) }%, brightness ${ round( hsva.v ) }%` }
                className      = "rounded-box"
            >
                <div
                    className = "absolute inset-0 rounded-box"
                    style     = {{
                        backgroundColor : `hsl(${ hsva.h }, 100%, 50%)` ,
                        backgroundImage : 'linear-gradient(to top, #000, rgba(0,0,0,0)), linear-gradient(to right, #fff, rgba(255,255,255,0))' ,
                    }}
                />
                <Pointer top={ 1 - hsva.v / 100 } left={ hsva.s / 100 } />
            </Interactive>
        </div>
    ) ;
} ;

Saturation.displayName = 'Saturation' ;

export default Saturation ;

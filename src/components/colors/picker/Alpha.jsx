'use client' ;

import { useCallback } from 'react' ;

import clamp from 'vegas-js-core/src/maths/clamp' ;
import round from 'vegas-js-core/src/maths/round' ;

import hsvToRgb from '../../../helpers/colors/hsvToRgb' ;

import Interactive from './Interactive' ;
import Pointer     from './Pointer' ;

const CHECKERBOARD = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill-opacity='.12'%3E%3Crect x='8' width='8' height='8'/%3E%3Crect y='8' width='8' height='8'/%3E%3C/svg%3E\")" ;

/**
 * The alpha (opacity) track, 0–1.
 *
 * @module components/colors/picker/Alpha
 *
 * @param {Object} props
 * @param {{ h: number, s: number, v: number, a: number }} props.hsva - Current color.
 * @param {(partial: { a: number }) => void} props.onChange - Emits the alpha on move.
 * @param {() => void} [props.onCommit] - Called when the drag ends.
 */
const Alpha = ({ hsva , onChange , onCommit }) =>
{
    const handleMove = useCallback( ( interaction ) =>
    {
        onChange({ a : interaction.left }) ;
    }
    , [ onChange ] ) ;

    const handleKey = useCallback( ( offset ) =>
    {
        onChange({ a : clamp( hsva.a + offset.left , 0 , 1 ) }) ;
    }
    , [ hsva.a , onChange ] ) ;

    const { r , g , b } = hsvToRgb({ h : hsva.h , s : hsva.s , v : hsva.v }) ;

    return (
        <div className="relative h-full w-full rounded-full">
            <Interactive
                onMove        = { handleMove }
                onMoveEnd     = { onCommit }
                onKey         = { handleKey }
                aria-label    = "Alpha"
                aria-valuenow = { round( hsva.a * 100 ) }
                aria-valuemin = { 0 }
                aria-valuemax = { 100 }
                className     = "rounded-full"
            >
                <div
                    className = "absolute inset-0 rounded-full bg-white"
                    style     = {{ backgroundImage : CHECKERBOARD }}
                />
                <div
                    className = "absolute inset-0 rounded-full"
                    style     = {{ backgroundImage : `linear-gradient(90deg, rgba(${ r },${ g },${ b },0), rgba(${ r },${ g },${ b },1))` }}
                />
                <Pointer top={ 0.5 } left={ hsva.a } />
            </Interactive>
        </div>
    ) ;
} ;

Alpha.displayName = 'Alpha' ;

export default Alpha ;

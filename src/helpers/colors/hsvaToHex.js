import rgbToHex from 'vegas-js-core/src/colors/rgbToHex' ;

import hsvToRgb from './hsvToRgb' ;

/**
 * Converts an HSVA object to an uppercase hex string.
 *
 * @param {{ h: number, s: number, v: number, a?: number }} hsva - Hue 0–360, saturation/value 0–100, alpha 0–1.
 * @param {boolean} [alpha=false] - When true, append the alpha pair ('#RRGGBBAA').
 * @returns {string} The hex color string ('#RRGGBB' or '#RRGGBBAA').
 *
 * @example
 * hsvaToHex({ h: 0, s: 100, v: 100 })            // '#FF0000'
 * hsvaToHex({ h: 0, s: 0, v: 0, a: 0.5 }, true)  // '#00000080'
 */
export const hsvaToHex = ( { h , s , v , a = 1 } , alpha = false ) =>
{
    const { r , g , b } = hsvToRgb({ h , s , v }) ;
    const hex = rgbToHex( r , g , b ) ;

    if ( !alpha )
    {
        return hex.toUpperCase() ;
    }

    const aa = Math.round( Math.min( Math.max( a , 0 ) , 1 ) * 255 )
        .toString( 16 )
        .padStart( 2 , '0' ) ;

    return ( hex + aa ).toUpperCase() ;
} ;

export default hsvaToHex ;

import hexToRgb from 'vegas-js-core/src/colors/hexToRgb' ;

import rgbToHsv from './rgbToHsv' ;

/**
 * Converts a hex color string to an HSVA object.
 *
 * Accepts `#rgb`, `#rgba`, `#rrggbb` and `#rrggbbaa` (with or without `#`).
 * Invalid input falls back to black with full opacity.
 *
 * @param {string} hex - The hex color string.
 * @returns {{ h: number, s: number, v: number, a: number }} Hue 0–360, saturation/value 0–100, alpha 0–1.
 *
 * @example
 * hexToHsva('#FF0000')   // { h: 0, s: 100, v: 100, a: 1 }
 * hexToHsva('#00000080') // { h: 0, s: 0, v: 0, a: 0.5019… }
 */
export const hexToHsva = ( hex ) =>
{
    if ( typeof hex !== 'string' || hex === '' )
    {
        return { h : 0 , s : 0 , v : 0 , a : 1 } ;
    }

    let value = hex.replace( '#' , '' ) ;

    // Expand shorthand (#rgb / #rgba → #rrggbb / #rrggbbaa).
    if ( value.length === 3 || value.length === 4 )
    {
        value = value.split( '' ).map( ( c ) => c + c ).join( '' ) ;
    }

    let a = 1 ;
    if ( value.length === 8 )
    {
        a = parseInt( value.slice( 6 , 8 ) , 16 ) / 255 ;
        value = value.slice( 0 , 6 ) ;
    }

    if ( !/^[0-9a-f]{6}$/i.test( value ) )
    {
        return { h : 0 , s : 0 , v : 0 , a } ;
    }

    const [ r , g , b ] = hexToRgb( `#${ value }` ) ;

    return { ...rgbToHsv({ r , g , b }) , a } ;
} ;

export default hexToHsva ;

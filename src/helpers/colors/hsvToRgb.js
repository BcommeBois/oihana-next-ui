/**
 * Converts an HSV color to RGB.
 *
 * @param {{ h: number, s: number, v: number }} hsv - Hue in 0–360, saturation and value in 0–100.
 * @returns {{ r: number, g: number, b: number }} Red, green, blue in 0–255.
 *
 * @example
 * hsvToRgb({ h: 0, s: 100, v: 100 }) // { r: 255, g: 0, b: 0 }
 */
export const hsvToRgb = ({ h , s , v }) =>
{
    h /= 360 ;
    s /= 100 ;
    v /= 100 ;

    const i = Math.floor( h * 6 ) ;
    const f = h * 6 - i ;
    const p = v * ( 1 - s ) ;
    const q = v * ( 1 - f * s ) ;
    const t = v * ( 1 - ( 1 - f ) * s ) ;

    let r ;
    let g ;
    let b ;

    switch ( i % 6 )
    {
        case 0  : r = v ; g = t ; b = p ; break ;
        case 1  : r = q ; g = v ; b = p ; break ;
        case 2  : r = p ; g = v ; b = t ; break ;
        case 3  : r = p ; g = q ; b = v ; break ;
        case 4  : r = t ; g = p ; b = v ; break ;
        case 5  : r = v ; g = p ; b = q ; break ;
        default : r = 0 ; g = 0 ; b = 0 ;
    }

    return {
        r : Math.round( r * 255 ) ,
        g : Math.round( g * 255 ) ,
        b : Math.round( b * 255 ) ,
    } ;
} ;

export default hsvToRgb ;

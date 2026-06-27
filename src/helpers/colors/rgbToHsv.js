/**
 * Converts an RGB color to HSV.
 *
 * @param {{ r: number, g: number, b: number }} rgb - Red, green, blue in 0–255.
 * @returns {{ h: number, s: number, v: number }} Hue in 0–360, saturation and value in 0–100.
 *
 * @example
 * rgbToHsv({ r: 255, g: 0, b: 0 }) // { h: 0, s: 100, v: 100 }
 */
export const rgbToHsv = ({ r , g , b }) =>
{
    r /= 255 ;
    g /= 255 ;
    b /= 255 ;

    const max  = Math.max( r , g , b ) ;
    const min  = Math.min( r , g , b ) ;
    const diff = max - min ;

    let h = 0 ;
    const s = max === 0 ? 0 : diff / max ;
    const v = max ;

    if ( diff !== 0 )
    {
        switch ( max )
        {
            case r : h = ( ( g - b ) / diff + ( g < b ? 6 : 0 ) ) / 6 ; break ;
            case g : h = ( ( b - r ) / diff + 2 ) / 6 ; break ;
            case b : h = ( ( r - g ) / diff + 4 ) / 6 ; break ;
        }
    }

    return {
        h : Math.round( h * 360 ) ,
        s : Math.round( s * 100 ) ,
        v : Math.round( v * 100 ) ,
    } ;
} ;

export default rgbToHsv ;

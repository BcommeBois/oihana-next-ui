import isString from 'vegas-js-core/src/isString' ;

/**
 * Validates a hexadecimal color string.
 *
 * @param {string} color - Color string to validate (with or without "#")
 * @param {boolean} [alpha=false] - Allow alpha channel (8 chars)
 * @returns {boolean} True if valid hex color
 *
 * @example
 * validateHexColor('FFF')       // true (#rgb)
 * validateHexColor('FFFFFF')    // true (#rrggbb)
 * validateHexColor('FFFFFFFF', true) // true (#rrggbbaa)
 * validateHexColor('FFFFFFFF', false) // false (alpha not allowed)
 */
export const validateHexColor = ( color, alpha = false ) =>
{
    if ( !isString( color ) )
    {
        return false ;
    }

    if ( color.substring( 0, 1 ) === '#' )
    {
        color = color.substring( 1 ) ;
    }

    switch ( color.length )
    {
        case 3 : // '#rgb' format
        {
            return /^[0-9A-F]{3}$/i.test( color ) ;
        }
        case 6 : // '#rrggbb' format
        {
            return /^[0-9A-F]{6}$/i.test( color ) ;
        }
        case 4 : // '#rgba' format
        {
            return alpha && /^[0-9A-F]{4}$/i.test( color ) ;
        }
        case 8 : // '#rrggbbaa' format
        {
            return alpha && /^[0-9A-F]{8}$/i.test( color ) ;
        }
        default :
        {
            return false ;
        }
    }
} ;

export default validateHexColor ;
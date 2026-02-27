
import chroma  from 'chroma-js'
import leading from 'vegas-js-core/src/numbers/leading'

import opacities from '../opacities'

export const ACCENT    = 'accent' ;
export const ERROR     = 'error' ;
export const GHOST     = 'ghost' ;
export const INFO      = 'info' ;
export const NEUTRAL   = 'neutral' ;
export const PRIMARY   = 'primary' ;
export const SECONDARY = 'secondary' ;
export const SUCCESS   = 'success' ;
export const WARNING   = 'warning' ;

export const BASE_100 = 'base-100' ;
export const BASE_200 = 'base-200' ;
export const BASE_300 = 'base-300' ;

export const ACCENT_CONTENT    = 'accent-content' ;
export const BASE_CONTENT      = 'base-content' ;
export const ERROR_CONTENT     = 'error-content' ;
export const INFO_CONTENT      = 'info-content' ;
export const NEUTRAL_CONTENT   = 'neutral-content' ;
export const PRIMARY_CONTENT   = 'primary-content' ;
export const SECONDARY_CONTENT = 'secondary-content' ;
export const SUCCESS_CONTENT   = 'success-content' ;
export const WARNING_CONTENT   = 'warning-content' ;

export const BASE_CONTENT_0   = 'base-content/0'   ;
export const BASE_CONTENT_5   = 'base-content/5'   ;
export const BASE_CONTENT_10  = 'base-content/10'  ;
export const BASE_CONTENT_15  = 'base-content/15'  ;
export const BASE_CONTENT_20  = 'base-content/20'  ;
export const BASE_CONTENT_25  = 'base-content/25'  ;
export const BASE_CONTENT_30  = 'base-content/30'  ;
export const BASE_CONTENT_35  = 'base-content/35'  ;
export const BASE_CONTENT_40  = 'base-content/40'  ;
export const BASE_CONTENT_45  = 'base-content/45'  ;
export const BASE_CONTENT_50  = 'base-content/50'  ;
export const BASE_CONTENT_55  = 'base-content/55'  ;
export const BASE_CONTENT_60  = 'base-content/60'  ;
export const BASE_CONTENT_65  = 'base-content/65'  ;
export const BASE_CONTENT_70  = 'base-content/70'  ;
export const BASE_CONTENT_75  = 'base-content/75'  ;
export const BASE_CONTENT_80  = 'base-content/80'  ;
export const BASE_CONTENT_85  = 'base-content/85'  ;
export const BASE_CONTENT_90  = 'base-content/90'  ;
export const BASE_CONTENT_95  = 'base-content/95'  ;
export const BASE_CONTENT_100 = 'base-content/100' ;

/**
 * @typedef {'accent'|'error'|'ghost'|'info'|'neutral'|'primary'|'secondary'|'success'|'warning'|'black'|'white'|'transparent'|'base-100'|'base-200'|'base-300'} DaisyuiDefaultColor
 * @typedef {'base-content/0'|'base-content/5'|'base-content/10'|'base-content/15'|'base-content/20'|'base-content/25'|'base-content/30'} DaisyuiDefaultColor
 * @typedef {'accent-content'|'error-content'|'info-content'|'neutral-content'|'primary-content'|'secondary-content'|'success-content'|'warning-content'|'base-content'} DaisyuiContentColor
 * @typedef {DaisyuiDefaultColor|DaisyuiContentColor} DaisyUiColor
 */
const colors  =
[
    BASE_100 ,
    BASE_200 ,
    BASE_300 ,

    ACCENT ,
    ERROR ,
    INFO ,
    NEUTRAL ,
    PRIMARY ,
    SECONDARY ,
    SUCCESS ,
    WARNING ,

    ACCENT_CONTENT    ,
    BASE_CONTENT      ,
    ERROR_CONTENT     ,
    INFO_CONTENT      ,
    NEUTRAL_CONTENT   ,
    PRIMARY_CONTENT   ,
    SECONDARY_CONTENT ,
    SUCCESS_CONTENT   ,
    WARNING_CONTENT   ,
] ;

export default colors ;

/**
 * DaisyUI v5 CSS variable mapping.
 */
export const variables =
{
    [ BASE_100     ] : '--color-base-100' ,
    [ BASE_200     ] : '--color-base-200' ,
    [ BASE_300     ] : '--color-base-300' ,
    [ BASE_CONTENT ] : '--color-base-content' ,

    [ ACCENT    ] : '--color-accent' ,
    [ ERROR     ] : '--color-error' ,
    [ INFO      ] : '--color-info' ,
    [ NEUTRAL   ] : '--color-neutral' ,
    [ PRIMARY   ] : '--color-primary' ,
    [ SECONDARY ] : '--color-secondary' ,
    [ SUCCESS   ] : '--color-success' ,
    [ WARNING   ] : '--color-warning' ,

    [ ACCENT_CONTENT    ] : '--color-accent-content' ,
    [ ERROR_CONTENT     ] : '--color-error-content' ,
    [ INFO_CONTENT      ] : '--color-info-content' ,
    [ NEUTRAL_CONTENT   ] : '--color-neutral-content' ,
    [ PRIMARY_CONTENT   ] : '--color-primary-content' ,
    [ SECONDARY_CONTENT ] : '--color-secondary-content' ,
    [ SUCCESS_CONTENT   ] : '--color-success-content' ,
    [ WARNING_CONTENT   ] : '--color-warning-content' ,
} ;

/**
 * Extracts DaisyUI colors from CSS variables and returns hex values.
 *
 * @param {CSSStyleDeclaration} [computedStyles] - Optional computed styles.
 * @returns {Object} Color map with hex values and opacity variants.
 */
export const extractColorsFromDom = ( computedStyles = null ) =>
{
    if ( !computedStyles )
    {
        computedStyles = getComputedStyle( document.documentElement ) ;
    }

    const colors = {} ;

    Object.entries( variables ).forEach( ( [ name , variable ] ) =>
    {
        const value = computedStyles.getPropertyValue( variable ).trim() ;

        if ( value )
        {
            colors[ name ] = chroma( value ).hex() ;

            // Ajouter les opacités
            opacities.forEach( ( opacity ) =>
            {
                colors[ `${ name }/${ opacity }` ] = colors[ name ] + percentToHex( opacity ) ;
            } ) ;
        }
    } ) ;

    return colors ;
} ;
// ------- Helpers

const percentToHex = ( value , upperCase = false ) =>
{
    const result = leading( Math.round(value / 100 * 255 ).toString(16 ) ) ;
    return upperCase ? result.toUpperCase() : result ;
}

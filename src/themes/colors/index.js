/**
 * Color constants and utilities for Tailwind CSS and DaisyUI.
 *
 * @module themes/colors
 */

import daisyui     from './daisyui' ;
import tailwindcss from './tailwindcss' ;

// DaisyUI semantic colors
export {
    ACCENT ,
    ACCENT_CONTENT ,
    BASE_100 ,
    BASE_200 ,
    BASE_300 ,
    BASE_CONTENT ,
    ERROR ,
    ERROR_CONTENT ,
    INFO ,
    INFO_CONTENT ,
    NEUTRAL ,
    NEUTRAL_CONTENT ,
    PRIMARY ,
    PRIMARY_CONTENT ,
    SECONDARY ,
    SECONDARY_CONTENT ,
    SUCCESS ,
    SUCCESS_CONTENT ,
    WARNING ,
    WARNING_CONTENT ,
}
from './daisyui' ;

// Native CSS / Tailwind keywords
export
{
    BLACK ,
    CURRENT ,
    INHERIT ,
    NONE ,
    TRANSPARENT ,
    WHITE ,
}
from './tailwindcss' ;

/**
 * @typedef {import('./daisyui').DaisyUiColor} DaisyUiColor
 * @typedef {import('./tailwindcss').TailwindColor} TailwindColor
 * @typedef {DaisyUiColor | TailwindColor} Color
 */

/**
 * All available colors (DaisyUI + Tailwind).
 * @type {string[]}
 */
const colors =
[
    ...daisyui ,
    ...tailwindcss ,
] ;

export default colors ;

// Color utilities

export { default as getAccentColor      } from './accentColor' ;
export { default as getBackgroundColor  } from './backgroundColor' ;
export { default as getBorderColor      } from './borderColor' ;
export { default as getCaretColor       } from './caretColor' ;
export { default as getDecorationColor  } from './decorationColor' ;
export { default as getDivideColor      } from './divideColor' ;
export { default as getFillColor        } from './fillColor' ;
export { default as getFromColor        } from './fromColor' ;
export { default as getOutlineColor     } from './outlineColor' ;
export { default as getPlaceholderColor } from './placeholderColor' ;
export { default as getRingColor        } from './ringColor' ;
export { default as getRingOffsetColor  } from './ringOffsetColor' ;
export { default as getStrokeColor      } from './strokeColor' ;
export { default as getTextColor        } from './textColor' ;
export { default as getToColor          } from './toColor' ;
export { default as getViaColor         } from './viaColor' ;
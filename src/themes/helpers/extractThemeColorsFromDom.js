import { extractColorsFromDom as extractDaisyUiColors  } from '../colors/daisyui'
import { extractColorsFromDom as extractTailwindColors } from '../colors/tailwindcss'

/**
 * Extracts all theme colors from DOM (DaisyUI + Tailwind).
 *
 * @returns {Object.<string, string>} Combined color map.
 *
 * @example
 * ```js
 * const colors = extractThemeColorsFromDOM() ;
 * // → { primary: '#a3e635', 'red-500': 'oklch(...)', ... }
 * ```
 */
const extractThemeColorsFromDOM = ( selectors = ':root' ) =>
{
	const computedStyles = getComputedStyle( document.querySelector( selectors ) );
	return {
		...extractDaisyUiColors( computedStyles ) ,
		...extractTailwindColors( computedStyles )  ,
	};
}

export default extractThemeColorsFromDOM  ;
import { useEffect } from 'react' ;

/**
 * Updates the `<meta name="theme-color">` tag to match the current theme.
 *
 * @param {string|null|undefined} color - The color value to apply (hex format).
 * @param {boolean} [enabled=true] - Whether the update is active.
 */
const useThemeColor = ( color , enabled = true ) =>
{
    useEffect( () =>
    {
        if ( !enabled || !color )
        {
            return ;
        }

        const meta = document.querySelector( 'meta[name="theme-color"]' ) ;

        if ( meta )
        {
            meta.setAttribute( 'content' , color ) ;
        }
    }
    , [ color , enabled ] ) ;
} ;

export default useThemeColor ;
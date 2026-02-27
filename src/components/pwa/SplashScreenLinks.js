/**
 * iOS splash screen definitions for PWA.
 *
 * Each entry defines a device group with its logical viewport dimensions,
 * pixel ratio, and physical resolution used for the splash image filename.
 *
 * @module display/SplashScreenLinks
 */

/**
 * @typedef {Object} SplashDevice
 * @property {string} name - Device group description.
 * @property {number} w - Logical viewport width (CSS pixels).
 * @property {number} h - Logical viewport height (CSS pixels).
 * @property {number} r - Device pixel ratio (-webkit-device-pixel-ratio).
 * @property {number} pw - Physical width (w × r).
 * @property {number} ph - Physical height (h × r).
 */

/**
 * All supported iOS device splash screen specs (portrait only).
 * Sorted from newest to oldest devices.
 *
 * @type {SplashDevice[]}
 */
const devices =
[
    // --- iPhones ---

    { name : 'iPhone 17 Pro Max, 16 Pro Max'                   , w : 440 , h : 956 , r : 3 , pw : 1320 , ph : 2868 } ,
    { name : 'iPhone Air'                                      , w : 420 , h : 912 , r : 3 , pw : 1260 , ph : 2736 } ,
    { name : 'iPhone 17 Pro, 17, 16 Pro'                       , w : 402 , h : 874 , r : 3 , pw : 1206 , ph : 2622 } ,
    { name : 'iPhone 16 Plus, 15 Pro Max, 15 Plus, 14 Pro Max' , w : 430 , h : 932 , r : 3 , pw : 1290 , ph : 2796 } ,
    { name : 'iPhone 16, 15 Pro, 15, 14 Pro'                   , w : 393 , h : 852 , r : 3 , pw : 1179 , ph : 2556 } ,
    { name : 'iPhone 16e, 14, 13, 13 Pro, 12, 12 Pro'          , w : 390 , h : 844 , r : 3 , pw : 1170 , ph : 2532 } ,
    { name : 'iPhone 14 Plus, 13 Pro Max, 12 Pro Max'          , w : 428 , h : 926 , r : 3 , pw : 1284 , ph : 2778 } ,
    { name : 'iPhone 13 mini, 12 mini, 11 Pro, XS, X'          , w : 375 , h : 812 , r : 3 , pw : 1125 , ph : 2436 } ,
    { name : 'iPhone 11 Pro Max, XS Max'                       , w : 414 , h : 896 , r : 3 , pw : 1242 , ph : 2688 } ,
    { name : 'iPhone 11, XR'                                   , w : 414 , h : 896 , r : 2 , pw : 828  , ph : 1792 } ,
    { name : 'iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus'          , w : 414 , h : 736 , r : 3 , pw : 1242 , ph : 2208 } ,
    { name : 'iPhone SE 3rd/2nd, 8, 7, 6s, 6'                  , w : 375 , h : 667 , r : 2 , pw : 750  , ph : 1334 } ,
    { name : 'iPhone SE 1st, iPod touch'                       , w : 320 , h : 568 , r : 2 , pw : 640  , ph : 1136 } ,

    // --- iPads ---

    { name : 'iPad Pro 13" M4'             , w : 1032 , h : 1376 , r : 2 , pw : 2064 , ph : 2752 } ,
    { name : 'iPad Pro 12.9"'              , w : 1024 , h : 1366 , r : 2 , pw : 2048 , ph : 2732 } ,
    { name : 'iPad Pro 11" M4'             , w : 834  , h : 1210 , r : 2 , pw : 1668 , ph : 2420 } ,
    { name : 'iPad Pro 11"'                , w : 834  , h : 1194 , r : 2 , pw : 1668 , ph : 2388 } ,
    { name : 'iPad Air 11", iPad 10th gen' , w : 820  , h : 1180 , r : 2 , pw : 1640 , ph : 2360 } ,
    { name : 'iPad 10.2"'                  , w : 810  , h : 1080 , r : 2 , pw : 1620 , ph : 2160 } ,
    { name : 'iPad Mini 8.3"'              , w : 744  , h : 1133 , r : 2 , pw : 1488 , ph : 2266 } ,
    { name : 'iPad 9.7", iPad Mini older'  , w : 768  , h : 1024 , r : 2 , pw : 1536 , ph : 2048 } ,
] ;

/**
 * Builds the media query string for a splash screen entry.
 *
 * @param {SplashDevice} device - The device spec.
 * @param {'portrait'|'landscape'} orientation - Screen orientation.
 * @returns {string} The CSS media query.
 */
const buildMedia = ( { w , h , r } , orientation ) =>
    `screen and (device-width: ${w}px) and (device-height: ${h}px) and (-webkit-device-pixel-ratio: ${r}) and (orientation: ${orientation})` ;

/**
 * Builds the splash image filename.
 *
 * @param {string} basePath - Base path to the splash images directory.
 * @param {number} width - Image width in physical pixels.
 * @param {number} height - Image height in physical pixels.
 * @returns {string} The full image path.
 */
const buildHref = ( basePath , width , height ) =>
    `${basePath}/splash-${width}x${height}.png` ;

/**
 * @typedef {Object} SplashScreenLinksProps
 * @property {string} [basePath='/assets/splash'] - Path to the splash images directory.
 * @property {boolean} [landscape=false] - Whether to include landscape splash screens.
 */

/**
 * Renders all `<link rel="apple-touch-startup-image">` tags
 * required for iOS PWA splash screens.
 *
 * Place this component inside `<head>` in your root layout.
 *
 * @param {SplashScreenLinksProps} props
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * // In layout.js
 * <head>
 *     <SplashScreenLinks />
 * </head>
 * ```
 *
 * @example
 * ```jsx
 * // With landscape support and custom path
 * <head>
 *     <SplashScreenLinks
 *         basePath  = "/images/splash"
 *         landscape = { true }
 *     />
 * </head>
 * ```
 */
const SplashScreenLinks = ({ basePath = '/assets/splash' , landscape = false }) =>
{
    const links = [] ;

    for ( const device of devices )
    {
        const { name , pw , ph } = device ;

        // Portrait
        links.push(
            <link
                key   = { `${pw}x${ph}-portrait` }
                rel   = "apple-touch-startup-image"
                media = { buildMedia( device , 'portrait' ) }
                href  = { buildHref( basePath , pw , ph ) }
            />
        ) ;

        // Landscape (reversed dimensions)
        if ( landscape )
        {
            links.push(
                <link
                    key   = { `${ph}x${pw}-landscape` }
                    rel   = "apple-touch-startup-image"
                    media = { buildMedia( device , 'landscape' ) }
                    href  = { buildHref( basePath , ph , pw ) }
                />
            ) ;
        }
    }

    return <>{ links }</> ;
} ;

/**
 * Exported device list for use in splash image generation scripts.
 */
export { devices } ;

export default SplashScreenLinks ;
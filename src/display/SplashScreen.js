'use client';

import cn from '../themes/helpers/cn' ;

import SplashFooter from './splashScreen/SplashFooter' ;
import SplashHeader from './splashScreen/SplashHeader' ;
import SplashLoader from './splashScreen/SplashLoader' ;
import SplashLogo   from './splashScreen/SplashLogo' ;

/**
 * Splash screen displayed while the application is loading.
 *
 * Renders a full-screen overlay with configurable header, logo, loader and footer.
 * Typically used in combination with `AnimatePresence` for a fade-in/out transition.
 *
 * @component
 *
 * @param {Object}  props
 * @param {string}  [props.className]            - Additional class names for the root element.
 * @param {string}  [props.footer]               - Footer text content.
 * @param {string}  [props.footerClassName]      - Additional class names for the footer.
 * @param {string}  [props.header]               - Header text content.
 * @param {string}  [props.headerClassName]      - Additional class names for the header.
 * @param {string}  [props.loaderClassName]      - Additional class names for the loader (DaisyUI variants).
 * @param {*}       [props.logo]                 - Logo asset passed to SplashLogo.
 * @param {string}  [props.logoClassName]        - Additional class names for the logo.
 * @param {boolean} [props.showFooter=true]      - Whether to render the footer.
 * @param {boolean} [props.showHeader=true]      - Whether to render the header.
 * @param {boolean} [props.showLoader=true]      - Whether to render the loader.
 * @param {boolean} [props.showLogo=true]        - Whether to render the logo.
 *
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * // Basic usage with spread config
 * <SplashScreen { ...splashScreen } />
 * ```
 *
 * @example
 * ```jsx
 * // Manual usage
 * <SplashScreen
 *     header     = "My Application"
 *     footer     = "version 1.0.0"
 *     logo       = { logo }
 *     showLoader = { true }
 * />
 * ```
 */
const SplashScreen =
({
     className ,
     footer ,
     footerClassName = '' ,
     header ,
     headerClassName = '' ,
     loaderClassName = '' ,
     logo ,
     logoClassName   = '' ,
     showFooter    = true ,
     showHeader    = true ,
     showLoader    = true ,
     showLogo      = true ,
}) =>
{
    return (
        <div
            className  = { cn( 'flex grow flex-col min-h-screen', className ) }
            role       = "status"
            aria-live  = "polite"
            aria-label = "Application loading"
        >

            {
                showHeader && header && (
                    <SplashHeader
                        text      = { header }
                        className = { headerClassName }
                    />
                )
            }

            <div className="flex grow items-center justify-center flex-col gap-8">

                {/* Application logo */ }
                {
                    showLogo && logo && (
                        <SplashLogo
                            logo      = { logo }
                            className = { logoClassName }
                        />
                    )
                }

                {
                    showLoader && (
                        <SplashLoader className={ loaderClassName } />
                    )
                }

            </div>

            {
                showFooter && footer && (
                    <SplashFooter
                        text      = { footer }
                        className = { footerClassName }
                    />
                )
            }

        </div>
    );
};

export default SplashScreen;
'use client';

import cn from '@/themes/helpers/cn' ;

import splashScreen from '@/@configs/ui/splashScreen' ;

import SplashFooter from '@/display/splashScreen/SplashFooter' ;
import SplashHeader from '@/display/splashScreen/SplashHeader' ;
import SplashLoader from '@/display/splashScreen/SplashLoader' ;
import SplashLogo   from '@/display/splashScreen/SplashLogo' ;

/**
 * Splash screen displayed while the application is loading.
 *
 * Displays configurable header, logo, loader and footer based on
 * the configuration file @/@configs/ui/splashScreen.
 *
 * Features:
 * - Theme-aware logo rendering via ThemedImage
 * - Configurable visibility for each section
 * - Customizable typography via headerClassName and footerClassName
 * - Customizable loader style via loaderClassName (DaisyUI variants)
 * - Customizable logo size via logoClassName
 * - Full accessibility support with ARIA attributes
 * - Responsive layout with flexbox
 * - Custom pattern background support
 *
 * @component
 * @example
 * // Configured via @/@configs/ui/splashScreen
 * <SplashScreen />
 *
 * @returns {React.JSX.Element}
 */
const SplashScreen = () =>
{
    const {
        className,
        footer,
        footerClassName = '',
        header,
        headerClassName = '',
        loaderClassName = '',
        logo,
        logoClassName   = '',
        showFooter      = true,
        showHeader      = true,
        showLoader      = true,
        showLogo        = true,
    }
    = splashScreen;

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
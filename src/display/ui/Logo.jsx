import NextLink from 'next/link' ;

import ThemedImage from '../../components/images/ThemedImage' ;

import useConfig from '../../contexts/config' ;

import cn from '../../themes/helpers/cn' ;

/**
 * @typedef {Object} LogoConfig
 * @property {string} [className] - CSS classes for wrapper.
 * @property {string} [containerClassName] - CSS classes for logo container (default: 'relative size-24').
 * @property {string} [dark] - Dark mode logo source.
 * @property {string} [href='/'] - Home route for logo link.
 * @property {string} [imageClassName] - CSS classes for ThemedImage.
 * @property {string} [light] - Light mode logo source.
 * @property {boolean} [show=true] - Whether to display the logo.
 */

/**
 * Logo component with navigation link.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional wrapper class names.
 * @param {string} [props.containerClassName] - CSS classes for logo container (default: 'relative size-24').
 * @param {string} [props.dark] - Dark mode logo source.
 * @param {string} [props.href='/'] - Home route for logo link.
 * @param {string} [props.imageClassName] - Additional CSS classes for ThemedImage.
 * @param {string} [props.light] - Light mode logo source.
 * @param {Function} [props.onClick] - Called on click (closes mobile drawer).
 * @param {string} [props.path='ui.logo'] - Config context path.
 * @param {boolean} [props.show=true] - Whether to display the logo.
 *
 * @example
 * ```jsx
 * // Via config only
 * <Logo />
 * ```
 *
 * @example
 * ```jsx
 * // Image logo with custom size
 * <Logo
 *     light="/logo-light.svg"
 *     dark="/logo-dark.svg"
 *     containerClassName="size-32"
 * />
 * ```
 *
 * @example
 * ```jsx
 * // Custom styling
 * <Logo
 *     light="/logo.svg"
 *     className="bg-primary"
 *     imageClassName="opacity-80"
 * />
 * ```
 *
 * @example
 * ```jsx
 * // Hide logo
 * <Logo show={false} />
 * ```
 *
 * @example
 * ```jsx
 * // Custom config path
 * <Logo path="header.logo" />
 * ```
 */
const Logo =
({
    onClick ,
    path        = 'ui.logo',
    className          : classNameProp ,
    containerClassName : containerClassNameProp ,
    imageClassName     : imageClassNameProp ,
    dark               : darkProp,
    light              : lightProp,
    href               : hrefProp ,
    show               : showProp = true,
}) =>
{
    const
    {
        className          = classNameProp,
        containerClassName = containerClassNameProp ,
        dark               = darkProp,
        href               = hrefProp,
        light              = lightProp,
        imageClassName     = imageClassNameProp,
        show               = showProp ,
    }
    = useConfig( path ) ?? {} ;

    if ( show === false )
    {
        return null ;
    }

    if ( light )
    {
        return (
            <div className={ cn( 'flex items-center justify-center w-full flex-none text-base-content' , className ) }>
                <NextLink
                    href      = { href }
                    className = "flex-none"
                    onClick   = { onClick }
                >
                    <div className={ cn( 'relative size-24' , containerClassName  ) }>
                        <ThemedImage
                            src       = { light }
                            dark      = { dark }
                            alt       = "Logo"
                            draggable = { false }
                            fill      = { true }
                            className = { cn( "object-contain select-none pointer-events-none" , imageClassName ) }
                            preload
                        />
                    </div>
                </NextLink>
            </div>
        ) ;
    }

    return null ;
} ;

export default Logo ;
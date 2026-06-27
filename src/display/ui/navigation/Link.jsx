/**
 * Link component for menu navigation.
 *
 * @module components/menu/Link
 */

import { use } from 'react' ;

import NextLink from 'next/link' ;

import { usePathname } from 'next/navigation' ;

import isObject   from 'vegas-js-core/src/isPlainObject' ;
import notEmpty   from 'vegas-js-core/src/strings/notEmpty' ;

import cn from '../../../themes/helpers/cn' ;

import Badge from '../../../components/Badge' ;

import NavigationContext from '../../../contexts/navigation/context' ;
import isPathMatch       from '../../../contexts/navigation/helpers/isPathMatch' ;

/**
 * Returns a Badge element from a string or object definition.
 *
 * @param {string|BadgeProps} badge - Badge label or props object.
 * @returns {React.ReactElement|null} The Badge element or null.
 */
const getBadge = ( badge ) =>
{
    if ( notEmpty( badge ) )
    {
        return <Badge>{ badge }</Badge> ;
    }

    if ( isObject( badge ) )
    {
        const { label , ...props } = badge ;
        return <Badge { ...props }>{ label }</Badge> ;
    }

    return null ;
} ;

/**
 * @typedef {Object} BadgeProps
 * @property {string} label - Badge text content.
 * @property {string} [color] - Badge color variant.
 * @property {string} [className] - Additional class names.
 * @property {string} [size] - Badge size.
 * @property {boolean} [outline] - Outline style.
 */

/**
 * Default active-link style — neutral, transparent darkening that works
 * in both light and dark themes through DaisyUI semantic tokens. Subtle
 * by design: relies on the `font-medium` weight bump as a secondary cue
 * so the active state stays readable without competing visually with
 * the page content.
 */
const DEFAULT_ACTIVE_CLASSNAME = 'bg-base-content/10 font-medium' ;

/**
 * @typedef {Object} LinkProps
 * @property {string|BadgeProps} [badge] - Badge label or configuration object.
 * @property {string} [className] - Additional class names.
 * @property {string} [activeClassName] - Override for the default
 *   active-link style applied when the current pathname matches `path`.
 * @property {React.ComponentType<{ size?: number }>} [Icon] - Icon component.
 * @property {number} [iconSize=20] - Icon size in pixels.
 * @property {string} [label] - Link text content.
 * @property {Function} [onAction] - Callback fired on click.
 * @property {string} [path] - Navigation path.
 */

/**
 * Renders a navigation link inside a menu.
 *
 * @param {LinkProps} props
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * <Link
 *     label = "Formulaire"
 *     Icon  = { FormIcon }
 *     path  = "/form"
 *     badge = {{ label: 'new', color: 'info', outline: true }}
 * />
 *
 * <Link
 *     label = "Dashboard"
 *     Icon  = { DashIcon }
 *     path  = "/dashboard"
 *     badge = "3"
 * />
 * ```
 */
const Link =
({
     badge ,
     className ,
     activeClassName ,
     Icon ,
     iconSize = 20 ,
     label ,
     onAction ,
     path ,
 }) =>
{
    const pathname = usePathname() ;

    // Defensive read: a Link may be rendered without a NavigationProvider
    // (legacy / standalone). With a provider, the single winning path is
    // pre-computed (longest match) → exact equality. Without, fall back to
    // a local segment-aware match so a lone Link still highlights itself.
    const navigation = use( NavigationContext ) ;

    const active = navigation ? path === navigation.activePath : isPathMatch( pathname , path ) ;

    const classNames = cn
    (
        'space-x-4' ,
        active && ( activeClassName ?? DEFAULT_ACTIVE_CLASSNAME ) ,
        className ,
    ) ;

    const handleClick = e =>
    {
        if ( onAction )
        {
            onAction( e ) ;
        }
    } ;

    const content =
    (
        <>
            { Icon && <Icon size={ iconSize } /> }
            { label }
            { getBadge( badge ) }
        </>
    ) ;

    return (
        <li>
        { path
            ? (
                <NextLink
                    className   = { classNames }
                    href        = { path }
                    onClick     = { handleClick }
                    data-active = { active || undefined }
                >
                    { content }
                </NextLink>
            )
            : (
                <a
                    className   = { classNames }
                    onClick     = { handleClick }
                    data-active = { active || undefined }
                >
                    { content }
                </a>
            )
        }
        </li>
    ) ;
} ;

export default Link ;
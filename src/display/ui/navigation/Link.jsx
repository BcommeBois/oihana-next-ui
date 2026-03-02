/**
 * Link component for menu navigation.
 *
 * @module components/menu/Link
 */

import NextLink from 'next/link' ;

import { usePathname } from 'next/navigation' ;

import isObject   from 'vegas-js-core/src/isPlainObject' ;
import notEmpty   from 'vegas-js-core/src/strings/notEmpty' ;
import startsWith from 'vegas-js-core/src/strings/startsWith' ;

import cn from '../../../themes/helpers/cn' ;

import Badge from '../../../components/Badge' ;

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
 * @typedef {Object} LinkProps
 * @property {string|BadgeProps} [badge] - Badge label or configuration object.
 * @property {string} [className] - Additional class names.
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
     Icon ,
     iconSize = 20 ,
     label ,
     onAction ,
     path ,
 }) =>
{
    const pathname = usePathname() ;

    const active = startsWith( pathname , path ) ;

    const classNames = cn
    (
        'space-x-4' ,
        { active } ,
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
                    className = { classNames }
                    href      = { path }
                    onClick   = { handleClick }
                >
                    { content }
                </NextLink>
            )
            : (
                <a
                    className = { classNames }
                    onClick   = { handleClick }
                >
                    { content }
                </a>
            )
        }
        </li>
    ) ;
} ;

export default Link ;
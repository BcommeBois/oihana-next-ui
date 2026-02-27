'use client' ;

/**
 * Blockquote component with optional icon and styling.
 *
 * @module components/typography/Blockquote
 */

import cn from '@/themes/helpers/cn' ;

import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import parseHtml from '@/helpers/parseHtml' ;

import getBorderColor from '@/themes/colors/borderColor' ;

import { MdFormatQuote as DefaultIcon } from 'react-icons/md' ;

/**
 * @param {Object} props
 * @param {boolean} [props.bordered=true] - Show left border.
 * @param {React.ReactNode} props.children - Quote content.
 * @param {string} [props.className] - Additional classes.
 * @param {string} [props.containerClassName] - Container classes.
 * @param {string} [props.color] - Border color.
 * @param {boolean} [props.disabled] - Disabled state.
 * @param {string} [props.disabledClassName] - Disabled state classes.
 * @param {boolean} [props.html=false] - Parse children as HTML.
 * @param {React.ComponentType} [props.Icon] - Custom icon component.
 * @param {React.ReactNode} [props.icon] - Custom icon element.
 * @param {string} [props.iconClassName] - Icon classes.
 * @param {string} [props.iconColor] - Icon color.
 * @param {string} [props.quoteClassName] - Quote text classes.
 * @param {boolean} [props.showIcon=true] - Show icon.
 * @returns {React.JSX.Element}
 *
 * @example
 * ```jsx
 * <Blockquote>
 *     This is a simple quote
 * </Blockquote>
 *
 * <Blockquote color="primary" showIcon>
 *     Quote with colored border and icon
 * </Blockquote>
 *
 * <Blockquote html bordered={ false }>
 *     <strong>HTML</strong> content quote
 * </Blockquote>
 * ```
 */
const Blockquote =
({
    bordered = true ,
    children ,
    className ,
    containerClassName ,
    color ,
    disabled ,
    disabledClassName = 'opacity-60' ,
    html = false ,
    Icon = DefaultIcon ,
    icon ,
    iconClassName ,
    iconColor ,
    quoteClassName ,
    showIcon = false ,
}) =>
{
    // Icon element
    const iconElement = showIcon && (
        icon ?? (
            Icon && (
                <Icon
                    className={ cn( 'flex-none size-12' , iconClassName ) }
                    style={ iconColor ? { color: iconColor } : undefined }
                />
            )
        )
    ) ;

    // Quote content
    const content = notEmpty( children ) && html ? parseHtml( children ) : children ;
    const quoteElement = content && (
        <div
            className={ cn(
                'prose text-sm italic font-normal leading-relaxed text-base-content text-center md:text-justify' ,
                quoteClassName ,
            ) }
        >
            { content }
        </div>
    ) ;

    // Main container classes
    const blockquoteClasses = cn(
        'flex flex-col md:flex-row items-center gap-4 bg-base-200 rounded-lg shadow-md' ,
        bordered ? 'border-l-4 pl-2 md:pl-4 pr-4 md:pr-8 py-4' : 'p-4 md:pr-8' ,
        bordered && color && getBorderColor( color ) ,
        disabled && disabledClassName ,
        className ,
    ) ;

    const containerClasses = cn( 'flex flex-col gap-2 grow' , containerClassName ) ;

    return (
        <blockquote className={ blockquoteClasses }>
            { iconElement }
            <div className={ containerClasses }>
                { quoteElement }
            </div>
        </blockquote>
    ) ;
} ;

Blockquote.displayName = 'Blockquote' ;

export default Blockquote ;
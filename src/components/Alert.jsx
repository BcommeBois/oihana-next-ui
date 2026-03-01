'use client' ;

import { MdCheckCircle, MdClose, MdErrorOutline, MdInfo, MdNotifications, MdWarning } from 'react-icons/md' ;

import cn                  from '../themes/helpers/cn' ;
import getAlertClassNames  from '../themes/components/alert' ;
import getButtonClassNames from '../themes/components/button' ;
import getTextClassNames   from '../themes/typography/getTextClassNames' ;
import notEmpty            from 'vegas-js-core/src/strings/notEmpty' ;
import parseHtml           from '../helpers/parseHtml' ;

import { ERROR, INFO, SUCCESS, WARNING } from '../themes/colors' ;

/**
 * Alert notification component with DaisyUI styling.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Alert content
 * @param {string} [props.className] - Container class name
 * @param {string} [props.contentClassName] - Inner content class name
 * @param {boolean} [props.html=false] - Parse children as HTML
 * @param {string} [props.level] - Alert level: error, info, success, warning
 * @param {Function} [props.onClose] - Close callback
 * @param {string} [props.iconClassName] - Icon class name
 * @param {import('react').ElementType} [props.CloseIcon] - Custom Close Icon
 * @param {import('react').ElementType} [props.Icon] - Default fallback Icon
 * @param {import('react').ReactNode} [props.option] - Custom action element
 * @param {boolean} [props.showCloseButton=true] - Show/hide close button
 * @param {boolean} [props.showIcon=true] - Show/hide level icon
 * @param {Object} [props.ref] - Container ref (React 19)
 */
const Alert =
({
    children ,
    className ,
    contentClassName ,
    html = false ,
    level ,
    onClose ,

    iconClassName ,
    CloseIcon        = MdClose ,
    ErrorIcon  = MdErrorOutline ,
    InfoIcon   = MdInfo ,
    SuccessIcon= MdCheckCircle ,
    WarningIcon= MdWarning ,
    Icon             = MdNotifications ,
    option ,
    showCloseButton = true ,
    showIcon        = true ,

    ref ,

    ...rest
}) =>
{
    // Icon mapping logic
    const iconMap = {
        [ ERROR   ] : ErrorIcon ,
        [ INFO    ] : InfoIcon ,
        [ SUCCESS ] : SuccessIcon ,
        [ WARNING ] : WarningIcon ,
    } ;

    const SelectedIcon = iconMap[ level ] || Icon ;

    // Alert styles
    const alertClasses = getAlertClassNames({
        beforeClassName : 'w-full flex! justify-between! items-center! gap-4! text-pretty text-start hyphens-auto' ,
        className ,
        color           : level ,
    }) ;

    // Content color (DaisyUI utility for high contrast text on colored backgrounds)
    const contentColor = level ? `${ level }-content` : null ;

    // --- Components

    const iconElement = showIcon && SelectedIcon && (
        <SelectedIcon
            className = { getTextClassNames({
                beforeClassName : 'size-6 shrink-0' ,
                className       : iconClassName ,
                color           : contentColor ,
            })}
        />
    ) ;

    const content        = notEmpty( children ) && html ? parseHtml( children ) : children ;
    const contentElement = content && (
        <div className={ cn( 'flex-1 min-w-0 font-medium' , contentClassName ) }>
            { content }
        </div>
    ) ;

    const optionElement = option ?? (
        showCloseButton && onClose && (
            <button
                className = { getButtonClassNames({
                    beforeClassName : 'shrink-0' ,
                    color           : level ,
                    shape           : 'circle' ,
                    size            : 'sm' ,
                    style           : 'ghost' , // Un bouton ghost est souvent plus élégant ici
                })}
                onClick   = { onClose }
                type      = "button"
            >
                <CloseIcon
                    className = { getTextClassNames({
                        beforeClassName : 'size-5' ,
                        color           : contentColor ,
                    })}
                />
            </button>
        )
    ) ;

    return (
        <div
            className = { alertClasses }
            ref       = { ref }
            role      = "alert"
            { ...rest }
        >
            { iconElement }
            { contentElement }
            { optionElement }
        </div>
    ) ;
} ;

Alert.displayName = 'Alert' ;

export default Alert ;
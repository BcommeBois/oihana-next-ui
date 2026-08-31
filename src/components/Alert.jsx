'use client' ;

import { MdCheckCircle, MdClose, MdErrorOutline, MdInfo, MdNotifications, MdWarning } from 'react-icons/md' ;

import useI18n             from '../contexts/locale/useI18n' ;
import NO_LOCALE           from '../contexts/locale/noLocale' ;
import cn                  from '../themes/helpers/cn' ;
import getAlertClassNames  from '../themes/components/alert' ;
import getButtonClassNames from '../themes/components/button' ;
import notEmpty            from 'vegas-js-core/src/strings/notEmpty' ;
import parseHtml           from '../helpers/parseHtml' ;

import { HORIZONTAL, VERTICAL } from '../themes/components/alert' ;

import { ERROR, INFO, SUCCESS, WARNING } from '../themes/colors' ;

/**
 * Alert notification component with DaisyUI styling.
 *
 * @example
 * ```jsx
 * // Level — the semantics : it picks the icon and, unless `color` says otherwise, the color.
 * <Alert level="error">Saving failed.</Alert>
 *
 * // Style variants and layout direction.
 * <Alert level="info" style="soft">Your session expires in 15 minutes.</Alert>
 * <Alert level="warning" style="outline" direction="vertical">Storage is almost full.</Alert>
 *
 * // Color — every DaisyUI color, including the four DaisyUI has no alert class for.
 * <Alert level="info" color="primary">A house color on an informative alert.</Alert>
 *
 * // Any other color : the component is driven by a single CSS variable.
 * <Alert containerStyle={{ '--alert-color' : '#7c3aed' }}>An arbitrary color.</Alert>
 * ```
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children - Alert content
 * @param {string} [props.className] - Container class name
 * @param {string} [props.closeLabel] - Name of the close cross. Defaults to the i18n `close` key read at `path`.
 * @param {import('../themes/components/alert').AlertColor} [props.color] - Alert color. Defaults to `level`.
 * @param {import('react').CSSProperties} [props.containerStyle] - Inline style of the container. `--alert-color` sets an arbitrary color.
 * @param {string} [props.contentClassName] - Inner content class name
 * @param {import('../themes/components/alert').AlertDirection} [props.direction] - Layout direction: horizontal, vertical
 * @param {boolean} [props.html=false] - Parse children as HTML
 * @param {string} [props.level] - Alert level: error, info, success, warning
 * @param {Function} [props.onClose] - Close callback
 * @param {string} [props.iconClassName] - Icon class name
 * @param {import('react').ElementType} [props.CloseIcon] - Custom Close Icon
 * @param {import('react').ElementType} [props.Icon] - Default fallback Icon
 * @param {import('react').ReactNode} [props.option] - Custom action element
 * @param {string} [props.path='components.alert'] - i18n path the labels are read from.
 * @param {boolean} [props.showCloseButton=true] - Show/hide close button
 * @param {boolean} [props.showIcon=true] - Show/hide level icon
 * @param {import('../themes/components/alert').AlertStyle} [props.style] - Alert style variant: dash, outline, soft
 * @param {Object} [props.ref] - Container ref (React 19)
 */
const Alert =
({
    children ,
    className ,
    closeLabel ,
    color ,
    containerStyle ,
    contentClassName ,
    direction ,
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
    path            = 'components.alert' ,
    showCloseButton = true ,
    showIcon        = true ,
    style ,

    ref ,

    ...rest
}) =>
{
    // Icon mapping logic
    const { close : closeFromI18n = 'Close' } = useI18n( path , NO_LOCALE , false ) ;

    const closeText = closeLabel ?? closeFromI18n ;

    const iconMap = {
        [ ERROR   ] : ErrorIcon ,
        [ INFO    ] : InfoIcon ,
        [ SUCCESS ] : SuccessIcon ,
        [ WARNING ] : WarningIcon ,
    } ;

    const SelectedIcon = iconMap[ level ] || Icon ;

    // Alert styles
    const alertClasses = getAlertClassNames({
        beforeClassName : cn
        (
            'w-full flex! justify-between! items-center! gap-4! text-pretty text-start hyphens-auto' ,

            // DaisyUI lays an alert out as a grid, this one forces flex to push the
            // option to the far edge — so the direction has to be said again in flex
            // terms, `alert-vertical` having nothing to act on once the grid is gone.
            direction === VERTICAL   && 'flex-col! items-center! text-center!' ,
            direction === HORIZONTAL && 'flex-row!' ,
        ) ,
        className ,
        color           : color ?? level ,
        direction ,
        style ,
    }) ;

    // --- Components

    // No color on what the alert contains : the container already carries the one
    // its color and its variant call for, and anything set here would override it.
    const iconElement = showIcon && SelectedIcon && (
        <SelectedIcon className={ cn( 'size-6 shrink-0' , iconClassName ) } />
    ) ;

    const content = notEmpty( children ) && html ? parseHtml( children ) : children ;
    const contentElement = content && (
        <div className={ cn( 'flex-1 min-w-0 font-medium' , contentClassName ) }>
            { content }
        </div>
    ) ;

    const optionElement = option ?? (
        showCloseButton && onClose && (
            // A cross and nothing else : both the name a screen reader reads and
            // the tooltip a pointer gets, as `Modal` and `Popover` already do.
            <button
                aria-label = { closeText }
                className = { getButtonClassNames({
                    // `text-current` and a tint of it : the cross follows the alert
                    // whatever its color, where a colored ghost button would paint
                    // itself in the very hue it sits on.
                    beforeClassName : 'shrink-0 text-current hover:bg-current/10' ,
                    shape           : 'circle' ,
                    size            : 'sm' ,
                    style           : 'ghost' , // A ghost button usually reads better here
                })}
                onClick   = { onClose }
                title     = { closeText }
                type      = "button"
            >
                <CloseIcon
                    aria-hidden = "true"
                    className   = "size-5"
                />
            </button>
        )
    ) ;

    return (
        <div
            className = { alertClasses }
            ref       = { ref }
            role      = "alert"
            style     = { containerStyle }
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

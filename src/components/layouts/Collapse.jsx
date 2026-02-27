'use client' ;

import cn from '@/themes/helpers/cn' ;

import getCollapseClasses, { CONTENT, TITLE } from '@/themes/components/collapse' ;

/**
 * Collapse mode types.
 * @typedef {'checkbox'|'focus'|'radio'|'details'} CollapseMode
 */
export const CHECKBOX = 'checkbox' ;
export const DETAILS  = 'details' ;
export const FOCUS    = 'focus' ;
export const RADIO    = 'radio' ;

/**
 * Collapse component for showing and hiding content with various interaction modes.
 * Supports checkbox, focus, radio, and native details/summary patterns.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element for container (div for checkbox/focus/radio, details for details mode)
 * @param {React.ReactNode} [props.children] - Content to show/hide
 * @param {string} [props.className] - Additional classes for container
 * @param {boolean} [props.close=false] - Force close state (collapse-close)
 * @param {string} [props.contentClassName] - Additional classes for content wrapper
 * @param {boolean} [props.defaultChecked=false] - Initial checked state (checkbox/radio modes)
 * @param {boolean} [props.defaultOpen=false] - Initial open state (details mode)
 * @param {boolean} [props.disabled=false] - Disable interaction and hide icon
 * @param {'arrow'|'plus'} [props.icon] - Icon type (arrow or plus/minus)
 * @param {'checkbox'|'focus'|'radio'|'details'} [props.mode='checkbox'] - Interaction mode
 * @param {string} [props.name] - Name for radio group (radio mode only)
 * @param {boolean} [props.open=false] - Force open state (collapse-open)
 * @param {number} [props.tabIndex=0] - Tab index (focus mode only)
 * @param {React.ReactNode} [props.title] - Title content
 * @param {string} [props.titleClassName] - Additional classes for title
 * @param {React.ElementType} [props.TitleComponent='div'] - HTML element for title (div for checkbox/focus/radio, summary for details mode)
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 * @param {Object} [props.rest] - Additional props forwarded to container
 *
 * @example
 * // Checkbox mode (default)
 * <Collapse
 *     title="How do I create an account?"
 *     icon="arrow"
 * >
 *     Click the "Sign Up" button and follow the process.
 * </Collapse>
 *
 * @example
 * // Focus mode
 * <Collapse
 *     mode="focus"
 *     title="Question"
 *     icon="plus"
 * >
 *     Answer content here
 * </Collapse>
 *
 * @example
 * // Radio mode (accordion)
 * <div>
 *     <Collapse mode="radio" name="faq" title="Question 1">Answer 1</Collapse>
 *     <Collapse mode="radio" name="faq" title="Question 2">Answer 2</Collapse>
 * </div>
 *
 * @example
 * // Details mode (native HTML)
 * <Collapse
 *     mode="details"
 *     defaultOpen
 *     title="Searchable content"
 * >
 *     This content is searchable in browser
 * </Collapse>
 *
 * @example
 * // Force open/close
 * <Collapse open title="Always open">Content</Collapse>
 * <Collapse close title="Always closed">Content</Collapse>
 *
 * @example
 * // Custom styling
 * <Collapse
 *     className="bg-base-100 border border-base-300"
 *     titleClassName="font-semibold"
 *     contentClassName="text-sm"
 *     icon="arrow"
 *     title="Custom styled"
 * >
 *     Content here
 * </Collapse>
 */
const Collapse =
({
    as ,
    children ,
    className ,
    close = false ,
    contentClassName ,
    defaultChecked = false ,
    defaultOpen = false ,
    disabled = false ,
    icon ,
    mode = CHECKBOX ,
    name ,
    open = false ,
    tabIndex = 0 ,
    title ,
    titleClassName ,
    TitleComponent ,

    ref ,

    ...rest
}) =>
{
    // --------- Class names

    const containerClasses = getCollapseClasses({
        className ,
        close ,
        disabled ,
        icon ,
        open ,
    }) ;

    const contentClasses = cn( CONTENT , contentClassName ) ;
    const titleClasses   = cn( TITLE , titleClassName ) ;

    // --------- Mode-specific rendering

    // Details mode (native HTML <details>/<summary>)
    if ( mode === DETAILS )
    {
        const DetailsTitle = TitleComponent || 'summary' ;

        return (
            <details
                className = { containerClasses }
                open      = { defaultOpen }
                ref       = { ref }
                { ...rest }
            >
                <DetailsTitle className={ titleClasses }>
                    { title }
                </DetailsTitle>
                <div className={ contentClasses }>
                    { children }
                </div>
            </details>
        ) ;
    }

    // Standard modes (checkbox, focus, radio)
    const Container      = as || 'div' ;
    const TitleElement   = TitleComponent || 'div' ;
    const shouldTabIndex = mode === FOCUS ;

    return (
        <Container
            className = { containerClasses }
            ref       = { ref }
            tabIndex  = { shouldTabIndex ? tabIndex : undefined }
            { ...rest }
        >
            { mode === CHECKBOX && (
                <input
                    defaultChecked = { defaultChecked }
                    disabled       = { disabled }
                    type           = "checkbox"
                />
            )}

            { mode === RADIO && (
                <input
                    defaultChecked = { defaultChecked }
                    disabled       = { disabled }
                    name           = { name }
                    type           = "radio"
                />
            )}

            <TitleElement className={ titleClasses }>
                { title }
            </TitleElement>

            <div className={ contentClasses }>
                { children }
            </div>
        </Container>
    ) ;
} ;

Collapse.displayName = 'Collapse' ;

export default Collapse ;
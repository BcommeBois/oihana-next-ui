'use client' ;

import useValue from '../hooks/useValue' ;
import useDropdownPosition from '../themes/hooks/useDropdownPosition' ;

import Button from './Button' ;
import Popover from './Popover' ;

/**
 * PopoverButton — a button that owns its {@link module:components/Popover}.
 *
 * The montage every anchored panel repeats — the position hook, the
 * `recalculate()` before opening, the open state, and the five props that carry
 * the computed direction and placement to the popover — written once. What is
 * left at the call site is the button and the panel.
 *
 * `children` is the **button's** content, as everywhere else in this library ;
 * the panel goes to `panel`, which takes a node or **a function receiving
 * `{ close }`** — a grid cannot dismiss what it does not know about, so closing
 * on pick stays the caller's decision and this is what makes it one line.
 *
 * The trigger is the anchor, not a wrapper around it : a button knows its own
 * bounds. (The field pickers anchor on the whole field instead, which is why
 * they keep their own wrapper and not this.)
 *
 * It also carries the three attributes the hand-written triggers keep
 * forgetting : `type="button"`, so one placed in a form submits nothing ;
 * `aria-haspopup="dialog"` ; and `aria-expanded`, which nothing in the library
 * was setting.
 *
 * @module components/PopoverButton
 *
 * @param {Object} props
 * @param {string} [props.ariaLabel] - Accessible name of the panel (see `Popover`).
 * @param {React.ReactNode} [props.children] - The button's content.
 * @param {boolean} [props.defaultOpen=false] - Initial open state (uncontrolled).
 * @param {'responsive'|'dropdown'|'modal'} [props.display='responsive'] - Popover display mode.
 * @param {boolean} [props.open] - Controlled open state.
 * @param {(open: boolean) => void} [props.onOpenChange] - Open-state handler.
 * @param {React.ReactNode|((api: {close: () => void}) => React.ReactNode)} props.panel - The panel's content. As a function, it receives `close`.
 * @param {number} [props.panelHeight] - Estimated panel height, for the direction guess. Worth passing : the hook's default is a small menu.
 * @param {number} [props.panelWidth] - Estimated panel width, same.
 * @param {string} [props.panelClassName] - Extra classes for the panel.
 * @param {'top'|'bottom'} [props.preferredDirection] - Fallback opening direction.
 * @param {'start'|'center'|'end'} [props.preferredPlacement] - Fallback alignment.
 * @param {Object} props.rest - Everything else goes to {@link module:components/Button} (`color`, `size`, `style`, `icon`, `disabled`…), plus the `Popover` pass-through props (`title`, `fullScreen`, `showFooter`, `onApply`, `onCancel`, `applyLabel`, `cancelLabel`).
 *
 * @example
 * ```jsx
 * <PopoverButton
 *     icon  = { PeriodIcon }
 *     panel = { ({ close }) => (
 *         <MonthYearPicker value={ period } onChange={ ( value ) => { setPeriod( value ) ; close() ; } } />
 *     ) }
 * >
 *     { label }
 * </PopoverButton>
 * ```
 */
const PopoverButton =
({
    applyDisabled ,
    applyLabel ,
    ariaLabel ,
    ariaLabelledBy ,
    cancelLabel ,
    children ,
    closeLabel ,
    defaultOpen = false ,
    display = 'responsive' ,
    fullScreen ,
    initialFocusRef ,
    onApply ,
    onCancel ,
    onClick ,
    onOpenChange ,
    open : openFromProps ,
    panel ,
    panelClassName ,
    panelHeight ,
    panelWidth ,
    preferredDirection ,
    preferredPlacement ,
    showFooter ,
    title ,
    trapFocus ,
    ...rest
}) =>
{
    const [ isOpen , setOpen ] = useValue( defaultOpen , openFromProps , onOpenChange ) ;

    // Only the estimates the caller gave : the hook's own defaults describe a small
    // menu, and they are what decides which way the panel opens.
    const { ref : anchorRef , direction , placement , recalculate } = useDropdownPosition({
        ...( panelWidth  !== undefined && { panelWidth  } ) ,
        ...( panelHeight !== undefined && { panelHeight } ) ,
        ...( preferredDirection !== undefined && { preferredDirection } ) ,
        ...( preferredPlacement !== undefined && { preferredPlacement } ) ,
    }) ;

    const close = () => setOpen( false ) ;

    const handleClick = ( event ) =>
    {
        onClick?.( event ) ;

        if ( !isOpen )
        {
            recalculate() ;
        }

        setOpen( !isOpen ) ;
    } ;

    // Built only while open, so a `panel` function is never run for a panel that is
    // not on screen.
    const content = isOpen
        ? ( typeof panel === 'function' ? panel({ close }) : panel )
        : null ;

    return (
        <>
            <Button
                { ...rest }
                ref           = { anchorRef }
                type          = "button"
                aria-haspopup = "dialog"
                aria-expanded = { isOpen }
                onClick       = { handleClick }
            >
                { children }
            </Button>

            <Popover
                anchorRef       = { anchorRef }
                applyDisabled   = { applyDisabled }
                applyLabel      = { applyLabel }
                ariaLabel       = { ariaLabel }
                ariaLabelledBy  = { ariaLabelledBy }
                cancelLabel     = { cancelLabel }
                closeLabel      = { closeLabel }
                direction       = { direction }
                display         = { display }
                fullScreen      = { fullScreen }
                initialFocusRef = { initialFocusRef }
                isOpen          = { isOpen }
                onApply         = { onApply }
                onCancel        = { onCancel }
                onClose         = { close }
                panelClassName  = { panelClassName }
                placement       = { placement }
                showFooter      = { showFooter }
                title           = { title }
                trapFocus       = { trapFocus }
            >
                { content }
            </Popover>
        </>
    ) ;
} ;

PopoverButton.displayName = 'PopoverButton' ;

export default PopoverButton ;

'use client' ;

import Modal from '../modals/Modal' ;

/**
 * @typedef {'start' | 'end'} SidePanelPlacement
 */

export const START = 'start' ;
export const END   = 'end' ;

/**
 * Full-height side panel (off-canvas sheet) sliding in from the start or end edge of
 * the viewport — product carts, invoice details, filter panels…
 *
 * It is a thin preset over {@link Modal} : daisyUI's `modal-start` / `modal-end` already
 * style a full-height panel with its slide transition, so `SidePanel` only fixes their
 * sizing defaults and picks sensible values. Everything `Modal` accepts is forwarded.
 *
 * Why a `<dialog>` rather than daisyUI's `drawer` : the panel opens in the browser's
 * **top layer**, so it sits above any `z-index` on the page (an app-shell `drawer-side`
 * included) and is immune to the `position:fixed` containing block a transformed
 * ancestor would otherwise create. It also stacks natively — see `portal` below.
 *
 * ### Modal vs modeless
 *
 * By default the panel is modal : the page behind it is inert and scroll-locked. That is
 * what a cart wants. Set `modeless` for a panel the user keeps working alongside (an
 * invoice preview next to the list it belongs to) — it then opens through the Popover
 * API, still in the top layer, but without making the page inert.
 *
 * ### Stacking a modal above the panel
 *
 * A `Modal` nested in the DOM inside another one triggers the browser's native
 * nested-dialog handling and closes its ancestor. Give the inner one `portal` so it is
 * rendered on `document.body` instead :
 *
 * ```jsx
 * <SidePanel ref={ panelRef } title="My cart">
 *     <CartLines onRemove={ askRemove } />
 *     <ConfirmModal ref={ confirmRef } portal title="Remove this item?" />
 * </SidePanel>
 * ```
 *
 * @param {Object} props
 * @param {SidePanelPlacement} [props.placement='end'] - Edge the panel is anchored to.
 * @param {string} [props.width='w-full sm:w-[28rem]'] - Tailwind width class of the panel. daisyUI sizes side panels shrink-to-fit, so an explicit width keeps the panel steady as its content changes.
 * @param {string} [props.fullScreenBreakpoint='sm'] - Below this breakpoint the panel covers the whole screen. Pass `null` to keep it a panel at every size.
 * @param {boolean} [props.modeless=false] - Open through the Popover API instead of a modal `<dialog>` : the panel stays in the top layer, but the page behind remains interactive and unlocked.
 * @param {React.ReactNode} [props.footerNode] - Pinned footer (order total, primary action…). Switches the panel to header / scrollable content / sticky footer.
 * @param {React.Ref} [props.ref] - Forwarded to the underlying dialog — pass `modalRef` from `useModal`.
 *
 * @see Modal for every other prop (`title`, `icon`, `headerOptions`, `onClose`, `portal`, `disableEscapeKeyDown`, `contentClassName`…).
 * @see https://daisyui.com/components/modal
 *
 * @example Cart panel with a pinned total
 * ```jsx
 * const { modalRef , open } = useModal() ;
 *
 * <Button onClick={ open }>Cart</Button>
 *
 * <SidePanel
 *     ref        = { modalRef }
 *     title      = "My cart"
 *     icon       = { <CartIcon /> }
 *     footerNode = { <CartFooter total={ total } onCheckout={ checkout } /> }
 * >
 *     <CartLines items={ items } />
 * </SidePanel>
 * ```
 *
 * @example Modeless panel opening from the left
 * ```jsx
 * <SidePanel ref={ modalRef } placement="start" modeless title="Filters">
 *     <FilterForm />
 * </SidePanel>
 * ```
 */
const SidePanel =
({
    fullScreenBreakpoint = 'sm' ,
    modeless = false ,
    placement = END ,
    ref ,
    width = 'w-full sm:w-[28rem]' ,
    ...props
}) =>
{
    return (
        <Modal
            ref                  = { ref }
            fullScreenBreakpoint = { fullScreenBreakpoint }
            placement            = { placement }
            usePopover           = { modeless }
            width                = { width }
            { ...props }
        />
    ) ;
} ;

SidePanel.displayName = 'SidePanel' ;

export default SidePanel ;

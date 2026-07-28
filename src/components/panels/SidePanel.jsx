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
 * ### Modal by design
 *
 * The panel is always modal : the page behind it is inert and scroll-locked. That is what
 * a cart or a confirmation flow wants. A *modeless* panel — one the user keeps open while
 * still working in the page — cannot be obtained by relaxing this one : daisyUI's `modal`
 * class is a full-viewport overlay that dims the page, catches every click and locks
 * `:root` scrolling through `:root:has()`, which no class on the element can undo. It
 * needs its own shell, and will land as its own component.
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
 * @example Panel opening from the left, on a wider panel
 * ```jsx
 * <SidePanel ref={ modalRef } placement="start" width="w-full sm:w-[36rem]" title="Filters">
 *     <FilterForm />
 * </SidePanel>
 * ```
 */
const SidePanel =
({
    fullScreenBreakpoint = 'sm' ,
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
            width                = { width }
            { ...props }
        />
    ) ;
} ;

SidePanel.displayName = 'SidePanel' ;

export default SidePanel ;

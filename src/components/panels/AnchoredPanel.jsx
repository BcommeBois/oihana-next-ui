'use client' ;

/**
 * AnchoredPanel — one panel, two surfaces : **a dropdown anchored to its
 * trigger on `md`+, a full-screen sheet below.** The shape of a filter
 * criterion in a filter bar, of a « more options » panel, of anything that
 * opens from a button and holds more than a menu.
 *
 * - **dropdown** — a `Popover` with `autoPosition` : it opens below the trigger
 *   when the (estimated) panel fits there, else above ; it aligns against the
 *   edge that has room. Clicking outside, `Escape`, scrolling the page close
 *   it.
 * - **sheet** — a `Modal`, full screen under `md` : the same `<dialog>` as
 *   every other modal, a title, a round close button, and a sticky footer.
 *
 * Why not `Popover`'s own responsive mode : its sheet is a fixed layer of its
 * own, with a « × » and a full-width « Close » button, where this one is a real
 * `Modal` whose footer the caller supplies.
 *
 * 🔑 **`isOpen` stays the caller's.** It arrives as a prop, reaches `Popover`
 * as is, and is carried across to the `<dialog>` — which has no declarative
 * form — by an effect. There is no second copy of the open state : `useModal`
 * is only used for its `open()` and `close()`.
 *
 * 🚨 **The footer is not the same object on the two surfaces**, which is why
 * `footer` is a function of the surface rather than a node. It is called with
 * `{ surface , size }` :
 *
 *  - on the **sheet**, `Modal` already draws the border, the background and the
 *    `shrink-0` ; only the inner padding is supplied here, and the buttons are
 *    full-size — `btn-sm` reads as cramped across a full screen (`size` is
 *    `null`) ;
 *  - on the **dropdown**, the panel draws its own top border and stays compact
 *    (`size` is `'btn-sm'`).
 *
 * No `footer`, no footer at all — which is what a single-choice panel wants on
 * the dropdown, where clicking outside is the way out. `sheetFooter` replaces
 * the sheet's footer outright, wrapper included, and says nothing about the
 * dropdown : for a sheet that needs a « Close » bar the dropdown has no use
 * for.
 *
 * ⚠️ **The body wrapper is the caller's.** A scrolling box, a flex column whose
 * list scrolls on its own, nothing at all : the choice depends on the body.
 * The dropdown box is a flex column capped to the viewport height, so a
 * `min-h-0 flex-1 overflow-y-auto` body scrolls inside it.
 *
 * @module components/panels/AnchoredPanel
 *
 * @example
 * ```jsx
 * const anchorRef = useRef( null ) ;
 * const [ isOpen , setOpen ] = useState( false ) ;
 *
 * <button ref={ anchorRef } type="button" onClick={ () => setOpen( open => !open ) }>Colours</button>
 *
 * <AnchoredPanel
 *     anchorRef   = { anchorRef }
 *     isOpen      = { isOpen }
 *     onClose     = { () => setOpen( false ) }
 *     title       = "Colours"
 *     panelHeight = { 360 }
 *     footer      = { ( { size } ) => (
 *         <>
 *             <button type="button" className={ cn( 'btn btn-ghost' , size ) } onClick={ clear }>Clear</button>
 *             <button type="button" className={ cn( 'btn btn-primary' , size ) } onClick={ apply }>Apply</button>
 *         </>
 *     ) }
 * >
 *     <div className="min-h-0 flex-1 overflow-y-auto p-2">{ list }</div>
 * </AnchoredPanel>
 * ```
 */

import { useEffect } from 'react' ;

import { MdClose } from 'react-icons/md' ;

import Modal    from '../modals/Modal' ;
import Popover , { DROPDOWN } from '../Popover' ;
import useModal from '../modals/hooks/useModal' ;

import useI18n   from '../../contexts/locale/useI18n' ;
import NO_LOCALE from '../../contexts/locale/noLocale' ;

import cn            from '../../themes/helpers/cn' ;
import useBreakpoint from '../../themes/hooks/useBreakpoint' ;

/**
 * The surface on `md`+ : an anchored dropdown.
 * @type {string}
 */
export const SURFACE_DROPDOWN = 'dropdown' ;

/**
 * The surface below `md` : a full-screen sheet.
 * @type {string}
 */
export const SURFACE_SHEET = 'sheet' ;

/**
 * The button size class handed to `footer` on the dropdown.
 * @type {string}
 */
export const DROPDOWN_BUTTON_SIZE = 'btn-sm' ;

/**
 * @param {Object}                   props
 * @param {React.RefObject<HTMLElement>} props.anchorRef          - The trigger : the dropdown's anchor, and where the focus returns.
 * @param {React.ReactNode}          props.children               - The body, wrapper included.
 * @param {string}                   [props.closeLabel]           - Accessible name of the sheet's close button. Defaults to `close` in the i18n bundle at `path`, then `'Close'`.
 * @param {Function}                 [props.footer]               - `( { surface , size } ) => node` ; `size` is `'btn-sm'` on the dropdown and `null` on the sheet. Omit for no footer.
 * @param {boolean}                  props.isOpen                 - Whether the panel is open. Owned by the caller ; this only reflects it.
 * @param {Function}                 props.onClose                - Dismiss the panel.
 * @param {string}                   [props.panelClassName='w-72 max-w-[85vw]'] - Width classes of the dropdown box.
 * @param {number}                   [props.panelHeight=420]      - Estimated FULL dropdown height, to choose its side. An over-estimate flips it for nothing.
 * @param {number}                   [props.panelWidth=288]       - Estimated dropdown width, to choose its alignment.
 * @param {string}                   [props.path='components.modal'] - i18n path of the close label.
 * @param {React.ReactNode}          [props.sheetFooter]          - Replaces the sheet's footer entirely, wrapper included. Ignored on the dropdown.
 * @param {React.ReactNode}          [props.title]                - Sheet title (the dropdown has no header).
 *
 * @returns {React.ReactElement}
 */
const AnchoredPanel =
({
    anchorRef ,
    children ,
    closeLabel ,
    footer ,
    isOpen ,
    onClose ,
    panelClassName = 'w-72 max-w-[85vw]' ,
    panelHeight    = 420 ,
    panelWidth     = 288 ,
    path           = 'components.modal' ,
    sheetFooter ,
    title ,
}) =>
{
    const isMdUp = useBreakpoint( 'md' ) ;

    const { modalRef , open : openModal , close : closeModal } = useModal() ;

    const { close : closeFromI18n = 'Close' } = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const closeText = closeLabel ?? closeFromI18n ;

    // The sheet's only bridge : a `<dialog>` has no declarative open state, so
    // the caller's is carried across. Skipped on the dropdown, where `Popover`
    // reads `isOpen` directly and no dialog is mounted.
    useEffect( () =>
    {
        if ( isMdUp ) { return ; }

        if ( isOpen ) { openModal() ; }
        else          { closeModal() ; }
    } , [ isOpen , isMdUp , openModal , closeModal ] ) ;

    if ( !isMdUp )
    {
        return (
            <Modal
                ref                  = { modalRef }
                portal
                contentClassName     = "flex flex-col p-0"
                fullScreenBreakpoint = "md"
                maxWidth             = "max-w-md"
                showCloseButton      = { false }
                onClose              = { () => onClose?.() }
                title                = { title }
                headerOptions        = {
                    <button
                        type       = "button"
                        className  = "btn btn-md btn-circle btn-ghost"
                        onClick    = { () => onClose?.() }
                        aria-label = { closeText }
                    >
                        <MdClose size={ 20 } aria-hidden="true" />
                    </button>
                }
                footerNode           = { sheetFooter ?? ( footer && (
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                        { footer( { surface : SURFACE_SHEET , size : null } ) }
                    </div>
                ) ) }
            >
                { children }
            </Modal>
        ) ;
    }

    return (
        <Popover
            autoPosition
            anchorRef      = { anchorRef }
            display        = { DROPDOWN }
            isOpen         = { isOpen }
            onClose        = { onClose }
            panelClassName = "p-0"
            panelHeight    = { panelHeight }
            panelWidth     = { panelWidth }
        >
            <div className={ cn( 'flex max-h-[calc(100vh-1.5rem)] flex-col' , panelClassName ) }>

                { children }

                { footer && (
                    <div className="flex shrink-0 items-center justify-between gap-2 border-t border-base-300/60 p-2">
                        { footer( { surface : SURFACE_DROPDOWN , size : DROPDOWN_BUTTON_SIZE } ) }
                    </div>
                ) }

            </div>
        </Popover>
    ) ;
} ;

AnchoredPanel.displayName = 'AnchoredPanel' ;

export default AnchoredPanel ;

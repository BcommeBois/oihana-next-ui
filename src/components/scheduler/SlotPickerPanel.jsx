'use client' ;

import { useEffect , useState } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;

import { describeSpan } from '../../helpers/schedule/describeEvent' ;

import Button from '../Button' ;
import Modal from '../modals/Modal' ;
import useModal from '../modals/hooks/useModal' ;

import SlotPicker from './SlotPicker' ;

/** Placements daisyUI sizes by content, and which therefore need a width. */
const SIDE = [ 'start' , 'end' ] ;

/**
 * The same picker, in a window that has to be answered.
 *
 * ### Why a shell changes the contract
 *
 * Inline, a slot is chosen and reported at once : the page around it is still
 * there, and changing one's mind costs a second click. In a modal there is
 * nothing else on screen, so the choice needs **confirming** — a window that
 * committed on the first tap and stayed open would leave a reader unable to tell
 * whether anything had happened, and one that closed on the first tap would
 * punish a mis-tap with a booking.
 *
 * So the selection is a **draft** until the footer says otherwise, and the
 * chosen time is written in that footer where a thumb can read it without
 * hunting the grid for the highlighted button.
 *
 * ### It is a `Modal`, like the event panel
 *
 * Which means `placement`, `fullScreenBreakpoint`, a sticky footer over a
 * scrolling body, and `portal` for opening inside another modal — none of it
 * written twice. `middle` by default, full screen below `md` : a month grid and
 * a list of times want the screen on a phone.
 *
 * @module components/scheduler/SlotPickerPanel
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.confirmLabel] - The primary action. Defaults to the locale's — say « Réserver » here when that is what your application does.
 * @param {string} [props.fullScreenBreakpoint='md'] - Below this, the panel owns the screen.
 * @param {boolean} [props.isOpen=false] - Whether the window is open.
 * @param {string} [props.maxWidth='max-w-3xl'] - Width of the box, for the placements that use one.
 * @param {() => void} [props.onClose] - Called when it closes, however it closed.
 * @param {(slot: Object) => void} [props.onConfirm] - Called with the chosen slot when the primary action is used. **Nothing else reports** : the draft stays inside.
 * @param {string} [props.placement='middle'] - `top` | `middle` | `bottom` | `start` | `end`.
 * @param {boolean} [props.portal=false] - Render through a portal — required when it opens from inside another modal.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {React.ReactNode} [props.title] - Heading. Defaults to the locale's.
 * @param {string} [props.width] - Width of a `start` / `end` side panel — those ignore `maxWidth`.
 *
 * Every other prop goes to {@link module:components/scheduler/SlotPicker}.
 *
 * @example
 * ```jsx
 * <SlotPickerPanel
 *     isOpen    = { open }
 *     onClose   = { () => setOpen( false ) }
 *     onConfirm = { slot => book( slot ) }
 *     resources = { rooms }
 *     busy      = { bookings }
 *     duration  = { 60 }
 * />
 * ```
 */
const SlotPickerPanel =
({
    confirmLabel ,
    fullScreenBreakpoint = 'md' ,
    isOpen = false ,
    maxWidth = 'max-w-3xl' ,
    onClose ,
    onConfirm ,
    path = 'components.scheduler' ,
    placement = 'middle' ,
    portal = false ,
    title ,
    width ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    const { modalRef , open , close } = useModal({ onClose }) ;

    const [ draft , setDraft ] = useState( null ) ;

    useEffect( () =>
    {
        if ( isOpen )
        {
            open() ;
        }
        else
        {
            close() ;
        }
    }
    , [ close , isOpen , open ] ) ;

    // A window that reopens on the slot the last one left chosen would book the
    // wrong hour on a distracted second tap. Adjusted during the render rather
    // than in an effect, which would paint the stale draft first.
    const [ wasOpen , setWasOpen ] = useState( isOpen ) ;

    if ( wasOpen !== isOpen )
    {
        setWasOpen( isOpen ) ;
        setDraft( null ) ;
    }

    const confirm = () =>
    {
        if ( !draft )
        {
            return ;
        }

        onConfirm?.( draft ) ;
        close() ;
    } ;

    const footer = (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2">

            {/* What was chosen, said in words at the bottom of the screen — the
                highlighted button may be three rows up, and on a phone it is
                often off screen by the time a thumb reaches the action. */}
            <span className="min-w-0 flex-1 truncate text-sm first-letter:uppercase">
                { draft ? describeSpan( draft , { labels , lang } ) : <span className="text-base-content/50">{ labels?.slots?.prompt }</span> }
            </span>

            <div className="ms-auto flex items-center gap-2">
                <Button onClick={ close }>{ labels?.cancel }</Button>
                <Button color="primary" disabled={ !draft } onClick={ confirm }>
                    { confirmLabel ?? labels?.slots?.confirm }
                </Button>
            </div>
        </div>
    ) ;

    return (
        <Modal
            ref                  = { modalRef }
            contentClassName     = "flex-1 min-h-0 overflow-y-auto px-4 pb-2 pt-1"
            footerNode           = { footer }
            fullScreenBreakpoint = { fullScreenBreakpoint }
            maxWidth             = { maxWidth }
            placement            = { placement }
            portal               = { portal }
            title                = { title ?? labels?.slots?.title }
            width                = { width ?? ( SIDE.includes( placement ) ? 'w-full sm:w-[30rem]' : undefined ) }
        >
            <SlotPicker
                onChange = { setDraft }
                path     = { path }
                value    = { draft }
                { ...rest }
            />
        </Modal>
    ) ;
} ;

SlotPickerPanel.displayName = 'SlotPickerPanel' ;

export default SlotPickerPanel ;

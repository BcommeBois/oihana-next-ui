'use client' ;

import { useState } from 'react' ;

import Button   from '@/components/Button' ;
import Modal    from '@/components/modals/Modal' ;
import useModal from '@/components/modals/hooks/useModal' ;

import InputDatePicker     from '@/components/inputs/InputDatePicker' ;
import InputTimePicker     from '@/components/inputs/InputTimePicker' ;
import InputDateTimePicker from '@/components/inputs/InputDateTimePicker' ;

/**
 * Regression demo : the Popover-based pickers nested inside a Modal.
 *
 * Before 0.2.17 the Popover panel was portaled to `document.body` : under an
 * open modal `<dialog>` that subtree is inert and paints below the top layer,
 * so the calendar / time columns opened invisible and unclickable. The panel
 * now portals into the ancestor `dialog[open]` (children of a modal dialog
 * stay interactive and paint within its top-layer entry), and the popover's
 * `Escape` consumes the key so the host modal no longer closes with it.
 *
 * Checklist :
 * 1. Open each picker → the panel is visible ABOVE the modal and clickable.
 * 2. Pick a day / a time → the field updates, « Éditer » stays open.
 * 3. Escape with a picker open → closes the picker only.
 * 4. Escape with every picker closed → closes « Éditer » (normal).
 * 5. Outside-click on the modal → closes the open picker, not the modal.
 * 6. Standalone pickers (out of a modal) : unchanged.
 */
const PickersInModalDemo = () =>
{
    const [ date     , setDate     ] = useState( '' ) ;
    const [ time     , setTime     ] = useState( '' ) ;
    const [ dateTime , setDateTime ] = useState( '' ) ;

    const { modalRef , open } = useModal() ;

    return (
        <div className="flex flex-col gap-4">
            <span className="font-semibold">Pickers inside a Modal</span>
            <p className="text-sm opacity-70">
                The Popover panel portals into the host <span className="font-mono">dialog[open]</span>
                (body-level content under a modal dialog is inert and paints below the top layer).
                Escape closes the topmost surface only : the picker when open, then « Éditer ».
            </p>

            <div>
                <Button color="primary" onClick={ open }>Ouvrir « Éditer »</Button>
            </div>

            <p className="text-sm opacity-70">
                Date : <span className="font-mono">{ date || '—' }</span>
                {' · '}
                Heure : <span className="font-mono">{ time || '—' }</span>
                {' · '}
                Date-heure : <span className="font-mono">{ dateTime || '—' }</span>
            </p>

            <Modal ref={ modalRef } title="Éditer" maxWidth="max-w-md" agree="OK">
                <div className="flex flex-col gap-6 p-2">
                    <InputDatePicker
                        label    = "Date"
                        value    = { date }
                        onChange = { setDate }
                        helper   = "Dropdown on md+, bottom-sheet on mobile"
                    />
                    <InputTimePicker
                        label    = "Heure"
                        value    = { time }
                        onChange = { setTime }
                    />
                    <InputDateTimePicker
                        footer
                        label       = "Date et heure (footer)"
                        applyLabel  = "Appliquer"
                        cancelLabel = "Annuler"
                        value       = { dateTime }
                        onChange    = { setDateTime }
                        helper      = "Deferred commit : Appliquer commits, Annuler discards"
                    />
                </div>
            </Modal>
        </div>
    ) ;
} ;

export default PickersInModalDemo ;

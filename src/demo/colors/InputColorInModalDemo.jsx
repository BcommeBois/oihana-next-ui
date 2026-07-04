'use client' ;

import { useState } from 'react' ;

import Button   from '@/components/Button' ;
import Modal    from '@/components/modals/Modal' ;
import useModal from '@/components/modals/hooks/useModal' ;

import InputColor from '@/components/inputs/InputColor' ;

/**
 * Regression demo : InputColor nested inside another Modal.
 *
 * Before 0.2.16 the picker `<dialog>` was a DOM descendant of the host `<dialog>`,
 * and the browser's native nested-dialog handling closed the host modal as soon
 * as the picker was used (saturation drag, backdrop, Escape…) — nothing could
 * intercept it from JS. The picker modal is now portaled to `document.body`
 * (sibling dialogs in the top layer), so only the picker closes.
 *
 * Checklist :
 * 1. Open the picker → « Éditer » stays open.
 * 2. Drag saturation / hue → « Éditer » stays open, the value updates.
 * 3. Preset, hex field, eyedropper → « Éditer » stays open.
 * 4. Close the picker (Appliquer / Annuler / × / backdrop / Escape) → only the
 *    picker closes.
 * 5. Escape while the picker is closed → closes « Éditer » (normal).
 */
const InputColorInModalDemo = () =>
{
    const [ live     , setLive     ] = useState( '#3366FF' ) ;
    const [ deferred , setDeferred ] = useState( '#F59E0B' ) ;

    const { modalRef , open } = useModal() ;

    return (
        <div className="flex flex-col gap-4">
            <span className="font-semibold">InputColor inside a Modal</span>
            <p className="text-sm opacity-70">
                The picker modal is portaled to <span className="font-mono">document.body</span>,
                so using it (drag, presets, hex field, footer buttons, backdrop, Escape) only ever
                closes the picker — never the host modal. Escape closes the topmost dialog first :
                the picker when it is open, then « Éditer ».
            </p>

            <div>
                <Button color="primary" onClick={ open }>Ouvrir « Éditer »</Button>
            </div>

            <p className="text-sm opacity-70">
                Live : <span className="font-mono">{ live || '—' }</span>
                {' · '}
                Footer : <span className="font-mono">{ deferred || '—' }</span>
            </p>

            <Modal ref={ modalRef } title="Éditer" maxWidth="max-w-md" agree="OK">
                <div className="flex flex-col gap-6 p-2">
                    <InputColor
                        clearable
                        label    = "Couleur (live)"
                        value    = { live }
                        onChange = { setLive }
                        helper   = "No footer — every pick updates the value immediately"
                    />
                    <InputColor
                        footer
                        clearable
                        label       = "Couleur (footer)"
                        applyLabel  = "Appliquer"
                        cancelLabel = "Annuler"
                        title       = "Choisir une couleur"
                        value       = { deferred }
                        onChange    = { setDeferred }
                        helper      = "Appliquer commits the draft ; Annuler / backdrop / Escape discard it"
                    />
                </div>
            </Modal>
        </div>
    ) ;
} ;

export default InputColorInModalDemo ;

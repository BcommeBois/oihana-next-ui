'use client' ;

import { useState } from 'react' ;

import Container   from '@/display/Container' ;
import InputAction from '@/components/inputs/InputAction' ;

import {
    MdAdd  as AddIcon ,
    MdSend as SendIcon ,
}
from "react-icons/md" ;

/**
 * InputAction demo component.
 *
 * Demonstrates various configurations and use cases for InputAction :
 * commit on `+` / Enter, an action disabled while the draft is empty,
 * tooltip, a coloured action, error state and a fully disabled field.
 *
 * A whole list of entries is `InputTags`, built on this field — see its own
 * demo rather than assembling the chips by hand here.
 */
const InputActionDemo = () =>
{
    const [ draft , setDraft ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">Input Action Examples</h3>

            {/* Commit on + / Enter, action disabled while the draft is empty */}
            <InputAction
                label          = "Line"
                placeholder    = "Type something…"
                value          = { draft }
                onChange       = { setDraft }
                onAction       = { () => setDraft( '' ) }
                actionTooltip  = "Add"
                actionDisabled = { draft.trim().length === 0 }
                helper         = "Press Enter or click + : the draft is committed, then cleared"
            />

            {/* Colored action + custom icon */}
            <InputAction
                label         = "Message"
                placeholder   = "Say something…"
                actionIcon    = { SendIcon }
                actionColor   = "primary"
                actionTooltip = "Send"
            />

            {/* Enter disabled : only the button commits */}
            <InputAction
                label         = "Manual only"
                placeholder   = "Enter does nothing here"
                submitOnEnter = { false }
                actionIcon    = { AddIcon }
                actionTooltip = "Add (click only)"
            />

            {/* Error state : the action button turns error too */}
            <InputAction
                label         = "Coupon code"
                placeholder   = "PROMO2026"
                error         = "Invalid coupon"
                actionTooltip = "Apply"
            />

            {/* Fully disabled field + action */}
            <InputAction
                label        = "Disabled"
                placeholder  = "Unavailable"
                defaultValue = "readonly draft"
                disabled
            />

        </Container>
    ) ;
} ;

export default InputActionDemo ;

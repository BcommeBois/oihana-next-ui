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
 * a tag-list builder (commit on `+` / Enter), tooltip, disabled action,
 * error state and a fully disabled field.
 */
const InputActionDemo = () =>
{
    const [ draft , setDraft ] = useState( '' ) ;
    const [ tags  , setTags  ] = useState( [ '127.0.0.1' ] ) ;

    const commitTag = () =>
    {
        const value = draft.trim() ;
        if ( value.length === 0 || tags.includes( value ) ) { return ; }
        setTags( [ ...tags , value ] ) ;
        setDraft( '' ) ;
    } ;

    const removeTag = tag => setTags( tags.filter( t => t !== tag ) ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">Input Action Examples</h3>

            {/* Tag builder : commit on + / Enter, action disabled while empty */}
            <div className="flex flex-col gap-3">
                <InputAction
                    label          = "Allowed IPs"
                    placeholder    = "127.0.0.1"
                    value          = { draft }
                    onChange       = { setDraft }
                    onAction       = { commitTag }
                    actionTooltip  = "Add"
                    actionDisabled = { draft.trim().length === 0 }
                    helper         = "Type an address, then press Enter or click +"
                />

                { tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        { tags.map( tag => (
                            <span key={ tag } className="badge badge-neutral gap-1">
                                { tag }
                                <button
                                    type       = "button"
                                    className  = "cursor-pointer opacity-70 hover:opacity-100"
                                    aria-label = { `Remove ${ tag }` }
                                    onClick    = { () => removeTag( tag ) }
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

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

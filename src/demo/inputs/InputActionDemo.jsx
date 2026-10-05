'use client' ;

import { useState } from 'react' ;

import Container   from '@/display/Container' ;
import InputAction from '@/components/inputs/InputAction' ;

import useI18n from '@/contexts/locale/useI18n' ;

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
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.action'] - Dot notation path to the demo locale.
 */
const InputActionDemo = ( { path = 'demo.inputs.action' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ draft , setDraft ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">{ t.title }</h3>

            <InputAction
                label          = { t.line?.label }
                placeholder    = { t.line?.placeholder }
                value          = { draft }
                onChange       = { setDraft }
                onAction       = { () => setDraft( '' ) }
                actionTooltip  = { t.add }
                actionDisabled = { draft.trim().length === 0 }
                helper         = { t.line?.helper }
            />

            <InputAction
                label         = { t.message?.label }
                placeholder   = { t.message?.placeholder }
                actionIcon    = { SendIcon }
                actionColor   = "primary"
                actionTooltip = { t.message?.tooltip }
            />

            <InputAction
                label         = { t.manual?.label }
                placeholder   = { t.manual?.placeholder }
                submitOnEnter = { false }
                actionIcon    = { AddIcon }
                actionTooltip = { t.manual?.tooltip }
            />

            <InputAction
                label         = { t.coupon?.label }
                placeholder   = { t.coupon?.placeholder }
                error         = { t.coupon?.error }
                actionTooltip = { t.coupon?.tooltip }
            />

            <InputAction
                label        = { t.disabled?.label }
                placeholder  = { t.disabled?.placeholder }
                defaultValue = { t.disabled?.value }
                disabled
            />

        </Container>
    ) ;
} ;

export default InputActionDemo ;

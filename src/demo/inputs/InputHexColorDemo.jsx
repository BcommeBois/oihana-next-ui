'use client' ;

import { useState } from 'react' ;

import Container     from '@/display/Container' ;
import InputHexColor from '@/components/inputs/InputHexColor' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { MdColorLens as ColorIcon } from 'react-icons/md' ;

/**
 * InputHexColor demo component.
 *
 * Six characters, eight with an alpha channel, three in the short form, with
 * or without the leading hash — and what an invalid value says on blur.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.hexColor'] - Dot notation path to the demo locale.
 */
const InputHexColorDemo = ( { path = 'demo.inputs.hexColor' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ color , setColor ] = useState( '#FF5733' ) ;
    const [ colorWithAlpha , setColorWithAlpha ] = useState( '#FF5733FF' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-row items-center gap-4">
                <InputHexColor
                    label       = { t.basic?.label }
                    value       = { color }
                    onChange    = { setColor }
                    icon        = { <ColorIcon /> }
                    placeholder = "FFFFFF"
                    helper      = { t.basic?.helper }
                />
            </div>

            <div className="flex flex-row items-center gap-4">
                <InputHexColor
                    alpha
                    label       = { t.alpha?.label }
                    value       = { colorWithAlpha }
                    onChange    = { setColorWithAlpha }
                    icon        = { <ColorIcon /> }
                    placeholder = "FFFFFFFF"
                    helper      = { t.alpha?.helper }
                />
            </div>

            <InputHexColor
                prefixed    = { false }
                label       = { t.noPrefix?.label }
                placeholder = "FFFFFF"
                helper      = { t.noPrefix?.helper }
            />

            <InputHexColor
                useFieldset
                legend      = { t.fieldset?.legend }
                icon        = { <ColorIcon /> }
                placeholder = "007BFF"
                helper      = { t.fieldset?.helper }
            />

            <InputHexColor
                length       = { 3 }
                label        = { t.short?.label }
                defaultValue = "F53"
                icon         = { <ColorIcon /> }
                placeholder  = "FFF"
                helper       = { t.short?.helper }
            />

            <InputHexColor
                label               = { t.invalid?.label }
                defaultValue        = "ZZZZZZ"
                icon                = { <ColorIcon /> }
                helper              = { t.invalid?.helper }
                showValidationError = { true }
                validationError     = { t.invalid?.error }
            />

            <InputHexColor
                label        = { t.disabled?.label }
                defaultValue = "CCCCCC"
                icon         = { <ColorIcon /> }
                disabled
            />

            <InputHexColor
                label        = { t.readOnly?.label }
                defaultValue = "333333"
                icon         = { <ColorIcon /> }
                readOnly
            />

        </Container>
    ) ;
} ;

export default InputHexColorDemo ;

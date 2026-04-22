'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import InputHexColor from '@/components/inputs/InputHexColor' ;

import { MdColorLens as ColorIcon } from 'react-icons/md' ;

const InputHexColorDemo = () =>
{
    const [ color, setColor ] = useState( '#FF5733' ) ;
    const [ colorWithAlpha, setColorWithAlpha ] = useState( '#FF5733FF' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Hex Color Examples</h2>

            {/* Basic hex color */}
            <div className="flex flex-row items-center gap-4">
                <InputHexColor
                    label       = "Color (6 chars)"
                    value       = { color }
                    onChange    = { setColor }
                    icon        = { <ColorIcon /> }
                    placeholder = "FFFFFF"
                    helper      = "Enter hex color (e.g., FF5733)"
                />
            </div>

            {/* With alpha channel */}
            <div className="flex flex-row items-center gap-4">
                <InputHexColor
                    alpha
                    label       = "Color with Alpha (8 chars)"
                    value       = { colorWithAlpha }
                    onChange    = { setColorWithAlpha }
                    icon        = { <ColorIcon /> }
                    placeholder = "FFFFFFFF"
                    helper      = "Enter hex color with alpha (e.g., FF5733FF)"
                />
            </div>

            {/* Without prefix display */}
            <InputHexColor
                prefixed    = { false }
                label       = "Color Code (No Prefix)"
                placeholder = "FFFFFF"
                helper      = "Displayed without # prefix"
            />

            {/* With fieldset */}
            <InputHexColor
                useFieldset
                legend      = "Primary Color"
                icon        = { <ColorIcon /> }
                placeholder = "007BFF"
                helper      = "Brand primary color"
            />

            {/* Short format (3 chars) */}
            <InputHexColor
                length       = { 3 }
                label        = "Short Format (3 chars)"
                defaultValue = "F53"
                icon         = { <ColorIcon /> }
                placeholder  = "FFF"
                helper       = "Short format: #rgb"
            />

            {/* With validation error */}
            <InputHexColor
                label               = "Invalid Color"
                defaultValue        = "ZZZZZZ"
                icon                = { <ColorIcon /> }
                helper              = "This will show validation on blur"
                showValidationError = { true }
                validationError     = "Couleur invalide ({0} caractères requis)"
            />

            {/* Disabled */}
            <InputHexColor
                label        = "Disabled"
                defaultValue = "CCCCCC"
                icon         = { <ColorIcon /> }
                disabled
            />

            {/* Read-only */}
            <InputHexColor
                label        = "Read-only"
                defaultValue = "333333"
                icon         = { <ColorIcon /> }
                readOnly
            />

        </Container>
    ) ;
} ;

export default InputHexColorDemo ;
'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import InputColor     from '@/components/inputs/InputColor' ;
import ColorPicker    from '@/components/colors/ColorPicker' ;
import ColorIndicator from '@/components/colors/ColorIndicator' ;

/**
 * Showcase for the color picker family : InputColor, ColorPicker, ColorIndicator.
 */
const ColorDemo = () =>
{
    const [ color      , setColor      ] = useState( '#FF5733' ) ;
    const [ colorAlpha , setColorAlpha ] = useState( '#3B82F6CC' ) ;
    const [ panel      , setPanel      ] = useState( '#22C55E' ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-5xl">

            <h2 className="text-3xl font-bold">Color Picker Examples</h2>

            {/* InputColor — controlled, opens the picker modal from the right button */}
            <div className="flex flex-col gap-4 max-w-md">
                <InputColor
                    label       = "Brand color"
                    value       = { color }
                    onChange    = { setColor }
                    placeholder = "FFFFFF"
                    helper      = "Type a hex value or click the eyedropper to open the picker"
                />
                <p className="text-sm opacity-70">
                    Selected : <span className="font-mono">{ color || '—' }</span>
                </p>
            </div>

            {/* InputColor — alpha channel */}
            <div className="flex flex-col gap-4 max-w-md">
                <InputColor
                    alpha
                    label       = "Overlay color (alpha)"
                    value       = { colorAlpha }
                    onChange    = { setColorAlpha }
                    placeholder = "FFFFFFFF"
                    helper      = "8 hex chars : #RRGGBBAA"
                />
                <p className="text-sm opacity-70">
                    Selected : <span className="font-mono">{ colorAlpha || '—' }</span>
                </p>
            </div>

            {/* Sizes */}
            <div className="flex flex-col gap-3 max-w-md">
                <span className="font-semibold">Sizes</span>
                <InputColor size="sm" defaultValue="#F59E0B" label="Small" />
                <InputColor size="md" defaultValue="#10B981" label="Medium" />
                <InputColor size="lg" defaultValue="#6366F1" label="Large" />
            </div>

            {/* Disabled */}
            <div className="max-w-md">
                <InputColor label="Disabled" defaultValue="#CCCCCC" disabled />
            </div>

            <Divider />

            {/* Standalone ColorPicker panel */}
            <div className="flex flex-col gap-4">
                <span className="font-semibold">Standalone ColorPicker</span>
                <div className="flex flex-wrap items-start gap-8">
                    <div className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
                        <ColorPicker
                            alpha    = { true }
                            value    = { panel }
                            onChange = { setPanel }
                            size = { 'md' }
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <ColorIndicator color={ panel } size="xl" />
                        <span className="font-mono">{ panel }</span>
                    </div>
                </div>
            </div>

            <Divider />

            {/* ColorIndicator — a reusable presentational swatch */}
            <div className="flex flex-col gap-4">
                <span className="font-semibold">ColorIndicator (swatch)</span>
                <p className="text-sm opacity-70">
                    A presentational color chip (xs → xl), used by the picker presets, lists, legends…
                    The last one shows the empty state (border only).
                </p>
                <div className="flex items-end gap-3">
                    <ColorIndicator color="#FF5733" size="xs" />
                    <ColorIndicator color="#FF5733" size="sm" />
                    <ColorIndicator color="#FF5733" size="md" />
                    <ColorIndicator color="#FF5733" size="lg" />
                    <ColorIndicator color="#FF5733" size="xl" />
                    <ColorIndicator size="xl" />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default ColorDemo ;

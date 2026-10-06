'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import InputColor     from '@/components/inputs/InputColor' ;
import ColorPicker    from '@/components/colors/ColorPicker' ;
import ColorIndicator from '@/components/colors/ColorIndicator' ;

import withAlpha from '@/helpers/colors/withAlpha' ;

import InputColorInModalDemo from './InputColorInModalDemo' ;

/**
 * Showcase for the color picker family : InputColor, ColorPicker, ColorIndicator.
 */
const ColorDemo = () =>
{
    const [ color      , setColor      ] = useState( '#FF5733' ) ;
    const [ colorAlpha , setColorAlpha ] = useState( '#3B82F6CC' ) ;
    const [ clearMe    , setClearMe    ] = useState( '#EF4444' ) ;
    const [ deferred   , setDeferred   ] = useState( '#0EA5E9' ) ;
    const [ panel      , setPanel      ] = useState( '#22C55E' ) ;
    const [ horiz      , setHoriz      ] = useState( '#8B5CF6' ) ;

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

            {/* InputColor — clearable : a × button appears left of the trigger when there is a value */}
            <div className="flex flex-col gap-4 max-w-md">
                <InputColor
                    clearable
                    label       = "Clearable color"
                    value       = { clearMe }
                    onChange    = { setClearMe }
                    placeholder = "FFFFFF"
                    helper      = "clearable — the × button clears the field (default : off)"
                />
                <p className="text-sm opacity-70">
                    Selected : <span className="font-mono">{ clearMe || '—' }</span>
                </p>
            </div>

            {/* InputColor — footer : deferred commit, localized Apply / Cancel */}
            <div className="flex flex-col gap-4 max-w-md">
                <InputColor
                    footer
                    label       = "Deferred commit (footer)"
                    value       = { deferred }
                    onChange    = { setDeferred }
                    placeholder = "FFFFFF"
                    helper      = "footer — the picker edits a draft ; Appliquer commits it, Annuler / backdrop / Escape discard it"
                />
                <p className="text-sm opacity-70">
                    Selected : <span className="font-mono">{ deferred || '—' }</span>
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

            {/* Orientation override — the modal opens horizontal by default; force vertical here */}
            <div className="flex flex-col gap-3 max-w-md">
                <span className="font-semibold">Modal picker orientation</span>
                <p className="text-sm opacity-70">
                    The picker opens <span className="font-mono">horizontal</span> by default (folds to
                    vertical on mobile). Pass <span className="font-mono">orientation="vertical"</span> for
                    the stacked layout.
                </p>
                <InputColor label="Vertical picker" defaultValue="#06B6D4" orientation="vertical" />
            </div>

            <Divider />

            {/* InputColor nested inside another Modal — nested-dialog regression */}
            <InputColorInModalDemo />

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

            {/* Horizontal ColorPicker — square left, controls right, responsive collapse */}
            <div className="flex flex-col gap-4">
                <span className="font-semibold">Horizontal ColorPicker</span>
                <p className="text-sm opacity-70">
                    Square on the left, controls on the right. Resize the window / panel to see it
                    collapse back to vertical : <span className="font-mono">collapse="viewport"</span> reacts
                    to the screen, <span className="font-mono">collapse="container"</span> reacts to its own width.
                </p>

                <div className="flex flex-wrap items-start gap-8">
                    {/* viewport collapse (sm breakpoint) */}
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium opacity-60">orientation="horizontal" · collapse="viewport"</span>
                        <div className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
                            <ColorPicker
                                alpha
                                orientation = "horizontal"
                                collapse    = "viewport"
                                value       = { horiz }
                                onChange    = { setHoriz }
                            />
                        </div>
                    </div>

                    {/* container collapse — shrink the wrapper to watch it fold */}
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium opacity-60">collapse="container" (in a 22rem box → folds at &lt;28rem)</span>
                        <div className="w-[22rem] resize-x overflow-auto rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
                            <ColorPicker
                                orientation = "horizontal"
                                collapse    = "container"
                                value       = { horiz }
                                onChange    = { setHoriz }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <span className="font-semibold">ColorIndicator (swatch)</span>
                <p className="text-sm opacity-70">
                    A presentational color chip (2xs → xl), used by the picker presets, lists, legends…
                    The last one shows the empty state : the ordinary border, no fill.
                </p>
                <div className="flex items-end gap-3">
                    <ColorIndicator color="#FF5733" size="2xs" />
                    <ColorIndicator color="#FF5733" size="xs" />
                    <ColorIndicator color="#FF5733" size="sm" />
                    <ColorIndicator color="#FF5733" size="md" />
                    <ColorIndicator color="#FF5733" size="lg" />
                    <ColorIndicator color="#FF5733" size="xl" />
                    <ColorIndicator size="xl" />
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <span className="font-semibold">The round mark, and what « no colour » looks like</span>
                <p className="text-sm opacity-70">
                    The mark that sits beside a name in a row. A missing colour is never a grey
                    fill — that would read as « its colour is grey ». Each pair below shows the
                    same setting with a colour and without one.
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="flex flex-col gap-2 rounded-box bg-base-100 p-4">
                        <code className="text-xs opacity-70">shape="circle"</code>
                        <div className="flex items-center gap-3">
                            <ColorIndicator color="#22C55E" shape="circle" size="xs" />
                            <ColorIndicator shape="circle" size="xs" />
                        </div>
                        <span className="text-xs opacity-70">bordered, and the border stays when empty</span>
                    </div>

                    <div className="flex flex-col gap-2 rounded-box bg-base-100 p-4">
                        <code className="text-xs opacity-70">bordered={ '{ false }' }</code>
                        <div className="flex items-center gap-3">
                            <ColorIndicator bordered={ false } color="#22C55E" shape="circle" size="xs" />
                            <ColorIndicator bordered={ false } shape="circle" size="xs" />
                        </div>
                        <span className="text-xs opacity-70">nothing either way : the name carries the meaning</span>
                    </div>

                    <div className="flex flex-col gap-2 rounded-box bg-base-100 p-4">
                        <code className="text-xs opacity-70">empty="ring"</code>
                        <div className="flex items-center gap-3">
                            <ColorIndicator bordered={ false } color="#22C55E" empty="ring" shape="circle" size="xs" />
                            <ColorIndicator bordered={ false } empty="ring" shape="circle" size="xs" />
                        </div>
                        <span className="text-xs opacity-70">no border when filled, a ring when not</span>
                    </div>

                    <div className="flex flex-col gap-2 rounded-box bg-base-100 p-4">
                        <code className="text-xs opacity-70">empty="dashed"</code>
                        <div className="flex items-center gap-3">
                            <ColorIndicator color="#22C55E" empty="dashed" shape="circle" size="xs" />
                            <ColorIndicator empty="dashed" shape="circle" size="xs" />
                        </div>
                        <span className="text-xs opacity-70">nobody ever gave this one a colour</span>
                    </div>

                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <ColorIndicator bordered={ false } color="#F59E0B" empty="ring" shape="circle" size="2xs" />
                    <span>a term with a colour</span>
                    <span aria-hidden="true" className="opacity-40">·</span>
                    <ColorIndicator bordered={ false } empty="ring" shape="circle" size="2xs" />
                    <span>one without</span>
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <span className="font-semibold">withAlpha — the same colour, as a wash</span>
                <p className="text-sm opacity-70">
                    For a tint behind initials or an icon. It goes through <code>color-mix</code>,
                    so a colour served as <code>rgb(…)</code> or named works exactly like a hex one —
                    appending two hex digits does not.
                </p>

                <div className="flex flex-wrap gap-3">
                    { [ [ '#FF5733' , 0.15 ] , [ '#FF5733' , 0.4 ] , [ 'rebeccapurple' , 0.15 ] , [ 'rgb(34 197 94)' , 0.25 ] ].map( ( [ value , alpha ] ) => (
                        <div
                            className = "flex min-w-40 flex-col gap-1 rounded-box p-4"
                            key       = { `${ value }-${ alpha }` }
                            style     = { { backgroundColor : withAlpha( value , alpha ) } }
                        >
                            <span className="text-2xl font-semibold" style={ { color : value } }>Aa</span>
                            <code className="text-xs opacity-70">{ `withAlpha( '${ value }' , ${ alpha } )` }</code>
                        </div>
                    ) ) }
                </div>
            </div>

        </Container>
    ) ;
} ;

export default ColorDemo ;

'use client' ;

import { useState } from 'react' ;

import InputModal from '@/components/modals/InputModal' ;
import Container from '@/display/Container' ;
import Divider from '@/components/Divider' ;
import Input from '@/components/inputs/Input' ;
import Badge from '@/components/Badge' ;

import
{
    MdColorLens,
    MdCalendarToday,
    MdAccessTime,
    MdLocationOn,
}
from 'react-icons/md' ;

const InputModalDemo = () =>
{
    // ==================== COLOR PICKER ====================
    const [ color, setColor ] = useState( '#3b82f6' ) ;
    const [ tempColor, setTempColor ] = useState( '#3b82f6' ) ;

    const handleColorOpen = () =>
    {
        setTempColor( color ) ;
    } ;

    const handleColorAgree = () =>
    {
        setColor( tempColor ) ;
    } ;

    // ==================== DATE PICKER ====================
    const [ date, setDate ] = useState( '2025-03-15' ) ;
    const [ tempDate, setTempDate ] = useState( '2025-03-15' ) ;

    const handleDateOpen = () =>
    {
        setTempDate( date ) ;
    } ;

    const handleDateAgree = () =>
    {
        setDate( tempDate ) ;
    } ;

    // ==================== TIME PICKER ====================
    const [ time, setTime ] = useState( '14:30' ) ;
    const [ tempTime, setTempTime ] = useState( '14:30' ) ;

    const handleTimeOpen = () =>
    {
        setTempTime( time ) ;
    } ;

    const handleTimeAgree = () =>
    {
        setTime( tempTime ) ;
    } ;

    // ==================== LOCATION PICKER ====================
    const [ location, setLocation ] = useState( '' ) ;
    const [ tempLocation, setTempLocation ] = useState( '' ) ;

    const handleLocationOpen = () =>
    {
        setTempLocation( location ) ;
    } ;

    const handleLocationAgree = () =>
    {
        setLocation( tempLocation ) ;
    } ;

    // ==================== DATA ====================
    const locations = [
        'Paris, France',
        'London, UK',
        'New York, USA',
        'Tokyo, Japan',
    ] ;

    const presetColors = [
        '#ef4444',
        '#f59e0b',
        '#10b981',
        '#3b82f6',
        '#8b5cf6',
        '#ec4899',
    ] ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-5xl">

            <div>
                <h2 className="text-3xl font-bold">InputModal - Open on Focus Demo</h2>
                <p className="text-base-content/70 mt-2">
                    Click on the input or use the button to open the modal
                </p>
            </div>

            <Divider />

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ==================== WITH openOnFocus ==================== */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title">
                            With <Badge color="success">openOnFocus</Badge>
                        </h3>
                        <p className="text-sm text-base-content/70 mb-4">
                            Click the input field or the button to open
                        </p>

                        {/* Color Picker */}
                        <InputModal
                            label       = "Color"
                            value       = { color }
                            modalTitle  = "Choose a Color"
                            actionLabel = "Pick"
                            actionIcon  = { <MdColorLens size={20} /> }
                            icon        = { <MdColorLens size={20} /> }
                            openOnFocus = { true }
                            onModalOpen = { handleColorOpen }
                            onAgree     = { handleColorAgree }
                        >
                            <div className="flex flex-col gap-4">
                                <input
                                    type      = "color"
                                    value     = { tempColor }
                                    onChange  = { (e) => setTempColor( e.target.value ) }
                                    className = "w-full h-32 rounded"
                                />
                                <Input
                                    label    = "Hex Value"
                                    value    = { tempColor }
                                    onChange = { setTempColor }
                                />
                                <div className="grid grid-cols-6 gap-2">
                                    { presetColors.map( c => (
                                        <button
                                            key       = { c }
                                            onClick   = {() => setTempColor( c )}
                                            className = "w-full aspect-square rounded"
                                            style     = {{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </InputModal>

                        <div className="mt-2 p-4 rounded" style={{ backgroundColor: color }}>
                            <p className="text-center font-bold text-white mix-blend-difference">
                                { color }
                            </p>
                        </div>

                        {/* Date Picker */}
                        <InputModal
                            label       = "Date"
                            value       = { date }
                            modalTitle  = "Select Date"
                            actionLabel = "Calendar"
                            actionIcon  = { <MdCalendarToday size={20} /> }
                            icon        = { <MdCalendarToday size={20} /> }
                            openOnFocus = { true }
                            onModalOpen = { handleDateOpen }
                            onAgree     = { handleDateAgree }
                        >
                            <div className="flex flex-col gap-4">
                                <input
                                    type      = "date"
                                    value     = { tempDate }
                                    onChange  = { (e) => setTempDate( e.target.value ) }
                                    className = "input input-primary w-full"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        className = "btn btn-sm"
                                        onClick   = {() => setTempDate( new Date().toISOString().split('T')[0] )}
                                    >
                                        Today
                                    </button>
                                    <button
                                        className = "btn btn-sm"
                                        onClick   = {() =>
                                        {
                                            const tomorrow = new Date() ;
                                            tomorrow.setDate( tomorrow.getDate() + 1 ) ;
                                            setTempDate( tomorrow.toISOString().split('T')[0] ) ;
                                        }}
                                    >
                                        Tomorrow
                                    </button>
                                    <button
                                        className = "btn btn-sm"
                                        onClick   = {() =>
                                        {
                                            const nextWeek = new Date() ;
                                            nextWeek.setDate( nextWeek.getDate() + 7 ) ;
                                            setTempDate( nextWeek.toISOString().split('T')[0] ) ;
                                        }}
                                    >
                                        Next Week
                                    </button>
                                </div>
                            </div>
                        </InputModal>

                        {/* Time Picker */}
                        <InputModal
                            label       = "Time"
                            value       = { time }
                            modalTitle  = "Select Time"
                            actionLabel = "Clock"
                            actionIcon  = { <MdAccessTime size={20} /> }
                            icon        = { <MdAccessTime size={20} /> }
                            openOnFocus = { true }
                            onModalOpen = { handleTimeOpen }
                            onAgree     = { handleTimeAgree }
                        >
                            <div className="flex flex-col gap-4">
                                <input
                                    type      = "time"
                                    value     = { tempTime }
                                    onChange  = { (e) => setTempTime( e.target.value ) }
                                    className = "input input-primary w-full"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        className = "btn btn-sm"
                                        onClick   = {() => setTempTime( '09:00' )}
                                    >
                                        Morning
                                    </button>
                                    <button
                                        className = "btn btn-sm"
                                        onClick   = {() => setTempTime( '12:00' )}
                                    >
                                        Noon
                                    </button>
                                    <button
                                        className = "btn btn-sm"
                                        onClick   = {() => setTempTime( '18:00' )}
                                    >
                                        Evening
                                    </button>
                                </div>
                            </div>
                        </InputModal>
                    </div>
                </div>

                {/* ==================== WITHOUT openOnFocus ==================== */}
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title">
                            Without <Badge color="neutral">openOnFocus</Badge>
                        </h3>
                        <p className="text-sm text-base-content/70 mb-4">
                            Only the button opens the modal
                        </p>

                        {/* Location Picker */}
                        <InputModal
                            label       = "Location"
                            value       = { location }
                            modalTitle  = "Select Location"
                            actionLabel = "Choose"
                            actionIcon  = { <MdLocationOn size={20} /> }
                            icon        = { <MdLocationOn size={20} /> }
                            openOnFocus = { false }
                            onModalOpen = { handleLocationOpen }
                            onAgree     = { handleLocationAgree }
                        >
                            <div className="flex flex-col gap-2">
                                { locations.map(( loc, i ) => (
                                    <button
                                        key       = { i }
                                        onClick   = {() => setTempLocation( loc )}
                                        className = {`btn btn-ghost justify-start ${
                                            tempLocation === loc ? 'btn-active' : ''
                                        }`}
                                    >
                                        <MdLocationOn />
                                        { loc }
                                    </button>
                                ))}
                            </div>
                        </InputModal>

                        <div className="alert alert-info mt-4">
                            <span className="text-sm">
                                Try clicking the input field - nothing happens. You must use the "Choose" button.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Use Cases */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h3 className="card-title">When to use openOnFocus?</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-bold text-success mb-2">✅ Good for:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Date pickers</li>
                                <li>Time pickers</li>
                                <li>Color pickers</li>
                                <li>Single-click selections</li>
                                <li>Read-only inputs</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-error mb-2">❌ Avoid for:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Complex forms</li>
                                <li>Multi-step selections</li>
                                <li>When typing is needed</li>
                                <li>File uploads</li>
                                <li>Editable inputs</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mockup-code mt-4">
                        <pre data-prefix="1"><code>// ✅ Pattern correct avec état temporaire</code></pre>
                        <pre data-prefix="2"><code>const [value, setValue] = useState(initial) ;</code></pre>
                        <pre data-prefix="3"><code>const [tempValue, setTempValue] = useState(initial) ;</code></pre>
                        <pre data-prefix="4"><code></code></pre>
                        <pre data-prefix="5"><code>&lt;InputModal</code></pre>
                        <pre data-prefix="6"><code>  value={`{value}`}  // Affiche finale</code></pre>
                        <pre data-prefix="7"><code>  onModalOpen={`{() => setTempValue(value)}`}</code></pre>
                        <pre data-prefix="8"><code>  onAgree={`{() => setValue(tempValue)}`}</code></pre>
                        <pre data-prefix="9"><code>&gt;</code></pre>
                        <pre data-prefix="10"><code>  &lt;input value={`{tempValue}`} onChange={`{setTempValue}`} /&gt;</code></pre>
                        <pre data-prefix="11"><code>&lt;/InputModal&gt;</code></pre>
                    </div>
                </div>
            </div>

            {/* Additional Options */}
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h3 className="card-title">Additional Options</h3>

                    <div className="space-y-4">
                        {/* Hide Action Button */}
                        <div>
                            <h4 className="font-bold mb-2">Hide Action Button</h4>
                            <p className="text-sm text-base-content/70 mb-2">
                                Use <code className="badge badge-sm">showActionButton={`{false}`}</code> to hide the button
                            </p>

                            <InputModal
                                label            = "Auto-open Input"
                                value            = { date }
                                modalTitle       = "Select Date"
                                openOnFocus      = { true }
                                showActionButton = { false }
                                icon             = { <MdCalendarToday size={20} /> }
                                onModalOpen      = { handleDateOpen }
                                onAgree          = { handleDateAgree }
                            >
                                <input
                                    type      = "date"
                                    value     = { tempDate }
                                    onChange  = { (e) => setTempDate( e.target.value ) }
                                    className = "input input-primary w-full"
                                />
                            </InputModal>
                        </div>

                        {/* Custom onFocus */}
                        <div>
                            <h4 className="font-bold mb-2">Custom onFocus Handler</h4>
                            <p className="text-sm text-base-content/70 mb-2">
                                Combine with your own focus handler
                            </p>

                            <InputModal
                                label       = "With Custom Handler"
                                value       = { time }
                                modalTitle  = "Select Time"
                                openOnFocus = { true }
                                onFocus     = {() => console.log( 'Input focused!' )}
                                icon        = { <MdAccessTime size={20} /> }
                                onModalOpen = { handleTimeOpen }
                                onAgree     = { handleTimeAgree }
                            >
                                <input
                                    type      = "time"
                                    value     = { tempTime }
                                    onChange  = { (e) => setTempTime( e.target.value ) }
                                    className = "input input-primary w-full"
                                />
                            </InputModal>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default InputModalDemo ;
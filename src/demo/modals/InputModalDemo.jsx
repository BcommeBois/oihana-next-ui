'use client' ;

import { useState } from 'react' ;

import useI18n from '@/contexts/locale/useI18n' ;

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

const InputModalDemo = ( { path = 'demo.modals.input' } = {} ) =>
{
    const t = useI18n( path ) ;

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
                <h2 className="text-3xl font-bold">{ t.title }</h2>
                <p className="text-base-content/70 mt-2">{ t.description }</p>
            </div>

            <Divider />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title">
                            { t.withFocus } <Badge color="success">openOnFocus</Badge>
                        </h3>
                        <p className="text-sm text-base-content/70 mb-4">
                            Click the input field or the button to open
                        </p>
                        <InputModal
                            label       = { t.color.label }
                            value       = { color }
                            modalTitle  = { t.color.modal }
                            actionLabel = { t.color.action }
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
                                    label    = { t.color.hex }
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
                        <InputModal
                            label       = { t.date.label }
                            value       = { date }
                            modalTitle  = { t.date.modal }
                            actionLabel = { t.date.action }
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
                        <InputModal
                            label       = { t.time.label }
                            value       = { time }
                            modalTitle  = { t.time.modal }
                            actionLabel = { t.time.action }
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
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h3 className="card-title">
                            { t.withoutFocus } <Badge color="neutral">openOnFocus</Badge>
                        </h3>
                        <p className="text-sm text-base-content/70 mb-4">
                            Only the button opens the modal
                        </p>
                        <InputModal
                            label       = { t.location.label }
                            value       = { location }
                            modalTitle  = { t.location.modal }
                            actionLabel = { t.location.action }
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
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h3 className="card-title">{ t.useCases.title }</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-bold text-success mb-2">{ t.useCases.good }</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                { t.useCases.goodList.map( item => <li key={ item }>{ item }</li> ) }
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-error mb-2">{ t.useCases.avoid }</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                { t.useCases.avoidList.map( item => <li key={ item }>{ item }</li> ) }
                            </ul>
                        </div>
                    </div>

                    <div className="mockup-code mt-4">
                        <pre data-prefix="1"><code>{ t.sample.pattern }</code></pre>
                        <pre data-prefix="2"><code>const [value, setValue] = useState(initial) ;</code></pre>
                        <pre data-prefix="3"><code>const [tempValue, setTempValue] = useState(initial) ;</code></pre>
                        <pre data-prefix="4"><code></code></pre>
                        <pre data-prefix="5"><code>&lt;InputModal</code></pre>
                        <pre data-prefix="6"><code>{ `  value={value}  ` }{ t.sample.shown }</code></pre>
                        <pre data-prefix="7"><code>  onModalOpen={`{() => setTempValue(value)}`}</code></pre>
                        <pre data-prefix="8"><code>  onAgree={`{() => setValue(tempValue)}`}</code></pre>
                        <pre data-prefix="9"><code>&gt;</code></pre>
                        <pre data-prefix="10"><code>  &lt;input value={`{tempValue}`} onChange={`{setTempValue}`} /&gt;</code></pre>
                        <pre data-prefix="11"><code>&lt;/InputModal&gt;</code></pre>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 shadow">
                <div className="card-body">
                    <h3 className="card-title">{ t.options.title }</h3>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold mb-2">{ t.options.hideAction }</h4>
                            <p className="text-sm text-base-content/70 mb-2">
                                Use <code className="badge badge-sm">showActionButton={`{false}`}</code> to hide the button
                            </p>

                            <InputModal
                                label            = { t.options.autoOpen }
                                value            = { date }
                                modalTitle       = { t.date.modal }
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
                        <div>
                            <h4 className="font-bold mb-2">{ t.options.customName }</h4>
                            <p className="text-sm text-base-content/70 mb-2">
                                Combine with your own focus handler
                            </p>

                            <InputModal
                                label       = { t.options.customBody }
                                value       = { time }
                                modalTitle  = { t.time.modal }
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
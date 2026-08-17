'use client' ;

import { useEffect , useState } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;

import useEventEditor from '../../hooks/useEventEditor' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { describeSpan } from '../../helpers/schedule/describeEvent' ;

import
{
    SCHEDULER_PANEL ,
    SCHEDULER_PANEL_FORM ,
    SCHEDULER_PANEL_NOTE ,
    SCHEDULER_PANEL_PREVIOUS ,
    SCHEDULER_PANEL_SPAN ,
    SCHEDULER_PANEL_WHEN ,
    resolveDotColor ,
} from '../../themes/components/scheduler' ;

import Badge from '../Badge' ;
import Button from '../Button' ;
import Checkbox from '../checkboxes/Checkbox' ;
import Input from '../inputs/Input' ;
import Modal from '../modals/Modal' ;
import useModal from '../modals/hooks/useModal' ;

import SchedulerEventField from './SchedulerEventField' ;

/** Statuses worth showing. `scheduled` is the absence of news. */
const NOTABLE = [ 'cancelled' , 'postponed' , 'rescheduled' , 'movedOnline' ] ;

/** Which badge colour a status deserves. */
const STATUS_COLOR =
{
    cancelled   : 'error' ,
    movedOnline : 'info' ,
    postponed   : 'warning' ,
    rescheduled : 'warning' ,
} ;

/** Placements daisyUI sizes by content, and which therefore need a width. */
const SIDE = [ 'start' , 'end' ] ;

/** How long a delete button stays armed before it forgets it was asked. */
const CONFIRM_DELAY = 4000 ;

/**
 * The panel where an event is read, and — when allowed — changed.
 *
 * ### Consulting is not editing, and it is the common case
 *
 * A booking is looked at far more often than it is changed, so the panel opens
 * **in reading** and says what it knows plainly. A `Modifier` button appears only
 * where the permissions grant it, and the same shell carries the form : two
 * components would share the placement, the header and the footer, and diverge at
 * the first fix.
 *
 * ### It is a `Modal`, and modals have placements
 *
 * `middle` by default, full screen below `md` — a form on a phone wants the
 * screen, and a thumb never reaches the top of one. `placement="end"` turns the
 * same panel into a side sheet, `bottom` into a tray. All of it is `Modal`'s.
 *
 * ### Four ways out, when the defaults are not enough
 *
 * `fields` may be **a function of the event** — one set of rows per subtype ;
 * `renderField` replaces one row, in either mode ; `children` replaces the whole
 * body ; and `useEventEditor` drives a window of your own making.
 *
 * @module components/scheduler/SchedulerEventPanel
 *
 * @param {Object} props
 * @param {(props: Object) => React.ReactNode} [props.children] - Render-prop for the whole body : `({ editing , editor , event , fields , labels })`.
 * @param {React.ReactNode} [props.createTitle] - Heading shown while creating. Defaults to the locale's — say « Nouveau rendez-vous » here when that is what your application makes.
 * @param {React.ReactNode} [props.editTitle] - Heading shown while editing. Defaults to the locale's.
 * @param {boolean} [props.deletable=false] - Offer to delete. The confirmation happens **in place** — a modal inside a modal is a dead end.
 * @param {string} [props.defaultMode='read'] - Which mode it opens in. `'edit'` is what a creation wants.
 * @param {boolean} [props.editable=false] - Offer to switch to editing.
 * @param {import('../../helpers/schedule/normalizeEvent').ScheduleEvent} [props.event] - The record to show. `null` closes the panel.
 * @param {Array|Function} [props.fields] - Row descriptors, or a function of the event returning them.
 * @param {React.ReactNode} [props.footerOptions] - Extra controls, placed at the start of the footer.
 * @param {string} [props.fullScreenBreakpoint='md'] - Below this, the panel owns the screen.
 * @param {string} [props.maxWidth='max-w-lg'] - Width of the box, for the placements that use one.
 * @param {string} [props.mode] - Controlled mode : `'read'` | `'edit'`.
 * @param {() => void} [props.onClose] - Called when the panel closes, however it closed.
 * @param {(patch: Object, context: Object) => void} [props.onCommit] - Called with the patch when the form is saved.
 * @param {(event: Object) => void} [props.onDelete] - Called with the record when the deletion is confirmed.
 * @param {(mode: string) => void} [props.onModeChange] - Called with the new mode.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {'responsive'|'dropdown'|'modal'} [props.pickerDisplay='modal'] - How the date and time controls open. A modal by default : this form is a panel that scrolls, and an anchored dropdown inside one is the arrangement that goes wrong. A descriptor overrides it with its own `display`.
 * @param {string} [props.placement='middle'] - `top` | `middle` | `bottom` | `start` | `end`.
 * @param {{start: number, end: number}} [props.range] - The span a creation starts from.
 * @param {boolean} [props.portal=false] - Render through a portal — required when the panel opens from inside another modal.
 * @param {(field: Object, context: Object) => React.ReactNode} [props.renderField] - Replaces one row. Return `undefined` to keep the default.
 * @param {boolean} [props.schema=false] - Read the JSON-LD defaults rather than the plain ones.
 * @param {React.ReactNode} [props.title] - Replaces the event's own title in the header.
 * @param {Function} [props.validate] - `( draft ) => errors`, for the rules only an application knows.
 * @param {string} [props.width] - Width of a `start` / `end` side panel — those ignore `maxWidth`.
 *
 * @example
 * ```jsx
 * <SchedulerEventPanel
 *     editable deletable
 *     event    = { picked }
 *     onClose  = { () => setPicked( null ) }
 *     onCommit = { patch => api.save( patch ) }
 *     schema
 * />
 * ```
 */
const SchedulerEventPanel =
({
    children ,
    createTitle ,
    defaultMode = 'read' ,
    deletable = false ,
    editable = false ,
    editTitle ,
    event ,
    fields ,
    footerOptions ,
    fullScreenBreakpoint = 'md' ,
    maxWidth = 'max-w-lg' ,
    mode : modeFromProps ,
    onClose ,
    onCommit ,
    onDelete ,
    onModeChange ,
    path = 'components.scheduler' ,
    pickerDisplay = 'modal' ,
    placement = 'middle' ,
    portal = false ,
    range ,
    renderField ,
    schema = false ,
    title ,
    validate ,
    width ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    const [ ownMode , setOwnMode ] = useState( defaultMode ) ;
    const [ arming , setArming ]   = useState( false ) ;
    const [ shownId , setShownId ] = useState( null ) ;

    const mode = modeFromProps ?? ownMode ;

    // **A panel with no event can only be a form.** There is nothing to read, and
    // the reading branch would be asked for the dates of an event that does not
    // exist yet — the invariant is worth stating here rather than defending in
    // three places further down.
    const editing = mode === 'edit' || !event ;

    const setMode = ( next ) =>
    {
        setOwnMode( next ) ;
        onModeChange?.( next ) ;
    } ;

    const { close , modalRef , open } = useModal({ onClose }) ;

    const editor = useEventEditor({ event , fields , onCommit , range , schema , validate }) ;

    // The panel is opened from the outside by handing it an event, and closed by
    // taking it away — a dialog is imperative underneath, and every caller should
    // not have to be.
    useEffect( () =>
    {
        if ( event || range )
        {
            open() ;
        }
        else
        {
            close() ;
        }
    }
    , [ close , event , open , range ] ) ;

    // A panel that reopens still armed for a deletion, or still in the mode the
    // last event left it in, is a panel that acts on the wrong object. Adjusted
    // during the render rather than in an effect : the state is *derived* from
    // what is being shown, and an effect would paint the stale mode first.
    //
    // A creation has no identity to compare, so its range stands in for one —
    // without that, a form opened right after reading an event would inherit the
    // mode that event left behind.
    const subject = event?.id ?? ( range ? `new:${ range.start }` : null ) ;

    if ( subject !== shownId )
    {
        setShownId( subject ) ;
        setArming( false ) ;
        setOwnMode( defaultMode ) ;
    }

    if ( !event && !range )
    {
        return null ;
    }

    // Editing, the dot follows the draft : a colour picked in the form shows in
    // the header before it is saved anywhere.
    const dot = resolveDotColor( editing ? ( editor.draft.color ?? event?.color ) : event?.color ) ;

    const heading = title ?? ( editing
        ? ( editor.isNew ? ( createTitle ?? labels?.createTitle ) : ( editTitle ?? labels?.editTitle ) )
        : event?.title ) ;

    const status = event && NOTABLE.includes( event.status ) ? event.status : null ;

    /**
     * Saves, then goes back to reading rather than closing everything.
     *
     * The panel underneath is the answer to « did that take ? » — it re-reads the
     * record from the list, so the new values are there to be seen. Closing would
     * make the reader open the event again to check, which is a question the
     * interface should not ask them to repeat.
     *
     * A creation is the one case that closes : there is nothing underneath to go
     * back to, and the event has just appeared on the grid where it belongs.
     */
    const save = () =>
    {
        editor.submit() ;

        if ( editor.isNew )
        {
            close() ;
            return ;
        }

        editor.reset() ;
        setMode( 'read' ) ;
    } ;

    const cancel = () =>
    {
        editor.reset() ;

        if ( editor.isNew )
        {
            close() ;
            return ;
        }

        setMode( 'read' ) ;
    } ;

    const remove = () =>
    {
        if ( !arming )
        {
            setArming( true ) ;
            setTimeout( () => setArming( false ) , CONFIRM_DELAY ) ;
            return ;
        }

        onDelete?.( event ) ;
        close() ;
    } ;

    const footer = (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2">
            { footerOptions }

            { deletable && !editor.isNew && (
                <Button color={ arming ? 'error' : undefined } onClick={ remove }>
                    { arming ? labels?.confirmDelete : labels?.delete }
                </Button>
            ) }

            <div className="ms-auto flex items-center gap-2">
                { editing
                    ? (
                        <>
                            {/* Abandoning a creation closes ; abandoning an edit
                                goes back to reading what was there before. */}
                            <Button onClick={ cancel }>{ labels?.cancel }</Button>
                            <Button color="primary" disabled={ !editor.isValid } onClick={ save }>
                                { labels?.save }
                            </Button>
                        </>
                    )
                    : (
                        <>
                            { editable && <Button onClick={ () => setMode( 'edit' ) }>{ labels?.edit }</Button> }
                            <Button onClick={ close }>{ labels?.close ?? 'Close' }</Button>
                        </>
                    ) }
            </div>
        </div>
    ) ;

    return (
        <Modal
            ref                  = { modalRef }
            contentClassName     = "flex-1 min-h-0 overflow-y-auto px-4 pb-2 pt-1"
            fullScreenBreakpoint = { fullScreenBreakpoint }
            maxWidth             = { maxWidth }
            placement            = { placement }
            portal               = { portal }
            width                = { width ?? ( SIDE.includes( placement ) ? 'w-full sm:w-[26rem]' : undefined ) }
            // Reading, the event heads its own panel. Editing, its name has moved
            // into the first field — so the header says what is being done
            // instead, and an application that books appointments rather than
            // events says it in its own words.
            title                = { heading }
            icon                 = {
                <span
                    aria-hidden = "true"
                    className   = { `block size-3 rounded-full ${ dot.className }` }
                    style       = { dot.style }
                />
            }
            footerNode = { footer }
            { ...rest }
        >
            { children
                ? children({ editing , editor , event , fields : editor.fields , labels })
                : editing
                ? (
                    <div className={ SCHEDULER_PANEL_FORM }>

                        <Input
                            label    = { labels?.fields?.title }
                            size     = "sm"
                            value    = { editor.draft.title ?? '' }
                            // `Input` hands back the value, not the event.
                            onChange = { next => editor.setValue( 'title' , next ?? '' ) }
                        />

                        {/* A date control reports `null` while a date is half
                            typed, and once as it mounts. Neither is an intent to
                            unset the bound — an emptied bound is what `allDay`
                            and the calendar are for, not what a keystroke means. */}
                        <div className={ SCHEDULER_PANEL_SPAN }>
                            <SchedulerEventField
                                editing
                                display  = { pickerDisplay }
                                field    = {{ property : 'start' , type : editor.draft.allDay ? 'date' : 'datetime' , label : labels?.fields?.start }}
                                labels   = { labels }
                                lang     = { lang }
                                onChange = { next => next !== null && editor.setValue( 'start' , next ) }
                                value    = { editor.draft.start }
                            />
                            <SchedulerEventField
                                editing
                                error    = { editor.errors.end }
                                display  = { pickerDisplay }
                                field    = {{ property : 'end' , type : editor.draft.allDay ? 'date' : 'datetime' , label : labels?.fields?.end }}
                                labels   = { labels }
                                lang     = { lang }
                                onChange = { next => next !== null && editor.setValue( 'end' , next ) }
                                value    = { editor.draft.end }
                            />
                        </div>

                        <Checkbox
                            checked  = { !!editor.draft.allDay }
                            label    = { labels?.allDay }
                            size     = "sm"
                            onChange = { look => editor.setValue( 'allDay' , look.target.checked ) }
                        />

                        { editor.spanLocked && <p className={ SCHEDULER_PANEL_NOTE }>{ labels?.linkedSpan }</p> }

                        { editor.fields.map( field =>
                        {
                            const custom = renderField?.( field , { editing : true , editor , event , labels }) ;

                            if ( custom !== undefined )
                            {
                                return <div key={ field.property }>{ custom }</div> ;
                            }

                            return (
                                <SchedulerEventField
                                    key      = { field.property }
                                    editing
                                    display  = { pickerDisplay }
                                    error    = { editor.errors[ field.property ] }
                                    field    = { field }
                                    labels   = { labels }
                                    lang     = { lang }
                                    onChange = { next => editor.setValue( field.property , next ) }
                                    value    = { editor.draft[ field.property ] }
                                />
                            ) ;
                        } ) }

                    </div>
                )
                : (
                    <div className={ SCHEDULER_PANEL }>

                        <div className={ SCHEDULER_PANEL_WHEN }>
                            <span className="first-letter:uppercase">{ describeSpan( event , { labels , lang } ) }</span>

                            { status && (
                                <Badge color={ STATUS_COLOR[ status ] } size="sm">
                                    { labels?.statuses?.[ status ] ?? status }
                                </Badge>
                            ) }
                        </div>

                        { event.previousStart !== null && event.previousStart !== undefined && (
                            <p className={ SCHEDULER_PANEL_PREVIOUS }>
                                { labels?.previously } { dayjs( event.previousStart ).locale( lang ).format( 'LLL' ) }
                            </p>
                        ) }

                        { editor.fields.map( field =>
                        {
                            const custom = renderField?.( field , { editing : false , editor , event , labels }) ;

                            if ( custom !== undefined )
                            {
                                return <div key={ field.property }>{ custom }</div> ;
                            }

                            return (
                                <SchedulerEventField
                                    key    = { field.property }
                                    field  = { field }
                                    labels = { labels }
                                    lang   = { lang }
                                    value  = { field.value }
                                />
                            ) ;
                        } ) }

                    </div>
                ) }
        </Modal>
    ) ;
} ;

SchedulerEventPanel.displayName = 'SchedulerEventPanel' ;

export default SchedulerEventPanel ;

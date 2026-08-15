'use client' ;

import { useEffect } from 'react' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import { formatValue , resolveFields } from '../../helpers/schedule/eventFields' ;

import
{
    SCHEDULER_PANEL ,
    SCHEDULER_PANEL_LABEL ,
    SCHEDULER_PANEL_PREVIOUS ,
    SCHEDULER_PANEL_ROW ,
    SCHEDULER_PANEL_VALUE ,
    SCHEDULER_PANEL_WHEN ,
    resolveEventColor ,
} from '../../themes/components/scheduler' ;

import Badge from '../Badge' ;
import Button from '../Button' ;
import Modal from '../modals/Modal' ;
import useModal from '../modals/hooks/useModal' ;

/** Statuses worth showing. `scheduled` is the absence of news. */
const NOTABLE = [ 'cancelled' , 'postponed' , 'rescheduled' , 'movedOnline' ] ;

/** Placements daisyUI sizes by content, and which therefore need a width. */
const SIDE = [ 'start' , 'end' ] ;

/** Which badge colour a status deserves. */
const STATUS_COLOR =
{
    cancelled   : 'error' ,
    movedOnline : 'info' ,
    postponed   : 'warning' ,
    rescheduled : 'warning' ,
} ;

/**
 * Says when an event happens, the way one would say it out loud.
 *
 * @param {Object} event
 * @param {string} lang
 * @param {Object} labels
 * @returns {string}
 */
const formatSpan = ( event , lang , labels ) =>
{
    const from = dayjs( event.start ).locale( lang ) ;

    // An all-day span ends at the following midnight, which is not a day anybody
    // would name : the last day covered is the one before it.
    const to = dayjs( event.allDay ? event.end - 1 : event.end ).locale( lang ) ;

    const sameDay = from.isSame( to , 'day' ) ;

    if ( event.allDay )
    {
        return sameDay
            ? `${ from.format( 'dddd LL' ) } · ${ labels?.allDay ?? '' }`.trim()
            : `${ from.format( 'LL' ) } – ${ to.format( 'LL' ) }` ;
    }

    return sameDay
        ? `${ from.format( 'dddd LL' ) } · ${ from.format( 'HH:mm' ) } – ${ to.format( 'HH:mm' ) }`
        : `${ from.format( 'LLL' ) } – ${ to.format( 'LLL' ) }` ;
} ;

/**
 * The panel where an event is read.
 *
 * ### Consulting is not editing, and it is the common case
 *
 * A booking is looked at far more often than it is changed, so the panel opens
 * **in reading** and says what it knows plainly. What it can print is decided by
 * `fields`, each descriptor naming **the property it reads** — which is what lets
 * a property added to a house subtype server-side become a row here in one line,
 * without this component learning its name.
 *
 * ### It is a modal, and modals have placements
 *
 * `middle` by default, full screen below `md` — a form on a phone wants the
 * screen, and a thumb never reaches the top of one. `placement="end"` turns the
 * same panel into a side sheet that leaves the calendar visible ; `bottom` makes
 * it a tray. All of it is `Modal`'s, not this component's.
 *
 * ### Four ways out, when the defaults are not enough
 *
 * `fields` may be **a function of the event** — one set of rows per subtype ;
 * `renderField` replaces one row ; `children` replaces the whole body and keeps
 * the shell ; and the record is right there for a panel of your own making.
 *
 * @module components/scheduler/SchedulerEventPanel
 *
 * @param {Object} props
 * @param {(props: Object) => React.ReactNode} [props.children] - Render-prop for the whole body : `({ event , fields , labels })`.
 * @param {import('../../helpers/schedule/normalizeEvent').ScheduleEvent} [props.event] - The record to show. `null` closes the panel.
 * @param {Array|Function} [props.fields] - Row descriptors, or a function of the event returning them.
 * @param {React.ReactNode} [props.footerOptions] - Extra controls, placed at the start of the footer.
 * @param {string} [props.fullScreenBreakpoint='md'] - Below this, the panel owns the screen.
 * @param {string} [props.maxWidth='max-w-lg'] - Width of the box, for the placements that use one.
 * @param {() => void} [props.onClose] - Called when the panel closes, however it closed.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {string} [props.placement='middle'] - `top` | `middle` | `bottom` | `start` | `end`.
 * @param {string} [props.width] - Width of a `start` / `end` side panel — those ignore `maxWidth` and would otherwise be sized by their own content.
 * @param {boolean} [props.portal=false] - Render through a portal — required when the panel opens from inside another modal.
 * @param {(field: Object, context: Object) => React.ReactNode} [props.renderField] - Replaces one row. Return `undefined` to keep the default.
 * @param {boolean} [props.schema=false] - Read the JSON-LD defaults rather than the plain ones.
 * @param {React.ReactNode} [props.title] - Replaces the event's own title in the header.
 *
 * @example
 * ```jsx
 * const [ picked , setPicked ] = useState( null ) ;
 *
 * <Scheduler onEventClick={ setPicked } … />
 * <SchedulerEventPanel event={ picked } onClose={ () => setPicked( null ) } schema />
 * ```
 */
const SchedulerEventPanel =
({
    children ,
    event ,
    fields ,
    footerOptions ,
    fullScreenBreakpoint = 'md' ,
    maxWidth = 'max-w-lg' ,
    onClose ,
    path = 'components.scheduler' ,
    placement = 'middle' ,
    portal = false ,
    renderField ,
    schema = false ,
    title ,
    width ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    const { close , modalRef , open } = useModal({ onClose }) ;

    // The panel is opened from the outside by handing it an event, and closed by
    // taking it away — a dialog is imperative underneath, and every caller should
    // not have to be.
    useEffect( () =>
    {
        if ( event )
        {
            open() ;
        }
        else
        {
            close() ;
        }
    }
    , [ close , event , open ] ) ;

    if ( !event )
    {
        return null ;
    }

    const rows = resolveFields( event , { fields , schema })
        .map( field => ({ ...field , text : formatValue( field.value , field.type , { lang } ) }) ) ;

    const { style } = resolveEventColor( event.color ) ;

    const status = NOTABLE.includes( event.status ) ? event.status : null ;

    return (
        <Modal
            ref                  = { modalRef }
            contentClassName     = "flex-1 min-h-0 overflow-y-auto px-4 pb-2 pt-1"
            fullScreenBreakpoint = { fullScreenBreakpoint }
            maxWidth             = { maxWidth }
            placement            = { placement }
            portal               = { portal }
            // A side panel is sized by `width`, never by `maxWidth` — left to
            // itself it would take the width of its own longest line.
            width                = { width ?? ( SIDE.includes( placement ) ? 'w-full sm:w-[26rem]' : undefined ) }
            // No stand-in title. An event that names itself heads its own panel ;
            // one that does not is better headed by nothing than by the word for
            // nothing, and the close button holds the row on its own.
            title                = { title ?? event.title ?? undefined }
            // The colour belongs beside the name, not in front of the date : in the
            // body it indented the first line by its own width and every label
            // below it stopped lining up with anything.
            icon                 = {
                <span
                    aria-hidden = "true"
                    className   = { `block size-3 rounded-full ${ event.color ? '' : 'bg-base-content/40' }` }
                    style       = { style ? { backgroundColor : style.borderInlineStartColor } : undefined }
                />
            }
            footerNode = {
                <div className="flex items-center gap-2 px-4 py-2">
                    { footerOptions }
                    <Button className="ms-auto" onClick={ close }>{ labels?.close ?? 'Close' }</Button>
                </div>
            }
            { ...rest }
        >
            <div className={ SCHEDULER_PANEL }>

                <div className={ SCHEDULER_PANEL_WHEN }>
                    <span className="first-letter:uppercase">{ formatSpan( event , lang , labels ) }</span>

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

                { children
                    ? children({ event , fields : rows , labels })
                    : rows.map( field =>
                    {
                        const custom = renderField?.( field , { event , labels } ) ;

                        if ( custom !== undefined )
                        {
                            return <div key={ field.property }>{ custom }</div> ;
                        }

                        // A row with nothing in it is worse than no row : it spends
                        // the reader's attention on the absence of an answer.
                        if ( field.text === null )
                        {
                            return null ;
                        }

                        return (
                            <div key={ field.property } className={ SCHEDULER_PANEL_ROW }>
                                <span className={ SCHEDULER_PANEL_LABEL }>
                                    { field.label ?? labels?.fields?.[ field.property ] ?? field.property }
                                </span>
                                <span className={ SCHEDULER_PANEL_VALUE }>
                                    { field.type === 'url'
                                        ? <a className="link" href={ field.text } rel="noreferrer" target="_blank">{ field.text }</a>
                                        : field.text }
                                </span>
                            </div>
                        ) ;
                    } ) }

            </div>
        </Modal>
    ) ;
} ;

SchedulerEventPanel.displayName = 'SchedulerEventPanel' ;

export default SchedulerEventPanel ;

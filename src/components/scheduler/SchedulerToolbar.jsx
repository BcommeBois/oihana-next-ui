'use client' ;

import useI18n from '../../contexts/locale/useI18n' ;
import useLang from '../../contexts/lang/useLang' ;

import { formatPeriod } from '../../helpers/schedule/formatPeriod' ;

import { getSchedulerToolbarClasses , SCHEDULER_PERIOD } from '../../themes/components/scheduler' ;

import Button from '../Button' ;
import Tabs   from '../tabs/Tabs' ;

/**
 * Navigation and view switching, above a scheduler view.
 *
 * Rendered by {@link module:components/scheduler/Scheduler} unless it is told not
 * to, and exported so an application that wants its own layout can place it
 * itself — the same arrangement `ChartFrame` uses for its header.
 *
 * The view switcher **disappears when there is only one view**. A tab bar with a
 * single tab states nothing and takes a row of vertical space to do it.
 *
 * ### Why creating has a button here at all
 *
 * Drawing a range on a grid is a pointer gesture, and three of the five views
 * cannot offer it — an agenda has no axis, a month has no hours. It is also the
 * one gesture a keyboard has no honest equivalent for : a focusable empty column
 * would be seven tab stops a week, each of them guessing an hour. **Creating is a
 * command**, so it is a control, in the one place every view shares.
 *
 * @module components/scheduler/SchedulerToolbar
 *
 * @param {Object} props
 * @param {string} [props.className] - Extra classes for the toolbar.
 * @param {import('dayjs').ConfigType} [props.date] - The anchor, used to name a month.
 * @param {React.ReactNode} [props.children] - Extra controls, placed after the view switcher.
 * @param {() => void} [props.onCreate] - Called when the create command is used. Its absence removes the button.
 * @param {() => void} props.onNext - Move one period forward.
 * @param {() => void} props.onPrevious - Move one period back.
 * @param {() => void} props.onToday - Come back to today.
 * @param {(view: string) => void} [props.onViewChange] - Called with the picked view.
 * @param {string} [props.path='components.scheduler'] - i18n path the labels are read from.
 * @param {string} props.view - The current view.
 * @param {string[]} [props.views] - The views to offer. One or none hides the switcher.
 * @param {{start: number, end: number}} props.window - The span being looked at.
 */
const SchedulerToolbar =
({
    className ,
    children ,
    date ,
    onCreate ,
    onNext ,
    onPrevious ,
    onToday ,
    onViewChange ,
    path = 'components.scheduler' ,
    view ,
    views ,
    window ,
    ...rest
}) =>
{
    const { lang } = useLang() ;
    const labels   = useI18n( path ) ;

    const period = formatPeriod( window , { lang , view , date } ) ;

    const items = ( views ?? [] ).map( id => ({ id , label : labels?.views?.[ id ] ?? id }) ) ;

    return (
        <div className={ getSchedulerToolbarClasses({ className }) } { ...rest }>

            {/* The chevrons are decoration : the accessible name comes from the
                locale, not from a glyph a screen reader would read as punctuation. */}
            <Button
                size       = "sm"
                shape      = "square"
                onClick    = { onPrevious }
                title      = { labels?.previous }
                aria-label = { labels?.previous }
            >
                <span aria-hidden="true">‹</span>
            </Button>

            <Button
                size       = "sm"
                shape      = "square"
                onClick    = { onNext }
                title      = { labels?.next }
                aria-label = { labels?.next }
            >
                <span aria-hidden="true">›</span>
            </Button>

            <Button size="sm" onClick={ onToday }>{ labels?.today }</Button>

            <span className={ SCHEDULER_PERIOD }>{ period }</span>

            { ( items.length > 1 || onCreate ) && (
                <div className="ms-auto flex items-center gap-2">
                    { items.length > 1 && (
                        <div className="overflow-x-auto">
                            <Tabs
                                ariaLabel = { period }
                                className = "inline-flex"
                                items     = { items }
                                onChange  = { onViewChange }
                                size      = { { xs : 'sm' , md : 'md' } }
                                style     = "box"
                                value     = { view }
                            />
                        </div>
                    ) }

                    { onCreate && (
                        <Button color="primary" onClick={ onCreate } size="sm">
                            { labels?.create }
                        </Button>
                    ) }
                </div>
            ) }

            { children }

        </div>
    ) ;
} ;

SchedulerToolbar.displayName = 'SchedulerToolbar' ;

export default SchedulerToolbar ;

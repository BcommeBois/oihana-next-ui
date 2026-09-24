'use client' ;

/**
 * DateLabel — a date written for a reader : an icon, and the date itself,
 * either in full or as a distance from now (« an hour ago »).
 *
 * 🚨 **The relative form is not rendered on the server.** `fromNow()` reads
 * the clock, and a server and a browser never read the same one : « 59
 * minutes ago » on one side, « an hour ago » on the other, and React reports
 * the difference as a hydration mismatch. So the label writes the date **in
 * full** while {@link module:hooks/useNow} still answers `null` — on the
 * server and through the hydration pass, the two renders that must agree —
 * and switches to the relative form once mounted. It then follows the clock,
 * instead of freezing at the instant of the first paint.
 *
 * 🔑 **It takes the date, already read.** Handing it an object and the name
 * of a field would make an label do a lookup that belongs to its caller —
 * the same reason {@link module:components/links/LinkCard} takes an `href`
 * rather than a record.
 *
 * The date is written in the application's time zone
 * ({@link module:hooks/useDateFormat}), never the machine's.
 *
 * Renders nothing at all when there is no date and no `empty` text to stand
 * in for it.
 *
 * @module components/labels/DateLabel
 *
 * @example
 * ```jsx
 * <DateLabel value={ article.published } />
 * <DateLabel value={ article.published } pattern="L" showIcon={ false } />
 *
 * // « an hour ago », once the page is past hydration :
 * <DateLabel relative value={ article.published } />
 *
 * // Wrapped in a sentence the bundle owns :
 * <DateLabel label="Published : {0}" value={ article.published } />
 * ```
 */

import { MdCalendarMonth as DefaultDateIcon } from 'react-icons/md' ;

import format   from 'vegas-js-core/src/strings/fastformat' ;
import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import dayjs from '../../helpers/date/configureDayjs' ;

import useDateFormat from '../../hooks/useDateFormat' ;
import useNow        from '../../hooks/useNow' ;

import cn from '../../themes/helpers/cn' ;

/**
 * Where a date label reads its copy when the host names no bundle.
 * @type {string}
 */
export const DATE_I18N_PATH = 'components.dates' ;

/**
 * @param {Object}            props
 * @param {React.ReactNode}   [props.after]          - Rendered after the text.
 * @param {React.ReactNode}   [props.before]         - Rendered between the icon and the text.
 * @param {string}            [props.className]      - Additional class names for the row.
 * @param {string}            [props.empty]          - Stands in for a missing or unreadable date. Absent, nothing is written.
 * @param {React.ReactNode}   [props.icon]           - An icon already rendered, used instead of `Icon`.
 * @param {React.ElementType} [props.Icon]           - The icon to render. Defaults to a calendar.
 * @param {string}            [props.iconClassName]  - Additional class names for the icon.
 * @param {string}            [props.label]          - A sentence carrying a `{0}` the date is written into.
 * @param {string}            [props.labelClassName] - Additional class names for the text.
 * @param {Object}            [props.labelProps]     - Forwarded to the text element.
 * @param {string}            [props.pattern]        - A dayjs pattern. Read from the bundle when absent.
 * @param {string}            [props.path='components.dates'] - i18n path holding `empty`, `label` and `pattern`.
 * @param {boolean}           [props.relative=false] - Write the date against now, once past hydration.
 * @param {boolean}           [props.showIcon=true]  - Whether the icon is rendered.
 * @param {boolean}           [props.showLabel=true] - Whether the text is rendered.
 * @param {number}            [props.tick=60000]     - Milliseconds between two refreshes of the relative form.
 * @param {*}                 [props.value]          - The date : an ISO string, a timestamp, a `Date`.
 */
const DateLabel =
({
    after ,
    before ,
    className ,
    empty : emptyFromProps ,
    icon ,
    Icon = DefaultDateIcon ,
    iconClassName ,
    label : labelFromProps ,
    labelClassName ,
    labelProps ,
    pattern : patternFromProps ,
    path = DATE_I18N_PATH ,
    relative = false ,
    showIcon = true ,
    showLabel = true ,
    tick = 60000 ,
    value ,
}) =>
{
    const { empty , label , pattern } = useI18n( path , NO_LOCALE , false ) ;

    const { formatDate , lang } = useDateFormat() ;

    // `null` on the server and through hydration — see the note above. The
    // clock is only asked for when the relative form is actually wanted.
    const now = useNow( { enabled : relative , interval : tick } ) ;

    const iconElement = showIcon
        ? ( icon ?? ( Icon ? <Icon className={ cn( 'shrink-0' , iconClassName ) } /> : null ) )
        : null ;

    let labelElement = null ;

    if ( showLabel )
    {
        const moment    = dayjs( value ) ;
        const emptyText = emptyFromProps ?? empty ;

        let written = null ;

        if ( value != null && moment.isValid() )
        {
            written = relative && now !== null
                ? moment.locale( lang ?? dayjs.locale() ).from( now )
                : formatDate( value , { pattern : patternFromProps ?? pattern } ) ;
        }
        else if ( notEmpty( emptyText ) )
        {
            written = emptyText ;
        }

        if ( notEmpty( written ) )
        {
            const sentence = labelFromProps ?? label ;
            const text     = notEmpty( sentence ) ? format( sentence , written ) : written ;

            labelElement =
            (
                <span className={ labelClassName } { ...labelProps }>
                    { text }
                </span>
            ) ;
        }
    }

    if ( !iconElement && !labelElement && !before && !after ) { return null ; }

    return (
        <div className={ cn( 'flex flex-row items-center gap-2' , className ) }>
            { iconElement }
            { before }
            { labelElement }
            { after }
        </div>
    ) ;
} ;

DateLabel.displayName = 'DateLabel' ;

export default DateLabel ;

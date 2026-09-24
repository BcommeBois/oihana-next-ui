'use client' ;

/**
 * MetaDates — when a record was created, and when it was last touched, as
 * the quiet line at the bottom of a page.
 *
 * ⚠️ **The pair wraps.** « Created : 17/09/2026 at 10:32:05 » and its
 * modified twin need some 330 px together — more than a phone leaves once a
 * header has taken its share. Each date keeps its own line
 * (`whitespace-nowrap`) and the pair falls onto two rows when it must ; a
 * full-height rule between them, which is what a `divider-horizontal` draws,
 * turned into a stray vertical bar the moment the labels broke.
 *
 * It reads two fields off the record, so it takes the record — unlike
 * {@link module:components/labels/DateLabel}, which takes a date already
 * read. `createdMember` / `modifiedMember` name them when they are called
 * something else.
 *
 * Both dates go through `DateLabel`, so `relative` carries its guarantee :
 * written in full on the server, against the clock once mounted — and so does
 * `datePattern` : a date served alone (`2026-05-31`, often a creation date
 * carried over from an older system) is written without the hour of
 * `pattern`, when a pattern for it is set.
 *
 * @module components/labels/MetaDates
 *
 * @example
 * ```jsx
 * <MetaDates value={ article } />
 *
 * // « an hour ago », once past hydration :
 * <MetaDates relative value={ article } />
 *
 * // Only one of the two, under other names :
 * <MetaDates
 *     createdMember = "openedAt"
 *     showModified  = { false }
 *     value         = { ticket }
 * />
 * ```
 */

import { MdEventAvailable as DefaultCreatedIcon , MdUpdate as DefaultModifiedIcon } from 'react-icons/md' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

import cn from '../../themes/helpers/cn' ;

import DateLabel from './DateLabel' ;

/**
 * Where the pair reads its two sentences and its shared pattern.
 * @type {string}
 */
export const META_DATES_I18N_PATH = 'components.dates.meta' ;

/**
 * @param {Object}   props
 * @param {string}   [props.className]              - Additional class names for the row.
 * @param {React.ElementType} [props.CreatedIcon]   - The icon of the creation date.
 * @param {string}   [props.datePattern]            - The pattern of a date served alone. Read from the bundle when absent ; unset, `pattern` is used.
 * @param {string}   [props.createdMember='created'] - Which field carries the creation date.
 * @param {React.ElementType} [props.ModifiedIcon]  - The icon of the modification date.
 * @param {string}   [props.modifiedMember='modified'] - Which field carries the modification date.
 * @param {string}   [props.path='components.dates.meta'] - i18n path holding `created`, `modified`, `pattern` and `datePattern`.
 * @param {boolean}  [props.relative=false]         - Write both dates against now, once past hydration.
 * @param {boolean}  [props.showCreated=true]       - Whether the creation date is written.
 * @param {boolean}  [props.showIcon=true]          - Whether both dates carry their icon.
 * @param {boolean}  [props.showModified=true]      - Whether the modification date is written.
 * @param {number}   [props.tick=60000]             - Milliseconds between two refreshes of the relative form.
 * @param {Object}   [props.value]                  - The record both dates are read from.
 */
const MetaDates =
({
    className ,
    CreatedIcon = DefaultCreatedIcon ,
    createdMember = 'created' ,
    datePattern : datePatternFromProps ,
    ModifiedIcon = DefaultModifiedIcon ,
    modifiedMember = 'modified' ,
    path = META_DATES_I18N_PATH ,
    relative = false ,
    showCreated = true ,
    showIcon = true ,
    showModified = true ,
    tick = 60000 ,
    value ,
}) =>
{
    const { created , datePattern , modified , pattern } = useI18n( path , NO_LOCALE , false ) ;

    const dayPattern = datePatternFromProps ?? datePattern ;

    if ( !value ) { return null ; }

    const createdValue  = value[ createdMember ] ;
    const modifiedValue = value[ modifiedMember ] ;

    const createdElement = showCreated && createdValue != null &&
    (
        <DateLabel
            className   = "whitespace-nowrap"
            datePattern = { dayPattern }
            Icon        = { CreatedIcon }
            label       = { created }
            pattern     = { pattern }
            relative    = { relative }
            showIcon    = { showIcon }
            tick        = { tick }
            value       = { createdValue }
        />
    ) ;

    const modifiedElement = showModified && modifiedValue != null &&
    (
        <DateLabel
            className   = "whitespace-nowrap"
            datePattern = { dayPattern }
            Icon        = { ModifiedIcon }
            label       = { modified }
            pattern     = { pattern }
            relative    = { relative }
            showIcon    = { showIcon }
            tick        = { tick }
            value       = { modifiedValue }
        />
    ) ;

    if ( !createdElement && !modifiedElement ) { return null ; }

    return (
        <div className={ cn( 'flex flex-row flex-wrap items-center gap-x-3 gap-y-1 opacity-80 text-xs' , className ) }>

            { createdElement }

            { createdElement && modifiedElement && (
                <span aria-hidden className="opacity-40">·</span>
            ) }

            { modifiedElement }

        </div>
    ) ;
} ;

MetaDates.displayName = 'MetaDates' ;

export default MetaDates ;

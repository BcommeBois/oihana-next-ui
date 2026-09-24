/**
 * Centralised dayjs configuration for the date components.
 *
 * Importing this module guarantees the plugins the calendar relies on are
 * registered (idempotent — `dayjs.extend` is safe to call once per plugin).
 * Components/helpers should import dayjs from here rather than from 'dayjs'
 * directly, so the plugins are always loaded.
 *
 * - `localeData` — locale `firstDayOfWeek()` + `weekdaysMin()` / month names.
 * - `weekday`    — locale-aware day-of-week navigation (grid start).
 * - `isBetween`  — range highlighting.
 *
 * The schedule helpers add four more :
 *
 * - `duration`       — parses the ISO 8601 durations schema.org carries (`PT1H30M`).
 * - `isSameOrBefore` — window clipping, where a bound is inclusive.
 * - `isSameOrAfter`  — idem.
 * - `minMax`         — bounding a set of events without sorting it.
 * - `isoWeek`        — ISO week numbers, used by week-bounded recurrences.
 * - `relativeTime`   — « an hour ago », for a date written against now.
 *
 * And two for writing an instant in a named time zone
 * ({@link module:helpers/date/formatDate}) :
 * - `utc`      — the base `timezone` builds on.
 * - `timezone` — `dayjs( value ).tz( 'Europe/Paris' )`.
 *
 * Locales (fr / en) are loaded in `@locale/index.js` and the active one is set
 * globally by the LangProvider (`dayjs.locale(lang)`).
 *
 * @module helpers/date/configureDayjs
 */

import dayjs from 'dayjs' ;

import duration       from 'dayjs/plugin/duration' ;
import isBetween      from 'dayjs/plugin/isBetween' ;
import isSameOrAfter  from 'dayjs/plugin/isSameOrAfter' ;
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore' ;
import isoWeek        from 'dayjs/plugin/isoWeek' ;
import localeData      from 'dayjs/plugin/localeData' ;
import localizedFormat from 'dayjs/plugin/localizedFormat' ;
import minMax          from 'dayjs/plugin/minMax' ;
import relativeTime    from 'dayjs/plugin/relativeTime' ;
import timezone        from 'dayjs/plugin/timezone' ;
import utc             from 'dayjs/plugin/utc' ;
import weekday        from 'dayjs/plugin/weekday' ;

dayjs.extend( localeData ) ;
dayjs.extend( weekday ) ;
dayjs.extend( isBetween ) ;
dayjs.extend( duration ) ;
dayjs.extend( isSameOrAfter ) ;
dayjs.extend( isSameOrBefore ) ;
dayjs.extend( isoWeek ) ;
dayjs.extend( minMax ) ;

// `fromNow` — « an hour ago », in the active locale. Read by
// {@link module:components/labels/DateLabel} when it writes a date relatively.
dayjs.extend( relativeTime ) ;

// `timezone` reads the offsets `utc` computes : the order matters.
dayjs.extend( utc ) ;
dayjs.extend( timezone ) ;

// `L` `LL` `LLL` `LT` — without it those tokens are not formats, they are the
// letters themselves, and a date reads « jeudi LL ». They are the only way to
// print a date in the order a locale actually writes it.
dayjs.extend( localizedFormat ) ;

export default dayjs ;

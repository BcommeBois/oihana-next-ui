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
import localeData     from 'dayjs/plugin/localeData' ;
import minMax         from 'dayjs/plugin/minMax' ;
import weekday        from 'dayjs/plugin/weekday' ;

dayjs.extend( localeData ) ;
dayjs.extend( weekday ) ;
dayjs.extend( isBetween ) ;
dayjs.extend( duration ) ;
dayjs.extend( isSameOrAfter ) ;
dayjs.extend( isSameOrBefore ) ;
dayjs.extend( isoWeek ) ;
dayjs.extend( minMax ) ;

export default dayjs ;

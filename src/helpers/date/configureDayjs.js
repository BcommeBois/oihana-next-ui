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
 * Locales (fr / en) are loaded in `@locale/index.js` and the active one is set
 * globally by the LangProvider (`dayjs.locale(lang)`).
 *
 * @module helpers/date/configureDayjs
 */

import dayjs from 'dayjs' ;

import isBetween  from 'dayjs/plugin/isBetween' ;
import localeData from 'dayjs/plugin/localeData' ;
import weekday    from 'dayjs/plugin/weekday' ;

dayjs.extend( localeData ) ;
dayjs.extend( weekday ) ;
dayjs.extend( isBetween ) ;

export default dayjs ;

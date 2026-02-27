/**
 * Date format modes for InputDate component.
 *
 * @example
 * import { DD_MM_YYYY, YYYY_MM_DD } from '@/helpers/date/dateModes' ;
 *
 * <InputDate mode={DD_MM_YYYY} />
 * <InputDate mode={YYYY_MM_DD} separator="-" />
 */

export const DD_MM      = 'dd/mm' ;
export const DD_MM_YYYY = 'dd/mm/yyyy' ;
export const MM_DD      = 'mm/dd' ;
export const MM_DD_YYYY = 'mm/dd/yyyy' ;
export const MM_YY      = 'mm/yy' ;
export const MM_YYYY    = 'mm/yyyy' ;
export const YYYY_MM_DD = 'yyyy/mm/dd' ; // Custom ISO mode

const dateModes =
[
    DD_MM,
    DD_MM_YYYY,
    MM_DD,
    MM_DD_YYYY,
    MM_YY,
    MM_YYYY,
    YYYY_MM_DD
] ;

export default dateModes ;
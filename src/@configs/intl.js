/**
 * How numbers and dates are written.
 *
 * - `locales` : a language code picks the words ; the locale picks the number
 *   conventions — `en` alone does not say whether a thousand is « 1,000 » in
 *   London or in New York. Read by `useNumberFormat`.
 * - `timeZone` : the zone every date and hour is written in, whatever the zone
 *   of the server or of the reader. Read by `useDateFormat`.
 */
const intl =
{
    locales :
    {
        en : 'en-GB' ,
        fr : 'fr-FR' ,
    } ,
    timeZone : 'Europe/Paris' ,
} ;

export default intl ;

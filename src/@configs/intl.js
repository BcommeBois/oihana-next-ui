/**
 * How numbers are written, per language.
 *
 * A language code picks the words ; the locale picks the number conventions —
 * `en` alone does not say whether a thousand is « 1,000 » in London or in New
 * York. `useNumberFormat` reads this table at `intl.locales`.
 */
const intl =
{
    locales :
    {
        en : 'en-GB' ,
        fr : 'fr-FR' ,
    } ,
} ;

export default intl ;

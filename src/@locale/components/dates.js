/**
 * Default copy of the date labels : the sentence a date is written into, the
 * pattern it is written with, and the two sentences of a « created /
 * modified » pair.
 *
 * Visible copy, all of it. A screen that says something else — « Published :
 * {0} », « Opened : {0} » — passes its own `path`, or a `label` outright.
 *
 * `meta.pattern` carries the hour where the plain one does not : a date on a
 * record's footer answers « who touched this, and when », and « when » is
 * rarely a day.
 *
 * There is deliberately no `empty` : a missing date writes NOTHING by
 * default, rather than a dash nobody asked for. A screen that wants a
 * stand-in passes it.
 */
const dates =
{
    fr :
    {
        label   : '{0}' ,
        pattern : 'LL' ,

        meta :
        {
            created  : 'Créé : {0}' ,
            modified : 'Modifié : {0}' ,
            pattern  : 'L [à] LTS' ,
        } ,
    } ,

    en :
    {
        label   : '{0}' ,
        pattern : 'LL' ,

        meta :
        {
            created  : 'Created : {0}' ,
            modified : 'Modified : {0}' ,
            pattern  : 'L [at] LTS' ,
        } ,
    } ,
} ;

export default dates ;

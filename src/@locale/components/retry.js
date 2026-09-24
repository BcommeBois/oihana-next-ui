/**
 * Default copy of {@link module:components/RetryState} : what a block says
 * when what it had to read could not be read.
 *
 * Deliberately says nothing about WHAT failed — a block knows its subject, the
 * library does not. A screen naming it (« The figures could not be loaded »)
 * passes its own `path`, or the two strings outright.
 *
 * The button names itself from `components.buttons.refresh`.
 */
const retry =
{
    fr :
    {
        description : 'Ce dont ce bloc avait besoin n\'a pas pu être lu.' ,
        title       : 'Indisponible' ,
    } ,

    en :
    {
        description : 'What this block needed could not be read.' ,
        title       : 'Unavailable' ,
    } ,
} ;

export default retry ;

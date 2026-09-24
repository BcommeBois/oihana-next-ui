/**
 * Default copy of the badges that act : the word on the copy control of
 * {@link module:components/CopyBadge} and
 * {@link module:components/ContactBadge}, and what each contact channel
 * promises to do.
 *
 * Visible copy, not `aria-label` padding : a reader decides whether to click
 * on these words. A screen that owns its own wording passes a `path` and
 * this is never read.
 *
 * The toast that follows a copy is deliberately NOT here — the badges call
 * back rather than speak, so what is said about a copy belongs to the
 * screen's own bundle.
 */
const badges =
{
    fr :
    {
        contact :
        {
            actions :
            {
                email  : 'Envoyer un e-mail' ,
                fax    : 'Envoyer un fax' ,
                mobile : 'Appeler' ,
                phone  : 'Appeler' ,
            } ,

            copy :
            {
                tooltip : 'Copier' ,
            } ,
        } ,

        copy :
        {
            tooltip : 'Copier' ,
        } ,
    } ,

    en :
    {
        contact :
        {
            actions :
            {
                email  : 'Send an e-mail' ,
                fax    : 'Send a fax' ,
                mobile : 'Call' ,
                phone  : 'Call' ,
            } ,

            copy :
            {
                tooltip : 'Copy' ,
            } ,
        } ,

        copy :
        {
            tooltip : 'Copy' ,
        } ,
    } ,
} ;

export default badges ;

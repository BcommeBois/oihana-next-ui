/**
 * Labels of the lab's Images page : its title and the sentence under it.
 *
 * Same shape as {@link module:@locale/app/lab/textareas} — `title` and
 * `description` are also what `I18nMetas` puts in the document. The page
 * mounts a single demo, so it needs no filter bar and no `items`.
 */
const images =
{
    fr :
    {
        title       : 'Les images' ,
        description : 'Le composant Picture : son chargement, le montage à l’approche du cadre, le mode qui remplit son parent, du contenu dans les coins et au centre, et ce qu’il affiche faute de source.' ,
    } ,
    en :
    {
        title       : 'Images' ,
        description : 'The Picture component : how it loads, how it waits for the frame to come near, the mode that fills its parent, content in the corners and at the centre, and what it shows with no source at all.' ,
    } ,
} ;

export default images ;

/**
 * Labels of the lab's Files & media page : its title, and a heading and a
 * sentence per section.
 *
 * `title` and `description` are also what `I18nMetas` puts in the document.
 */
const media =
{
    fr :
    {
        title       : 'Fichiers et médias' ,
        description : 'Choisir un fichier, prendre une photo.' ,
        sections    :
        {
            file :
            {
                title       : 'Fichier' ,
                description : 'Le sélecteur de fichier natif ; le gestionnaire reçoit les fichiers, pas l’événement. Composant FileInput.' ,
            } ,
            photo :
            {
                title       : 'Photo' ,
                description : 'Une photo prise sur place, réduite et sans ses métadonnées (GPS compris) avant de partir. Composant PhotoCapture, helper resizeImage.' ,
            } ,
        } ,
    } ,
    en :
    {
        title       : 'Files & media' ,
        description : 'Pick a file, take a photo.' ,
        sections    :
        {
            file :
            {
                title       : 'File' ,
                description : 'The native file picker ; the handler receives the files, not the event. The FileInput component.' ,
            } ,
            photo :
            {
                title       : 'Photo' ,
                description : 'A photo taken on the spot, shrunk and stripped of its metadata (GPS included) before it leaves. The PhotoCapture component, the resizeImage helper.' ,
            } ,
        } ,
    } ,
} ;

export default media ;

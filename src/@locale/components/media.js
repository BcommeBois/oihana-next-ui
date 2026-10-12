/**
 * Default copy of the media components.
 *
 * `photo` is the copy of `PhotoCapture` : its two buttons, the name of each
 * thumbnail and of its remove button (`{0}`, the photo's rank), the message
 * while a photo is prepared, and a file refused — `{0}`, its name — by reason.
 *
 * `dropzone` is the copy of `FileDropzone` : what the zone says — one sentence
 * for a mouse, one for a finger, a phone having nothing to drag — what it says
 * while files hover it, the name of each remove button (`{0}`, the file's
 * name), and a file refused, by reason : `{0}` is always its name, then
 * `type` none ; `maxSize` and `minSize` its weight and the limit ; `maxFiles`
 * the limit ; `minDimensions` and `maxDimensions` its size and the limit ;
 * `decode` none. A refusal of the host's own `validate` shows its own message,
 * `custom` when it gives none.
 */
const media =
{
    fr :
    {
        dropzone :
        {
            prompt     : 'Glissez des fichiers ici, ou cliquez pour les choisir' ,
            touch      : 'Touchez pour choisir des fichiers' ,
            accept     : 'Lâchez pour ajouter' ,
            reject     : 'Ces fichiers ne sont pas acceptés ici' ,
            remove     : 'Retirer « {0} »' ,
            processing : 'Vérification des fichiers…' ,
            errors     :
            {
                type          : '« {0} » : ce type de fichier n’est pas accepté.' ,
                maxSize       : '« {0} » : trop lourd ({1}, {2} au plus).' ,
                minSize       : '« {0} » : trop léger ({1}, {2} au moins).' ,
                maxFiles      : '« {0} » : {1} fichier(s) au plus.' ,
                minDimensions : '« {0} » : image trop petite ({1}, {2} au moins).' ,
                maxDimensions : '« {0} » : image trop grande ({1}, {2} au plus).' ,
                decode        : '« {0} » : image illisible par ce navigateur.' ,
                custom        : '« {0} » : ce fichier n’est pas accepté ici.' ,
            } ,
        } ,

        photo :
        {
            take       : 'Prendre une photo' ,
            gallery    : 'Galerie' ,
            alt        : 'Photo {0}' ,
            remove     : 'Retirer la photo {0}' ,
            processing : 'Préparation de la photo…' ,
            count      : '{0} / {1}' ,
            errors     :
            {
                type   : '« {0} » n’est pas une image.' ,
                decode : 'Impossible de lire « {0} » : format non pris en charge par ce navigateur.' ,
                encode : 'Impossible de réduire « {0} ».' ,
            } ,
        } ,
    } ,

    en :
    {
        dropzone :
        {
            prompt     : 'Drag files here, or click to choose them' ,
            touch      : 'Tap to choose files' ,
            accept     : 'Drop to add' ,
            reject     : 'These files are not accepted here' ,
            remove     : 'Remove “{0}”' ,
            processing : 'Checking the files…' ,
            errors     :
            {
                type          : '“{0}” : this type of file is not accepted.' ,
                maxSize       : '“{0}” : too heavy ({1}, {2} at most).' ,
                minSize       : '“{0}” : too light ({1}, {2} at least).' ,
                maxFiles      : '“{0}” : {1} file(s) at most.' ,
                minDimensions : '“{0}” : image too small ({1}, {2} at least).' ,
                maxDimensions : '“{0}” : image too large ({1}, {2} at most).' ,
                decode        : '“{0}” : this browser cannot read the image.' ,
                custom        : '“{0}” : this file is not accepted here.' ,
            } ,
        } ,

        photo :
        {
            take       : 'Take a photo' ,
            gallery    : 'Gallery' ,
            alt        : 'Photo {0}' ,
            remove     : 'Remove photo {0}' ,
            processing : 'Preparing the photo…' ,
            count      : '{0} / {1}' ,
            errors     :
            {
                type   : '“{0}” is not an image.' ,
                decode : 'Cannot read “{0}” : this browser does not support its format.' ,
                encode : 'Cannot shrink “{0}”.' ,
            } ,
        } ,
    } ,
} ;

export default media ;

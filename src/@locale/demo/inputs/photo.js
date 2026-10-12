const photo =
{
    fr :
    {
        intro : 'Sur téléphone, le bouton ouvre directement l’appareil photo arrière ; sur ordinateur, le sélecteur de fichiers. Chaque photo est réduite et réencodée avant de quitter le composant : ses métadonnées, GPS compris, ne partent jamais.' ,

        settings :
        {
            title        : 'Réglages (prop resize et options)' ,
            maxSize      : 'maxSize' ,
            quality      : 'quality' ,
            type         : 'type' ,
            readLocation : 'readLocation : lire la position de l’original' ,
            allowGallery : 'allowGallery : bouton Galerie' ,
        } ,

        single :
        {
            title  : 'Une photo' ,
            label  : 'Justificatif' ,
            helper : 'max={ 1 } : le bouton disparaît une fois la photo prise.' ,
        } ,

        several :
        {
            title  : 'Jusqu’à trois photos, dans un formulaire' ,
            label  : 'Photos du colis' ,
            helper : 'name="photos" : les fichiers réduits partent avec le formulaire.' ,
            submit : 'Envoyer' ,
            sent   : 'Reçu par le formulaire' ,
        } ,

        received : 'Dernier onChange' ,
        empty    : 'aucune photo' ,

        compare :
        {
            title    : 'Avant / après : resizeImage seul' ,
            note     : 'Choisissez une photo prise avec un téléphone : la fiche compare l’original et ce qui part. Si « GPS de l’original » reste vide, c’est que le système l’avait déjà retiré (iPhone) ou que l’appareil photo ne l’enregistre pas.' ,
            pick     : 'Une photo à comparer' ,
            before   : 'Original' ,
            after    : 'Après resizeImage' ,
            size     : 'Dimensions' ,
            weight   : 'Poids' ,
            format   : 'Format' ,
            exif     : 'EXIF' ,
            gps      : 'GPS de l’original' ,
            present  : 'présent' ,
            absent   : 'absent' ,
            none     : 'aucun' ,
            working  : 'Réduction…' ,
        } ,
    } ,

    en :
    {
        intro : 'On a phone, the button opens the back camera at once ; on a desktop, the file chooser. Every photo is shrunk and encoded again before it leaves the component : its metadata, GPS included, never goes with it.' ,

        settings :
        {
            title        : 'Settings (the resize prop and options)' ,
            maxSize      : 'maxSize' ,
            quality      : 'quality' ,
            type         : 'type' ,
            readLocation : 'readLocation : read the original’s position' ,
            allowGallery : 'allowGallery : a Gallery button' ,
        } ,

        single :
        {
            title  : 'One photo' ,
            label  : 'Receipt' ,
            helper : 'max={ 1 } : the button goes away once the photo is taken.' ,
        } ,

        several :
        {
            title  : 'Up to three photos, in a form' ,
            label  : 'Photos of the parcel' ,
            helper : 'name="photos" : the shrunk files are sent with the form.' ,
            submit : 'Send' ,
            sent   : 'Received by the form' ,
        } ,

        received : 'Last onChange' ,
        empty    : 'no photo' ,

        compare :
        {
            title    : 'Before / after : resizeImage alone' ,
            note     : 'Pick a photo taken with a phone : the sheet compares the original and what leaves. If « Original’s GPS » stays empty, the system had already taken it out (iPhone) or the camera does not record it.' ,
            pick     : 'A photo to compare' ,
            before   : 'Original' ,
            after    : 'After resizeImage' ,
            size     : 'Size' ,
            weight   : 'Weight' ,
            format   : 'Format' ,
            exif     : 'EXIF' ,
            gps      : 'Original’s GPS' ,
            present  : 'present' ,
            absent   : 'absent' ,
            none     : 'none' ,
            working  : 'Shrinking…' ,
        } ,
    } ,
} ;

export default photo ;

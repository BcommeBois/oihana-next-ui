const dropzone =
{
    fr :
    {
        intro : 'Glissez des fichiers depuis le bureau, ou cliquez sur la zone. Chaque fichier est vérifié avant d’être pris ; un fichier refusé reste dehors, avec sa raison. Un fichier lâché à côté de la zone ne fait rien. Sur téléphone, la zone s’ouvre au toucher.' ,

        documents :
        {
            title  : 'Des documents' ,
            label  : 'Bons de livraison' ,
            helper : 'PDF, 5 Mo au plus, 3 fichiers au plus' ,
        } ,

        images :
        {
            title  : 'Des images, avec des dimensions minimales' ,
            label  : 'Photos du produit' ,
            helper : 'Images d’au moins 800 × 600 px, réduites à 1600 px (resize)' ,
        } ,

        form :
        {
            title    : 'Dans un formulaire, avec une règle à soi' ,
            note     : 'name="attachments" : les fichiers partent avec le formulaire. validate refuse ici les exécutables.' ,
            label    : 'Pièces jointes' ,
            helper   : 'Tout type, 10 Mo au plus' ,
            noExe    : 'Pas de fichier exécutable.' ,
            submit   : 'Envoyer' ,
            sent     : 'Reçu par le formulaire' ,
        } ,

        change : 'Dernier onChange' ,
        reject : 'Dernier onReject' ,
        empty  : 'rien pour l’instant' ,
    } ,

    en :
    {
        intro : 'Drag files from the desktop, or click the zone. Every file is checked before it is taken ; a file refused stays out, with its reason. A file dropped beside the zone does nothing. On a phone, the zone opens with a tap.' ,

        documents :
        {
            title  : 'Documents' ,
            label  : 'Delivery notes' ,
            helper : 'PDF, 5 MB at most, 3 files at most' ,
        } ,

        images :
        {
            title  : 'Images, with minimum dimensions' ,
            label  : 'Product photos' ,
            helper : 'Images of 800 × 600 px at least, shrunk to 1600 px (resize)' ,
        } ,

        form :
        {
            title    : 'In a form, with a rule of one’s own' ,
            note     : 'name="attachments" : the files are sent with the form. validate refuses executables here.' ,
            label    : 'Attachments' ,
            helper   : 'Any type, 10 MB at most' ,
            noExe    : 'No executable file.' ,
            submit   : 'Send' ,
            sent     : 'Received by the form' ,
        } ,

        change : 'Last onChange' ,
        reject : 'Last onReject' ,
        empty  : 'nothing yet' ,
    } ,
} ;

export default dropzone ;

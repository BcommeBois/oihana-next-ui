const textArea =
{
    fr :
    {
        title : 'La zone de texte' ,

        sections :
        {
            basic      : 'Usage simple' ,
            sizes      : 'Tailles' ,
            colors     : 'Couleurs' ,
            transform  : 'Transformation' ,
            ghost      : 'Style fantôme' ,
            resize     : 'Redimensionnement' ,
            rows       : 'Nombre de lignes' ,
            validation : 'Avec validation' ,
            controlled : 'Contrôlée' ,
            fieldset   : 'Dans un fieldset' ,
            error      : 'En erreur' ,
            disabled   : 'Désactivée' ,
            readOnly   : 'En lecture seule' ,
        } ,

        basic :
        {
            label       : 'Message' ,
            placeholder : 'Saisissez votre message…' ,
            helper      : '500 caractères au maximum.' ,
        } ,

        sizes  : { placeholder : 'Une taille après l’autre…' } ,
        colors : { placeholder : 'Une couleur après l’autre…' } ,

        transform :
        {
            label  : 'Description en majuscules' ,
            helper : 'Convertie en majuscules à la frappe.' ,
        } ,

        ghost :
        {
            label       : 'Zone fantôme' ,
            placeholder : 'Sans bordure, jusqu’au survol…' ,
        } ,

        resize :
        {
            vertical   : { label : 'Vertical (par défaut)' , placeholder : 'Redimensionnable en hauteur…' } ,
            horizontal : { label : 'Horizontal' , placeholder : 'Redimensionnable en largeur…' } ,
            both       : { label : 'Les deux' , placeholder : 'Redimensionnable dans les deux sens…' } ,
            none       : { label : 'Aucun' , placeholder : 'Non redimensionnable…' } ,
            fixed      : { label : 'Commentaire sur cinq lignes' } ,
            growing    : { label : 'Commentaire qui pousse (3 à 10 lignes)' } ,
            infinite   : { label : 'Qui pousse sans plafond' } ,
        } ,

        rows :
        {
            one    : { label : 'Une ligne' , placeholder : 'Une seule ligne…' } ,
            five   : { label : 'Cinq lignes' , placeholder : 'Cinq lignes…' } ,
            ten    : { label : 'Dix lignes' , placeholder : 'Dix lignes…' } ,
        } ,

        validation :
        {
            label       : 'Message obligatoire' ,
            placeholder : 'Dix caractères au moins…' ,
            hint        : 'Le message doit faire entre 10 et 500 caractères.' ,
        } ,

        controlled :
        {
            label       : 'Votre message' ,
            placeholder : 'Tapez quelque chose…' ,
            chars       : '{0} caractère(s)' ,
        } ,

        fieldset :
        {
            legend      : 'Description du projet' ,
            placeholder : 'Décrivez-le en détail…' ,
            helper      : 'Soyez aussi précis que possible.' ,
        } ,

        error :
        {
            label       : 'Commentaire' ,
            placeholder : 'Ajoutez votre commentaire…' ,
            error       : 'Le commentaire est obligatoire et doit faire 20 caractères au moins.' ,
        } ,

        disabled :
        {
            label       : 'Message désactivé' ,
            placeholder : 'Cette zone est désactivée…' ,
            helper      : 'Ce champ ne peut pas être modifié.' ,
        } ,

        readOnly : { label : 'Conditions générales' } ,
    } ,

    en :
    {
        title : 'The text area' ,

        sections :
        {
            basic      : 'Basic usage' ,
            sizes      : 'Sizes' ,
            colors     : 'Colours' ,
            transform  : 'Transform' ,
            ghost      : 'Ghost style' ,
            resize     : 'Resizing' ,
            rows       : 'Number of rows' ,
            validation : 'With validation' ,
            controlled : 'Controlled' ,
            fieldset   : 'In a fieldset' ,
            error      : 'In error' ,
            disabled   : 'Disabled' ,
            readOnly   : 'Read-only' ,
        } ,

        basic :
        {
            label       : 'Message' ,
            placeholder : 'Enter your message…' ,
            helper      : '500 characters at most.' ,
        } ,

        sizes  : { placeholder : 'One size after the other…' } ,
        colors : { placeholder : 'One colour after the other…' } ,

        transform :
        {
            label  : 'Description in upper case' ,
            helper : 'Converted to upper case as it is typed.' ,
        } ,

        ghost :
        {
            label       : 'Ghost area' ,
            placeholder : 'No border until it is hovered…' ,
        } ,

        resize :
        {
            vertical   : { label : 'Vertical (default)' , placeholder : 'Resizable in height…' } ,
            horizontal : { label : 'Horizontal' , placeholder : 'Resizable in width…' } ,
            both       : { label : 'Both ways' , placeholder : 'Resizable both ways…' } ,
            none       : { label : 'Neither' , placeholder : 'Not resizable…' } ,
            fixed      : { label : 'Comment on five rows' } ,
            growing    : { label : 'Comment that grows (3 to 10 rows)' } ,
            infinite   : { label : 'Grows with no cap' } ,
        } ,

        rows :
        {
            one    : { label : 'One row' , placeholder : 'A single line…' } ,
            five   : { label : 'Five rows' , placeholder : 'Five lines…' } ,
            ten    : { label : 'Ten rows' , placeholder : 'Ten lines…' } ,
        } ,

        validation :
        {
            label       : 'Required message' ,
            placeholder : 'Ten characters at least…' ,
            hint        : 'The message must be between 10 and 500 characters.' ,
        } ,

        controlled :
        {
            label       : 'Your message' ,
            placeholder : 'Type something…' ,
            chars       : '{0} character(s)' ,
        } ,

        fieldset :
        {
            legend      : 'Project description' ,
            placeholder : 'Describe it in detail…' ,
            helper      : 'Be as precise as you can.' ,
        } ,

        error :
        {
            label       : 'Comment' ,
            placeholder : 'Add your comment…' ,
            error       : 'The comment is required and must be 20 characters at least.' ,
        } ,

        disabled :
        {
            label       : 'Disabled message' ,
            placeholder : 'This area is disabled…' ,
            helper      : 'This field cannot be edited.' ,
        } ,

        readOnly : { label : 'Terms and conditions' } ,
    } ,
} ;

export default textArea ;

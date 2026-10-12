const fileInput =
{
    fr :
    {
        empty  : 'aucun fichier' ,
        colors : 'Couleurs et style' ,
        sizes  : 'Tailles' ,
        single :
        {
            title  : 'Un fichier' ,
            label  : 'Facture' ,
            helper : 'Un PDF.' ,
        } ,
        multiple :
        {
            title  : 'Plusieurs images' ,
            label  : 'Photos' ,
            helper : 'Sélection multiple, images seulement.' ,
        } ,
        camera :
        {
            title : 'Appareil photo' ,
            label : 'Prendre une photo' ,
            note  : 'Avec capture="environment", un téléphone ouvre directement l’appareil photo arrière. Un ordinateur ignore l’attribut et montre son sélecteur habituel.' ,
        } ,
        states :
        {
            title    : 'États' ,
            required : 'Pièce jointe obligatoire' ,
            error    : 'Choisissez un fichier.' ,
            disabled : 'Désactivé' ,
            legend   : 'Dans un fieldset' ,
            fieldset : 'Une légende à la place du libellé.' ,
        } ,
    } ,

    en :
    {
        empty  : 'no file' ,
        colors : 'Colors and style' ,
        sizes  : 'Sizes' ,
        single :
        {
            title  : 'One file' ,
            label  : 'Invoice' ,
            helper : 'A PDF.' ,
        } ,
        multiple :
        {
            title  : 'Several images' ,
            label  : 'Photos' ,
            helper : 'Multiple selection, images only.' ,
        } ,
        camera :
        {
            title : 'Camera' ,
            label : 'Take a photo' ,
            note  : 'With capture="environment", a phone opens the back camera straight away. A desktop browser ignores the attribute and shows its usual chooser.' ,
        } ,
        states :
        {
            title    : 'States' ,
            required : 'Attachment required' ,
            error    : 'Choose a file.' ,
            disabled : 'Disabled' ,
            legend   : 'In a fieldset' ,
            fieldset : 'A legend instead of the label.' ,
        } ,
    } ,
} ;

export default fileInput ;

const hexColor =
{
    fr :
    {
        title : 'Des couleurs' ,

        basic :
        {
            label  : 'Couleur (6 caractères)' ,
            helper : 'Une couleur hexadécimale, par exemple FF5733.' ,
        } ,

        alpha :
        {
            label  : 'Couleur avec alpha (8 caractères)' ,
            helper : 'Une couleur hexadécimale avec son alpha, par exemple FF5733FF.' ,
        } ,

        noPrefix :
        {
            label  : 'Code sans préfixe' ,
            helper : 'Affiché sans le # de tête.' ,
        } ,

        fieldset :
        {
            legend : 'Couleur principale' ,
            helper : 'La couleur de tête de la charte.' ,
        } ,

        short :
        {
            label  : 'Format court (3 caractères)' ,
            helper : 'Format court : #rgb' ,
        } ,

        invalid :
        {
            label  : 'Couleur invalide' ,
            helper : 'La validation se déclenche en sortant du champ.' ,
            error  : 'Couleur invalide ({0} caractères attendus)' ,
        } ,

        disabled : { label : 'Désactivée' } ,
        readOnly : { label : 'En lecture seule' } ,
    } ,

    en :
    {
        title : 'Colours' ,

        basic :
        {
            label  : 'Colour (6 characters)' ,
            helper : 'A hexadecimal colour, FF5733 for one.' ,
        } ,

        alpha :
        {
            label  : 'Colour with alpha (8 characters)' ,
            helper : 'A hexadecimal colour with its alpha, FF5733FF for one.' ,
        } ,

        noPrefix :
        {
            label  : 'Code without the prefix' ,
            helper : 'Shown without the leading #.' ,
        } ,

        fieldset :
        {
            legend : 'Primary colour' ,
            helper : 'The brand’s leading colour.' ,
        } ,

        short :
        {
            label  : 'Short format (3 characters)' ,
            helper : 'Short format : #rgb' ,
        } ,

        invalid :
        {
            label  : 'Invalid colour' ,
            helper : 'The validation runs when you leave the field.' ,
            error  : 'Invalid colour ({0} characters expected)' ,
        } ,

        disabled : { label : 'Disabled' } ,
        readOnly : { label : 'Read-only' } ,
    } ,
} ;

export default hexColor ;

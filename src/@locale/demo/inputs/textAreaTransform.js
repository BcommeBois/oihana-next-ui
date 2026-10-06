const textAreaTransform =
{
    fr :
    {
        title : 'Transformer une zone de texte' ,

        sections :
        {
            upper      : 'En majuscules' ,
            trim       : 'Nettoyée en sortie' ,
            limit      : 'Limite de 100 caractères' ,
            capitalize : 'Première lettre en capitale' ,
            whitespace : 'Espaces normalisés' ,
            stripHtml  : 'Balises HTML retirées' ,
            list       : 'Mise en liste' ,
            fieldset   : 'Dans un fieldset' ,
            validation : 'Avec validation' ,
        } ,

        upper :
        {
            label       : 'Extrait de code' ,
            placeholder : 'Saisissez du code : il passera en majuscules.' ,
        } ,

        trim :
        {
            label       : 'Message' ,
            placeholder : 'Les espaces de fin partiront en sortie de champ.' ,
            helper      : 'Les espaces de début et de fin partent quand vous quittez le champ.' ,
        } ,

        limit :
        {
            label       : 'Commentaire court' ,
            placeholder : '100 caractères au maximum' ,
            helper      : '{0}/100 caractères' ,
        } ,

        capitalize :
        {
            label       : 'Description' ,
            placeholder : 'La première lettre passera en capitale en sortie de champ.' ,
            helper      : 'Première lettre mise en capitale automatiquement.' ,
        } ,

        whitespace :
        {
            label       : 'Texte propre' ,
            placeholder : 'Les espaces en trop seront normalisés en sortie de champ.' ,
            helper      : 'Les espaces en trop partent quand vous quittez le champ.' ,
        } ,

        stripHtml :
        {
            label       : 'Texte brut seulement' ,
            placeholder : 'Les balises HTML partent à la frappe.' ,
            helper      : 'Les balises HTML sont retirées automatiquement.' ,
        } ,

        list :
        {
            label       : 'Liste de tâches' ,
            placeholder : 'Chaque ligne sera préfixée en sortie de champ.' ,
            helper      : 'Les lignes sont mises en liste automatiquement.' ,
        } ,

        fieldset :
        {
            legend      : 'Présentation' ,
            placeholder : 'Parlez-nous de vous' ,
        } ,

        validation :
        {
            label       : 'Message obligatoire' ,
            placeholder : 'Vingt caractères au moins' ,
            hint        : 'Le message doit faire 20 caractères au moins.' ,
        } ,
    } ,

    en :
    {
        title : 'Transforming a text area' ,

        sections :
        {
            upper      : 'To upper case' ,
            trim       : 'Trimmed on the way out' ,
            limit      : 'A 100 characters cap' ,
            capitalize : 'First letter capitalized' ,
            whitespace : 'Whitespace normalized' ,
            stripHtml  : 'HTML tags removed' ,
            list       : 'Turned into a list' ,
            fieldset   : 'In a fieldset' ,
            validation : 'With validation' ,
        } ,

        upper :
        {
            label       : 'Code snippet' ,
            placeholder : 'Type code : it will go to upper case.' ,
        } ,

        trim :
        {
            label       : 'Message' ,
            placeholder : 'Trailing spaces will go on the way out.' ,
            helper      : 'Leading and trailing spaces go when you leave the field.' ,
        } ,

        limit :
        {
            label       : 'Short comment' ,
            placeholder : '100 characters at most' ,
            helper      : '{0}/100 characters' ,
        } ,

        capitalize :
        {
            label       : 'Description' ,
            placeholder : 'The first letter will be capitalized on the way out.' ,
            helper      : 'First letter capitalized automatically.' ,
        } ,

        whitespace :
        {
            label       : 'Clean text' ,
            placeholder : 'Extra spaces will be normalized on the way out.' ,
            helper      : 'Extra whitespace goes when you leave the field.' ,
        } ,

        stripHtml :
        {
            label       : 'Plain text only' ,
            placeholder : 'HTML tags go as you type.' ,
            helper      : 'HTML tags are removed automatically.' ,
        } ,

        list :
        {
            label       : 'Todo list' ,
            placeholder : 'Every line will be prefixed on the way out.' ,
            helper      : 'Lines are turned into list items automatically.' ,
        } ,

        fieldset :
        {
            legend      : 'Bio' ,
            placeholder : 'Tell us about yourself' ,
        } ,

        validation :
        {
            label       : 'Required message' ,
            placeholder : 'Twenty characters at least' ,
            hint        : 'The message must be 20 characters at least.' ,
        } ,
    } ,
} ;

export default textAreaTransform ;

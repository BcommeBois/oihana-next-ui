const transform =
{
    fr :
    {
        title : 'Transformer la saisie' ,

        upper :
        {
            label       : 'Code produit (majuscules)' ,
            placeholder : 'Saisissez un code' ,
            helper      : 'Converti en majuscules à la frappe.' ,
        } ,

        lower :
        {
            label       : 'Identifiant (minuscules)' ,
            placeholder : 'Saisissez un identifiant' ,
            helper      : 'Converti en minuscules à la frappe.' ,
        } ,

        email :
        {
            label       : 'Adresse e-mail' ,
            placeholder : 'vous@exemple.com' ,
            helper      : 'Revient à la valeur précédente si elle est invalide en sortant du champ.' ,
            error       : 'Format d’adresse invalide' ,
        } ,

        phone :
        {
            label       : 'Téléphone (format français)' ,
            placeholder : '0123456789' ,
            helper      : 'Affiché ainsi : 01 23 45 67 89 ({0}/10 chiffres).' ,
        } ,

        alphanumeric :
        {
            label       : 'Lettres et chiffres seulement' ,
            placeholder : 'Lettres et chiffres' ,
            helper      : 'Les caractères spéciaux sont retirés.' ,
        } ,

        trimmed :
        {
            label       : 'Nom (nettoyé en sortie)' ,
            placeholder : 'Saisissez un nom' ,
            helper      : 'Les espaces de début et de fin partent quand vous quittez le champ.' ,
        } ,

        age :
        {
            label       : 'Âge (18 à 99)' ,
            placeholder : '18' ,
            helper      : 'Seuls les nombres entre 18 et 99 sont acceptés.' ,
        } ,

        price :
        {
            label       : 'Prix (stocké en centimes)' ,
            placeholder : '0,00' ,
            helper      : 'Affiché en euros, stocké en centimes.' ,
        } ,

        advancedTrim :
        {
            label       : 'Identifiant (nettoyage progressif)' ,
            placeholder : 'Saisissez un identifiant' ,
            helper      : 'Les espaces de début partent à la frappe, tous les autres en sortie de champ.' ,
        } ,
    } ,

    en :
    {
        title : 'Transforming the draft' ,

        upper :
        {
            label       : 'Product code (upper case)' ,
            placeholder : 'Enter a code' ,
            helper      : 'Converted to upper case as it is typed.' ,
        } ,

        lower :
        {
            label       : 'Username (lower case)' ,
            placeholder : 'Enter a username' ,
            helper      : 'Converted to lower case as it is typed.' ,
        } ,

        email :
        {
            label       : 'E-mail address' ,
            placeholder : 'you@example.com' ,
            helper      : 'Reverts to the previous value when an invalid one leaves the field.' ,
            error       : 'Invalid address format' ,
        } ,

        phone :
        {
            label       : 'Phone number (French format)' ,
            placeholder : '0123456789' ,
            helper      : 'Shown as : 01 23 45 67 89 ({0}/10 digits).' ,
        } ,

        alphanumeric :
        {
            label       : 'Letters and digits only' ,
            placeholder : 'Letters and digits' ,
            helper      : 'Special characters are removed.' ,
        } ,

        trimmed :
        {
            label       : 'Name (trimmed on the way out)' ,
            placeholder : 'Enter a name' ,
            helper      : 'Leading and trailing spaces go when you leave the field.' ,
        } ,

        age :
        {
            label       : 'Age (18 to 99)' ,
            placeholder : '18' ,
            helper      : 'Only numbers between 18 and 99 are accepted.' ,
        } ,

        price :
        {
            label       : 'Price (stored in cents)' ,
            placeholder : '0.00' ,
            helper      : 'Shown in euros, stored in cents.' ,
        } ,

        advancedTrim :
        {
            label       : 'Username (progressive trim)' ,
            placeholder : 'Enter a username' ,
            helper      : 'Leading spaces go as you type, every other one on the way out.' ,
        } ,
    } ,
} ;

export default transform ;

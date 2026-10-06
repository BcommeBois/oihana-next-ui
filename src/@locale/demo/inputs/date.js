const date =
{
    fr :
    {
        title : 'Des dates au clavier' ,

        sections :
        {
            iso      : 'Format ISO (AAAA/MM/JJ)' ,
            french   : 'Format français (JJ/MM/AAAA)' ,
            us       : 'Format américain (MM/JJ/AAAA)' ,
            short    : 'Formats courts' ,
            bounded  : 'Avec des bornes' ,
            object   : 'Avec l’objet rendu' ,
            fieldset : 'Dans un fieldset' ,
            noIcon   : 'Sans icône' ,
            error    : 'En erreur' ,
            disabled : 'Désactivé' ,
            readOnly : 'En lecture seule' ,
        } ,

        iso :
        {
            label  : 'Date ISO' ,
            helper : 'Format AAAA/MM/JJ — bornée de 2020 à 2030, une année en dehors est réécrite sur la borne.' ,
        } ,

        isoDash  : { label : 'Date ISO, séparée par un tiret' , helper : 'Format AAAA-MM-JJ' } ,
        birth    : { label : 'Date de naissance' , helper : 'Format JJ/MM/AAAA' } ,
        dot      : { label : 'Date séparée par un point' , helper : 'Format JJ.MM.AAAA' } ,
        dash     : { label : 'Date séparée par un tiret' , helper : 'Format JJ-MM-AAAA' } ,
        us       : { label : 'Date de naissance (US)' , helper : 'Format MM/JJ/AAAA' } ,

        dayMonth  : { label : 'Jour et mois seulement' , helper : 'Format JJ/MM' } ,
        monthYear : { label : 'Mois et année' , helper : 'Format MM/AAAA' } ,
        monthYear2 : { label : 'Mois et année (2 chiffres)' , helper : 'Format MM/AA' } ,
        yearMonth : { label : 'Année et mois (ISO 8601)' , helper : 'Format AAAA-MM — l’ordre que parle le serveur' } ,
        yearOnly  : { label : 'Année seule' , helper : 'Format AAAA — quatre chiffres, rien à séparer' } ,

        bounded : { label : 'Date (2020 à 2030)' , helper : 'Seules les dates entre 2020 et 2030.' } ,

        object :
        {
            label  : 'Date' ,
            typed  : 'Objet obtenu : {0}' ,
            empty  : 'Tapez une date…' ,
            iso    : 'ISO :' ,
            locale : 'Locale :' ,
            us     : 'US :' ,
        } ,

        fieldset : { legend : 'Date du rendez-vous' , helper : 'Choisissez une date.' } ,

        plain   : { label : 'Date' } ,
        invalid : { label : 'Date' , error : 'Format de date invalide' } ,
    } ,

    en :
    {
        title : 'Dates typed in' ,

        sections :
        {
            iso      : 'ISO format (YYYY/MM/DD)' ,
            french   : 'French format (DD/MM/YYYY)' ,
            us       : 'US format (MM/DD/YYYY)' ,
            short    : 'Short formats' ,
            bounded  : 'With bounds' ,
            object   : 'With the object handed back' ,
            fieldset : 'In a fieldset' ,
            noIcon   : 'Without an icon' ,
            error    : 'In error' ,
            disabled : 'Disabled' ,
            readOnly : 'Read-only' ,
        } ,

        iso :
        {
            label  : 'ISO date' ,
            helper : 'YYYY/MM/DD format — bounded from 2020 to 2030, a year outside is rewritten onto the bound.' ,
        } ,

        isoDash  : { label : 'ISO date, dash separated' , helper : 'YYYY-MM-DD format' } ,
        birth    : { label : 'Date of birth' , helper : 'DD/MM/YYYY format' } ,
        dot      : { label : 'Dot separated date' , helper : 'DD.MM.YYYY format' } ,
        dash     : { label : 'Dash separated date' , helper : 'DD-MM-YYYY format' } ,
        us       : { label : 'Date of birth (US)' , helper : 'MM/DD/YYYY format' } ,

        dayMonth  : { label : 'Day and month only' , helper : 'DD/MM format' } ,
        monthYear : { label : 'Month and year' , helper : 'MM/YYYY format' } ,
        monthYear2 : { label : 'Month and year (2 digits)' , helper : 'MM/YY format' } ,
        yearMonth : { label : 'Year and month (ISO 8601)' , helper : 'YYYY-MM format — the order the back end speaks' } ,
        yearOnly  : { label : 'Year only' , helper : 'YYYY format — four digits, nothing to separate' } ,

        bounded : { label : 'Date (2020 to 2030)' , helper : 'Only dates between 2020 and 2030.' } ,

        object :
        {
            label  : 'Date' ,
            typed  : 'Object handed back : {0}' ,
            empty  : 'Type a date…' ,
            iso    : 'ISO :' ,
            locale : 'Locale :' ,
            us     : 'US :' ,
        } ,

        fieldset : { legend : 'Appointment date' , helper : 'Pick a date.' } ,

        plain   : { label : 'Date' } ,
        invalid : { label : 'Date' , error : 'Invalid date format' } ,
    } ,
} ;

export default date ;

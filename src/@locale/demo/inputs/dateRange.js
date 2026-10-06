const dateRange =
{
    fr :
    {
        title : 'Des périodes' ,

        sections :
        {
            french   : 'Format français (JJ/MM/AAAA)' ,
            iso      : 'Format ISO (AAAA-MM-JJ)' ,
            us       : 'Format américain (MM/JJ/AAAA)' ,
            bounded  : 'Avec des bornes' ,
            length   : 'Avec une durée bornée' ,
            object   : 'Avec l’objet rendu' ,
            fieldset : 'Dans un fieldset' ,
            error    : 'En erreur' ,
            disabled : 'Désactivé' ,
        } ,

        booking   : { label : 'Période de réservation' , helper : 'Format JJ/MM/AAAA – JJ/MM/AAAA' } ,
        separator : { label : 'Avec un séparateur choisi' , helper : 'Format JJ/MM/AAAA to JJ/MM/AAAA' } ,
        iso       : { label : 'Période' , helper : 'Format AAAA-MM-JJ – AAAA-MM-JJ' } ,
        us        : { label : 'Période (US)' , helper : 'Format MM/JJ/AAAA – MM/JJ/AAAA' } ,
        bounded   : { label : 'Période de 2024' , helper : 'Seules les dates de 2024.' } ,

        shortStay : { label : 'Séjour court (1 à 7 jours)' , helper : 'Entre 1 et 7 jours.' } ,
        monthly   : { label : 'Période mensuelle' , helper : 'Entre 1 et 3 mois.' } ,

        object :
        {
            label    : 'Choisissez une période' ,
            typed    : 'Début : {0}, fin : {1}' ,
            empty    : 'Tapez une période…' ,
            start    : 'Début :' ,
            end      : 'Fin :' ,
            duration : 'Durée :' ,
            days     : '{0} jour(s)' ,
        } ,

        fieldset : { legend : 'Période de location' , helper : 'Du … au …' } ,

        invalid  : { label : 'Période' , error : 'Période invalide' } ,
        disabled : { label : 'Période' } ,
    } ,

    en :
    {
        title : 'Date ranges' ,

        sections :
        {
            french   : 'French format (DD/MM/YYYY)' ,
            iso      : 'ISO format (YYYY-MM-DD)' ,
            us       : 'US format (MM/DD/YYYY)' ,
            bounded  : 'With bounds' ,
            length   : 'With a bounded duration' ,
            object   : 'With the object handed back' ,
            fieldset : 'In a fieldset' ,
            error    : 'In error' ,
            disabled : 'Disabled' ,
        } ,

        booking   : { label : 'Booking period' , helper : 'DD/MM/YYYY – DD/MM/YYYY format' } ,
        separator : { label : 'With a separator of your own' , helper : 'DD/MM/YYYY to DD/MM/YYYY format' } ,
        iso       : { label : 'Period' , helper : 'YYYY-MM-DD – YYYY-MM-DD format' } ,
        us        : { label : 'Period (US)' , helper : 'MM/DD/YYYY – MM/DD/YYYY format' } ,
        bounded   : { label : '2024 period' , helper : 'Only dates in 2024.' } ,

        shortStay : { label : 'Short stay (1 to 7 days)' , helper : 'Between 1 and 7 days.' } ,
        monthly   : { label : 'Monthly period' , helper : 'Between 1 and 3 months.' } ,

        object :
        {
            label    : 'Pick a period' ,
            typed    : 'Start : {0}, end : {1}' ,
            empty    : 'Type a period…' ,
            start    : 'Start :' ,
            end      : 'End :' ,
            duration : 'Duration :' ,
            days     : '{0} day(s)' ,
        } ,

        fieldset : { legend : 'Rental period' , helper : 'From … to …' } ,

        invalid  : { label : 'Period' , error : 'Invalid period' } ,
        disabled : { label : 'Period' } ,
    } ,
} ;

export default dateRange ;

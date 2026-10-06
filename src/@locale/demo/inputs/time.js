const time =
{
    fr :
    {
        title : 'Des heures' ,

        sections :
        {
            h24      : 'Format 24 heures' ,
            h12      : 'Format 12 heures (AM/PM)' ,
            fieldset : 'Dans un fieldset' ,
            noIcon   : 'Sans icône' ,
            hourOnly : 'L’heure seule' ,
            object   : 'Avec l’objet rendu' ,
            error    : 'En erreur' ,
            disabled : 'Désactivé' ,
            readOnly : 'En lecture seule' ,
        } ,

        h24      : { label : 'Heure (24 h)' , helper : 'Format HH:MM' } ,
        seconds  : { label : 'Avec les secondes' , helper : 'Format HH:MM:SS' } ,
        millis   : { label : 'Avec les millisecondes' , helper : 'Format HH:MM:SS.MSS' } ,

        h12         : { label : 'Heure (12 h)' , helper : 'Cliquez AM/PM pour basculer.' } ,
        h12Seconds  : { label : 'Avec les secondes (12 h)' } ,

        appointment : { legend : 'Heure du rendez-vous' , helper : 'Choisissez une heure.' } ,
        meeting     : { legend : 'Heure de la réunion' } ,

        plain    : { label : 'Heure' } ,
        hourOnly : { label : 'Heure' , helper : 'Format HH seulement' } ,

        object :
        {
            label  : 'Heure' ,
            typed  : 'Objet obtenu : {0}' ,
            empty  : 'Tapez une heure…' ,
            hour   : 'Heures :' ,
            minute : 'Minutes :' ,
            second : 'Secondes :' ,
            text   : 'Texte :' ,
        } ,

        invalid     : { label : 'Heure' , error : 'Format d’heure invalide' } ,
        unavailable : { label : 'Heure de la réunion' , error : 'Ce créneau n’est pas disponible' } ,
    } ,

    en :
    {
        title : 'Times' ,

        sections :
        {
            h24      : '24-hour format' ,
            h12      : '12-hour format (AM/PM)' ,
            fieldset : 'In a fieldset' ,
            noIcon   : 'Without an icon' ,
            hourOnly : 'The hour alone' ,
            object   : 'With the object handed back' ,
            error    : 'In error' ,
            disabled : 'Disabled' ,
            readOnly : 'Read-only' ,
        } ,

        h24      : { label : 'Time (24 h)' , helper : 'HH:MM format' } ,
        seconds  : { label : 'With seconds' , helper : 'HH:MM:SS format' } ,
        millis   : { label : 'With milliseconds' , helper : 'HH:MM:SS.MSS format' } ,

        h12         : { label : 'Time (12 h)' , helper : 'Click AM/PM to toggle.' } ,
        h12Seconds  : { label : 'With seconds (12 h)' } ,

        appointment : { legend : 'Appointment time' , helper : 'Pick a time.' } ,
        meeting     : { legend : 'Meeting time' } ,

        plain    : { label : 'Time' } ,
        hourOnly : { label : 'Hour' , helper : 'HH format only' } ,

        object :
        {
            label  : 'Time' ,
            typed  : 'Object handed back : {0}' ,
            empty  : 'Type a time…' ,
            hour   : 'Hours :' ,
            minute : 'Minutes :' ,
            second : 'Seconds :' ,
            text   : 'Text :' ,
        } ,

        invalid     : { label : 'Time' , error : 'Invalid time format' } ,
        unavailable : { label : 'Meeting time' , error : 'That slot is not available' } ,
    } ,
} ;

export default time ;

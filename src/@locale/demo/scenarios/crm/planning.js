const planning =
{
    fr :
    {
        intro   : 'Les rendez-vous des commerciaux. En vue semaine, on suit un agenda ; en vue ressources, une ligne par commercial. Un rendez-vous se déplace et s’étire à la souris ; « Prendre un rendez-vous » propose les créneaux libres du commercial.' ,
        rep     : 'Commercial' ,
        allReps : 'Tous' ,
        book    : 'Prendre un rendez-vous' ,
        booked  : 'Rendez-vous pris : {0}, {1}.' ,
        moved   : 'Rendez-vous déplacé : {0}, {1}.' ,
        hours   : 'Du lundi au vendredi, de 9 h à 12 h et de 14 h à 18 h 30.' ,

        types :
        {
            call    : 'Appel' ,
            visit   : 'Visite' ,
            meeting : 'Réunion' ,
        } ,

        form :
        {
            title    : 'Prendre un rendez-vous' ,
            customer : 'Client' ,
            type     : 'Type' ,
            rep      : 'Commercial' ,
            slot     : 'Créneau' ,
            none     : 'Choisissez un créneau.' ,
            chosen   : 'Créneau choisi : {0}' ,
            save     : 'Confirmer le rendez-vous' ,
        } ,
    } ,

    en :
    {
        intro   : 'The sales reps’ appointments. The week view follows one diary ; the resource view gives each rep a row. An appointment moves and stretches with the mouse ; « Book an appointment » offers the rep’s free slots.' ,
        rep     : 'Sales rep' ,
        allReps : 'All' ,
        book    : 'Book an appointment' ,
        booked  : 'Appointment booked : {0}, {1}.' ,
        moved   : 'Appointment moved : {0}, {1}.' ,
        hours   : 'Monday to Friday, 9 am to 12 pm and 2 pm to 6:30 pm.' ,

        types :
        {
            call    : 'Call' ,
            visit   : 'Visit' ,
            meeting : 'Meeting' ,
        } ,

        form :
        {
            title    : 'Book an appointment' ,
            customer : 'Customer' ,
            type     : 'Type' ,
            rep      : 'Sales rep' ,
            slot     : 'Slot' ,
            none     : 'Choose a slot.' ,
            chosen   : 'Chosen slot : {0}' ,
            save     : 'Confirm the appointment' ,
        } ,
    } ,
} ;

export default planning ;

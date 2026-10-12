const pipeline =
{
    fr :
    {
        intro   : 'Les opportunités, étape par étape. Faites glisser une carte pour la faire avancer : la fiche du client la montre à sa nouvelle étape, dans la page Clients.' ,
        rep     : 'Commercial' ,
        allReps : 'Tous' ,
        moved   : '« {0} » ({1}) passe en {2}.' ,
        closing : 'Clôture le {0}' ,

        kpis :
        {
            open     : 'En cours' ,
            weighted : 'Pondéré' ,
            won      : 'Gagné' ,
            rate     : 'Taux de réussite' ,
            openHint : '{0} opportunité(s)' ,
            weightedHint : 'selon la probabilité de chaque étape' ,
            wonHint  : '{0} affaire(s) conclue(s)' ,
            rateHint : 'gagnées sur gagnées et perdues' ,
        } ,
    } ,

    en :
    {
        intro   : 'The opportunities, stage by stage. Drag a card to move it on : the customer’s sheet shows it at its new stage, on the Customers page.' ,
        rep     : 'Sales rep' ,
        allReps : 'All' ,
        moved   : '“{0}” ({1}) moves to {2}.' ,
        closing : 'Closes on {0}' ,

        kpis :
        {
            open     : 'Open' ,
            weighted : 'Weighted' ,
            won      : 'Won' ,
            rate     : 'Win rate' ,
            openHint : '{0} opportunity(ies)' ,
            weightedHint : 'by the probability of each stage' ,
            wonHint  : '{0} deal(s) closed' ,
            rateHint : 'won out of won and lost' ,
        } ,
    } ,
} ;

export default pipeline ;

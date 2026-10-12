const customers =
{
    fr :
    {
        intro   : 'La base des clients : la chercher, la filtrer, ouvrir une fiche, en créer une. Ce que vous changez ici se retrouve dans les autres pages du CRM, jusqu’au rechargement de la page.' ,
        search  : 'Rechercher un client, un contact, une ville…' ,
        add     : 'Nouveau client' ,
        count   : '{0} client(s)' ,
        empty   : 'Aucun client ne correspond.' ,
        sort    : 'Trier' ,

        sorts :
        {
            name    : 'Nom' ,
            revenue : 'Chiffre d’affaires' ,
            recent  : 'Dernier contact' ,
        } ,

        filters :
        {
            status : { all : 'Tous les statuts' , empty : 'Aucun statut.' , search : 'Rechercher un statut…' , title : 'Statut' } ,
            rep    : { all : 'Tous les commerciaux' , empty : 'Aucun commercial.' , search : 'Rechercher un commercial…' , title : 'Commercial' } ,
            sector : { all : 'Tous les secteurs' , apply : 'Appliquer' , empty : 'Aucun secteur.' , search : 'Rechercher un secteur…' , title : 'Secteur' } ,
        } ,

        columns :
        {
            customer : 'Client' ,
            status   : 'Statut' ,
            rep      : 'Commercial' ,
            sector   : 'Secteur' ,
            revenue  : 'CA annuel' ,
            last     : 'Dernier contact' ,
        } ,

        sheet :
        {
            tabs :
            {
                summary       : 'Résumé' ,
                history       : 'Historique' ,
                opportunities : 'Opportunités' ,
                documents     : 'Documents' ,
                notes         : 'Notes' ,
            } ,
            contact   : 'Contact' ,
            address   : 'Adresse' ,
            rep       : 'Commercial' ,
            since     : 'Client depuis le {0}' ,
            revenue   : 'Chiffre d’affaires annuel' ,
            tags      : 'Étiquettes' ,
            map       : 'Emplacement de {0}' ,
            noHistory : 'Aucun échange pour l’instant.' ,
            noDeals   : 'Aucune opportunité en cours.' ,
            closing   : 'Clôture prévue le {0}' ,
            closed    : 'Clôturée le {0}' ,
            documents : 'Devis, contrats, photos… Déposez-les ici.' ,
        } ,

        create :
        {
            title    : 'Nouveau client' ,
            name     : 'Raison sociale' ,
            sector   : 'Secteur' ,
            contact  : 'Nom du contact' ,
            email    : 'E-mail' ,
            phone    : 'Téléphone' ,
            address  : 'Adresse' ,
            addressHelp : 'Tapez au moins trois caractères : la Base adresse nationale propose des adresses françaises.' ,
            rep      : 'Commercial attitré' ,
            tags     : 'Étiquettes' ,
            save     : 'Créer le client' ,
            created  : '{0} est ajouté, comme prospect.' ,
        } ,
    } ,

    en :
    {
        intro   : 'The customer base : search it, filter it, open a sheet, create one. What you change here shows in the CRM’s other pages, until the page is reloaded.' ,
        search  : 'Search a customer, a contact, a town…' ,
        add     : 'New customer' ,
        count   : '{0} customer(s)' ,
        empty   : 'No customer matches.' ,
        sort    : 'Sort' ,

        sorts :
        {
            name    : 'Name' ,
            revenue : 'Revenue' ,
            recent  : 'Last contact' ,
        } ,

        filters :
        {
            status : { all : 'All statuses' , empty : 'No status.' , search : 'Search a status…' , title : 'Status' } ,
            rep    : { all : 'All reps' , empty : 'No rep.' , search : 'Search a rep…' , title : 'Sales rep' } ,
            sector : { all : 'All sectors' , apply : 'Apply' , empty : 'No sector.' , search : 'Search a sector…' , title : 'Sector' } ,
        } ,

        columns :
        {
            customer : 'Customer' ,
            status   : 'Status' ,
            rep      : 'Sales rep' ,
            sector   : 'Sector' ,
            revenue  : 'Annual revenue' ,
            last     : 'Last contact' ,
        } ,

        sheet :
        {
            tabs :
            {
                summary       : 'Summary' ,
                history       : 'History' ,
                opportunities : 'Opportunities' ,
                documents     : 'Documents' ,
                notes         : 'Notes' ,
            } ,
            contact   : 'Contact' ,
            address   : 'Address' ,
            rep       : 'Sales rep' ,
            since     : 'Customer since {0}' ,
            revenue   : 'Annual revenue' ,
            tags      : 'Tags' ,
            map       : 'Location of {0}' ,
            noHistory : 'No exchange yet.' ,
            noDeals   : 'No opportunity under way.' ,
            closing   : 'Expected to close on {0}' ,
            closed    : 'Closed on {0}' ,
            documents : 'Quotes, contracts, photos… Drop them here.' ,
        } ,

        create :
        {
            title    : 'New customer' ,
            name     : 'Company name' ,
            sector   : 'Sector' ,
            contact  : 'Contact name' ,
            email    : 'E-mail' ,
            phone    : 'Phone' ,
            address  : 'Address' ,
            addressHelp : 'Type three characters at least : the French national address base suggests addresses in France.' ,
            rep      : 'Sales rep in charge' ,
            tags     : 'Tags' ,
            save     : 'Create the customer' ,
            created  : '{0} is added, as a lead.' ,
        } ,
    } ,
} ;

export default customers ;

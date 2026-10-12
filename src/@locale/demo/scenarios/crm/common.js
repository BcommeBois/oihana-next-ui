/**
 * The words every CRM page shares : statuses, sectors, stages, kinds of
 * exchange. The customers' own data — names, tags, notes — is data, not copy.
 */
const common =
{
    fr :
    {
        statuses :
        {
            lead     : 'Prospect' ,
            customer : 'Client' ,
            inactive : 'Inactif' ,
        } ,

        sectors :
        {
            retail       : 'Commerce' ,
            industry     : 'Industrie' ,
            services     : 'Services' ,
            hospitality  : 'Hôtellerie' ,
            health       : 'Santé' ,
            construction : 'Bâtiment' ,
        } ,

        stages :
        {
            prospect    : 'Prospect' ,
            qualified   : 'Qualifié' ,
            proposal    : 'Proposition' ,
            negotiation : 'Négociation' ,
            won         : 'Gagné' ,
            lost        : 'Perdu' ,
        } ,

        interactions :
        {
            call    : 'Appel' ,
            email   : 'E-mail' ,
            visit   : 'Visite' ,
            meeting : 'Réunion' ,
        } ,

        used :
        {
            title : 'Composants utilisés' ,
            note  : 'Chacun renvoie à sa page, avec toutes ses options.' ,
        } ,
    } ,

    en :
    {
        statuses :
        {
            lead     : 'Lead' ,
            customer : 'Customer' ,
            inactive : 'Inactive' ,
        } ,

        sectors :
        {
            retail       : 'Retail' ,
            industry     : 'Industry' ,
            services     : 'Services' ,
            hospitality  : 'Hospitality' ,
            health       : 'Health' ,
            construction : 'Construction' ,
        } ,

        stages :
        {
            prospect    : 'Prospect' ,
            qualified   : 'Qualified' ,
            proposal    : 'Proposal' ,
            negotiation : 'Negotiation' ,
            won         : 'Won' ,
            lost        : 'Lost' ,
        } ,

        interactions :
        {
            call    : 'Call' ,
            email   : 'E-mail' ,
            visit   : 'Visit' ,
            meeting : 'Meeting' ,
        } ,

        used :
        {
            title : 'Components used' ,
            note  : 'Each one leads to its page, with all its options.' ,
        } ,
    } ,
} ;

export default common ;

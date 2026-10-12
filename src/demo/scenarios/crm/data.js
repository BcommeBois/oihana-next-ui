import { noise } from '@/demo/scenarios/shared' ;

/**
 * The CRM's base : the sales reps, the customers, what was said to them and
 * what they might buy. Generated from fixed seeds — the same base on every
 * load — and dated from `today`, so it never ages.
 *
 * Everything is fictitious : the companies, the people, the `.example`
 * addresses and the phone numbers.
 *
 * @module demo/scenarios/crm/data
 */

export const REPS =
[
    { id : 'rep-1' , name : 'Claire Fontaine' } ,
    { id : 'rep-2' , name : 'Mathis Roux' } ,
    { id : 'rep-3' , name : 'Nadia Benali' } ,
    { id : 'rep-4' , name : 'Julien Lefèvre' } ,
] ;

export const STATUSES = [ 'lead' , 'customer' , 'inactive' ] ;

export const SECTORS = [ 'retail' , 'industry' , 'services' , 'hospitality' , 'health' , 'construction' ] ;

export const TAGS = [ 'Fidèle' , 'Grand compte' , 'Export' , 'Saisonnier' , 'À relancer' , 'VIP' ] ;

export const STAGES = [ 'prospect' , 'qualified' , 'proposal' , 'negotiation' , 'won' , 'lost' ] ;

export const INTERACTIONS = [ 'call' , 'email' , 'visit' , 'meeting' ] ;

/** The kinds of appointment, and how long each one lasts, in minutes. */
export const APPOINTMENTS = { call : 30 , meeting : 90 , visit : 60 } ;

/** When an appointment may start, in minutes from midnight : the mornings and afternoons of a working day. */
const STARTS = [ 9 * 60 , 10 * 60 + 30 , 14 * 60 , 15 * 60 + 30 , 17 * 60 ] ;

/**
 * A local date for a day number and a time of day, in minutes.
 *
 * @param {number} day - Days since the epoch.
 * @param {number} minutes - From midnight.
 * @returns {Date}
 */
export const atTime = ( day , minutes ) =>
{
    const date = new Date( day * 24 * 60 * 60 * 1000 ) ;
    return new Date( date.getUTCFullYear() , date.getUTCMonth() , date.getUTCDate() , Math.floor( minutes / 60 ) , minutes % 60 ) ;
} ;

/** The towns the customers are in, with their position. */
export const TOWNS =
[
    { latitude : 43.6047 , longitude : 1.4442 , name : 'Toulouse' , postalCode : '31000' } ,
    { latitude : 44.4475 , longitude : 1.4410 , name : 'Cahors' , postalCode : '46000' } ,
    { latitude : 44.6086 , longitude : 2.0317 , name : 'Figeac' , postalCode : '46100' } ,
    { latitude : 44.0176 , longitude : 1.3550 , name : 'Montauban' , postalCode : '82000' } ,
    { latitude : 43.9289 , longitude : 2.1464 , name : 'Albi' , postalCode : '81000' } ,
    { latitude : 44.3506 , longitude : 2.5750 , name : 'Rodez' , postalCode : '12000' } ,
    { latitude : 45.1583 , longitude : 1.5321 , name : 'Brive-la-Gaillarde' , postalCode : '19100' } ,
    { latitude : 44.2033 , longitude : 0.6163 , name : 'Agen' , postalCode : '47000' } ,
    { latitude : 43.6060 , longitude : 2.2400 , name : 'Castres' , postalCode : '81100' } ,
    { latitude : 44.0986 , longitude : 3.0778 , name : 'Millau' , postalCode : '12100' } ,
] ;

const KINDS  = [ 'Atelier' , 'Maison' , 'Cabinet' , 'Garage' , 'Studio' , 'Hôtel' , 'Librairie' , 'Boulangerie' , 'Menuiserie' , 'Pharmacie' ] ;
const NAMES  = [ 'du Lac' , 'Martin' , 'des Coteaux' , 'Lumière' , 'Saint-Roch' , 'Belle Vue' , 'du Causse' , 'Horizon' , 'des Tilleuls' , 'Garonne' ] ;
const FIRSTS = [ 'Paul' , 'Emma' , 'Lucas' , 'Chloé' , 'Hugo' , 'Léa' , 'Louis' , 'Manon' , 'Jules' , 'Camille' , 'Arthur' , 'Zoé' ] ;
const LASTS  = [ 'Garcia' , 'Bernard' , 'Thomas' , 'Robert' , 'Richard' , 'Durand' , 'Faure' , 'Mercier' , 'Blanc' , 'Guerin' , 'Boyer' , 'Lambert' ] ;
const STREETS = [ 'rue de la République' , 'avenue Jean-Jaurès' , 'place du Marché' , 'rue des Écoles' , 'boulevard Gambetta' , 'chemin des Vignes' ] ;

const SECTOR_OF = { Atelier : 'industry' , Boulangerie : 'retail' , Cabinet : 'services' , Garage : 'services' , Hôtel : 'hospitality' , Librairie : 'retail' , Maison : 'retail' , Menuiserie : 'construction' , Pharmacie : 'health' , Studio : 'services' } ;

const OFFERS = [ 'Contrat de maintenance' , 'Équipement complet' , 'Renouvellement annuel' , 'Extension du parc' , 'Formation des équipes' , 'Pack démarrage' ] ;

/** What an exchange was about, by kind. */
const SUMMARIES =
{
    call    : [ 'Point sur la dernière livraison' , 'Relance du devis' , 'Question sur la facture' , 'Prise de rendez-vous' ] ,
    email   : [ 'Envoi de la proposition' , 'Documentation produit' , 'Confirmation de commande' , 'Remerciements après la visite' ] ,
    meeting : [ 'Revue annuelle du compte' , 'Présentation de la nouvelle gamme' , 'Négociation des conditions' ] ,
    visit   : [ 'Visite du site' , 'Démonstration sur place' , 'Installation et prise en main' ] ,
} ;

/** Turns a name into a slug for a fictitious e-mail domain. */
const slug = text => text
    .normalize( 'NFD' ).replace( /[̀-ͯ]/g , '' )
    .toLowerCase().replace( /[^a-z0-9]+/g , '-' ).replace( /^-|-$/g , '' ) ;

const pick = ( list , seed ) => list[ Math.floor( noise( seed ) * list.length ) ] ;

/**
 * Builds the whole base, dated from `today`.
 *
 * @param {number} today - The day number of today.
 * @returns {{ appointments : Object[] , customers : Object[] , interactions : Object[] , opportunities : Object[] }}
 */
const generate = today =>
{
    const customers     = [] ;
    const interactions  = [] ;
    const opportunities = [] ;

    for ( let index = 0 ; index < 40 ; index++ )
    {
        const kind  = KINDS[ index % KINDS.length ] ;
        const name  = `${ kind } ${ NAMES[ ( index * 3 + Math.floor( index / KINDS.length ) ) % NAMES.length ] }` ;
        const town  = TOWNS[ Math.floor( noise( index * 7 ) * TOWNS.length ) ] ;
        const first = pick( FIRSTS , index * 11 ) ;
        const last  = pick( LASTS , index * 13 ) ;
        const roll  = noise( index * 17 ) ;
        const id    = `customer-${ index + 1 }` ;

        customers.push(
        {
            address   :
            {
                locality      : town.name ,
                postalCode    : town.postalCode ,
                streetAddress : `${ 1 + Math.floor( noise( index * 19 ) * 120 ) } ${ pick( STREETS , index * 23 ) }` ,
            } ,
            contact   :
            {
                email : `${ slug( first ) }.${ slug( last ) }@${ slug( name ) }.example` ,
                name  : `${ first } ${ last }` ,
                phone : `05 ${ [ 0 , 1 , 2 , 3 ].map( part => String( 10 + Math.floor( noise( index * 29 + part ) * 89 ) ) ).join( ' ' ) }` ,
            } ,
            geo       :
            {
                latitude  : town.latitude + ( noise( index * 31 ) - 0.5 ) * 0.06 ,
                longitude : town.longitude + ( noise( index * 37 ) - 0.5 ) * 0.08 ,
            } ,
            id ,
            name ,
            notes     : `**${ first } ${ last }** préfère être joint le matin.\n\n- Paiement à 30 jours\n- Livraison par l'arrière du bâtiment` ,
            documents : [] ,
            repId     : REPS[ ( index + Math.floor( noise( index * 41 ) * 2 ) ) % REPS.length ].id ,
            revenue   : roll < 0.2 ? 0 : Math.round( 2000 + noise( index * 43 ) * 48000 ) ,
            sector    : SECTOR_OF[ kind ] ,
            since     : today - Math.round( 60 + noise( index * 47 ) * 1400 ) ,
            status    : roll < 0.2 ? 'lead' : roll > 0.88 ? 'inactive' : 'customer' ,
            tags      : TAGS.filter( ( _ , tag ) => noise( index * 53 + tag ) > 0.82 ) ,
        } ) ;

        const exchanges = 3 + Math.floor( noise( index * 59 ) * 4 ) ;

        for ( let rank = 0 ; rank < exchanges ; rank++ )
        {
            const type = pick( INTERACTIONS , index * 61 + rank ) ;
            interactions.push(
            {
                customerId : id ,
                day        : today - Math.round( 2 + rank * 18 + noise( index * 67 + rank ) * 15 ) ,
                id         : `interaction-${ index + 1 }-${ rank + 1 }` ,
                repId      : customers[ index ].repId ,
                summary    : pick( SUMMARIES[ type ] , index * 71 + rank ) ,
                type ,
            } ) ;
        }

        const deals = noise( index * 73 ) > 0.35 ? 1 + Math.floor( noise( index * 79 ) * 2 ) : 0 ;

        for ( let rank = 0 ; rank < deals ; rank++ )
        {
            const stage = STAGES[ Math.floor( noise( index * 83 + rank ) * STAGES.length ) ] ;
            opportunities.push(
            {
                amount     : Math.round( ( 1500 + noise( index * 89 + rank ) * 28500 ) / 100 ) * 100 ,
                closeDay   : today + Math.round( ( stage === 'won' || stage === 'lost' ? -1 : 1 ) * ( 5 + noise( index * 97 + rank ) * 80 ) ) ,
                customerId : id ,
                id         : `opportunity-${ index + 1 }-${ rank + 1 }` ,
                repId      : customers[ index ].repId ,
                stage ,
                title      : pick( OFFERS , index * 101 + rank ) ,
            } ) ;
        }
    }

    // Three weeks of appointments around today, working days only, a few a day for each rep.
    const appointments = [] ;

    for ( let offset = -7 ; offset <= 14 ; offset++ )
    {
        const day     = today + offset ;
        const weekday = new Date( day * 24 * 60 * 60 * 1000 ).getUTCDay() ;

        if ( weekday === 0 || weekday === 6 )
        {
            continue ;
        }

        REPS.forEach( ( rep , repIndex ) =>
        {
            const theirs = customers.filter( customer => customer.repId === rep.id ) ;
            const count  = Math.floor( noise( day * 7 + repIndex ) * 4 ) ;
            const taken  = STARTS.filter( ( _ , slot ) => noise( day * 13 + repIndex * 5 + slot ) < count / STARTS.length + 0.05 ).slice( 0 , count ) ;

            taken.forEach( ( start , rank ) =>
            {
                const types    = Object.keys( APPOINTMENTS ) ;
                const type     = types[ Math.floor( noise( day * 17 + repIndex * 3 + rank ) * types.length ) ] ;
                const customer = theirs[ Math.floor( noise( day * 19 + repIndex + rank ) * theirs.length ) ] ;

                if ( !customer )
                {
                    return ;
                }

                appointments.push(
                {
                    customerId : customer.id ,
                    end        : atTime( day , start + APPOINTMENTS[ type ] ) ,
                    id         : `appointment-${ day }-${ repIndex }-${ rank }` ,
                    repId      : rep.id ,
                    start      : atTime( day , start ) ,
                    type ,
                } ) ;
            } ) ;
        } ) ;
    }

    return { appointments , customers , interactions , opportunities } ;
} ;

export default generate ;

/**
 * Four reservations, and four different places to keep a date.
 *
 * The fixture exists to prove one thing : `Reservation` subtypes do not agree on
 * where the span lives, and the adapter finds it anyway — through the ordered
 * pairs of {@link module:helpers/schedule/datePairs}, without ever reading a
 * `@type`.
 *
 * | Entry | Where its dates are |
 * |---|---|
 * | `bk-concert` | inside `reservationFor` — the reservation has no dates of its own |
 * | `bk-table` | `startTime` / `endTime` |
 * | `bk-room` | `checkinTime` / `checkoutTime` |
 * | `bk-shuttle` | `pickupTime`, and nothing else |
 *
 * Entirely fictional, and deliberately outside any sector we work in : this file
 * ships to npm with `src`. The house vocabulary is signed with the reserved
 * example domain of RFC 2606.
 *
 * @module demo/scheduler/bookings
 */

const SCHEMA = 'https://schema.org' ;

/** The status vocabulary reservations use — not the one events use. */
const STATUS = `${ SCHEMA }/ReservationStatusType#` ;

export const bookings =
[
    {
        '@context'        : SCHEMA ,
        '@type'           : 'EventReservation' ,
        _key              : 'bk-concert' ,
        reservationStatus : `${ STATUS }ReservationConfirmed` ,
        underName         : { '@type' : 'Person' , name : 'Camille Roux' } ,
        reservationFor    :
        {
            '@type'   : 'MusicEvent' ,
            name      : 'Quatuor du soir' ,
            startDate : '2026-08-11T19:00:00.000Z' ,
            endDate   : '2026-08-11T20:30:00.000Z' ,
            location  : { '@type' : 'Place' , name : 'Auditorium' } ,
        } ,
    } ,
    {
        '@context'        : SCHEMA ,
        '@type'           : 'FoodEstablishmentReservation' ,
        _key              : 'bk-table' ,
        reservationStatus : `${ STATUS }ReservationConfirmed` ,
        partySize         : 4 ,
        startTime         : '2026-08-12T11:30:00.000Z' ,
        endTime           : '2026-08-12T13:00:00.000Z' ,
        reservationFor    : { '@type' : 'FoodEstablishment' , name : 'Le Comptoir des Halles' } ,
    } ,
    {
        '@context'        : SCHEMA ,
        '@type'           : 'LodgingReservation' ,
        _key              : 'bk-room' ,
        reservationStatus : `${ STATUS }ReservationPending` ,
        checkinTime       : '2026-08-13T14:00:00.000Z' ,
        checkoutTime      : '2026-08-14T09:00:00.000Z' ,
        reservationFor    :
        {
            '@type'  : 'LodgingBusiness' ,
            name     : 'Auberge des Tilleuls' ,
            address  : { '@type' : 'PostalAddress' , streetAddress : '4 rue Basse' , postalCode : '00000' , addressLocality : 'Villeneuve' } ,
        } ,
    } ,
    {
        '@context'        : SCHEMA ,
        '@type'           : 'TaxiReservation' ,
        _key              : 'bk-shuttle' ,
        reservationStatus : `${ STATUS }ReservationCancelled` ,
        // No end at all : the span lasts `defaultDuration`.
        pickupTime        : '2026-08-14T07:15:00.000Z' ,
        pickupLocation    : { '@type' : 'Place' , name : 'Gare de Villeneuve' } ,
    } ,
] ;

export default bookings ;

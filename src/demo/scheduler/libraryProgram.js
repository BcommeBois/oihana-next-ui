/**
 * The programme of an entirely fictional town library, as a JSON-LD payload.
 *
 * Its job is to be awkward. Every entry below exists because it exercises one
 * thing the adapter has to get right, and most of them are the cases a hand-made
 * sample never contains : a series defined on no day at all, a reference to a
 * room encoded as a zero, a rule whose days are public holidays, an end date
 * whose inclusiveness is a convention rather than a fact.
 *
 * Two things are deliberate.
 *
 * The house type — `WorkshopSeries`, under a vocabulary of its own — is never
 * named anywhere in `helpers/schedule`. It is expanded because it carries
 * `byDay`, not because anything recognised it, which is the whole point of
 * reading properties rather than `@type`.
 *
 * The `https://schema.example.org` context is a reserved documentation domain
 * (RFC 2606) : it resolves to nothing, on purpose.
 *
 * @module demo/scheduler/libraryProgram
 */

/** The GoodRelations day URIs, which is what `DayOfWeek` emits. */
const DAY = 'http://purl.org/goodrelations/v1#' ;

/** Rooms, as schema.org `Place` objects — the timeline rows of a later lot. */
export const rooms =
[
    { '@type' : 'Place' , '@context' : 'https://schema.org' , id : 'auditorium' , name : 'Auditorium' } ,
    { '@type' : 'Place' , '@context' : 'https://schema.org' , id : 'salle-bleue' , name : 'Salle Bleue' } ,
    { '@type' : 'Place' , '@context' : 'https://schema.org' , id : 'atelier' , name : 'Atelier' } ,
] ;

const [ auditorium , salleBleue ] = rooms ;

/**
 * The payload.
 *
 * What each entry is there to prove is said in the locale, keyed by its id, so
 * this file stays a plain payload rather than one with prose baked into it.
 */
export const libraryProgram =
[
    {
        '@type'     : 'Event' ,
        '@context'  : 'https://schema.org' ,
        id          : 'concert-rentree' ,
        name        : 'Concert de rentrée' ,
        startDate   : '2026-08-14T18:30:00.000Z' ,
        endDate     : '2026-08-14T20:00:00.000Z' ,
        location    : auditorium ,
        color       : 'primary' ,
    } ,
    {
        '@type'     : 'Event' ,
        '@context'  : 'https://schema.org' ,
        id          : 'heure-du-conte' ,
        name        : 'Heure du conte' ,
        startDate   : '2026-08-12T14:00:00.000Z' ,
        duration    : 'PT45M' ,
        location    : 'salle-bleue' ,
        color       : 'secondary' ,
    } ,
    {
        '@type'     : 'Event' ,
        '@context'  : 'https://schema.org' ,
        id          : 'expo-photo' ,
        name        : 'Exposition — Rivages' ,
        startDate   : '2026-08-10' ,
        endDate     : '2026-08-16' ,
        location    : auditorium ,
        color       : 'accent' ,
    } ,
    {
        '@type'     : 'Event' ,
        '@context'  : 'https://schema.org' ,
        id          : 'atelier-numerique' ,
        name        : 'Atelier numérique' ,
        startDate   : '2026-08-13T09:30:00.000Z' ,
        duration    : 'PT1H30M' ,
        eventStatus : 'https://schema.org/EventCancelled' ,
        location    : salleBleue ,
    } ,
    {
        '@type'           : 'Event' ,
        '@context'        : 'https://schema.org' ,
        id                : 'rencontre-auteur' ,
        name              : 'Rencontre d’auteur' ,
        startDate         : '2026-08-15T16:00:00.000Z' ,
        duration          : 'PT1H' ,
        eventStatus       : 'https://schema.org/EventRescheduled' ,
        previousStartDate : '2026-08-12T16:00:00.000Z' ,
        location          : auditorium ,
    } ,
    {
        '@type'    : 'WorkshopSeries' ,
        '@context' : 'https://schema.example.org' ,
        _key       : 'ws-initiation' ,
        id         : 'INIT-01' ,
        name       : 'Cycle d’initiation' ,
        byDay      : [ `${ DAY }Tuesday` , `${ DAY }Thursday` ] ,
        startTime  : '18:00' ,
        duration   : 'PT2H' ,
        exceptDate : '2026-08-13' ,
        location   : salleBleue ,
        color      : 'info' ,
    } ,
    {
        '@type'        : 'Event' ,
        '@context'     : 'https://schema.org' ,
        id             : 'club-lecture' ,
        name           : 'Club de lecture' ,
        eventSchedule  :
        [
            {
                '@type'      : 'Schedule' ,
                byDay        : [ `${ DAY }Wednesday` ] ,
                byMonthWeek  : 1 ,
                startTime    : '19:00' ,
                duration     : 'PT1H30M' ,
            } ,
        ] ,
        location : salleBleue ,
    } ,
    {
        '@type'    : 'WorkshopSeries' ,
        '@context' : 'https://schema.example.org' ,
        _key       : 'ws-ecriture' ,
        name       : 'Atelier d’écriture' ,
        byDay      : [] ,
    } ,
    {
        '@type'    : 'WorkshopSeries' ,
        '@context' : 'https://schema.example.org' ,
        _key       : 'ws-permanence' ,
        name       : 'Permanence jours fériés' ,
        byDay      : [ `${ DAY }PublicHolidays` ] ,
        startTime  : '10:00' ,
    } ,
    {
        '@type'    : 'Event' ,
        '@context' : 'https://schema.org' ,
        id         : 'projection' ,
        name       : 'Projection — court-métrage' ,
        startDate  : '2026-08-11T20:00:00.000Z' ,
        duration   : 'PT1H' ,
        location   : 0 ,
    } ,
    {
        '@type'    : 'Event' ,
        '@context' : 'https://schema.org' ,
        id         : 'fermeture' ,
        name       : 'Fermeture annuelle' ,
        startDate  : '2026-08-16' ,
    } ,
] ;

export default libraryProgram ;

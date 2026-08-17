# schema.org, on the wire

The `scheduler` group reads **JSON-LD as it arrives** and writes back **patches spelled the
way it read them**. Turn it on with one prop :

```jsx
<Scheduler schema events={ payload.result } getEventId={ source => source._key } />
```

This page is about what happens in between : what the adapter looks at, what it deliberately
refuses to look at, the four traps that come with the vocabulary, and how a subtype of your
own joins in without a line of code here changing.

## The one idea : it reads properties, never `@type`

Everything else follows from this.

An object carrying `byDay` is expanded as a repeating rule whether it is called `Schedule`,
`Course` or `DeliveryRouteTerm`. An object carrying `startDate` becomes a dated event. **No
module in this group knows the name of a single house type**, which is what makes a
vocabulary that grows server-side cost nothing client-side.

```js
import { fromSchema } from 'oihana-next-ui/helpers/schedule/fromSchema'

fromSchema( round , { window , getEventId : source => source._key } )
```

When an object carries both a rule and its own dates, **the rule wins** — schema.org says as
much : an event associated with a schedule should not carry dates of its own.

What comes out is a small, flat record : `id`, `start` and `end` in **milliseconds**,
`allDay`, `resourceId`, `status`, `color`, `title`, `span`, and `source` — **the original
object, untouched**. Integers because the layout runs dozens of times a second while an
event is dragged ; `source` because that is what a `renderEvent`, a panel field or an
`onChange` actually needs.

## Identity

A record with no identity cannot be moved, selected or written back, so this is the first
thing to get right. The adapter tries, in order :

```
identifier  →  id  →  url
```

and takes `getEventId` over all three :

```jsx
<Scheduler schema getEventId={ source => source._key } … />
```

That accessor is not optional decoration. A payload where `id` is a **business code** —
unique per catalogue, not per row — will collide the day two objects share it, and the
symptom is one event refusing to move while another moves in its place. Give the real key.

An object whose identity cannot be read is **dropped**, not rendered under an invented name.

## Trap 1 — a bare `Date` *is* the all-day signal

`startDate` accepts a date **or** an instant, and the difference is the whole meaning :

```json
{ "startDate" : "2026-08-12" }                 // all day
{ "startDate" : "2026-08-12T14:00:00.000Z" }   // 2 pm
```

`parseInstant` keeps that distinction rather than flattening it — which a naive
`new Date( x )` would do twice over, since it also parses the first as UTC midnight and the
second as written, mixing two timezones in one list.

**And the ends do not agree with each other.** A date-only `endDate` is what a human means
by « to the 12th » — inclusive. A date-time `endDate` is exclusive, like every instant. So :

| | `startDate` | `endDate` | Covers |
|---|---|---|---|
| All day | `2026-08-10` | `2026-08-12` | the 10th, 11th **and** 12th |
| Timed | `2026-08-10T09:00Z` | `2026-08-10T11:00Z` | two hours |

Internally the record always holds an **exclusive** end, so an all-day span ends at the
following midnight — and that is why nothing ever prints it. « The 10th to the 13th at
00:00 » names a day the event does not cover.

`allDayEndInclusive={ false }` switches to the other convention, for a back end that already
sends exclusive dates. **It must match how the payload was written**, and it is used both
when reading and when writing back.

An event with neither an end nor a `duration` lasts `defaultDuration` — one hour, unless said
otherwise. An all-day one with no end covers its day.

## Trap 2 — `Schedule`, and the two axes people conflate

The **declarative** tier of recurrence is supported : a set of properties selecting days.

```json
{
  "@type"           : "Schedule",
  "byDay"           : [ "https://schema.org/Tuesday", "https://schema.org/Thursday" ],
  "startDate"       : "2026-09-01",
  "endDate"         : "2026-12-20",
  "startTime"       : "18:00",
  "duration"        : "PT1H30M",
  "exceptDate"      : [ "2026-11-11" ],
  "repeatFrequency" : "P1W"
}
```

Read : `byDay`, `byMonth`, `byMonthDay`, `byMonthWeek`, `repeatFrequency`, `repeatCount`,
`exceptDate`, `startTime`, `endTime` and `duration`. **`scheduleTimezone` is not** — display
timezones are out of scope, and pretending to honour the property while rendering in the
browser's zone would be worse than ignoring it. The rule is only ever expanded **over the
window being looked at**, so an open-ended weekly series costs a scan of that week and
nothing more.

**The two axes**, and the vocabulary is explicit about them :

- `startDate` / `endDate` bound **the validity of the rule** — the season the series runs in ;
- `startTime` / `endTime` give **the time of each occurrence**.

A series with no `startTime` produces all-day occurrences ; one with a `startTime` produces
timed ones on the same days. Getting these two the wrong way round produces a series that
runs all year on one day, or one day repeated all year — both of which look like data
problems and are not.

**`byDay` arrives in three dialects** and all three are read : the schema.org URI
(`https://schema.org/Tuesday`), the bare name (`Tuesday`), and the iCal code (`TU`, `2TU`).
`PublicHolidays` is a legal member of `DayOfWeek` **and is not a weekday** — it selects
nothing here, deliberately, since only a calendar of holidays could say what it means.

**Out of scope, and it stays out :** `RRULE:` strings, and the « this occurrence / all
following » editing semantics. Consequently **an occurrence of a rule refuses to be moved**
— writing the patch would move the whole series — and the refusal is enforced in
`useScheduler`, so no view can offer the gesture by mistake.

## Trap 3 — a reservation has no dates

A `Reservation` does not carry a span : it **points at what was reserved**. And the subtypes
disagree about where the span lives, on purpose :

| Type | Where the dates sit |
|---|---|
| `Event` and everything shaped like it | `startDate` / `endDate` |
| `FoodEstablishmentReservation` | `startTime` / `endTime` |
| `LodgingReservation` | `checkinTime` / `checkoutTime` |
| `TaxiReservation` | `pickupTime`, and nothing else |
| `EventReservation`, `Flight…`, `Bus…`, `Train…` | inside `reservationFor` |

A single `unwrap` accessor cannot answer that, so the answer is structural like the rest —
**an ordered list of property pairs, tried in turn** :

```jsx
<Scheduler
    schema
    datePairs = {[
        [ 'startDate'   , 'endDate'      ] ,   // the default
        [ 'startTime'   , 'endTime'      ] ,
        [ 'checkinTime' , 'checkoutTime' ] ,
        [ 'pickupTime'  , null           ] ,   // an instant : lasts defaultDuration
        [ 'loadedAt'    , 'unloadedAt'   ] ,   // yours
    ]}
    unwrap = { [ 'reservationFor' , 'orderedItem' ] }
/>
```

There is no collision with `Schedule.startTime`, which is a time of day (`'18:00'`) :
`parseInstant` returns nothing for it, and repeating rules are branched on before the
date-pair path anyway.

Two more things a reservation needs :

- **`getStatus`**, because `ReservationStatusType` is a different vocabulary from
  `EventStatusType`. Only what genuinely maps is mapped — a *pending* booking is **drawn**
  like a scheduled one, there being no honest third way to draw it, and the panel prints the
  real value beside it.
- **The name is often over there too.** A `LodgingReservation` has its own `checkinTime` but
  its name lives in `reservationFor`, so the title is looked for on both.

**Dates that belong to a linked object are shown, locked, and said out loud.** A reservation
does not own the hours of the concert it points at ; rewriting them would reschedule that
concert for everyone who booked it. The gestures refuse it, the form refuses it, and it is
**one predicate** (`isLinkedSpan`) — the day a case genuinely needs the nested write, it
becomes an option rather than a rewrite.

## Trap 4 — writing back

`onChange` never hands back a rebuilt object. It hands back the next list **and a patch** :

```js
{ type : 'move' ,
  event , source ,
  patch : { checkinTime : '2026-08-12T14:00:00.000Z' , checkoutTime : '…' } ,
  from  : { start , end , resourceId } ,
  to    : { start , end , resourceId } }
```

**The property names come from the record's `span`**, which remembers where the dates were
read — this is not a detail. Writing `startDate` onto a lodging booking leaves it with *two*
legal spans contradicting each other, and the reader follows the newer one without a word.
A `TaxiReservation`, which names a pickup and no end, gets no invented end property.

An all-day span is written back as **bare dates**, honouring `allDayEndInclusive` :

```js
toSchemaPatch({ start , end , allDay : true })   // → { startDate : '2026-08-10' , endDate : '2026-08-12' }
```

**No property means « resource ».** An accessor read it — `getResourceId` — and inverting an
accessor is not something a library can guess. In schema mode a row change travels in the
change descriptor for the application to write, unless `setResourceId` says how :

```jsx
setResourceId = { ( source , resourceId ) => ({ location : { '@type' : 'Place' , identifier : resourceId } }) }
```

## Extending it for a type of your own

The short version : **there is nothing to declare.**

A house subtype inherits schema.org's properties, so it is read for free — carrying `byDay`
makes it a rule, carrying `startDate` makes it an event. What is left is only what is new,
and it is one line each :

```jsx
<Scheduler
    schema
    details = {{
        fields : [
            { property : 'description' , type : 'textarea' } ,
            { property : 'assignedPOS' , type : 'place' } ,          // yours — printed and editable
            { property : 'vehicle'     , type : 'text' } ,
        ] ,
    }}
    datePairs     = { [ …DEFAULT , [ 'loadedAt' , 'unloadedAt' ] ] }  // only if the dates moved
    getEventId    = { source => source._key }
    getResourceId = { source => source.assignedPOS?.identifier }
/>
```

That `property` on a descriptor is the hinge : it says what to print, what to edit, and what
to put in the patch — so a property added server-side becomes a row here in one line, and
`toSchemaPatch` learns nothing new.

Two caveats worth knowing before writing a descriptor :

- **An object value stays read-only** unless the descriptor says `editable : true`. A `Place`
  put through a text field comes back a string, with its `@type`, its identity and its
  address gone and nothing looking broken. `editable : true` says you supply a control of
  your own through `renderField`, and hand back a whole object.
- **`formatValue` prints what it can name and nothing else.** A `Place`, a `PostalAddress`, a
  `Person`, an `Organization`, an enumeration member arriving as a URI — all readable. What
  it cannot name is drawn as nothing rather than as `[object Object]`.

## Reading a payload before writing any interface

`/lab/schedulerModel` puts raw objects through the adapter and prints what comes out — the
fastest way to find out whether a payload is read the way you think it is. The same thing in
code :

```js
import { fromSchemaList } from 'oihana-next-ui/helpers/schedule/fromSchema'

const window  = { start : Date.parse( '2026-08-10' ) , end : Date.parse( '2026-08-17' ) }
const records = fromSchemaList( payload.result , { window , getEventId : source => source._key } )

console.table( records.map( ({ id , title , start , end , allDay , resourceId }) => (
    { id , title , start : new Date( start ) , end : new Date( end ) , allDay , resourceId } ) ) )
```

Zero records out of a non-empty payload means one of three things, in order of likelihood :
no readable identity, no readable span (check `datePairs` and `unwrap`), or a repeating rule
asked for without a `window`.

## See also

- [The group's guide](README.md) — the views, the gestures, the recipes.
- The sources : [`helpers/schedule/fromSchema`](../../../src/helpers/schedule/fromSchema.js),
  [`datePairs`](../../../src/helpers/schedule/datePairs.js),
  [`expandSchedule`](../../../src/helpers/schedule/expandSchedule.js),
  [`toSchemaPatch`](../../../src/helpers/schedule/toSchemaPatch.js). **Their JSDoc is the
  reference.**
- `/lab/schedulerModel` — the adapter, running on awkward payloads.

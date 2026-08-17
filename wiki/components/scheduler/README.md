# `scheduler`

Placing events **on a time axis** : a week of columns, a month of rails, a list of days, a
plan of resources — and the gestures that move what is on them.

```jsx
import Scheduler           from 'oihana-next-ui/components/scheduler/Scheduler'
import SchedulerToolbar    from 'oihana-next-ui/components/scheduler/SchedulerToolbar'
import SchedulerAgenda     from 'oihana-next-ui/components/scheduler/SchedulerAgenda'
import SchedulerTimeGrid   from 'oihana-next-ui/components/scheduler/SchedulerTimeGrid'
import SchedulerMonth      from 'oihana-next-ui/components/scheduler/SchedulerMonth'
import SchedulerTimeline   from 'oihana-next-ui/components/scheduler/SchedulerTimeline'
import SchedulerEvent      from 'oihana-next-ui/components/scheduler/SchedulerEvent'
import SchedulerEventPanel from 'oihana-next-ui/components/scheduler/SchedulerEventPanel'
import SchedulerEventField from 'oihana-next-ui/components/scheduler/SchedulerEventField'
import SlotPicker          from 'oihana-next-ui/components/scheduler/SlotPicker'
import SlotPickerPanel     from 'oihana-next-ui/components/scheduler/SlotPickerPanel'
```

Most applications only ever name the first one. `<Scheduler>` owns the events, the view and
the date being looked at, renders the toolbar and whichever view is current, and hands the
rest of the group to whoever wants to compose their own.

## What this group is not

- **Not `Calendar`, nor the seven `Input*Date*`.** Those **choose a date** and hand back a
  value. Proof of how far apart the two problems are :
  [a `Calendar` day cell](../../../src/components/dates/calendar/Day.jsx) is a `<button>`
  whose only child is the day number — no children, no slot, structurally closed. Nothing
  there can hold an event, and it was never meant to. This group reuses the *helpers* of
  `dates`, never its components.
- **Not `Sortable*` nor `Kanban`.** Those **reorder a list** : what they drag is a rank. A
  scheduler drags a **coordinate** — an hour, a day, a row — and that is why the whole family
  is written in pointer events and uses no drag-and-drop library at all. See
  [`hooks/usePointerDrag`](../../../src/hooks/usePointerDrag.js), which is generic and
  belongs to the library rather than to this group.
- **Not a Gantt with dependencies.** `SchedulerTimeline` is the support one would build that
  on — arrows between tasks and a critical path are another component.
- **Not virtualized.** A timeline of four thousand rows needs windowed rendering, and no
  virtualization library is in the dependencies. Declare the rows a reader can actually use.

## The views

One component, several views : a phone does not want a week of seven fifty-pixel columns, it
wants a list — and that is a different **view**, not a different component.

| View | The question it answers | Reach for it when |
|---|---|---|
| `agenda` | What is happening, in order ? | The default, and what a phone should be shown : no axis, so nothing has to fit in fifty pixels |
| `day` / `week` | Where does it fall in the day, and what does it collide with ? | The working view — overlaps share the width, edges can be pulled, ranges can be drawn |
| `month` | What does the month look like ? | Multi-day bars read as one span across a week ; narrow, cells fall back to density dots |
| `timeline` | Who is taken, and when ? | Rooms, vehicles, staff, rounds — the same week grid with its axis pivoted |

`views` picks which are offered — it is filtered against what is actually built, so asking
for one that does not exist cannot put a dead tab in the switcher. The switcher hides itself
when there is only one view left to switch to.

`day` and `week` are **the same component** : the window says whether there is one column or
seven, and nothing else differs. So are a timeline of hours and a timeline of days —
`timelineDays` decides, and the scale follows.

## Booking, which is the other question

`SlotPicker` is the one component here that does not place what is scheduled. It reads the
same two things — the hours something is open, and what already sits in them — and answers
with **the gaps**. Booking an appointment is not editing an event : there is nothing to edit
yet, and the whole problem is finding where the new thing may go.

```jsx
<SlotPicker resources={ rooms } busy={ bookings } duration={ 30 } buffer={ 10 } onChange={ book } />
```

Three things to know before the first payload goes in.

**`busy` is taken as given, and that is where the filtering belongs.** A cancelled booking
still blocks until you drop it — and, the one that surprises everybody, **an all-day entry
blocks the whole day**, all-day meaning midnight to midnight. An exhibition running a week,
handed over as an occupation, empties the picker for that week. It is a correct answer to a
badly-posed question : an exhibition in the hall does not stop a room being booked at two.
Whether either really holds a slot is a business rule, not arithmetic.

**Silence is not an opening.** A resource declaring no hours offers no slots. The timeline
shades the complement of what is declared and therefore shades nothing when nothing is said ;
offering an appointment needs the opposite, a *positive* statement — without one, three in
the morning is bookable. `defaultAvailability` says « nine to six » once, for whatever stayed
silent.

**The shell changes the contract.** Inline, a chosen slot is reported at once. In
`SlotPickerPanel` there is nothing else on screen, so the selection is a **draft** until the
footer confirms it : a window booking on the first tap would punish a mis-tap, and one that
only highlighted would leave a reader unable to tell whether anything had happened.

Like everything else here, it **reports and does not book** : `onChange` hands back
`{ start , end , resourceId? }`, and the reservation is the application's to make.

## Two shapes on the wire

Without `schema`, an event is a plain object carrying `id` / `start` / `end`, optionally
`allDay`, `resourceId`, `status`, `color`, `title`.

With `schema`, events are read as **JSON-LD** — `Event`, `Schedule`, `Reservation` and any
type of your own carrying their properties. The adapter reads **properties, never `@type`**,
which is what makes a house subtype work without declaring anything.

Either way `onChange` hands back objects **in the shape they came in**, and what it reports
is a patch rather than a rebuilt object. All of that has its own page :
[**schema.org, on the wire**](schema-org.md).

## The rules that hold across the group

Seven, each of which cost a defect to learn.

**A theme token's colour never goes on text.** A theme only guarantees contrast *within its
pairs* — `base-content` on `base-*`, `<token>-content` on `<token>`. `text-warning` on
`bg-warning/10` is illegible in both themes. So an event's hue goes in the fill (20 %) and
in the inline-start rule ; the label stays `base-content`. The same reasoning gives
`tooltipColor` : **one colour for the whole scheduler, never one per event**, since an
event's colour is as often a free CSS value as a token.

**Container queries, not breakpoints.** Every view answers to **its own width**, not to the
window's : the same agenda sits full-width on a phone, in a 360-pixel panel beside a desktop
layout, and in a sidebar, and all three want the same treatment for the same reason. A
viewport breakpoint gets the phone right and the other two wrong.

**Nothing is laid out again during a gesture.** Recomputing the overlap columns on every
frame would be correct and unusable — the blocks around the pointer would re-share their
width mid-drag and the one being moved would jump out from under the finger. The original
stays in place, greyed ; a single preview follows ; the layout settles once, on release. The
block and the preview come out of the **same** renderer, because a preview that is not
exactly the block makes the drop land where nobody aimed.

**The library never invents an identifier.** `onEventCreate({ start , end })` reports a
range, and **the return value decides** : an object is added, nothing at all means the
application took over — which is what opening an editor looks like. An invented key is an
invented collision, and the real one comes from the server.

```jsx
onEventCreate = { range => ({ id : crypto.randomUUID() , ...range }) }   // added
onEventCreate = { range => { openMyForm( range ) } }                     // yours to make
```

Watch the braces : `x => ({ … })` returns, `x => { … }` does not.

**Permissions gate, and hide nothing.** `getEventPermissions` returns `'read'` / `'edit'`,
or `{ read , edit , move , resize , remove }`. It gates the panel, the gestures and the
mutators — defence in depth — and it is deliberately **not** a filter : what is not to be
shown is not to be sent. A client-side filter looks like protection while being none.

**A span is written back under the properties it was read from.** A lodging booking keeps
its `checkinTime` / `checkoutTime` ; writing `startDate` onto it would leave two legal spans
in one object and the reader would follow the wrong one, silently. The record carries a
`span` saying where its dates came from, and every writer takes its property names from
there.

**Everything is off by default, and `interactive` is the one switch.** `movable`,
`resizable`, `creatable` and `details` each turn on one thing ; `interactive` turns on the
four at once, and any of them passed explicitly still wins :

```jsx
<Scheduler interactive resizable={ false } … />   {/* move and create, but never stretch */}
```

The four rather than three — without the panel, `resizable` promises a finger a gesture it
cannot make.

## The gestures

The table no JSDoc gives in one glance. **A row is only offered where the matching prop is
on** and where the permissions and `isEventMovable` / `isEventResizable` agree.

| | Mouse | Touch | Keyboard |
|---|---|---|---|
| **Open** | Click a block | Tap a block, or an agenda row | `Tab` to it, then `Enter` |
| **Move** | Drag it | Long press (~400 ms), then drag | Arrows along the axis ; across it to change day or resource |
| **Stretch** | Pull a handle, on hover | **In the form** — open the panel, correct the end | `Shift` + an arrow |
| **Create** | Draw a range, or click a slot | Tap an empty slot ; in a month, open the day and use *New* | The toolbar's create command |
| **Commit** | Release | Release | `Enter` |
| **Abandon** | `Escape` | `Escape` | `Escape` |

Three things this table is really saying :

- **A finger has no hover**, so an eight-pixel handle is unreachable and inventing a
  fourteen-pixel one would eat the drag underneath it. Stretching on touch is the form, and
  that is a design decision rather than a gap.
- **A keyboard cannot draw a rectangle.** Creating from it is a *command* — a focusable empty
  column would be seven tab stops a week, each guessing an hour. Hence the toolbar button,
  which `showCreateButton` removes for whoever places their own.
- **Nothing is written before the release, or before `Enter`.** Ten arrow presses would
  otherwise be ten writes, ten round trips and ten chances for one of them to fail halfway.

`snapMinutes` is the step every gesture lands on, and it is **independent of
`slotDuration`** : a grid ruled every half hour while a drag lands on the quarter is the
usual arrangement.

## Recipes

### 1. A week one can change

```jsx
import Scheduler from 'oihana-next-ui/components/scheduler/Scheduler'

<Scheduler
    interactive
    defaultView         = "week"
    events              = { events }
    getEventPermissions = { event => ( event.owner === me.id ? 'edit' : 'read' ) }
    isEventMovable      = { event => event.end > Date.now() }
    onChange            = { ( next , change ) => api.save( change ) }
    snapMinutes         = { 15 }
/>
```

`onChange` receives the **whole next list** and a **change descriptor** — everything an API
call needs, without diffing anything :

```js
{ type : 'move' ,                                   // move | resize | update | create | delete
  event ,                                           // the normalized record, before
  source ,                                          // the object it came from
  patch : { startDate : '…' , endDate : '…' } ,      // only what changed, spelled as it was read
  from  : { start , end , resourceId } ,
  to    : { start , end , resourceId } }
```

In **uncontrolled** mode (`defaultEvents`), returning a rejected promise from `onChange`
puts the list back where it was — the optimistic contract `useKanban` already uses.

Two refusals are built in and need no writing : an occurrence of a **recurring rule** cannot
be dragged, because the patch would move the whole series ; and the **dates of a linked
object** — a reservation pointing at a concert — are shown, locked, and said out loud.

### 2. A plan of resources

```jsx
import Scheduler from 'oihana-next-ui/components/scheduler/Scheduler'

<Scheduler
    interactive
    defaultView   = "timeline"
    events        = { bookings }
    getResourceId = { source => source.room?.id }
    palette       = "brand"
    resources     = { rooms }          /* [ { id , name , source } ] — declared, in order */
    rowHeight     = { 34 }
    timelineDays  = { 1 }
    views         = { [ 'timeline' , 'week' ] }
/>
```

**Rows are declared, never derived.** A list of events cannot supply what a plan needs : the
*order* (a grid that rearranges itself as bookings come and go cannot be read twice), the
*empty rows* (a room free all day is an answer, and deriving rows from bookings makes that
answer disappear) and the *names*. Derivation stays as a fallback — useful to look at a
payload, never to plan with. An event pointing at a row nobody declared lands in an
`UNASSIGNED` row rather than vanishing.

**Opening hours are read, not reinvented.** A resource whose source carries an
`openingHoursSpecification` gets its closed hours shaded, straight from schema.org. A
resource declaring nothing is **not shaded** — silence is not a closure — and two touching
rules merge, so `09:00–12:00` and `12:00–18:00` do not print a closure at noon nobody
declared.

**Moving a card to another row changes its resource.** In plain mode that writes
`resourceId` ; in schema mode no property means « resource », so the new row travels in the
change descriptor for the application to write, unless `setResourceId` says how.

A legend is a composition rather than a prop — build it on
[`MetricLegend`](../metrics/README.md) from the same declared list, in the same order, and
the colours will match because `assignColors` sorts its keys before indexing them.

### 3. A booking, read then changed

```jsx
<Scheduler
    schema
    details    = {{
        deletable : true ,
        placement : 'bottom' ,
        fields    : event => ( event.source[ '@type' ] === 'LodgingReservation' ? STAY : DEFAULT ) ,
        renderField : ( field , { editing , editor , labels } ) => field.property !== 'location'
            ? undefined                                    /* keep the default row */
            : editing
            ? <RoomSelect value={ editor.draft.location } onChange={ room => editor.setValue( 'location' , room ) } />
            : <RoomLine value={ field.value } /> ,
    }}
    events     = { reservations }
    getEventId = { source => source._key }
/>
```

The panel **reads first** and offers *Edit* only where the permissions grant it : a booking
is consulted far more often than it is changed. It is a `Modal`, so it has `placement`
(`middle` by default, full screen below `md`), a sticky footer over a scrolling body, and a
`portal` for opening inside another modal.

Four ways out, in increasing order of ambition : **`fields`** descriptors, each carrying the
`property` it edits — that property is the hinge with a vocabulary that grows server-side, a
new one becoming a row in one line ; **`renderField`** to replace a single row in either
mode ; **`children`** as a render prop for the whole body, keeping the shell, the draft, the
validation and the commit ; and **`useEventEditor`** for a window of your own making.

Two refusals worth knowing : an **object value** stays read-only unless the descriptor says
`editable : true` — a `Place` put through a text field comes back a string, with its
`@type`, its identity and its address gone and nothing looking broken. And a descriptor may
be **`editOnly`**, worth changing but not worth printing : `#EF4444` tells a reader nothing
the coloured dot beside the title has not already said.

### 4. Your own shell, on the headless core

Everything above is `useScheduler` with an interface on top. Take the hook alone when the
frame is yours :

```jsx
import useScheduler      from 'oihana-next-ui/hooks/useScheduler'
import SchedulerTimeGrid from 'oihana-next-ui/components/scheduler/SchedulerTimeGrid'

const scheduler = useScheduler({ schema : true , events , onChange , getEventId })

// → events , sources , window , view , setView , date , setDate , today , previous , next ,
//   resources , canMove , canResize , permissionsOf ,
//   moveEvent , resizeEvent , updateEvent , addEvent , removeEvent , isControlled

<MyHeader onBack={ scheduler.previous } onNext={ scheduler.next } title={ myTitle } />

<SchedulerTimeGrid
    events        = { scheduler.events }
    onEventMove   = { scheduler.moveEvent }
    onEventResize = { scheduler.resizeEvent }
    window        = { scheduler.window }
/>
```

`toolbar={ false }` on `<Scheduler>` does the same thing from the other end, and
`SchedulerToolbar` is exported so a custom layout can place the real one where it likes.

## Accessibility

The part no screenshot shows — including, deliberately, **what is refused**.

- **Every event is a `<button>`** in every view that made it activable, with a focus ring and
  an `aria-label` written by
  [`helpers/schedule/describeEvent`](../../../src/helpers/schedule/describeEvent.js) : the
  title, the day, both bounds, and the status when there is one. A card prints a title and a
  start ; read out loud that would be half an event. The **same function writes the
  tooltip**, so the two cannot say different things.
- **A month cell announces its date and its load** — « Wednesday 12 August 2026, 3 events »
  — rather than the number it prints.
- **A block that does nothing is not a button.** An agenda nobody wired stays a list, since a
  row of dead buttons is worse than a paragraph.
- **Moving and stretching work from the keyboard**, gated by the same permissions as the
  pointer, previewing and committing on `Enter`. The arrows follow **the layout, not the
  indexes** : in a right-to-left reading the column on the right is the earlier one.
- **A live region says what happened** — every keyboard step, and every committed change
  whatever gesture made it. The focus does not move when a block does, so nothing would be
  announced otherwise, and a label changing under a focus already there is not reliably read.
  Its sentences are locale templates (`'{event} moved to {when}'`) rather than words
  concatenated in the component, because a spoken sentence needs its own word order.
- **Structure** : a view is a named region, a day column and a resource row are named groups,
  so a reader landing on a block knows which day or which room they are in. The hour gutter,
  the ruler, the rules, the now marker, the drag handles and the closed-hours shading are
  hidden — decoration that would bury what the reader came for.

And what is **not** done, said plainly rather than half-promised :

- **No `role="grid"`**, on the month or on the week. That role promises navigation from cell
  to cell, and a promise an interface does not keep is worse for a screen reader than no
  promise at all.
- **No arrow navigation between blocks or between month cells** — same reason. Tabbing
  crosses them one by one, which is what FullCalendar and MUI X do too, and it is
  predictable.
- **An all-day chip does not move from the keyboard.** It moves by the day, which is a
  different projection ; it is not a gap left open by accident.

## The pure half

Two thirds of this group is code with no interface, usable on its own. **The JSDoc in each
file is the reference** ; this is only the map.

### `helpers/schedule`

| Module | What it answers |
|---|---|
| `fromSchema` | Turns one JSON-LD object — or a list — into normalized records, reading properties and never `@type` |
| `normalizeEvent` | The plain-object path to the same record : `id`, `start`, `end`, `allDay`, `resourceId`, `status`, `color`, `source` |
| `datePairs` | Where a span may live when it is not `startDate` / `endDate` : `startTime`, `checkinTime`, `pickupTime` — and `isLinkedSpan`, which says the dates belong to another object |
| `toSchemaPatch` | The way back : a changed span, spelled with the properties it was read from |
| `expandSchedule` | A declarative `Schedule` — `byDay`, `byMonth`, `byMonthDay`, `repeatCount`, `exceptDate` — expanded into occurrences over a window |
| `dayOfWeek` | The day vocabularies : GoodRelations URIs, schema.org names, iCal codes, and `PublicHolidays`, which is not a weekday |
| `expandToDays` | Cuts events at local midnights, marking the pieces that are not the real ends |
| `layoutOverlaps` | Which column an event takes, and how wide, when several share an hour |
| `layoutBars` | Rails over a row of days : month weeks, all-day bands, and `eventsOfDay` |
| `timeScale` | `createTimeScale` — minutes of a day, repeated per column ; `createSpanScale` — one continuous axis over a window. Both answer `offsetOf`, `timeAt`, `snap` |
| `resources` | Declared rows, their order, the orphan row, and `groupByResource` |
| `openingHours` | `OpeningHoursSpecification` read as it stands : `openRangesOf`, `closedRangesOf`, and merging of touching rules |
| `computeFreeSlots` | The gaps rather than the occupations — with `computeFreeSlotsByResource` for « the first room free at two ». The clock is a parameter, never read inside |
| `describeEvent` | What an event says out loud : `describeSpan`, `describeEvent`, `describeDay`, and `fill` for the announcement templates |
| `eventFields` | What a panel prints, and `formatValue`, which turns a `Place`, an agent or an enumeration member into text rather than `[object Object]` |
| `assignColors` | A stable colour per key — **sorted before indexing**, so the mapping depends on the key set and not on the visible window |
| `getViewWindow` | The span a view is looking at, and the five view names |
| `formatPeriod` | How that span is named — « 10 – 16 August 2026 » for a week, « August 2026 » for a month, which is not the six weeks the grid actually draws |
| `parseInstant` | A date, a date-time or nothing, without a naive `new Date()` mixing UTC and local ; plus `startOfDay` and `atTimeOfDay` |
| `parseDuration` | ISO-8601 durations |
| `fragmentOf` | The word after the `#` of a URI, which is how schema.org enumerations arrive |

### Hooks

| Hook | What it owns |
|---|---|
| `useScheduler` | The whole headless core : events, window, navigation, the five mutators, the permissions |
| `useEventEditor` | A draft, its validation, and a single patch — with no interface. Nothing is written before `submit` |
| `useTimeDrag` | Pixels in, an instant out : four gestures, two axes, one preview, driven by a pointer **or** by the arrow keys |
| `usePointerDrag` | The gesture alone, knowing nothing of time — threshold, long press, the scroll fight, edge auto-scroll, `Escape`, and the click swallowed after a real drag. Generic ; reuse it |
| `usePalette` | A palette by name (`brand`, `theme`, `nivo`) or explicit colours. Shared with the charts |
| `useNow` | A clock that **starts at `null`** on purpose : a server and a browser cannot render the same time, and reading it during the first render is a hydration mismatch on every load |

## See also

- The live demos : `/lab/scheduler` (agenda, panel, permissions, reservations),
  `/lab/schedulerWeek` (grid, gestures, keyboard, touch), `/lab/schedulerMonth`,
  `/lab/schedulerTimeline`, `/lab/schedulerSlots` (free slots),
  `/lab/schedulerModel` (the adapter, on raw payloads).
- [**schema.org, on the wire**](schema-org.md) — the data model, its traps, and extending it.
- The sources : [`src/components/scheduler`](../../../src/components/scheduler),
  [`src/helpers/schedule`](../../../src/helpers/schedule) and
  [`src/hooks`](../../../src/hooks). **The JSDoc there is the API reference** : props,
  defaults and examples live in the files rather than in a table here, which would diverge
  within two commits.
- [`CHANGELOG.md`](../../../CHANGELOG.md), whose `scheduler` entries record why each decision
  went the way it did.
- [The wiki index](../../README.md).

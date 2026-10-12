# `feedback` — signals, sound and vibration

A short sound and a vibration that tell what just happened, **without looking at the screen** —
and one switch, kept on the device, that silences them all.

```jsx
import useFeedbackSignal from 'oihana-next-ui/hooks/useFeedbackSignal'
import FeedbackProvider  from 'oihana-next-ui/contexts/feedback/provider'
import useFeedback       from 'oihana-next-ui/contexts/feedback/useFeedback'
import SoundButton       from 'oihana-next-ui/components/buttons/SoundButton'
```

The group spans four folders — a hook, a context, a button and `helpers/audio` — and lives under
`contexts/feedback` here because the provider is what ties them together.

## Signalling an outcome

```jsx
const { signal } = useFeedbackSignal() ;

const onScan   = () => signal( 'success' ) ;
const onReject = () => signal( 'error' ) ;
```

Made for scanning — a beep for a code accepted, a buzz for one refused — and for any gesture
whose outcome the eye should not have to check : the operator keeps looking at the shelf.

Three signals, told apart by ear :

| Signal | Sound | When |
|---|---|---|
| `success` | one short high beep | the gesture worked |
| `warning` | two beeps | accepted, but look : a limit reached, a date close |
| `error` | a long low buzz | refused |

Each carries its own vibration pattern. `signals` adds others or replaces these — a sequence of
tones (frequency, duration, wave, silence before) and a `navigator.vibrate` pattern — and
`signal( name )` returns whether the name is known.

🔑 **A signal, never a message.** The hook draws nothing and toasts nothing : the screen decides
what it shows beside the sound — an alert, a colour, nothing. None of the library's components
makes a sound of its own (`InputScan`, `BarcodeScanner`, `NumericKeypad`…) : they call back, and
the screen signals.

🔑 **Synthesized, not played.** The tones come from Web Audio oscillators : no sound file to
download or cache, so the first signal works offline. Every tone fades in and out over a few
milliseconds, so it does not click.

## What browsers allow

- **Sound waits for a first gesture** on the page, in every browser. With `autoUnlock` (on by
  default) the first click or key press anywhere unlocks it ; no permission prompt is shown.
  `unlock()` does it by hand from a gesture, and `unlocked` says where it stands.
- 🚨 **A signal asked for while locked is dropped, never queued.** Outside a gesture, a browser may
  keep the audio waiting until a later click — and a beep that comes out then lies about what it
  means. The wait is cut after 200 ms.
- **Vibration exists on Android only.** An iPhone has none, and Chrome ignores it until the page
  was touched ; where it is missing the call is skipped. `supports` tells
  `{ audio , vibration }` after hydration, for a screen that would hide a setting the device
  cannot honour.
- **An iPhone's silent switch mutes Web Audio.** `ignoreSilentMode` (off by default) plays
  through it on Safari 17+ — it overrides a choice the user made, so it is the screen's to turn
  on, never the library's.

One audio context serves the whole page, created on the first unlock and never at import —
nothing runs on the server.

## One switch for the whole device

`FeedbackProvider` holds the device's settings : `{ sound , vibration , volume }`, with
`setSound`, `setVibration`, `setVolume` and `toggleSound`, read through `useFeedback()`.

🔑 **A master switch, never a second opinion.** A signal plays when the screen asks **and** the
settings allow it : a screen can silence what is on, never sound what was turned off. Sound and
vibration are switched apart ; the volume is the screen's when it names one, the device's
otherwise. The rule is a pure function, `helpers/audio/resolveFeedback`.

🔑 **Kept on the device, not the account.** The device is what makes the noise : a shared terminal
in a loud warehouse, a phone in a meeting. The settings live in `localStorage`, one key per
setting under the provider's `storageKey` — no cookie, nothing read on the server. Name the key
per application : two applications served from one origin would otherwise share it.

```jsx
<FeedbackProvider storageKey="my-app:feedback">
    <App />
</FeedbackProvider>
```

`ApplicationProviders` already mounts one — pass `feedbackStorageKey`. **Without a provider
nothing changes** : every signal plays as the screen asks, and `useFeedback()` returns `null`
rather than throwing.

### The switch in the interface

- **`SoundButton`** mutes and unmutes every signal on the device : a toggle button named after what
  pressing does, `aria-pressed` for whether it is down, a speaker or a speaker struck out. It
  renders nothing outside a provider.
- **`Navbar`** carries it as its `sound` control — **opt-in** : `controls={ { sound : true } }`.
  An application's navbar does not gain a button it never asked for.

## The building blocks

- `helpers/audio/playTones( context , tones , { volume } )` — the scheduling alone, one
  oscillator per tone ; `DEFAULT_SIGNALS` holds the three signals.
- `helpers/audio/sharedAudioContext` — `getAudioContext`, `resumeAudio`, `isAudioRunning`,
  `subscribeAudio`, `hasAudio` : the one context of the page, and whether it runs.
- `helpers/audio/resolveFeedback` — the master-switch rule, and `DEFAULT_VOLUME`.

## Seeing it run

`/components/signals` in the demo app — the master switch, the device state, the three signals,
one of your own — and every scanning scenario under `/scenarios/logistics`, where the
« Beep and vibration » switch turns the signals on.

# `locale` — translations

How an interface speaks the reader's language : the bundles, how a component reads its words,
the labels the library ships, the server side, numbers and dates — and the other half,
**data** written in several languages.

```jsx
import useI18n           from 'oihana-next-ui/contexts/locale/useI18n'
import NO_LOCALE         from 'oihana-next-ui/contexts/locale/noLocale'
import getLocaleFromI18n from 'oihana-next-ui/contexts/locale/helpers/getLocaleFromI18n'
import I18nText          from 'oihana-next-ui/components/i18n/I18nText'
import I18nMetas         from 'oihana-next-ui/components/i18n/I18nMetas'
```

Two contexts work together : `LangProvider` holds **which** language is chosen — a cookie and a
storage key, so the server knows it too — and `LocaleProvider` holds **the words** of that
language. Both sit in the stack `ApplicationProviders` mounts ; see
[setting up an application](../../display/application/README.md).

## Writing the bundles

A bundle is a tree, and its **leaves carry the languages** — at any depth :

```js
// locale/app/products.js
const products =
{
    fr : { title : 'Produits' , empty : 'Aucun produit.' } ,
    en : { title : 'Products' , empty : 'No product.' } ,
} ;
export default products ;
```

The files are assembled by folder into one tree, and `getLocaleFromI18n( tree , languages )`
turns it into one object per language — `{ fr : { app : { products : { title : 'Produits' … } } } , en : … }` —
which is what `LocaleProvider` receives :

```js
// locale/index.js
import getLocaleFromI18n from 'oihana-next-ui/contexts/locale/helpers/getLocaleFromI18n'
import components        from './components'
import app               from './app'
import languages         from '../configs/languages'

export default getLocaleFromI18n( { app , components } , languages ) ;
```

🔑 **One file per screen or component, both languages side by side.** A sentence and its
translation are edited together, and a key added in one language and forgotten in the other is
seen at once. The folder mirrors where the words are used — `app.products`, `demo.inputs.scan`,
`components.modal`.

⚠️ **Never name a key `then`.** An object carrying a `then` is a « thenable » : `await` and React's
`use` take it for a promise and try to call it. Biome flags it (`noThenProperty`) ; `sequence`,
`next`, `after` are safe.

## Reading the words

```jsx
const { empty , title } = useI18n( 'app.products' ) ;
```

`useI18n( path , defaultValue , throwable )` returns what sits at the dotted path in the current
language, re-rendering when the language changes. Two habits make components robust :

- **A component of the library reads with `NO_LOCALE` and no throw**, and carries its own English
  as the last resort : `const { close = 'Close' } = useI18n( path , NO_LOCALE , false ) ;` —
  it works without a provider, and without the bundle. `NO_LOCALE` is one frozen object, so
  every render passes the same reference.
- **A sentence with values is a pattern**, `'{0} items selected'`, filled with `fastformat` —
  the words stay in the bundle, the numbers come from the code.

`I18nText path="app.products" field="empty"` prints one string as a JSX child, and follows a
language switch instantly. Use it where a Server Component would otherwise resolve a string
once and hand it down frozen : the language toggle flips a cookie, nothing navigates, and that
string would never change.

`I18nMetas path="app.products"` keeps the document's `title` and `description` in the current
language, from the `title` and `description` keys at that path.

## The labels the library ships

Every component that names something — a close button, a stepper's « − », a refused file —
reads its words under `components.<family>` : `components.modal`, `components.pagination`,
`components.input.scan`, `components.media.dropzone`… The library ships them in French and
English. **Merge them into your own `components` entry rather than copying them**, so the keys
added upstream reach you when you upgrade :

```js
// locale/components/index.js
import components from 'oihana-next-ui/locale/components/index'
import auth       from './auth'                 // your own components

export default { ...components , auth } ;
```

A family you redefine replaces the library's as a whole. And each component takes its labels as
props too — `closeLabel`, `submitLabel`… — for the one screen that says it differently, or a
`path` to read a bundle of your own.

## On the server

A Server Component has no context. `initServerI18n( { locale , defaultLang , languages , metadatas } )`
(from `helpers/i18n/serverI18nConfig`), called once at the top of the root layout, hands the
bundles to the server side ; then :

```js
import getServerI18n      from 'oihana-next-ui/helpers/i18n/getServerI18n'
import getServerMetadatas from 'oihana-next-ui/helpers/i18n/getServerMetadatas'

export async function generateMetadata ()
{
    const i18n = await getServerI18n() ;
    const { title , description } = i18n( 'app.products' ) ;
    return { ...getServerMetadatas() , title , description } ;
}
```

`getServerI18n()` reads the language from the same `lang` cookie as `LangProvider`, so the
server's first render and the client's agree. Keep it for what only the server can do —
metadata, a redirect, a static page ; text a reader sees while switching languages belongs to
the client (`useI18n`, `I18nText`).

## Numbers and dates

The language picks the words ; the **locale** picks the conventions — `en` alone does not say
whether a thousand is written « 1,000 » in London or in New York. The configuration's `intl`
block maps one to the other, and sets the time zone every date is written in :

```js
intl :
{
    locales  : { en : 'en-GB' , fr : 'fr-FR' } ,
    timeZone : 'Europe/Paris' ,
} ,
```

`useNumberFormat()` gives `formatNumber`, `formatPercent`, `formatCompact` and the `locale`, bound
to the current language ; `useDateFormat()` does the same for dates. Outside the providers they
fall back to a default locale rather than throwing — a number is no reason to require a provider.

## Data in several languages

The interface is one thing ; **content** — a product's name, an article's text — is another, and
the library reads it in the schema.org way : a property is a string, or a map of languages.

- `helpers/i18n/getLocaleName`, `getLocaleDescription`, `getLocaleText`, `getLocaleHeadline`… read
  `name`, `description`, `text`… whether a plain string or `{ fr , en }`, with a fallback
  language.
- `I18nInput`, `I18nTextArea`, `I18nTextAreaMarkdown` edit such a field : one input, a flag per
  language to switch, a dot on the flags already filled — and **one value**, `{ fr , en }`, for
  the form.

## Seeing it run

Every page of the demo app is translated — switch the language in the navbar. The
[`src/@locale`](../../../src/@locale) folder of this repository is a full example of the layout
above, and `/components/typography` shows `I18nText` ; the inputs page shows `I18nInput`.

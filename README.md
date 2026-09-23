# Oihana Next UI

[![Oihana Next UI](https://raw.githubusercontent.com/BcommeBois/oihana-next-ui/refs/heads/main/assets/images/oihana-next-ui-logo-inline-512x160.png)](https://github.com/BcommeBois/oihana-next-ui)

A modular Next.js UI component library built with React 19, Tailwind CSS v4 and DaisyUI v5.

[![GitHub](https://img.shields.io/badge/GitHub-BcommeBois%2Foihana--next--ui-181717?style=flat-square&logo=github)](https://github.com/BcommeBois/oihana-next-ui) [![Demo](https://img.shields.io/badge/Demo-oihana--next--ui.vercel.app-000000?style=flat-square&logo=vercel)](https://oihana-next-ui.vercel.app/)

[![npm version](https://img.shields.io/npm/v/oihana-next-ui?style=flat-square)](https://www.npmjs.com/package/oihana-next-ui) [![npm downloads](https://img.shields.io/npm/dt/oihana-next-ui?style=flat-square)](https://www.npmjs.com/package/oihana-next-ui) [![License](https://img.shields.io/npm/l/oihana-next-ui?style=flat-square)](LICENSE)

## Features

- ⚛️ React 19 + Next.js 16
- 🎨 Tailwind CSS v4 + DaisyUI v5
- 🌙 Dark mode support (flash-free)
- 📱 PWA ready
- ♿ Accessible components
- 🧩 Composable and themeable

## Installation

```bash
bun add oihana-next-ui
# or
npm install oihana-next-ui
```

`next`, `react` and `react-dom` are **peer dependencies** : the library installs
none of them, your application provides them — in a single copy.

## Requirements

Your application must already depend on :

```json
{
  "react":     "^19.0.0",
  "react-dom": "^19.0.0",
  "next":      "^16.0.0"
}
```

## Usage

```jsx
import Picture   from 'oihana-next-ui/components/images/Picture'
import Button    from 'oihana-next-ui/components/Button'
import useThemes from 'oihana-next-ui/contexts/themes/useThemes'
```

Every component carries its own JSDoc — props, defaults and examples — and the live demos
sit under `/lab`. The [**wiki**](wiki/README.md) holds the long-form guides, one per group :
which component to reach for, and the recipes that span several of them. So far :
[`components/charts`](wiki/components/charts/README.md),
[`components/metrics`](wiki/components/metrics/README.md) and
[`components/scheduler`](wiki/components/scheduler/README.md).

### Scripts

Three build-time scripts ship with the package, as commands run from the root of
the host application :

| Command | What it writes |
|:--|:--|
| `oihana-inject-version` | `src/version.js`, `public/version.json` (`version` and the deployed `commit`) and `public/sw.js`, from `version` and the `pwa` block of your `package.json` (`offline`, `cachePrefix`) |
| `oihana-cache-size` | nothing — it reports the weight of `.next` and its Turbopack caches (`--all` for the full breakdown) |
| `oihana-generate-splash` | the iOS splash screens under `public/assets/splash` (`--bg`, `--landscape`, `--force`) ; requires `sharp` in the host |

```json
{
  "scripts": {
    "dev": "oihana-inject-version && next dev",
    "predev": "oihana-cache-size",
    "generate-splash": "oihana-generate-splash --bg \"#ffffff\""
  },
  "pwa": { "offline": true, "cachePrefix": "my-app" }
}
```

The service-worker templates come from the package, so a host keeps no copy of
its own.

### Default labels

Components read their labels — button names, tooltips, `aria-label`s — from the
host's i18n dictionary, under `components.<family>` (`components.modal`,
`components.pagination`, `components.buttons.theme`…). The library ships a
French / English bundle for each family ; merge them into your own `components`
entry rather than copying them, so keys added upstream reach you on upgrade :

```js
// @locale/components/index.js
import components from 'oihana-next-ui/locale/components/index' ;

import auth from './auth' ; // your own component bundles

export default { ...components , auth } ;
```

A family you redefine replaces the library's one as a whole.

### CSS

The base layer — the `theme-dark` variant, the `.z-*` / `.rotate-*` scales the
components use, `text-glow`, the heading scale, the fullscreen backdrop and the
scrollbar — ships as one file. No colour and no font live in it :

```css
/* globals.css */
@import 'tailwindcss' ;
@import 'oihana-next-ui/themes/base.css' ;
```

Some components require their stylesheet to be imported explicitly :

```css
/* Spinner styles */
@import 'oihana-next-ui/components/spinners/styles/battery.css';
```

### Tailwind CSS v4 plugins

With Tailwind CSS v4, plugins are registered directly in your CSS file :

```css
/* globals.css */
@import 'tailwindcss' ;

/* Oihana background patterns plugin */
@plugin 'oihana-next-ui/themes/plugins/background-patterns/index' ;

/* Oihana pattern craft plugin */
@plugin 'oihana-next-ui/themes/plugins/pattern-craft/index' ;
```

### DaisyUI themes

Each palette is a file of its own, next to the others — take one, or write your
own beside your `@plugin "daisyui"` block, which stays yours :

```css
/* globals.css */
@import 'oihana-next-ui/themes/daisyui/oihana.css' ;     /* oihana-ui-light / oihana-ui-dark */
@import 'oihana-next-ui/themes/daisyui/catppuccin.css' ; /* the four Catppuccin flavours */
```

## Development

Clone the repo and start the demo app :

```bash
git clone https://github.com/BcommeBois/oihana-next-ui
cd oihana-next-ui
bun install
bun dev
```

Open [http://localhost:3666](http://localhost:3666) to browse the component demos.

## Built with

- [Next.js](https://nextjs.org/) — React framework for production
- [React](https://fr.react.dev/) — UI library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) — Component library for Tailwind CSS
- [VEGAS Core JS](https://www.npmjs.com/package/vegas-js-core) — A set of libraries writing in Javascript and based on the ES6 standard.
- [React Icons](https://react-icons.github.io/react-icons/) — Popular icon packs as React components
- [Motion](https://motion.dev/) — Animation library
- [Maskito](https://maskito.dev/) — Input masking library
- [Day.js](https://day.js.org/) — Lightweight date library
- [Chroma.js](https://www.vis4.net/chromajs/) — Color manipulation library

## Release

The package publishes the raw `src/` tree (no build step) — see the `files` and `exports` fields in [`package.json`](./package.json).

### Versioning

This project follows [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH` (e.g. `1.2.3`).

| Type  | Command                 | Example             | When to use                                   |
|-------|-------------------------|---------------------|-----------------------------------------------|
| Patch | `bun run release:patch` | `0.1.46` → `0.1.47` | Bug fix, small tweak                          |
| Minor | `bun run release:minor` | `0.1.46` → `0.2.0`  | New component or feature, backward compatible |
| Major | `bun run release:major` | `0.1.46` → `1.0.0`  | Breaking change                               |

### Prerequisites

- Logged in to npm — `npm whoami` should print your username (otherwise `npm login`).
- **A second factor the registry accepts** — a publish is refused without one, whatever `npm whoami` says. See [Publishing credentials](#publishing-credentials).
- A git remote named `origin-ssh` configured (the `release` script pushes there with `--follow-tags`).
- A clean working tree, ideally — `release:*` will otherwise commit any pending change as `chore: prepare release` before bumping the version.

### Patch release walkthrough — e.g. `0.1.46` → `0.1.47`

1. **Update [`CHANGELOG.md`](./CHANGELOG.md)** — add a new section under `[Unreleased]` with the new version and date :

   ~~~markdown
   ## [0.1.47] — 2026-04-27

   **Components**
   - `XYZ` — what changed and why.
   ~~~

2. **Run the release script** :

   ```bash
   bun run release:patch
   ```

   What happens, in order — all of this is automatic :

   1. `stage` — commits any pending change as `chore: prepare release` (skipped if the working tree is clean).
   2. `npm version patch` — bumps `0.1.46` → `0.1.47` in `package.json`.
   3. `version` script (auto-run by `npm version`) :
      - `inject-version` writes the new version into `src/version.js` and `public/sw.js`,
      - `generate-exports` refreshes the `exports` field in `package.json`,
      - then stages `src/version.js`, `public/sw.js` and `package.json` for the version commit.
   4. `npm version` creates the release commit (`0.1.47`) and the matching git tag.
   5. `postversion` script (auto-run by `npm version`) → `release` :
      - `npm publish --access public` publishes to npm,
      - `git push origin-ssh --follow-tags` pushes the commit and the tag to GitHub.

### Publishing credentials

`npm profile get` prints what the account requires. With **`two-factor auth: auth-and-writes`**, every
publish needs a second factor, and there are two ways to give one.

**A one-time code**, from the authenticator registered on the account :

```bash
npm publish --access public --otp=123456
```

The code lives about thirty seconds — read it right before running the command.

**A granular access token that bypasses 2FA**, which is what a publish run from a script needs. On
npmjs.com → *Access Tokens* → *Generate New Token* → *Granular Access Token* :

- scope it to **this package alone**, permission **Read and write** — never « all packages » ;
- enable the option letting the token bypass two-factor authentication, or the publish is refused
  just the same ;
- set the longest expiry offered, **and write the date down** ;
- copy the token — it is shown once — into your own `~/.npmrc`, never the repository's :

  ```
  //registry.npmjs.org/:_authToken=npm_xxxxxxxx
  ```

🚨 **`npm login` overwrites the token.** Both write the SAME line of `~/.npmrc`, so signing in —
in any form, web included — replaces a granular token with an ordinary session token, which does
*not* bypass two-factor authentication. A publish that worked a minute earlier then fails with the
403 below, and nothing on screen connects the two. Once the token is installed, **do not run
`npm login` again** unless you mean to put the token back afterwards.

🚨 **A token expires, and the day it does the publish stops with an error that says nothing about
expiry.** It is the likeliest reason a release that worked last month fails today. Check the token's
date before looking anywhere else.

⚠️ npm is restricting bypass-2FA tokens — account changes since August 2026, direct publishing from
January 2027. An authenticator or a passkey is the answer that will still be there afterwards.

### When a publish fails

**The version has already been bumped by then.** `npm version` commits and tags *before* `postversion`
runs the publish, so a failed publish leaves `package.json`, `src/version.js`, the release commit and
the tag all correct and only the registry behind. **Do not run `release:*` again** — it would bump a
second time and leave an orphan tag. Fix the cause, then publish that same version on its own :

```bash
npm publish --access public
```

| What npm prints | What it means | What to do |
|:--|:--|:--|
| `E404 … Not Found - PUT` | **Not authenticated.** On a publish the registry answers 404 rather than 401, so it never reveals whether a package exists. The message is misleading on purpose. | `npm whoami` — it fails too. Then `npm login`. |
| `E403 … Two-factor authentication or granular access token with bypass 2fa enabled is required` | Authenticated, but no second factor was given. Either the token expired, or an `npm login` overwrote it. | See [Publishing credentials](#publishing-credentials) — and check that `~/.npmrc` still holds the granular token, not a session one. |
| `EPRIVATE … This package has been marked as private` | **You are in the wrong repository.** npm checks that flag before uploading anything, so nothing left the machine. | `npm pkg get name` before anything else. Leave the `private` flag where it is — it is a guard, and it just did its job. |
| `E403 … you do not have permission` | The account does not own the package, or the token's scope leaves it out. | `npm owner ls oihana-next-ui`, then check the token's package list. |

What the registry actually holds — the answer, not the attempt :

```bash
npm view oihana-next-ui version --prefer-online
```

`--prefer-online` matters : the local cache will otherwise happily show yesterday's version.

### Manual / pre-release version

Set a specific version manually — `version` + `postversion` still run as above :

```bash
npm version 1.0.0
```

Pre-release versions :

```bash
npm version prerelease --preid=alpha   # 0.1.46 → 0.1.47-alpha.0
npm version prerelease --preid=beta    # 0.1.46 → 0.1.47-beta.0
npm version prerelease --preid=rc      # 0.1.46 → 0.1.47-rc.0
```

## License

[Mozilla Public License 2.0](./LICENSE) — © Marc Alcaraz
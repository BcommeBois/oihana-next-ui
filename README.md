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

## Requirements

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

### CSS

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

### DaisyUI Catppuccin theme

```css
/* globals.css */
@import 'oihana-next-ui/themes/daisyui/catppuccin.css' ;
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
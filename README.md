# Oihana Next UI

![Oihana Next UI](https://raw.githubusercontent.com/BcommeBois/oihana-next-ui/refs/heads/main/assets/images/oihana-next-ui-logo-inline-512x160.png)

A modular Next.js UI component library built with React 19, Tailwind CSS v4 and DaisyUI v5.

[![npm version](https://img.shields.io/npm/v/oihana-next-ui?style=flat-square)](https://www.npmjs.com/package/oihana-next-ui)
[![npm downloads](https://img.shields.io/npm/dt/oihana-next-ui?style=flat-square)](https://www.npmjs.com/package/oihana-next-ui)
[![License](https://img.shields.io/npm/l/oihana-next-ui?style=flat-square)](LICENSE)

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

### Build the library

```bash
bun run build:lib
```

### Watch mode

```bash
bun run build:lib:watch
```

## Release

### Versioning

This project follows [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH` (e.g. `1.2.3`).

| Type | Command | Example | When to use |
|------|---------|---------|-------------|
| Patch | `bun run release:patch` | `0.1.0` → `0.1.1` | Bug fix, minor tweak |
| Minor | `bun run release:minor` | `0.1.0` → `0.2.0` | New component or feature, backward compatible |
| Major | `bun run release:major` | `0.1.0` → `1.0.0` | Breaking change |

Each script automatically bumps the version, builds the library, publishes to npm, and pushes the commit and tag to GitHub.

You can also set a specific version manually :

```bash
npm version 1.0.0
bun run release
```

Or a pre-release version :

```bash
npm version prerelease --preid=alpha   # 0.1.0 → 0.1.1-alpha.0
npm version prerelease --preid=beta    # 0.1.0 → 0.1.1-beta.0
npm version prerelease --preid=rc      # 0.1.0 → 0.1.1-rc.0
bun run release
```

`npm version` automatically updates `package.json`, creates a Git commit and a Git tag.

## License

[Mozilla Public License 2.0](./LICENSE) — © Marc Alcaraz
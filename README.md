# Oihana Next UI

![Oihana Next UI](https://raw.githubusercontent.com/BcommeBois/oihana-next-ui/refs/heads/main/assets/images/oihana-next-ui-logo-inline-512x160.png)

A modular Next.js UI component library built with React 19, Tailwind CSS v4 and DaisyUI v5.

## Features

- ⚛️ React 19 + Next.js 16
- 🎨 Tailwind CSS v4 + DaisyUI v5
- 🌙 Dark mode support (flash-free)
- 📱 PWA ready
- ♿ Accessible components
- 🧩 Composable and themeable

## Installation

```bash
bun add @oihana/next-ui
# or
npm install @oihana/next-ui
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
import Picture  from '@oihana/next-ui/components/images/Picture'
import Button   from '@oihana/next-ui/components/Button'
import useThemes from '@oihana/next-ui/contexts/themes/useThemes'
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

Build the library :

```bash
bun run build:lib
```

Watch mode during development :

```bash
bun run build:lib:watch
```

## License

[Mozilla Public License 2.0](./LICENSE) — © Marc Alcaraz
# Oihana Next UI — wiki

The long-form documentation : what a family of components is for, which one to reach for,
and the compositions that only make sense across several of them.

It lives here rather than in `src/` on purpose. **The source stays code** — the JSDoc in
each file is the API reference, and it is the only place props, defaults and examples are
written, since a second copy diverges within two commits. This wiki holds what no single
file can say : the shape of a group, and the recipes.

## Contents

### Components

- [`components/metrics`](components/metrics/README.md) — compact dashboard readings meant
  to sit inside a card or a table cell : category bar and bullet graph, bar list, tracker,
  sparkline, delta, legend.

## Conventions

- **One folder per group**, mirroring the path under `src/` — `components/metrics` here
  documents `src/components/metrics` there.
- **A `README.md` per group**, which GitHub renders on opening the folder. A group large
  enough to need it may add one page per component next to it ; nothing does yet.
- **English**, like the JSDoc and the changelog.
- **No props tables.** They are a copy of the JSDoc, and a copy is a thing that goes stale.
  Link to the source instead, and spend the space on the *why*.

## See also

- [`README.md`](../README.md) — install, requirements, Tailwind and DaisyUI setup, release.
- [`CHANGELOG.md`](../CHANGELOG.md) — what changed, and why it went that way.
- `/lab` in the demo app — every component, running.

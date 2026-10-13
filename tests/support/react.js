/**
 * Component tests run under Bun, which follows `jsconfig.json` (`"jsx" : "react"`,
 * the classic runtime) : compiled JSX calls a global `React`, that Next never
 * needs. Import this first in any test that renders a component.
 */
import React from 'react' ;

globalThis.React = React ;

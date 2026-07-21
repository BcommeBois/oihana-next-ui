import { createContext } from 'react' ;

/**
 * Signals that a navigation subtree is rendered inside a **paged**
 * (`menu-paged`) menu.
 *
 * When `true`, `Collapse` renders its `<details>` as **native and
 * uncontrolled** (starts closed, toggled by the browser on summary
 * click) instead of forcing it open (legacy) or reading the
 * `NavigationProvider`. This is what the DaisyUI `menu-paged` drill-down
 * needs: one level visible at a time, the open summary acting as a Back
 * button — all driven by CSS `:has(details[open])`.
 *
 * Defaults to `false`, so every existing menu (sidebar, persistence
 * demo) is unaffected.
 *
 * @type {React.Context<boolean>}
 */
const PagedContext = createContext( false ) ;

PagedContext.displayName = 'PagedContext' ;

export default PagedContext ;

'use client' ;

/**
 * `<ViewTransition>` and `addTransitionType`, reached so an older React degrades
 * rather than throws.
 *
 * Both landed in **React 19.3**. This library's peer range is `^19.0.0`, and a
 * named import of something a module does not export is `undefined` — rendering
 * `<undefined>` throws. Going through the namespace is what lets the feature
 * simply not be there.
 *
 * In a Next App Router application the React that runs is the one Next bundles,
 * not the one in `package.json` — Next 16.2 ships a 19.3 canary, so both are
 * available there whatever the declared version says. Outside that, they may
 * genuinely be missing, and the fallbacks below are what answers.
 *
 * @module helpers/react/viewTransition
 */

import * as React from 'react' ;

/**
 * Renders its children and nothing else. Used where `ViewTransition` is absent,
 * so the extra props are received and ignored rather than reaching a Fragment,
 * which would warn about every one of them.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {React.ReactNode}
 */
const PassThrough = ( { children } ) => children ;

/**
 * `React.ViewTransition` when the running React has it, a pass-through otherwise.
 * @type {React.ElementType}
 */
export const ViewTransition = React.ViewTransition ?? PassThrough ;

/**
 * `React.addTransitionType` when the running React has it, a no-op otherwise.
 * @type {( type: string ) => void}
 */
export const addTransitionType = React.addTransitionType ?? ( () => {} ) ;

/**
 * Whether the running React can actually animate a view transition.
 * @type {boolean}
 */
export const hasViewTransition = typeof React.ViewTransition !== 'undefined' ;

export default ViewTransition ;

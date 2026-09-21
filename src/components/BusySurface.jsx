'use client' ;

/**
 * BusySurface — the part of a screen that is being replaced, while it is being
 * replaced.
 *
 * Its content fades back, stops taking clicks and leaves the tab order, as long
 * as {@link module:contexts/busyNavigation/useBusyNavigation} says `busy`. That
 * is all it does : a spinner belongs to the control that started the navigation
 * — a pagination draws one beside its page label — and a second marker over the
 * data only makes the wait look worse than it is.
 *
 * 🚨 **`inert` rather than a `disabled` on each cell.** A dimmed table that still
 * takes clicks lets a reader open a row of the page they are leaving, or queue a
 * second navigation on top of the one in flight. `inert` takes the whole subtree
 * out of pointer events AND out of the tab order in one attribute.
 *
 * ⚠️ **`pointer-events-none` rides along**, and is not redundant : an `inert`
 * dropped by a renderer that does not know it fails SILENTLY, and a table that
 * looks disabled while it takes clicks is the worst of the three states.
 *
 * ⚠️ **Keep the controls OUTSIDE it.** A period, a search, the filters must stay
 * usable while a page loads — changing one's mind mid-wait is exactly what a
 * slow list invites.
 *
 * Outside a {@link module:contexts/busyNavigation/provider}, it is never busy.
 *
 * @module components/BusySurface
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children
 * @param {string}          [props.className] - Layout classes for the content.
 *
 * @returns {React.ReactElement}
 */

import cn from '../themes/helpers/cn' ;

import useBusyNavigation from '../contexts/busyNavigation/useBusyNavigation' ;

const BusySurface = ( { children , className } ) =>
{
    const { busy } = useBusyNavigation() ;

    return (
        <div
            aria-busy = { busy }
            className = { cn(
                'transition-opacity duration-200' ,
                className ,
                busy && 'pointer-events-none select-none opacity-40' ,
            ) }
            inert     = { busy }
        >
            { children }
        </div>
    ) ;
} ;

BusySurface.displayName = 'BusySurface' ;

export default BusySurface ;

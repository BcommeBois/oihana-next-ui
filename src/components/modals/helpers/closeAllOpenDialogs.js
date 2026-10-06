'use client' ;

/**
 * Closes every open `<dialog>` in the document, at once.
 *
 * ### 🔑 What it is for : the frame between a decision and a navigation
 *
 * A dialog outlives the decision that should have dismissed it. Told to leave
 * for a public page, the browser spends a few milliseconds starting that
 * navigation — and a modal sits on screen through all of them, over a page
 * the reader is no longer meant to be reading. Closing them first is what
 * makes the departure clean.
 *
 * Every modal in this library renders a native `<dialog>`, so one call covers
 * `Modal` and everything built on it. ⚠️ **A drop-in that is not a `<dialog>`
 * is not closed** — anything with its own overlay needs its own teardown,
 * wired into the same place this is called from.
 *
 * ⚠️ It closes them **without asking**. A dialog guarding unsaved work gets no
 * say, which is right before a forced departure and wrong anywhere else.
 *
 * Synchronous, idempotent, and safe to call on the server, where it returns
 * having done nothing. An individual `close()` that throws is swallowed, so
 * one awkward element cannot keep the others open.
 *
 * @module components/modals/helpers/closeAllOpenDialogs
 *
 * @returns {void}
 *
 * @example
 * ```js
 * closeAllOpenDialogs() ;
 * router.replace( '/signed-out' ) ;
 * ```
 */

const closeAllOpenDialogs = () =>
{
    if ( typeof document === 'undefined' ) { return ; }

    for ( const dialog of document.querySelectorAll( 'dialog[open]' ) )
    {
        try
        {
            dialog.close() ;
        }
        catch
        {
            // Swallowed on purpose : a match that is not an HTMLDialogElement,
            // a detached node, or an overridden close() must not stop the
            // iteration and leave the rest of them open.
        }
    }
} ;

export default closeAllOpenDialogs ;

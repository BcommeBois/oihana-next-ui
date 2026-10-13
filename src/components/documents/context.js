'use client' ;

/**
 * What a viewer tells its toolbar : where the reader is, how far it can zoom,
 * and the gestures it answers to. `PdfViewer` provides it ; `PdfToolbar` — or
 * a toolbar of the application's own, rendered inside the viewer — reads it.
 *
 * @module components/documents/context
 */

import { createContext , useContext } from 'react' ;

/**
 * @typedef {Object} PdfViewerState
 * @property {boolean} canZoomIn - Whether a step in is left.
 * @property {boolean} canZoomOut - Whether a step out is left.
 * @property {Function} download - Saves the document as a file.
 * @property {'width'|'page'|'none'} fit - How a page is sized at zoom 1.
 * @property {boolean} fullscreen - Whether the viewer fills the screen, natively or not.
 * @property {Function} goTo - `( page ) => void`, 1-based.
 * @property {Object} labels - The words of `components.document`.
 * @property {number} page - The page the reader is on, 1-based.
 * @property {number} pages - How many pages the document has, `0` until it is open.
 * @property {Function} print - Opens the document where the browser can print it.
 * @property {Function} setFit - `( fit ) => void`.
 * @property {Function} toggleFullscreen
 * @property {number} zoom - The zoom factor, `1` being fitted.
 * @property {Function} zoomIn
 * @property {Function} zoomOut
 */

/** @type {import('react').Context<?PdfViewerState>} */
const PdfViewerContext = createContext( null ) ;

/**
 * The state of the enclosing `PdfViewer`, or `null` outside one.
 *
 * @returns {?PdfViewerState}
 */
export const usePdfViewer = () => useContext( PdfViewerContext ) ;

export default PdfViewerContext ;

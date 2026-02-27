/**
 * Toast notification context.
 *
 * @module contexts/toasts/context
 */

import { createContext } from 'react' ;

/**
 * @typedef {Object} Toast
 * @property {string} id - Unique toast identifier.
 * @property {string} message - Toast message content.
 * @property {string | null} level - Toast level (success, error, warning, info).
 * @property {Object} options - Additional toast options.
 */

/**
 * @typedef {Object} ToastContextValue
 * @property {Toast[]} toasts - Active toasts.
 * @property {() => void} clearAllToasts - Remove all toasts.
 * @property {(id: string) => () => void} closeToast - Close a specific toast.
 * @property {(id: string, message: string, level?: string | null, options?: Object) => void} openToast - Open a new toast.
 */

const ToastContext = createContext( /** @type {ToastContextValue | null} */ ( null ) ) ;

ToastContext.displayName = 'ToastContext' ;

export default ToastContext ;
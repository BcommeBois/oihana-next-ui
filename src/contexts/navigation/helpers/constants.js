/**
 * Navigation collapse persistence constants.
 *
 * @module contexts/navigation/helpers/constants
 */

/**
 * Default-mode identifiers for collapse open/closed state.
 *
 * - `OPEN`   — every collapse starts open (current legacy behaviour).
 * - `CLOSED` — every collapse starts closed.
 * - `AUTO`   — open when a descendant matches the current pathname,
 *              closed otherwise.
 *
 * @type {Readonly<{ OPEN: 'open', CLOSED: 'closed', AUTO: 'auto' }>}
 */
export const COLLAPSE_MODES = Object.freeze
({
    OPEN   : 'open' ,
    CLOSED : 'closed' ,
    AUTO   : 'auto' ,
}) ;

/**
 * Allowed values for the `defaultMode` prop of `NavigationProvider`.
 *
 * @type {ReadonlyArray<'open' | 'closed' | 'auto'>}
 */
export const COLLAPSE_MODE_VALUES = Object.freeze
([
    COLLAPSE_MODES.OPEN ,
    COLLAPSE_MODES.CLOSED ,
    COLLAPSE_MODES.AUTO ,
]) ;

/**
 * Default mode used when `NavigationProvider` does not receive an explicit
 * `defaultMode`. Matches the legacy behaviour of `<details open>`.
 */
export const DEFAULT_COLLAPSE_MODE = COLLAPSE_MODES.OPEN ;

/**
 * Schema version of the payload written to `localStorage`.
 * Bump when the on-disk shape changes — older payloads are then ignored
 * silently rather than throwing or surfacing stale state.
 */
export const COLLAPSE_STATE_VERSION = 1 ;

/**
 * Key inside the persisted JSON payload that holds the per-id boolean map.
 * Centralised here so the storage helpers and any future migration code
 * agree on the same string.
 */
export const COLLAPSE_STATE_ITEMS_KEY = 'items' ;

/**
 * Key inside the persisted JSON payload that holds the schema version.
 */
export const COLLAPSE_STATE_VERSION_KEY = 'v' ;

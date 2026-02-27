/**
 * Small helper to execute a function in the next micro-tick.
 */
const postpone = fn => Promise.resolve().then( fn )  ;

export default postpone ;
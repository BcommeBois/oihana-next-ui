/**
 * Tells every shallow parameter on screen that the address bar just moved.
 *
 * 🚨 **The problem it exists for.** A shallow write is
 * `window.history.replaceState`, and that call announces NOTHING : no
 * `popstate`, no router update — by design, since the whole point is not to
 * disturb the page. But a control reading the same parameter through
 * {@link module:hooks/useShallowParam} owns its own copy of the value, and
 * nothing told it to look again : it kept showing the old one until a reload or
 * a Back happened to re-sync it. Two controls over ONE parameter — which is the
 * reason such state lives in the address rather than in a component — could not
 * work.
 *
 * So the write announces itself, on an event of our own. The announcement
 * carries no value : whoever hears it re-reads the address bar, which is the one
 * place the truth lives, and that is what every instance already does on
 * `popstate`.
 *
 * ⚠️ **Never a synthetic `popstate`.** Next's router listens to it and would
 * read a sort as the browser's Back button : the page would navigate, which is
 * exactly what a shallow write exists to avoid.
 *
 * @module helpers/routes/shallowParamEvents
 */

/**
 * The event a shallow write dispatches on `window`. Exported so a screen that
 * rewrites the address in place by its own means can join in, and so a test can
 * name it.
 *
 * @type {string}
 */
export const SHALLOW_PARAM_EVENT = 'oihana:shallow-param' ;

/**
 * Announces a shallow write to the rest of the page.
 *
 * @param {string} [name] - The parameter written. Carried for debugging only : a listener re-reads the address instead of trusting it.
 * @returns {void}
 */
export const notifyShallowParam = ( name ) =>
{
    if ( typeof window === 'undefined' ) { return ; }

    window.dispatchEvent( new CustomEvent( SHALLOW_PARAM_EVENT , { detail : { name } } ) ) ;
} ;

/**
 * Listens for every move of the address the listener did not make itself : the
 * browser's Back button, and another control's shallow write.
 *
 * @param {Function} listener - Called with no useful argument : re-read the address.
 * @returns {Function} The unsubscribe, ready to be returned from an effect.
 */
export const subscribeShallowParam = ( listener ) =>
{
    if ( typeof window === 'undefined' ) { return () => {} ; }

    window.addEventListener( 'popstate' , listener ) ;
    window.addEventListener( SHALLOW_PARAM_EVENT , listener ) ;

    return () =>
    {
        window.removeEventListener( 'popstate' , listener ) ;
        window.removeEventListener( SHALLOW_PARAM_EVENT , listener ) ;
    } ;
} ;

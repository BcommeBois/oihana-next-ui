/**
 * Subscribe to storage changes (for useSyncExternalStore).
 * @param {function} callback - Callback on storage change.
 * @returns {function} Unsubscribe function.
 */
const subscribeStorage = callback =>
{
    window.addEventListener( 'storage' , callback ) ;

    return () => window.removeEventListener( 'storage' , callback ) ;
} ;


export default subscribeStorage ;
/**
 * The sentence that explains why an outbox item did not leave : the app's own
 * words for the API's code first (`reasons`), then the library's for what the
 * library knows (no network, timeout, too many attempts, a full device, a
 * failed dependency), then the server's message, then a default.
 *
 * @param {Object} item - An outbox item.
 * @param {Object} [options]
 * @param {Object<string, string>} [options.errors={}] - The library's words, by code (`components.outbox.errors`).
 * @param {Object<string, string>} [options.reasons={}] - The app's words, by API code (`unit_already_consumed` → « Colis déjà expédié »).
 * @returns {?string} `null` when there is nothing to explain.
 *
 * @example
 * outboxErrorText( item , { errors : labels.errors , reasons : { location_unknown : 'Emplacement inconnu' } } ) ;
 */
const outboxErrorText = ( item , { errors = {} , reasons = {} } = {} ) =>
{
    if ( item?.status === 'blocked' )
    {
        return errors.blocked ?? null ;
    }

    const error = item?.lastError ;

    if ( !error )
    {
        return null ;
    }

    if ( error.code && reasons[ error.code ] )
    {
        return reasons[ error.code ] ;
    }

    if ( error.exhausted && errors.exhausted )
    {
        return errors.exhausted ;
    }

    if ( error.code && errors[ error.code ] )
    {
        return errors[ error.code ] ;
    }

    return error.message || errors.unknown || null ;
} ;

export default outboxErrorText ;

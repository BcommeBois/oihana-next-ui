import notEmpty from 'vegas-js-core/src/strings/notEmpty' ;

/**
 * Extracts an error message from various sources.
 *
 * Resolution order:
 * 1. `children` (direct content)
 * 2. `error` (string or Error object)
 * 3. `errors[name]` (form errors by field name)
 * 4. `defaultLabel` (fallback)
 *
 * @param {Object} [props]
 * @param {React.ReactNode} [props.children] - Direct content override.
 * @param {string | Error} [props.error] - Error string or Error object.
 * @param {Object.<string, string | Error>} [props.errors] - Form errors map.
 * @param {string} [props.defaultLabel] - Fallback label.
 * @param {string} [props.name] - Field name to lookup in errors.
 *
 * @returns {React.ReactNode | string | undefined} The resolved error message.
 *
 * @example
 * ```js
 * // Direct children
 * getErrorMessage( { children: 'Custom error' } ) ;
 * // → 'Custom error'
 *
 * // Error string
 * getErrorMessage( { error: 'Invalid email' } ) ;
 * // → 'Invalid email'
 *
 * // Error object
 * getErrorMessage( { error: new Error( 'Failed' ) } ) ;
 * // → 'Failed'
 *
 * // Form errors
 * getErrorMessage( { errors: { email: 'Required' } , name: 'email' } ) ;
 * // → 'Required'
 *
 * // Fallback
 * getErrorMessage( { defaultLabel: 'Unknown error' } ) ;
 * // → 'Unknown error'
 * ```
 */
const getErrorMessage = ( { children , error , errors , defaultLabel , name } = {} ) =>
{
    if ( children )
    {
        return children ;
    }

    if ( error )
    {
        if ( notEmpty( error ) )
        {
            return error ;
        }

        if ( error.message )
        {
            return error.message ;
        }
    }

    const fieldError = errors?.[ name ] ;

    if ( fieldError )
    {
        if ( notEmpty( fieldError ) )
        {
            return fieldError ;
        }

        if ( notEmpty( fieldError.message ) )
        {
            return fieldError.message ;
        }
    }

    return defaultLabel ;
} ;

export default getErrorMessage ;
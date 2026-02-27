import isURL from 'validator/es/lib/isURL'

import isMailTo  from './isMailTo' ;
import isTelLink from './isTelLink'

/**
 * Indicates if the passed-in string expression is a valid url (https://, mailto:, tel:, etc.).
 * @param expression
 * @param options
 * @returns boolean
 */
const isLink = ( expression ,
{
    emailOptions ,
    hasEmail= true ,
    hasTelephone= true ,
    telephoneLocale ,
    telephoneOptions ,
    urlOptions :
    {
        allow_trailing_dot= false ,
        allow_protocol_relative_urls= false ,
        protocols= ['http','https' ] ,
        require_protocol= true ,
        require_tld = false ,
        ...rest
        // allow_fragments = true,
        // allow_query_components = true,
        // allow_trailing_dot = false,
        // allow_underscores = false,
        // disallow_auth = false,
        // require_host = true,
        // require_port = false,
        // require_valid_protocol = true,
        // host_whitelist = false ,
        // host_blacklist = false ,
        // validate_length = true
    } = {} ,
}
= {} ) =>
{
    return isURL( expression , { protocols, allow_protocol_relative_urls , require_protocol, require_tld , ...rest } )
        || ( hasEmail     && isMailTo  ( expression , emailOptions ) )
        || ( hasTelephone && isTelLink ( expression , telephoneLocale , telephoneOptions) ) ;
}

export default isLink ;
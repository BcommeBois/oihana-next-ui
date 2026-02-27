import isEmail from 'validator/es/lib/isEmail'

/**
 * Indicates if the passed-in string expression is a valid mailto: url (ex: 'mailto:email@domain.ext').
 * @param expression
 * @param options
 * @returns boolean
 */
const isMailTo = ( expression , options ) =>
{
    expression = expression?.split(':') ;
    const [ prefix , email ] = expression ;
    return expression.length === 2 && prefix === 'mailto' && isEmail( email , options ) ;
}

export default isMailTo ;
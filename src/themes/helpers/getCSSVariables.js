import camelCase from 'vegas-js-core/src/strings/camelCase'
import kebabCase from 'vegas-js-core/src/strings/kebabCase'
import notEmpty  from 'vegas-js-core/src/strings/notEmpty'

/**
 * Get an object with a set of css variables.
 * @param props
 * @param variables
 * @param prefix
 * @param suffix
 * @return {*}
 */
const getCSSVariables = ( props , variables , { prefix = '---' , suffix = '' } = {} ) => variables.reduce( ( accessor , key ) =>
{
    key = notEmpty(key) ? camelCase(key) : null ;
    if ( !!key && props?.[key] )
    {
        accessor[ `${ prefix }${ kebabCase(key) }${ suffix }`] = props[ key ];
    }
    return accessor ;
}, {});

export default getCSSVariables ;
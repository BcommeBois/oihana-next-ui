'use client' ;

/**
 * Build Next.js Image props.
 *
 * @param {Object} options
 * @param {string} options.alt - Alt text
 * @param {string} options.imageClasses - Image class names
 * @param {boolean} options.fill - Fill mode
 * @param {number} [options.width] - Image width
 * @param {number} [options.height] - Image height
 * @param {string} options.objectFit - Object fit value
 * @param {Function} options.onLoad - Load callback
 * @param {string|import('next/image').StaticImageData} options.source - Image source
 * @param {boolean} options.priority - Priority loading
 * @param {string} options.loading - Loading strategy
 * @param {Object} options.rest - Additional props
 *
 * @returns {Object} Image component props
 */
const buildImageProps =
({
    alt ,
    imageClasses ,
    fill ,
    width ,
    height ,
    objectFit ,
    onLoad ,
    source ,
    priority ,
    loading ,
    rest ,
}) =>
{
    /** @type {any} */
    const props =
    {
        alt       : alt ,
        src       : source ,
        className : imageClasses ,
        onLoad    : onLoad ,
        ...rest ,
    } ;

    // Fill mode (responsive)
    if ( fill )
    {
        props.fill  = true ;
        props.style = { objectFit } ;
    }
    // Fixed dimensions mode
    else
    {
        props.width  = width ;
        props.height = height ;
    }

    // Priority vs lazy loading
    if ( priority )
    {
        props.priority = true ;
    }
    else
    {
        props.loading = loading ;
    }

    return props ;
} ;

export default buildImageProps ;
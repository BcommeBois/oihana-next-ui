'use client' ;

import Image from 'next/image' ;

import cn from '../../themes/helpers/cn' ;

/**
 * @typedef {Object} ThemedImageProps
 * @property {string} [alt='Image'] - Alt text for the image.
 * @property {string} [className] - CSS class name.
 * @property {string | import('next/image').StaticImageData} src - Light mode image source.
 * @property {string | import('next/image').StaticImageData} [dark] - Optional dark mode image source.
 * @property {boolean} [preload=false] - Preload the image.
 */

/**
 * Generic image component with automatic dark mode support.
 *
 * @param {Object} props
 * @param {string} [props.alt='Image'] - Alt text.
 * @param {string} [props.className] - CSS class name.
 * @param {string | import('next/image').StaticImageData} props.src - Light mode source.
 * @param {string | import('next/image').StaticImageData} [props.dark] - Dark mode source.
 * @param {boolean} [props.preload=false] - Preload the image.
 *
 * @returns {React.ReactElement}
 */

const ThemedImage =
({
   alt       = 'Image' ,
   className ,
   src ,
   dark ,
   preload   = false ,
   ...rest
}) =>
{
    if ( !dark )
    {
        return (
            <Image
                className = { className }
                src       = { src }
                alt       = { alt }
                { /** @type {any} */ ...rest }
            />
        ) ;
    }

    return (
        <>
            <Image
                className = { cn( className , 'theme-dark:hidden' ) }
                src       = { src }
                alt       = { alt }
                { /** @type {any} */ ...rest }
            />
            <Image
                className = { cn( className , 'hidden theme-dark:block' ) }
                src       = { dark }
                alt       = { alt }
                { /** @type {any} */ ...rest }
            />
        </>
    ) ;
} ;

export default ThemedImage ;
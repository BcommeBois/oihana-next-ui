'use client' ;

/**
 * Responsive container that constrains content width.
 *
 * @module display/Container
 */

import cn from '@/themes/helpers/cn' ;

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content.
 * @param {string} [props.className] - Additional classes.
 * @param {string} [props.maxWidth='max-w-5xl'] - Max width constraint.
 */
const Container = ({ children , className , maxWidth = 'max-w-5xl' }) =>
{
    const classNames = cn
    (
        'w-full mx-auto' ,
        maxWidth ,
        className ,
    ) ;

    return (
        <div className={ classNames }>
            { children }
        </div>
    ) ;
} ;

export default Container ;
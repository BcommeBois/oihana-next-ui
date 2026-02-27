/**
 * Markdown media renderers (img, table, hr).
 *
 * @module components/typography/markdown/renderers/media
 */

import Image from 'next/image' ;

export const img = props =>
{
    if ( !props.src || props.src.trim() === '' )
    {
        return null ;
    }

    if ( props.src?.startsWith( 'http' ) )
    {
        return (
            <img
                src       = { props.src }
                alt       = { props.alt || '' }
                className = "rounded-lg my-4 max-w-full h-auto"
            />
        ) ;
    }

    return (
        <Image
            src       = { props.src }
            alt       = { props.alt || '' }
            width     = { 800 }
            height    = { 600 }
            className = "rounded-lg my-4 max-w-full h-auto"
        />
    ) ;
} ;

export const table = props =>
(
    <div className="overflow-x-auto my-4">
        <table className="table table-zebra">
            { props.children }
        </table>
    </div>
) ;

export const hr = () =>
(
    <hr className="my-8 border-base-300" />
) ;
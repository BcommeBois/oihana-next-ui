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

    const className = "rounded-lg max-w-full h-auto inline-block align-middle" ;

    if ( props.src?.startsWith( 'http' ) )
    {
        return (
            <img
                src       = { props.src }
                alt       = { props.alt || '' }
                className = { className}
            />
        ) ;
    }

    return (
        <Image
            src       = { props.src }
            alt       = { props.alt || '' }
            width     = { 800 }
            height    = { 600 }
            className = { className }
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
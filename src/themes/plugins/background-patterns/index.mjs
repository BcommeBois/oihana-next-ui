import plugin from 'tailwindcss/plugin' ;

import definitions from './patterns' ;

/**
 * Tailwind CSS v4 plugin for SVG background patterns.
 *
 * Uses `currentColor` via CSS `mask-image` — control pattern color with `text-{color}`.
 *
 * @example
 * ```jsx
 * <div className="relative text-blue-500/20 pattern-architect" />
 * ```
 */
const backgroundPatterns = plugin( ( { addUtilities } ) =>
{
    const utilities = {} ;

    for ( const { name , svg , size: { width , height } = {} } of definitions )
    {
        utilities[ `.pattern-${ name }` ] =
        {
            'position' : 'relative' ,
            'isolation' : 'isolate' ,

            '&::after' :
            {
                'content'              : '""' ,
                'position'             : 'absolute' ,
                'inset'                : '0' ,
                'z-index'              : '-1' ,
                'pointer-events'       : 'none' ,
                'background-color'     : 'currentColor' ,
                '-webkit-mask-image'   : svg ,
                'mask-image'           : svg ,
                '-webkit-mask-size'    : `${ width }px ${ height }px` ,
                'mask-size'            : `${ width }px ${ height }px` ,
                '-webkit-mask-repeat'  : 'repeat' ,
                'mask-repeat'          : 'repeat' ,
            } ,
        } ;
    }

    addUtilities( utilities ) ;
} ) ;

export default backgroundPatterns ;
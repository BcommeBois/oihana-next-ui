import { Fragment } from 'react' ;

import cn from '../themes/helpers/cn' ;

import getKbdClasses from '../themes/components/kbd' ;

/**
 * Kbd — a key of the keyboard, or a short code typed by hand.
 *
 * Renders the HTML `<kbd>` element styled by daisyUI.
 *
 * 🔑 **A combination is a `<kbd>` of `<kbd>`s.** With `keys`, every key gets
 * its own styled element, and the whole combination is wrapped in an outer,
 * unstyled `<kbd>` : that nesting is how HTML says « press these together »,
 * where a row of loose keys only says « here are some keys ». The separator is
 * plain text between them, so a screen reader reads « Ctrl plus K ».
 *
 * ⚠️ **An icon separator is silent.** A screen reader reads a text separator,
 * but reads nothing for an icon : « Alt Tab », the « plus » gone. Pair the
 * icon with visually hidden text (see the example). An emoji is read by its
 * Unicode name (« heavy plus sign »), which is seldom what is meant.
 *
 * `keys` wins over `children` when both are given. Renders nothing when there
 * is no key at all.
 *
 * @module components/Kbd
 * @see https://daisyui.com/components/kbd
 *
 * @example
 * ```jsx
 * // One key
 * <Kbd>Esc</Kbd>
 *
 * // A size
 * <Kbd size="lg">Enter</Kbd>
 *
 * // A combination
 * <Kbd keys={ [ '⌘' , 'K' ] } />
 *
 * // A sequence, with its own separator
 * <Kbd keys={ [ 'G' , 'H' ] } separator="then" size="sm" />
 *
 * // An icon separator, with the words a screen reader needs
 * <Kbd
 *     keys      = { [ 'Alt' , 'Tab' ] }
 *     separator = { <><MdAdd aria-hidden="true" /><span className="sr-only">plus</span></> }
 * />
 * ```
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - The key, when there is a single one.
 * @param {string} [props.className] - Additional classes : on the key, or on the outer element of a combination.
 * @param {string} [props.keyClassName] - Additional classes on every key of a combination.
 * @param {React.ReactNode[]} [props.keys] - The keys of a combination, in the order they are pressed.
 * @param {React.ReactNode} [props.separator='+'] - What sits between two keys of a combination.
 * @param {string} [props.separatorClassName] - Additional classes on the separator.
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} [props.size] - The key size. Left out, daisyUI's own default (md).
 */
const Kbd =
({
    children ,
    className ,
    keyClassName ,
    keys ,
    separator = '+' ,
    separatorClassName ,
    size ,

    ...rest
}) =>
{
    if ( Array.isArray( keys ) && keys.length > 0 )
    {
        return (
            <kbd className={ cn( 'inline-flex items-center gap-1 align-middle' , className ) } { ...rest }>
                { keys.map( ( key , index ) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: keys repeat in a sequence (G then G), the position is their identity
                    <Fragment key={ index }>
                        { index > 0 && (
                            <span className={ cn( 'text-sm' , separatorClassName ) }>
                                { separator }
                            </span>
                        ) }
                        <kbd className={ getKbdClasses({ size , className : keyClassName }) }>
                            { key }
                        </kbd>
                    </Fragment>
                ) ) }
            </kbd>
        ) ;
    }

    if ( children === null || children === undefined || children === '' )
    {
        return null ;
    }

    return (
        <kbd className={ getKbdClasses({ size , className }) } { ...rest }>
            { children }
        </kbd>
    ) ;
} ;

Kbd.displayName = 'Kbd' ;

export default Kbd ;

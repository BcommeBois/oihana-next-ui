'use client' ;

/**
 * Accordion component for DaisyUI 5.
 *
 * A data-driven wrapper over {@link Collapse}: shows/hides a list of items,
 * with only one open at a time by default. It builds one `Collapse` per item
 * and, in exclusive mode, wires them together through a shared radio `name`
 * (auto-generated with `useId`, so multiple accordions on the same page never
 * clash). Set `allowMultiple` to let several items stay open independently.
 *
 * @module components/layouts/Accordion
 * @see https://daisyui.com/components/accordion
 *
 * @example
 * ```jsx
 * <Accordion
 *     icon="arrow"
 *     items={[
 *         { id: 'a', title: 'How do I create an account?', content: 'Click Sign Up…', defaultOpen: true } ,
 *         { id: 'b', title: 'I forgot my password.',       content: 'Click Forgot Password…' } ,
 *     ]}
 * />
 *
 * // Independent items (several open), joined together
 * <Accordion allowMultiple join icon="plus" items={ items } />
 * ```
 */

import { useId } from 'react' ;

import cn from '../../themes/helpers/cn' ;

import Collapse , { CHECKBOX , RADIO } from './Collapse' ;

/**
 * @param {Object} props
 * @param {string} [props.className] - Additional classes for the wrapper.
 * @param {boolean} [props.allowMultiple=false] - Allow several items open at once (checkbox mode) instead of one-at-a-time (radio).
 * @param {string} [props.contentClassName] - Additional classes for each item content.
 * @param {import('../../themes/components/collapse').CollapseIcon} [props.icon] - Icon type ('arrow' or 'plus'), applied to every item.
 * @param {string} [props.itemClassName] - Additional classes for each item container.
 * @param {Array<{ id?: string, title: import('react').ReactNode, content: import('react').ReactNode, defaultOpen?: boolean, disabled?: boolean, className?: string }>} [props.items] - Accordion entries.
 * @param {boolean} [props.join=false] - Join items together (shared border radius via `join-item`).
 * @param {string} [props.name] - Radio group name (defaults to an auto-generated id; exclusive mode only).
 * @param {string} [props.titleClassName] - Additional classes for each item title.
 * @returns {React.JSX.Element}
 */
const Accordion =
({
    className ,
    allowMultiple = false ,
    contentClassName ,
    icon ,
    itemClassName ,
    items ,
    join = false ,
    name ,
    titleClassName ,
}) =>
{
    const autoName  = useId() ;
    const groupName = name ?? autoName ;

    const wrapperClasses = cn(
        join ? 'join join-vertical' : 'flex flex-col gap-2' ,
        className ,
    ) ;

    const baseItemClasses = join
        ? 'join-item border border-base-300'
        : 'bg-base-100 border border-base-300' ;

    if ( !Array.isArray( items ) || items.length === 0 )
    {
        return null ;
    }

    return (
        <div className={ wrapperClasses }>
        {
            items.map( ( { id , title , content , defaultOpen , disabled , className : itemCls } = {} , index ) => (
                <Collapse
                    key              = { id ?? `item-${ index }` }
                    className        = { cn( baseItemClasses , itemClassName , itemCls ) }
                    contentClassName = { cn( 'text-sm' , contentClassName ) }
                    defaultChecked   = { !!defaultOpen }
                    disabled         = { disabled }
                    icon             = { icon }
                    mode             = { allowMultiple ? CHECKBOX : RADIO }
                    name             = { allowMultiple ? undefined : groupName }
                    title            = { title }
                    titleClassName   = { cn( 'font-semibold' , titleClassName ) }
                >
                    { content }
                </Collapse>
            ) )
        }
        </div>
    ) ;
} ;

Accordion.displayName = 'Accordion' ;

export default Accordion ;

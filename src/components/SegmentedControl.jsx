'use client' ;

/**
 * SegmentedControl — two or three joined buttons choosing HOW the same
 * content is read : a running total or a month by month, a week or a day.
 *
 * 🔑 **It is not a tab bar, and the difference is not cosmetic.**
 * {@link module:components/tabs/Tabs} implements the WAI-ARIA tabs pattern —
 * `role="tablist"`, `aria-selected`, roving focus, panels — which describes a
 * set of PANELS one of which is shown. A segmented control has no panel : it
 * changes a reading in place. Its correct shape is a group of toggles,
 * `role="group"` with `aria-pressed` on each button, and that is what this
 * renders.
 *
 * 🚨 **`aria-pressed` is not optional.** Without it the group is three
 * ordinary buttons, none of which announces being the chosen one — the
 * control works for a reader who can see the highlight and for nobody else.
 *
 * Controlled only : the choice belongs to the screen, which usually keeps it
 * in the url or in its own state.
 *
 * @module components/SegmentedControl
 *
 * @example
 * ```jsx
 * const [ view , setView ] = useState( 'cumulative' ) ;
 *
 * <SegmentedControl
 *     items    = { [ { key : 'cumulative' , label : 'Running total' } ,
 *                    { key : 'monthly'    , label : 'By month' } ] }
 *     onChange = { setView }
 *     value    = { view }
 * />
 * ```
 */

import getButtonClassNames from '../themes/components/button' ;
import cn                  from '../themes/helpers/cn' ;

/**
 * @typedef {Object} SegmentedItem
 * @property {boolean}         [disabled] - A choice shown but not offered.
 * @property {string|number}   key        - What `onChange` is called with.
 * @property {React.ReactNode} label      - What the button reads.
 * @property {string}          [title]    - An accessible name, when the label is an icon alone.
 */

/**
 * @param {Object}   props
 * @param {string}   [props.activeColor='primary'] - The colour of the chosen segment. `null` keeps daisyUI's plain active look.
 * @param {string}   [props.ariaLabel]             - What the group is, for a reader who cannot see it.
 * @param {string}   [props.className]             - Additional class names for the group.
 * @param {SegmentedItem[]} [props.items=[]]       - The choices, in the order they are shown.
 * @param {string}   [props.itemClassName]         - Additional class names for every segment.
 * @param {Function} [props.onChange]              - Called with the key of the segment that was pressed.
 * @param {import('../themes/components/button').ButtonSize} [props.size='sm']
 * @param {string|number} [props.value]            - The key of the chosen segment.
 */
const SegmentedControl =
({
    activeColor = 'primary' ,
    ariaLabel ,
    className ,
    items = [] ,
    itemClassName ,
    onChange ,
    size = 'sm' ,
    value ,
}) =>
{
    if ( items.length === 0 ) { return null ; }

    return (
        // biome-ignore lint/a11y/useSemanticElements: `<fieldset>` groups FORM CONTROLS, and these are toggle buttons changing a reading — it would also drag the element's own box model into a daisyUI `join`, whose children must sit flush. `role="group"` on a div is what WAI-ARIA defines for this.
        <div aria-label={ ariaLabel } className={ cn( 'join' , className ) } role="group">
            { items.map( ( { disabled , key , label , title } ) =>
            {
                const chosen = key === value ;

                return (
                    <button
                        aria-label   = { title }
                        aria-pressed = { chosen }
                        className    = { getButtonClassNames
                        ({
                            active    : chosen ,
                            className : itemClassName ,
                            color     : chosen ? activeColor : undefined ,
                            disabled ,
                            size ,
                            after     : { 'join-item' : true } ,
                        }) }
                        disabled = { disabled }
                        key      = { key }
                        onClick  = { () => onChange?.( key ) }
                        type     = "button"
                    >
                        { label }
                    </button>
                ) ;
            } ) }
        </div>
    ) ;
} ;

SegmentedControl.displayName = 'SegmentedControl' ;

export default SegmentedControl ;

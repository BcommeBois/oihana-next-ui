'use client' ;

import { Fragment , useEffect , useId , useRef } from 'react' ;

import useValue from '../../hooks/useValue' ;

import
{
    getTabClasses ,
    getTabContentClasses ,
    getTabsClasses ,
}
from '../../themes/components/tab' ;

/**
 * @typedef {'automatic' | 'manual'} TabsActivation
 */

export const AUTOMATIC = 'automatic' ;
export const MANUAL    = 'manual' ;

/**
 * Resolves the key of an item — its `id` when it has one, its index otherwise.
 *
 * @param {Object} item
 * @param {number} index
 * @returns {string|number}
 */
const keyOf = ( item , index ) => item?.id ?? index ;

/**
 * @typedef {Object} TabItem
 * @property {string} [id] - Stable key. Falls back to the item index.
 * @property {React.ReactNode} [label] - Tab label.
 * @property {React.ReactNode} [icon] - Leading icon element.
 * @property {React.ReactNode} [content] - Panel content. When no item carries one, no panel is rendered at all and the component is a plain tab bar.
 * @property {boolean} [disabled] - Greys the tab out and skips it in keyboard navigation.
 * @property {string} [className] - Extra class names for the tab itself.
 */

/**
 * Accessible tabs built on DaisyUI's `tabs`.
 *
 * Implements the WAI-ARIA tabs pattern : `role="tablist"` / `tab` / `tabpanel`, roving
 * tabindex (only the selected tab is in the tab order), Left / Right arrows with
 * wrap-around, `Home` / `End`, and disabled tabs skipped.
 *
 * The selected state is carried by **`aria-selected` alone** : DaisyUI styles
 * `[aria-selected=true]` natively, so a single attribute drives both the look and the
 * accessible state — there is no `tab-active` class to keep in sync with it.
 *
 * ### Panels are interleaved
 *
 * DaisyUI reveals a panel through `.tab:is(…) + .tab-content`, so each panel is emitted
 * as the immediate sibling of its own tab rather than grouped after the tab row. The
 * panel element is always rendered, even when `lazy` defers its children — the
 * `tabs-lift` corner rules count siblings, and a missing panel would shift them.
 *
 * @param {Object} props
 * @param {TabItem[]} [props.items=[]] - The tabs.
 * @param {string|number} [props.value] - Selected item key (controlled).
 * @param {string|number} [props.defaultValue] - Initially selected key (uncontrolled). Defaults to the first enabled tab.
 * @param {(key: string|number) => void} [props.onChange] - Called with the newly selected key.
 * @param {TabsActivation} [props.activation='automatic'] - `automatic` selects a tab as soon as an arrow key moves to it ; `manual` only moves focus, and `Enter` / `Space` selects.
 * @param {boolean} [props.lazy=false] - Mount a panel's children only once its tab has been selected. Off by default, which matches DaisyUI (every panel mounted, inactive ones hidden).
 * @param {import('../../themes/components/tab').TabsPlacement} [props.placement='top'] - Side the tab row sits on.
 * @param {import('../../themes/components/tab').TabsSize} [props.size='md'] - Tabs size (scalar or breakpoint→size object).
 * @param {import('../../themes/components/tab').TabsStyle} [props.style] - `box` | `border` | `lift`. Omit for the bare look.
 * @param {string} [props.className] - Extra class names on the `tabs` container.
 * @param {string} [props.tabClassName] - Extra class names on every tab.
 * @param {string} [props.contentClassName] - Extra class names on every panel.
 * @param {string} [props.ariaLabel] - Accessible name for the tab list.
 * @param {React.Ref} [props.ref] - Forwarded to the container.
 *
 * @see https://daisyui.com/components/tab
 *
 * @example Uncontrolled
 * ```jsx
 * <Tabs
 *     style = "lift"
 *     items = {[
 *         { id : 'detail'  , label : 'Détail'  , content : <InvoiceDetail /> } ,
 *         { id : 'history' , label : 'Historique' , content : <InvoiceHistory /> } ,
 *     ]}
 * />
 * ```
 *
 * @example Controlled, with an icon and a disabled tab
 * ```jsx
 * const [ tab , setTab ] = useState( 'write' ) ;
 *
 * <Tabs
 *     value    = { tab }
 *     onChange = { setTab }
 *     items    = {[
 *         { id : 'write'   , label : 'Write'   , icon : <EditIcon /> , content : <Editor /> } ,
 *         { id : 'preview' , label : 'Preview' , content : <Preview /> } ,
 *         { id : 'diff'    , label : 'Diff'    , disabled : true } ,
 *     ]}
 * />
 * ```
 */
const Tabs =
({
    activation = AUTOMATIC ,
    ariaLabel ,
    className ,
    contentClassName ,
    defaultValue ,
    items = [] ,
    lazy = false ,
    onChange ,
    placement ,
    ref ,
    size ,
    style ,
    tabClassName ,
    value ,
    ...rest
}) =>
{
    const baseId = useId() ;

    const firstEnabled  = items.findIndex( item => !item?.disabled ) ;
    const fallbackKey   = firstEnabled >= 0 ? keyOf( items[ firstEnabled ] , firstEnabled ) : undefined ;

    const [ activeKey , setActiveKey ] = useValue( defaultValue ?? fallbackKey , value , onChange ) ;

    const tabRefs = useRef( [] ) ;

    // `lazy` only defers a panel's children until its tab has been selected once. The
    // set is a ref : the render that activates a panel already renders it (its key is
    // the active one), and the effect merely records it so it stays mounted afterwards.
    const visitedRef = useRef( new Set() ) ;

    useEffect( () =>
    {
        visitedRef.current.add( activeKey ) ;
    }
    , [ activeKey ] ) ;

    // A tab bar with no panel at all is a legitimate shape (routing-style tabs), but a
    // *partially* filled one is not : DaisyUI's `tabs-lift` corner rules count siblings,
    // so panels are all-or-nothing.
    const hasPanels = items.some( item => item?.content !== undefined && item?.content !== null ) ;

    const focusTab = ( index ) =>
    {
        tabRefs.current[ index ]?.focus() ;
    } ;

    const moveTo = ( index ) =>
    {
        focusTab( index ) ;

        if ( activation === AUTOMATIC )
        {
            setActiveKey( keyOf( items[ index ] , index ) ) ;
        }
    } ;

    /**
     * Next enabled index in `step` direction, wrapping around. Returns `from` when no
     * other tab can take focus, so a single-tab list cannot loop forever.
     */
    const nextEnabled = ( from , step ) =>
    {
        const total = items.length ;

        if ( total === 0 )
        {
            return from ;
        }

        for ( let offset = 1 ; offset <= total ; offset++ )
        {
            const index = ( ( from + step * offset ) % total + total ) % total ;

            if ( !items[ index ]?.disabled )
            {
                return index ;
            }
        }

        return from ;
    } ;

    const edgeEnabled = ( fromEnd ) =>
    {
        const index = fromEnd
            ? items.map( item => !item?.disabled ).lastIndexOf( true )
            : items.findIndex( item => !item?.disabled ) ;

        return index >= 0 ? index : 0 ;
    } ;

    const handleKeyDown = ( event , index ) =>
    {
        switch ( event.key )
        {
            case 'ArrowRight' :
                event.preventDefault() ;
                moveTo( nextEnabled( index , 1 ) ) ;
                break ;

            case 'ArrowLeft' :
                event.preventDefault() ;
                moveTo( nextEnabled( index , -1 ) ) ;
                break ;

            case 'Home' :
                event.preventDefault() ;
                moveTo( edgeEnabled( false ) ) ;
                break ;

            case 'End' :
                event.preventDefault() ;
                moveTo( edgeEnabled( true ) ) ;
                break ;

            default :
                // `Enter` / `Space` need no handling : the tab is a real <button>, so the
                // browser fires its click — which is what `manual` activation relies on.
                break ;
        }
    } ;

    const classNames = getTabsClasses({ className , placement , size , style }) ;

    return (
        <div
            aria-label = { ariaLabel }
            className  = { classNames }
            ref        = { ref }
            role       = "tablist"
            { ...rest }
        >
            { items.map( ( item , index ) =>
            {
                const key      = keyOf( item , index ) ;
                const selected = key === activeKey ;
                const tabId    = `${ baseId }-tab-${ key }` ;
                const panelId  = `${ baseId }-panel-${ key }` ;

                const mounted = !lazy || selected || visitedRef.current.has( key ) ;

                return (
                    <Fragment key={ key }>

                        <button
                            aria-controls = { hasPanels ? panelId : undefined }
                            aria-selected = { selected }
                            className     = { getTabClasses({ className : [ tabClassName , item?.className ] , disabled : item?.disabled }) }
                            disabled      = { item?.disabled }
                            id            = { tabId }
                            onClick       = { () => setActiveKey( key ) }
                            onKeyDown     = { event => handleKeyDown( event , index ) }
                            ref           = { node => { tabRefs.current[ index ] = node ; } }
                            role          = "tab"
                            tabIndex      = { selected ? 0 : -1 }
                            type          = "button"
                        >
                            { item?.icon }
                            { item?.label }
                        </button>

                        { hasPanels && (
                            <div
                                aria-labelledby = { tabId }
                                className       = { getTabContentClasses({ className : contentClassName }) }
                                id              = { panelId }
                                role            = "tabpanel"
                                // biome-ignore lint/a11y/noNoninteractiveTabindex: the WAI-ARIA tabs pattern requires the panel itself to be focusable — without it a keyboard user who selects a tab whose panel holds no focusable element has no way to reach its content
                                tabIndex        = { 0 }
                            >
                                { mounted ? item?.content : null }
                            </div>
                        ) }

                    </Fragment>
                ) ;
            } ) }
        </div>
    ) ;
} ;

Tabs.displayName = 'Tabs' ;

export default Tabs ;

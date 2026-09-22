'use client' ;

/**
 * Display mode dropdown — switches between flex, masonry, and grid layouts.
 *
 * Controlled by default : `value` in, `onChange` out, the caller owns where the
 * mode lives.
 *
 * **`pageKey` makes it drive itself.** The chosen mode is then written to the
 * URL (`?display=`, see `urlParam`) and remembered for that page
 * ({@link module:hooks/useDisplayPreference}, `localStorage` + a cookie so a
 * server render can read it back). `value` stays an input : a server page reads
 * the parameter, or the cookie, and hands the mode down. `onChange` is still
 * called, after the write.
 *
 * ⚠️ **`pageKey` reads the URL**, and `useSearchParams` asks for a `Suspense`
 * boundary above it. It is kept in a sub-component, so a controlled dropdown
 * never calls it.
 *
 * @module components/dropDowns/DisplayDropDown
 *
 * i18n keys resolved from `path`:
 * - flex    — Label for flex mode    (default: 'List')
 * - masonry — Label for masonry mode (default: 'Masonry')
 * - grid    — Label for grid mode    (default: 'Grid')
 *
 * @example
 * ```jsx
 * import DisplayDropDown from 'oihana-next-ui/components/dropDowns/DisplayDropDown' ;
 *
 * // Controlled
 * <DisplayDropDown autoPosition value="flex" onChange={ setDisplay } />
 *
 * // Self-driving — writes ?display= and remembers the mode for this page
 * <DisplayDropDown pageKey="articles" value={ displayFromUrl } />
 *
 * // Remembered, but not written to the URL
 * <DisplayDropDown pageKey="articles" urlParam={ null } value={ display } />
 *
 * // Custom icons per mode — partial override supported
 * import { BsList , BsGrid , BsColumns } from 'react-icons/bs' ;
 *
 * <DisplayDropDown
 *     icons    = { { flex: BsList , masonry: BsColumns , grid: BsGrid } }
 *     value    = "flex"
 *     onChange = { setDisplay }
 * />
 * ```
 */

import { useEffect , useRef , useState } from 'react' ;

import { usePathname , useRouter , useSearchParams } from 'next/navigation' ;

import { MdList              as DefaultFlexIcon    } from "react-icons/md";
import { IoMdGrid            as DefaultGridIcon    } from 'react-icons/io' ;
import { RiLayoutMasonryFill as DefaultMasonryIcon } from 'react-icons/ri' ;

import { markInPlace } from '../../helpers/routes/inPlaceNavigation' ;

import cn                    from '../../themes/helpers/cn' ;
import getDropdownClassNames from '../../themes/components/dropdown' ;
import useDisplayPreference  from '../../hooks/useDisplayPreference' ;
import useDropdownPosition   from '../../themes/hooks/useDropdownPosition' ;
import useI18n               from '../../contexts/locale/useI18n' ;

/**
 * @typedef {'flex'|'grid'|'masonry'} DisplayMode
 *
 * @typedef {Object} DisplayIcons
 * @property {React.ElementType} [flex]    - Icon for flex mode.
 * @property {React.ElementType} [masonry] - Icon for masonry mode.
 * @property {React.ElementType} [grid]    - Icon for grid mode.
 */

/**
 * Default icon mapping — merged with props.icons.
 * @type {Required<DisplayIcons>}
 */
const DEFAULT_ICONS =
{
    flex    : DefaultFlexIcon    ,
    masonry : DefaultMasonryIcon ,
    grid    : DefaultGridIcon    ,
} ;

/**
 * All available display modes in display order.
 * @type {DisplayMode[]}
 */
const ALL_MODES = [ 'flex' , 'masonry' , 'grid' ] ;

/**
 * The query parameter the chosen mode is written to, by default.
 * @type {string}
 */
export const DISPLAY_URL_PARAM = 'display' ;

/**
 * Content offset classes based on dropdown opening direction.
 * @type {Object.<string, string>}
 */
const DIRECTION_OFFSET =
{
    top    : 'mb-2' ,
    bottom : 'mt-2' ,
    left   : 'me-2' ,
    right  : 'ms-2' ,
} ;

/**
 * The dropdown itself — controlled, and unaware of any URL.
 *
 * @param {Object} props - See `DisplayDropDown`.
 * @returns {React.ReactElement|null}
 */
const DisplayDropDownView =
({
    autoPosition = false ,
    className ,
    direction    = 'bottom' ,
    icons ,
    modes        = ALL_MODES ,
    onChange ,
    panelHeight  = 140 ,
    panelWidth   = 176 ,
    path         = 'components.dropdowns.display' ,
    placement    = 'end' ,
    value        = 'flex' ,
}) =>
{
    const [ open , setOpen ] = useState( false ) ;
    const manualRef          = useRef( null ) ;

    // -------- i18n

    const {
        flex    : flexLabel    = 'List'    ,
        masonry : masonryLabel = 'Masonry' ,
        grid    : gridLabel    = 'Grid'    ,
    }
    = useI18n( path ) ;

    // -------- autoPosition hook

    const auto = useDropdownPosition
    ({
        panelHeight ,
        panelWidth  ,
        preferredDirection : direction ,
        preferredPlacement : placement ,
    }) ;

    const containerRef      = autoPosition ? auto.ref : manualRef ;
    const resolvedDirection = autoPosition ? auto.direction : direction ;
    const resolvedPlacement = autoPosition ? auto.placement : placement ;

    // -------- Close on click outside

    useEffect( () =>
    {
        if ( !open )
        {
            return ;
        }

        const handleClickOutside = e =>
        {
            if ( containerRef.current && !containerRef.current.contains( e.target ) )
            {
                setOpen( false ) ;
            }
        } ;

        document.addEventListener( 'click' , handleClickOutside ) ;
        return () => document.removeEventListener( 'click' , handleClickOutside ) ;
    }
    , [ open ] ) ;

    // -------- Close on Escape

    useEffect( () =>
    {
        if ( !open )
        {
            return ;
        }

        const handleEscape = e =>
        {
            if ( e.key === 'Escape' )
            {
                setOpen( false ) ;
            }
        } ;

        document.addEventListener( 'keydown' , handleEscape ) ;
        return () => document.removeEventListener( 'keydown' , handleEscape ) ;
    }
    , [ open ] ) ;

    // -------- Resolved icons — props.icons overrides defaults per key

    const resolvedIcons =
    {
        ...DEFAULT_ICONS ,
        ...icons ,
    } ;

    // -------- Filtered options

    const LABEL_MAP =
    {
        flex    : flexLabel    ,
        masonry : masonryLabel ,
        grid    : gridLabel    ,
    } ;

    const options = ALL_MODES
        .filter( mode => modes.includes( mode ) )
        .map( mode => ({ mode , label : LABEL_MAP[ mode ] , Icon : resolvedIcons[ mode ] }) ) ;

    // Nothing to switch to — render nothing. 🚨 After every hook, never before
    // one : `modes` can change, and a hook skipped on one render is React
    // throwing on the next.
    if ( options.length <= 1 )
    {
        return null ;
    }

    const current            = options.find( option => option.mode === value ) ?? options[0] ;
    const { Icon : CurrentIcon } = current ;

    // -------- Handlers

    const toggle = () =>
    {
        if ( !open && autoPosition )
        {
            auto.recalculate() ;
        }

        setOpen( prev => !prev ) ;
    } ;

    const select = mode => () =>
    {
        onChange?.( mode ) ;
        setOpen( false ) ;
    } ;

    // -------- Class names

    const containerClassNames = getDropdownClassNames
    ({
        className ,
        direction : resolvedDirection ,
        open      ,
        placement : resolvedPlacement ,
    }) ;

    const contentClassNames = cn
    (
        'card card-sm dropdown-content z-10 w-44 bg-base-300 shadow-lg' ,
        DIRECTION_OFFSET[ resolvedDirection ] ?? 'mt-2' ,
    ) ;

    // -------- Render

    return (
        <div
            className = { containerClassNames }
            ref       = { containerRef }
        >
            <button
                type      = "button"
                aria-label = { current.label }
                className = "btn btn-ghost btn-square btn-sm"
                title     = { current.label }
                onClick   = { toggle }
            >
                <CurrentIcon className="size-5" />
            </button>

            { open &&
                <div className={ contentClassNames }>
                    <div className="card-body gap-1 p-2">
                        { options.map( ( { mode , label , Icon } ) =>
                        {
                            const isActive = mode === value ;
                            return (
                                <button
                                    key       = { mode }
                                    type      = "button"
                                    disabled  = { isActive }
                                    className = { cn(
                                        'btn btn-block btn-sm justify-start gap-3 font-medium transition-all' ,
                                        isActive
                                            ? 'btn-neutral text-neutral-content pointer-events-none'
                                            : 'btn-ghost hover:bg-base-200 active:scale-95'
                                    ) }
                                    onClick   = { select( mode ) }
                                >
                                    <Icon className="size-4" />
                                    { label }
                                </button>
                            ) ;
                        }) }
                    </div>
                </div>
            }
        </div>
    ) ;
} ;

/**
 * The self-driving dropdown : it remembers the mode for its page, and writes it
 * to the URL.
 *
 * Kept apart so `useSearchParams` — which asks for a `Suspense` boundary above
 * it — is only called when a caller asks for this behaviour.
 *
 * 🚨 **The move is marked in place**, and pushed without scrolling. A mode is
 * swapped over rows already on screen : sent to the top of the page, the reader
 * loses the row they were looking at — and `scroll : false` alone does not
 * cover it, the shell's own scroll reset reads any change of address as a new
 * page ({@link module:helpers/routes/inPlaceNavigation}).
 *
 * @param {Object} props - See `DisplayDropDown`.
 * @returns {React.ReactElement|null}
 */
const UrlDisplayDropDown = ( { onChange , pageKey , urlParam , value , ...rest } ) =>
{
    const pathname     = usePathname() ;
    const router       = useRouter() ;
    const searchParams = useSearchParams() ;

    const [ , saveDisplay ] = useDisplayPreference( pageKey , value ) ;

    const handleChange = mode =>
    {
        saveDisplay( mode ) ;

        if ( urlParam )
        {
            const params = new URLSearchParams( searchParams.toString() ) ;

            if ( mode ) { params.set( urlParam , mode ) ; }
            else        { params.delete( urlParam ) ; }

            const query = params.toString() ;
            const href  = query ? `${ pathname }?${ query }` : pathname ;

            markInPlace( href ) ;

            router.push( href , { scroll : false } ) ;
        }

        onChange?.( mode ) ;
    } ;

    return (
        <DisplayDropDownView
            { ...rest }
            onChange = { handleChange }
            value    = { value }
        />
    ) ;
} ;

/**
 * @param {Object}                                                       [props]
 * @param {boolean}                                                      [props.autoPosition=false]   - Auto-compute direction + placement from viewport position.
 * @param {string}                                                       [props.className]            - Additional class names for the root element.
 * @param {import('../../themes/components/dropdown').DropdownDirection} [props.direction='bottom']   - Dropdown opening direction (ignored when autoPosition=true).
 * @param {DisplayIcons}                                                 [props.icons]                - Override icons per mode. Merged with defaults — partial override supported.
 * @param {DisplayMode[]}                                                [props.modes]                - Enabled modes. Defaults to all three.
 * @param {Function}                                                     [props.onChange]             - Called with the new DisplayMode on selection.
 * @param {string}                                                       [props.pageKey]              - Remember the mode for this page, and write it to the URL. Absent : fully controlled.
 * @param {number}                                                       [props.panelHeight=140]      - Estimated panel height for autoPosition calculation.
 * @param {number}                                                       [props.panelWidth=176]       - Estimated panel width for autoPosition calculation.
 * @param {string}                                                       [props.path='components.dropdowns.display'] - i18n path for mode labels.
 * @param {import('../../themes/components/dropdown').DropdownPlacement} [props.placement='end']      - Dropdown alignment (ignored when autoPosition=true).
 * @param {?string}                                                      [props.urlParam='display']   - With `pageKey` : the query parameter written. `null` remembers the mode without touching the URL.
 * @param {DisplayMode}                                                  [props.value='flex']         - Currently active mode.
 *
 * @returns {React.ReactElement|null}
 */
const DisplayDropDown = ( { pageKey , urlParam = DISPLAY_URL_PARAM , ...rest } ) => pageKey
    ? <UrlDisplayDropDown { ...rest } pageKey={ pageKey } urlParam={ urlParam } />
    : <DisplayDropDownView { ...rest } /> ;

DisplayDropDown.displayName = 'DisplayDropDown' ;

export default DisplayDropDown ;

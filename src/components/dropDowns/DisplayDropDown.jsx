'use client' ;

/**
 * Display mode dropdown — switches between flex, masonry, and grid layouts.
 *
 * @module components/dropDowns/DisplayDropDown
 *
 * @example
 * ```jsx
 * import DisplayDropDown from 'oihana-next-ui/components/dropdowns/DisplayDropDown' ;
 *
 * // Auto-position (adapts to viewport)
 * <DisplayDropDown autoPosition value="flex" onChange={ setDisplay } />
 *
 * // Manual direction + placement
 * <DisplayDropDown direction="top" placement="end" value="masonry" onChange={ setDisplay } />
 *
 * // Without grid
 * <DisplayDropDown modes={ [ 'flex' , 'masonry' ] } value="masonry" onChange={ setDisplay } />
 * ```
 */

import { useEffect , useRef , useState } from 'react' ;

import { CiGrid31            as FlexIcon    } from 'react-icons/ci' ;
import { IoMdGrid            as GridIcon    } from 'react-icons/io' ;
import { RiLayoutMasonryFill as MasonryIcon } from 'react-icons/ri' ;

import cn                    from '../../themes/helpers/cn' ;
import getDropdownClassNames from '../../themes/components/dropdown' ;
import useDropdownPosition   from '../../themes/hooks/useDropdownPosition';

/**
 * @typedef {'flex'|'grid'|'masonry'} DisplayMode
 */

/**
 * All available display modes with their label and icon.
 * @type {Array<{ mode: DisplayMode , label: string , Icon: React.ElementType }>}
 */
const DISPLAY_OPTIONS =
[
    { mode : 'flex'    , label : 'List'    , Icon : FlexIcon    } ,
    { mode : 'masonry' , label : 'Masonry' , Icon : MasonryIcon } ,
    { mode : 'grid'    , label : 'Grid'    , Icon : GridIcon    } ,
] ;

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
 * @param {Object}                                                       [props]
 * @param {boolean}                                                      [props.autoPosition=false]   - Auto-compute direction + placement from viewport position.
 * @param {string}                                                       [props.className]            - Additional class names for the root element.
 * @param {import('../../themes/components/dropdown').DropdownDirection} [props.direction='bottom']   - Dropdown opening direction (ignored when autoPosition=true).
 * @param {import('../../themes/components/dropdown').DropdownPlacement} [props.placement='end']      - Dropdown alignment (ignored when autoPosition=true).
 * @param {DisplayMode[]}                                                [props.modes]                - Enabled modes. Defaults to all three.
 * @param {Function}                                                     [props.onChange]             - Called with the new DisplayMode on selection.
 * @param {number}                                                       [props.panelHeight=140]      - Estimated panel height for autoPosition calculation.
 * @param {number}                                                       [props.panelWidth=176]       - Estimated panel width for autoPosition calculation.
 * @param {DisplayMode}                                                  [props.value='flex']         - Currently active mode.
 *
 * @returns {React.ReactElement|null}
 */
const DisplayDropDown =
({
    autoPosition = false ,
    className ,
    direction    = 'bottom' ,
    modes        = [ 'flex' , 'masonry' , 'grid' ] ,
    onChange ,
    panelHeight  = 140 ,
    panelWidth   = 176 ,
    placement    = 'end' ,
    value        = 'flex' ,
}) =>
{
    const [ open , setOpen ] = useState( false ) ;
    const manualRef          = useRef( null ) ;

    const auto = useDropdownPosition
    ({
        panelHeight ,
        panelWidth  ,
        preferredDirection : direction ,
        preferredPlacement : placement ,
    }) ;

    // Use auto ref when autoPosition=true, else a plain ref
    const containerRef       = autoPosition ? auto.ref : manualRef ;
    const resolvedDirection  = autoPosition ? auto.direction : direction ;
    const resolvedPlacement  = autoPosition ? auto.placement : placement ;

    const options = DISPLAY_OPTIONS.filter( option => modes.includes( option.mode ) ) ;

    // Nothing to switch to — render nothing
    if ( options.length <= 1 )
    {
        return null ;
    }

    const current            = options.find( option => option.mode === value ) ?? options[0] ;
    const { Icon : CurrentIcon } = current ;

    const toggle = () =>
    {
        if ( !open && autoPosition )
        {
            // Recalculate position before opening
            auto.recalculate() ;
        }

        setOpen( prev => !prev ) ;
    } ;

    const close = () => setOpen( false ) ;

    const select = mode => () =>
    {
        onChange?.( mode ) ;
        close() ;
    } ;

    // Close on click outside

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
                close() ;
            }
        } ;

        document.addEventListener( 'click' , handleClickOutside ) ;
        return () => document.removeEventListener( 'click' , handleClickOutside ) ;
    }
    , [ open ] ) ;

    // Close on Escape

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
                close() ;
            }
        } ;

        document.addEventListener( 'keydown' , handleEscape ) ;
        return () => document.removeEventListener( 'keydown' , handleEscape ) ;
    }
    , [ open ] ) ;

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

    return (
        <div
            className = { containerClassNames }
            ref       = { containerRef }
        >
            <button
                type      = "button"
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

DisplayDropDown.displayName = 'DisplayDropDown' ;

export default DisplayDropDown ;
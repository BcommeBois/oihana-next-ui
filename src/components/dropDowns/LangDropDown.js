/**
 * Language selector dropdown with flags using DaisyUI.
 *
 * @module components/LangDropDown
 * @see https://daisyui.com/components/dropdown
 *
 * @example
 * ```jsx
 * // Default (long style)
 * <LangDropDown />
 *
 * // Short display names
 * <LangDropDown style="short" />
 *
 * // Custom tooltip
 * <LangDropDown tooltipPosition="left" tooltipColor="info" />
 *
 * // Without tooltip
 * <LangDropDown showTooltip={false} />
 * ```
 */

import { useEffect , useRef , useState } from 'react'

import cn from '@/themes/helpers/cn'

import Flag    from '@/components/icons/Flag'
import Tooltip from '@/components/Tooltip'

import useLang from '@/contexts/lang'

/**
 * Resolves a localized language display name.
 * @param {string} code - ISO 639-1 language code.
 * @param {Intl.RelativeTimeFormatStyle} style - Display name style.
 * @returns {string}
 */
const getDisplayName = ( code , style ) => code
    ? new Intl.DisplayNames( [ code ] , { type : 'language' , style } ).of( code ) ?? code
    : '' ;

/**
 * @param {Object} props
 * @param {React.Ref} [props.ref] - Forwarded ref.
 * @param {boolean} [props.showTooltip=true] - Show/hide tooltip on trigger.
 * @param {Intl.RelativeTimeFormatStyle} [props.style='long'] - Intl display name style.
 * @param {string} [props.tooltipClassName] - Tooltip class name.
 * @param {import('@/themes/components/tooltip').TooltipColorValue} [props.tooltipColor] - Tooltip color.
 * @param {import('@/themes/components/tooltip').TooltipPosition} [props.tooltipPosition='bottom'] - Tooltip position.
 */
const LangDropDown =
({
    ref ,
    showTooltip     = true ,
    style           = 'long' ,
    tooltipClassName ,
    tooltipColor ,
    tooltipPosition = 'bottom' ,
}) =>
{
    const { lang , languages , setLang } = useLang() ;
    const [ open , setOpen ] = useState( false ) ;
    const dropdownRef = useRef( null ) ;

    const hasMultiple = languages?.length > 1 ;

    const toggle = () => setOpen( prev => !prev ) ;

    const close = () => setOpen( false ) ;

    const select = ( code ) => () =>
    {
        setLang( code ) ;
        close() ;
    } ;

    // Close on click outside
    useEffect( () =>
    {
        if ( !open ) return ;

        const handleClickOutside = ( e ) =>
        {
            if ( dropdownRef.current && !dropdownRef.current.contains( e.target ) )
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
        if ( !open ) return ;

        const handleEscape = ( e ) =>
        {
            if ( e.key === 'Escape' ) close() ;
        } ;

        document.addEventListener( 'keydown' , handleEscape ) ;
        return () => document.removeEventListener( 'keydown' , handleEscape ) ;
    }
    , [ open ] ) ;

    return (
        <div
            className = { cn( 'dropdown dropdown-end' , { 'dropdown-open' : open } ) }
            ref       = { dropdownRef }
        >
            <Tooltip
                className = { cn( 'capitalize' , tooltipClassName ) }
                color     = { tooltipColor }
                tip       = { getDisplayName( lang , style ) }
                position  = { tooltipPosition }
                show      = { showTooltip && !open && hasMultiple }
            >
                <div
                    role      = "button"
                    className = { cn( 'btn btn-ghost btn-square' , { 'btn-disabled' : !hasMultiple } ) }
                    tabIndex  = { 0 }
                    onClick   = { toggle }
                >
                    <Flag lang={ lang } />
                </div>
            </Tooltip>
            {
                hasMultiple && open &&
                <div className="card card-sm dropdown-content mt-2 z-1 w-60 bg-base-300 shadow-lg">
                    <div className="card-body">
                        {
                            languages.map( ( code ) =>
                            {
                                const isCurrent = code === lang;
                                return <button
                                    key       = { code }
                                    disabled  = { isCurrent }
                                    className = { cn(
                                        'btn btn-block capitalize font-medium justify-start gap-3 transition-all' ,
                                        isCurrent ? 'btn-neutral text-neutral-content pointer-events-none' : 'btn-ghost hover:bg-base-200 active:scale-95'
                                    ) }
                                    onClick   = { select( code ) }
                                >
                                    <Flag lang={ code } />
                                    { getDisplayName( code , style ) }
                                </button> ;
                            })
                        }
                    </div>
                </div>
            }
        </div>
    ) ;
} ;

export default LangDropDown ;
'use client' ;

import { useEffect , useRef , useState } from 'react' ;

import cn         from '../../themes/helpers/cn' ;
import useThemes  from '../../contexts/themes/useThemes' ;

import Loading from '../../components/Loading' ;
import Image   from 'next/image' ;

import buildImageProps from './helpers/buildImageProps' ;

/**
 * Picture component with loading state, spinner, and dark mode support.
 * Wrapper around Next.js Image with preload indicator.
 *
 * @module components/Picture
 */

/**
 * @param {Object} props
 * @param {string} [props.alt='picture'] - Image alt text
 * @param {React.ReactNode} [props.bottomLeft] - Content in bottom-left corner
 * @param {React.ReactNode} [props.bottomRight] - Content in bottom-right corner
 * @param {React.ReactNode} [props.center] - Content in center
 * @param {string} [props.className] - Container classes
 * @param {string|import('next/image').StaticImageData} [props.dark] - Dark mode image source
 * @param {'top-left'|'top-right'|'bottom-left'|'bottom-right'} [props.dimensionsPosition='bottom-right'] - Position for dimensions badge
 * @param {boolean} [props.fill=false] - Fill parent container (responsive mode)
 * @param {number} [props.height] - Image height (required if not using fill)
 * @param {string} [props.imageClassName] - Image element classes
 * @param {string} [props.loading='lazy'] - Loading strategy: 'lazy' | 'eager' (ignored if priority is true)
 * @param {import('@/themes/components/loading').LoadingAnimation} [props.loadingAnimation='spinner'] - Loading animation style
 * @param {import('../colors/textColor').TextColor} [props.loadingColor='base-content'] - Loading color
 * @param {import('@/themes/components/loading').LoadingSize} [props.loadingSize='lg'] - Loading spinner size
 * @param {string} [props.objectFit='cover'] - Object fit for fill mode: 'contain' | 'cover' | 'fill' | 'none'
 * @param {Function} [props.onLoad] - Callback when image loads (receives React SyntheticEvent — use e.target for img element)
 * @param {boolean} [props.priority=false] - Priority loading (disables lazy)
 * @param {boolean} [props.showDimensions=false] - Show natural dimensions badge
 * @param {boolean} [props.showLoading=true] - Show loading spinner
 * @param {string|import('next/image').StaticImageData} props.src - Image source URL (light mode)
 * @param {React.ReactNode} [props.topLeft] - Content in top-left corner
 * @param {React.ReactNode} [props.topRight] - Content in top-right corner
 * @param {number} [props.width] - Image width (required if not using fill)
 */
const Picture =
({
    alt = 'picture' ,
    bottomLeft ,
    bottomRight ,
    center ,
    className ,
    dark ,
    dimensionsPosition = 'bottom-right' ,
    fill = false ,
    height ,
    imageClassName ,
    loading = 'lazy' ,
    loadingAnimation = 'spinner' ,
    loadingColor = 'base-content' ,
    loadingSize = 'lg' ,
    objectFit = 'cover' ,
    onLoad ,
    priority = false ,
    showDimensions = false ,
    showLoading = true ,
    src ,
    topLeft ,
    topRight ,
    width ,

    ...rest
}) =>
{
    const { isDark } = useThemes() ;

    const [ isLoading  , setIsLoading  ] = useState( true ) ;
    const [ dimensions , setDimensions ] = useState( null ) ;

    // Track previous isDark to detect theme switches
    const prevIsDarkRef = useRef( isDark ) ;

    // Reset loading state when theme switches and a dark image is provided
    useEffect( () =>
    {
        if ( dark && prevIsDarkRef.current !== isDark )
        {
            prevIsDarkRef.current = isDark ;
            setIsLoading( true ) ;
            setDimensions( null ) ;
        }
    }
    , [ isDark , dark ] ) ;

    // Active source: dark image when in dark mode, light image otherwise
    const activeSrc = ( dark && isDark ) ? dark : src ;

    /**
     * @param {React.SyntheticEvent<HTMLImageElement>} e
     */
    const handleLoad = e =>
    {
        setIsLoading( false ) ;

        setDimensions
        ({
            naturalWidth  : e.target.naturalWidth ,
            naturalHeight : e.target.naturalHeight ,
        }) ;

        if ( onLoad )
        {
            onLoad( e ) ;
        }
    } ;

    const containerClasses = cn(
        'relative flex items-center justify-center' ,
        ! fill && 'bg-base-300' ,
        fill && 'w-full h-full' ,
        className
    ) ;

    const imageClasses = cn(
        ! fill && 'object-cover' ,
        imageClassName
    ) ;

    // Corner position classes
    const cornerPositions =
    {
        'top-left'     : 'top-2 left-2' ,
        'top-right'    : 'top-2 right-2' ,
        'bottom-left'  : 'bottom-2 left-2' ,
        'bottom-right' : 'bottom-2 right-2' ,
    } ;

    // Dimensions badge
    const dimensionsBadge = showDimensions && dimensions && (
        <div className={ cn( 'absolute badge badge-sm badge-neutral opacity-70' , cornerPositions[ dimensionsPosition ] ) }>
            { dimensions.naturalWidth } × { dimensions.naturalHeight }
        </div>
    ) ;

    const imageProps = buildImageProps({
        alt ,
        imageClasses ,
        fill ,
        width ,
        height ,
        objectFit ,
        onLoad  : handleLoad ,
        source  : activeSrc ,
        priority ,
        loading ,
        rest ,
    }) ;

    return (
        <div className={ containerClasses }>

            <div className={ cn( 'relative' , ! fill && 'inline-block' , fill && 'w-full h-full' ) }>
                <Image { ...imageProps } />
            </div>

            { showLoading && isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loading
                        animation = { loadingAnimation }
                        color     = { loadingColor }
                        size      = { loadingSize }
                    />
                </div>
            )}

            {/* Top-left corner */}
            { topLeft && (
                <div className={ cn( 'absolute' , cornerPositions['top-left'] ) }>
                    { topLeft }
                </div>
            )}

            {/* Top-right corner */}
            { topRight && (
                <div className={ cn( 'absolute' , cornerPositions['top-right'] ) }>
                    { topRight }
                </div>
            )}

            {/* Bottom-left corner */}
            { bottomLeft && (
                <div className={ cn( 'absolute' , cornerPositions['bottom-left'] ) }>
                    { bottomLeft }
                </div>
            )}

            {/* Bottom-right corner */}
            { bottomRight && (
                <div className={ cn( 'absolute' , cornerPositions['bottom-right'] ) }>
                    { bottomRight }
                </div>
            )}

            {/* Center content */}
            { center && (
                <div className="absolute inset-0 flex items-center justify-center">
                    { center }
                </div>
            )}

            {/* Dimensions badge */}
            { dimensionsBadge }

        </div>
    ) ;
} ;

Picture.displayName = 'Picture' ;

export default Picture ;
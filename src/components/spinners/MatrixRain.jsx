'use client' ;

import { useEffect , useRef } from 'react' ;

import Spinner from './Spinner' ;

import './styles/matrix-rain.css' ;

/**
 * Matrix rain falling characters animation spinner.
 * Displays columns of characters falling like in the Matrix movie.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.as='div'] - HTML element to render
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.color='success'] - Characters color from theme
 * @param {number} [props.columns=8] - Number of falling columns
 * @param {number} [props.speed=3] - Animation speed in seconds
 * @param {Object} [props.style] - Inline styles
 * @param {string} [props.tag='spinner-matrix-rain'] - CSS class name
 * @param {React.Ref<HTMLElement>} [props.ref] - Forwarded ref
 *
 * @example
 * // Default matrix rain spinner
 * <MatrixRain />
 *
 * @example
 * // With custom color and more columns
 * <MatrixRain color="primary" columns={12} />
 *
 * @example
 * // Faster animation
 * <MatrixRain speed={2} />
 */
const MatrixRain =
({
    as ,
    className ,
    color = 'success' ,
    columns = 8 ,
    speed = 3 ,
    style ,
    tag = 'spinner-matrix-rain' ,

    ref ,
}) =>
{
    const containerRef = useRef( null ) ;

    // Characters pool (katakana, numbers, latin)
    const getRandomChar = () =>
    {
        const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' ;
        return chars[ Math.floor( Math.random() * chars.length ) ] ;
    } ;

    // Generate column content
    const generateColumn = () =>
    {
        const length = 8 + Math.floor( Math.random() * 4 ) ; // 8-12 chars
        return Array.from( { length } , () => getRandomChar() ) ;
    } ;

    useEffect(
        () =>
        {
            if ( ! containerRef.current ) return ;

            const container = containerRef.current ;
            const columnElements = [] ;

            // Create columns
            for ( let i = 0 ; i < columns ; i++ )
            {
                const column = document.createElement( 'div' ) ;
                column.className = 'spinner-matrix-rain-column' ;

                const chars = generateColumn() ;
                chars.forEach( char =>
                {
                    const span = document.createElement( 'span' ) ;
                    span.textContent = char ;
                    column.appendChild( span ) ;
                }) ;

                // Position and timing
                column.style.left = `${ ( i / columns ) * 100 }%` ;
                column.style.animationDuration = `${ speed + Math.random() }s` ;
                column.style.animationDelay = `${ Math.random() * speed }s` ;

                container.appendChild( column ) ;
                columnElements.push( column ) ;

                // Regenerate characters periodically
                const interval = setInterval(
                    () =>
                    {
                        const newChars = generateColumn() ;
                        const spans = column.querySelectorAll( 'span' ) ;
                        spans.forEach( ( span , index ) =>
                        {
                            if ( newChars[ index ] )
                            {
                                span.textContent = newChars[ index ] ;
                            }
                        }) ;
                    } ,
                    speed * 1000
                ) ;

                columnElements.push( { element: column , interval } ) ;
            }

            // Cleanup
            return () =>
            {
                columnElements.forEach( item =>
                {
                    if ( item.interval )
                    {
                        clearInterval( item.interval ) ;
                    }
                }) ;
                container.innerHTML = '' ;
            } ;
        } ,
        [ columns , speed ]
    ) ;

    return (
        <Spinner
            as        = { as }
            className = { className }
            color     = { color }
            ref       = { ref || containerRef }
            style     = { style }
            tag       = { tag }
        />
    ) ;
} ;

MatrixRain.displayName = 'MatrixRain' ;

export default MatrixRain ;
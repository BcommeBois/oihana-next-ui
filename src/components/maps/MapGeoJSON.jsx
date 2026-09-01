'use client' ;

/**
 * Geometry drawn by the engine, coloured by the theme.
 *
 * @module components/maps/MapGeoJSON
 */

import { useId } from 'react' ;

import useThemes from '../../contexts/themes/useThemes' ;

import { Layer , Source } from './engine' ;

/**
 * What a line looks like when nothing says otherwise.
 *
 * These are paint-spec values, not class names, so they live here rather than
 * in `themes/components/map` : that module generates Tailwind classes, and a
 * layer takes numbers and colour strings. Keeping them apart is what stops
 * someone looking for a `line-width` among the class maps.
 */
const LINE = { opacity : 0.85 , width : 4 } ;

/** And a filled area. */
const FILL = { opacity : 0.15 , outlineWidth : 2 } ;

/**
 * Resolves a colour for a paint spec.
 *
 * **This is the bridge the layer path needed.** A `line-color` is a string the
 * engine reads once — it knows nothing about Tailwind, and a theme token means
 * nothing to it. So the token is resolved against the colours the theme
 * context extracted from the CSS variables, which is the very mechanism the
 * charts have used all along. When the theme changes, `colors` changes, this
 * re-renders, and the layer is repainted.
 *
 * Anything that is not a known token — a hex from the data, an `oklch()` — goes
 * through untouched.
 *
 * @param {string} color - A theme token, or any colour the engine accepts.
 * @param {Object} colors - The theme's colours.
 * @returns {string}
 */
export const resolveColor = ( color , colors ) => colors?.[ color ] ?? color ;

/**
 * Draws a GeoJSON geometry on the map.
 *
 * The primitive under everything the DOM cannot hold : a route is a line, a
 * delivery area is a polygon, and neither is an element. What it costs is that
 * the look is written in the engine's paint spec rather than in Tailwind —
 * which is why the colour goes through `resolveColor` and nothing else here
 * pretends to be styleable from the outside.
 *
 * Both a line and a fill are drawn when the data holds both kinds ; the engine
 * ignores a layer whose filter matches nothing, so there is no cost in
 * declaring both.
 *
 * @param {Object} props
 * @param {string} [props.color='primary'] - A theme token, or any colour the engine accepts.
 * @param {Object} props.data - A GeoJSON `Feature` or `FeatureCollection`.
 * @param {boolean} [props.dashed=false] - Draw the line dashed.
 * @param {boolean} [props.fill=true] - Fill the polygons the data may hold.
 * @param {string} [props.id] - Source id. Generated when omitted.
 * @param {Object} [props.layerProps] - Spread last onto the line layer.
 * @param {number} [props.opacity] - Line opacity.
 * @param {number} [props.width=4] - Line width in pixels.
 *
 * @example
 * ```jsx
 * <Map { ...centre } mapStyle={ style }>
 *     <MapGeoJSON color="error" data={ zone } />
 * </Map>
 * ```
 */
const MapGeoJSON =
({
    color = 'primary' ,
    data ,
    dashed = false ,
    fill = true ,
    id ,
    layerProps ,
    opacity = LINE.opacity ,
    width = LINE.width ,
}) =>
{
    const { colors } = useThemes() ?? {} ;

    const generated = useId() ;
    const sourceId  = id ?? `geojson-${ generated }` ;

    if ( !data )
    {
        return null ;
    }

    const paint = resolveColor( color , colors ) ;

    return (
        <Source data={ data } id={ sourceId } type="geojson">
            {
                fill && (
                    <Layer
                        filter = { [ '==' , [ 'geometry-type' ] , 'Polygon' ] }
                        id     = { `${ sourceId }-fill` }
                        paint  = {{ 'fill-color' : paint , 'fill-opacity' : FILL.opacity }}
                        type   = "fill"
                    />
                )
            }

            <Layer
                id     = { `${ sourceId }-line` }
                layout = {{ 'line-cap' : 'round' , 'line-join' : 'round' }}
                paint  = {{
                    'line-color'   : paint ,
                    'line-opacity' : opacity ,
                    'line-width'   : width ,
                    // A dashed line says « this is an order of passage, not a
                    // road » — a solid one between two addresses would be a lie
                    // about a path nobody computed.
                    ...dashed && { 'line-dasharray' : [ 2 , 1.5 ] } ,
                }}
                type   = "line"
                { ...layerProps }
            />
        </Source>
    ) ;
} ;

MapGeoJSON.displayName = 'MapGeoJSON' ;

export default MapGeoJSON ;

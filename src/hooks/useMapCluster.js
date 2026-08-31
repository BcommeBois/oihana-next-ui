'use client' ;

/**
 * Groups map points into clusters, following the viewport.
 *
 * ### Why supercluster rather than the engine's own clustering
 *
 * MapLibre can cluster a GeoJSON source on its own — it embeds this very
 * algorithm — but reading the result back means `querySourceFeatures`, which
 * only returns what is in the tiles already rendered. The answer then depends
 * on the state of the renderer : it needs a layer, even an invisible one, for
 * the tiles to load at all, and it cannot be exercised outside a browser.
 *
 * Called directly, in plain JavaScript, the same algorithm is deterministic
 * and answers before anything is drawn — which is what lets the markers stay
 * DOM elements styled from the theme rather than a paint spec.
 *
 * ### The map is a parameter, not something this reaches for
 *
 * It would be shorter to read the enclosing map out of its context here. It
 * would also make a hook depend on a component, which nothing else in this
 * folder does, and would tie the grouping to being rendered inside a map. The
 * caller passes the instance ; without one the hook still converts and still
 * groups, it simply has no viewport to narrow by.
 *
 * @module hooks/useMapCluster
 */

import { useCallback , useEffect , useMemo , useState } from 'react' ;

import Supercluster from 'supercluster' ;

import fromSchema from '../helpers/geo/fromSchema' ;

/** Supercluster's defaults, restated so the memo has something stable to key on. */
const DEFAULT_OPTIONS = { maxZoom : 16 , radius : 60 } ;

/**
 * @typedef {Object} MapClusterEntry
 * @property {string|number} id - Stable key for React.
 * @property {number} latitude
 * @property {number} longitude
 * @property {boolean} cluster - True when this stands for several points.
 * @property {number} count - How many points it stands for ; 1 for a single one.
 * @property {number} [clusterId] - Supercluster's own id, on a cluster only.
 * @property {*} [item] - The source object, on a single point only.
 * @property {Object} [point] - What `fromSchema` returned, on a single point only.
 */

/**
 * Reads a list of places and returns what should be drawn at the current
 * viewport — single points, or clusters standing for several.
 *
 * With `enabled` off it is a straight conversion : every placeable item comes
 * back as its own entry, in order, and neither the viewport nor supercluster
 * is ever consulted.
 *
 * @param {Object} props
 * @param {boolean} [props.enabled=false] - Group points into clusters.
 * @param {Array} props.items - Places, `GeoCoordinates`, or anything `fromSchema` reads.
 * @param {Object|null} [props.map] - The map instance, read for its viewport. Without one, clustering waits.
 * @param {Object} [props.options] - Supercluster options — `radius`, `maxZoom`, `minPoints`.
 * @param {'geo'|'flat'} [props.prefer] - Forwarded to `fromSchema`.
 * @returns {{ entries : MapClusterEntry[] , expand : Function }} What to draw, and `expand( entry )` to open a cluster.
 */
const useMapCluster = ( { enabled = false , items , map , options , prefer } = {} ) =>
{
    const [ viewport , setViewport ] = useState( null ) ;

    // Every item that has a position, paired with the object it came from.
    const points = useMemo( () =>
    {
        const resolved = [] ;

        for ( const item of Array.isArray( items ) ? items : [] )
        {
            const point = fromSchema( item , { prefer } ) ;

            if ( point )
            {
                resolved.push( { item , point } ) ;
            }
        }

        return resolved ;
    }
    , [ items , prefer ] ) ;

    const settings = useMemo( () => ( { ...DEFAULT_OPTIONS , ...options } ) , [ options ] ) ;

    const index = useMemo( () =>
    {
        if ( !enabled || points.length === 0 )
        {
            return null ;
        }

        const supercluster = new Supercluster( settings ) ;

        supercluster.load( points.map( ( { point } , rank ) => ({
            type       : 'Feature' ,
            geometry   : { type : 'Point' , coordinates : [ point.longitude , point.latitude ] } ,
            properties : { rank } ,
        }) ) ) ;

        return supercluster ;
    }
    , [ enabled , points , settings ] ) ;

    // The viewport is read, never driven : the map stays uncontrolled, and this
    // only asks it where it currently is.
    useEffect( () =>
    {
        if ( !map || !enabled )
        {
            return ;
        }

        const read = () =>
        {
            const bounds = map.getBounds() ;

            setViewport({
                bbox : [ bounds.getWest() , bounds.getSouth() , bounds.getEast() , bounds.getNorth() ] ,
                zoom : Math.round( map.getZoom() ) ,
            }) ;
        } ;

        read() ;

        map.on( 'moveend' , read ) ;

        return () => { map.off( 'moveend' , read ) ; } ;
    }
    , [ enabled , map ] ) ;

    const entries = useMemo( () =>
    {
        if ( !enabled )
        {
            return points.map( ( { item , point } , rank ) => ({
                cluster   : false ,
                count     : 1 ,
                id        : item?._key ?? item?.id ?? rank ,
                item ,
                latitude  : point.latitude ,
                longitude : point.longitude ,
                point ,
            }) ) ;
        }

        if ( !index || !viewport )
        {
            return [] ;
        }

        return index.getClusters( viewport.bbox , viewport.zoom ).map( ( feature ) =>
        {
            const [ longitude , latitude ] = feature.geometry.coordinates ;
            const { cluster , cluster_id , point_count , rank } = feature.properties ;

            if ( cluster )
            {
                return {
                    cluster   : true ,
                    clusterId : cluster_id ,
                    count     : point_count ,
                    id        : `cluster-${ cluster_id }` ,
                    latitude ,
                    longitude ,
                } ;
            }

            const { item , point } = points[ rank ] ;

            return {
                cluster   : false ,
                count     : 1 ,
                id        : item?._key ?? item?.id ?? `point-${ rank }` ,
                item ,
                latitude ,
                longitude ,
                point ,
            } ;
        }) ;
    }
    , [ enabled , index , points , viewport ] ) ;

    /**
     * Opens a cluster : eases to where supercluster says it comes apart.
     *
     * @param {MapClusterEntry} entry - The cluster to open.
     */
    const expand = useCallback( ( entry ) =>
    {
        if ( !index || !map || !entry?.cluster )
        {
            return ;
        }

        map.easeTo({
            center : [ entry.longitude , entry.latitude ] ,
            zoom   : index.getClusterExpansionZoom( entry.clusterId ) ,
        }) ;
    }
    , [ index , map ] ) ;

    return { entries , expand } ;
} ;

export default useMapCluster ;

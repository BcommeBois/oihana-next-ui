import estimateStorage from '../estimateStorage' ;

import { runQuery } from './query' ;

const DAY = 24 * 3600 * 1000 ;

const id = ( kind , key ) => `${ kind }\u0000${ key }` ;

/**
 * Creates a reserve : the records an application keeps on the device to read
 * them without a network — what was seen, what was prepared for the day. The
 * library keeps them, ages them and searches them ; what to keep, and when to
 * read it again from the server, is the application's.
 *
 * A record that outlives its `ttl` is `expired` : still read (old data beats no
 * data), and the first to go when `sweep` runs. A `pinned` record never goes by
 * itself. `token` is the application's own mark of freshness (a harvest token,
 * a version), kept and handed back, never interpreted.
 *
 * @param {Object} options
 * @param {Object} options.repository - `idbStoreRepository( db )` in a browser, `memoryStoreRepository()` elsewhere.
 * @param {number} [options.ttl=604800000] - How long a record stays fresh, ms (7 days).
 * @param {number} [options.softLimit=104857600] - Bytes : beyond, `sweep` removes the oldest records (100 MB).
 * @param {string} [options.locale] - The language texts are sorted in.
 * @param {Function} [options.now=Date.now]
 * @param {Function} [options.estimate] - `() => Promise<{ usage , quota }>`.
 * @returns {Object} `{ remember , rememberMany , read , list , forget , pin , clear , describe , query , sweep , subscribe }`.
 *
 * @example
 * const store = createStore( { repository : idbStoreRepository( await openOfflineDb( 'wms' ) ) } ) ;
 * await store.remember( 'parcel' , parcel.id , parcel ) ;
 * const { value , seenAt , expired } = await store.read( 'parcel' , id ) ?? {} ;
 */
const createStore =
({
    repository ,
    ttl       = 7 * DAY ,
    softLimit = 100 * 1024 * 1024 ,
    locale ,
    now       = Date.now ,
    estimate  = estimateStorage ,
} = {}) =>
{
    if ( !repository )
    {
        throw new TypeError( 'A reserve needs a repository.' ) ;
    }

    const listeners    = new Set() ;
    const descriptions = new Map() ;

    const emit = change =>
    {
        for ( const listener of listeners )
        {
            try
            {
                listener( change ) ;
            }
            catch ( error )
            {
                console.error( error ) ;
            }
        }
    } ;

    const expose = record => record ? { ...record , expired : !record.pinned && record.expiresAt <= now() } : null ;

    const remember = async ( kind , key , value , { pinned , token = null , ttl : own } = {} ) =>
    {
        const previous = await repository.get( kind , key ) ;
        const seenAt   = now() ;

        const record =
        {
            kind ,
            key ,
            value ,
            token ,
            seenAt ,
            expiresAt : seenAt + ( own ?? ttl ) ,
            pinned    : pinned ?? previous?.pinned ?? false ,
        } ;

        await repository.put( record ) ;
        emit( { key , kind } ) ;

        return expose( record ) ;
    } ;

    /**
     * Keeps many records of a kind at once — a day prepared — in one write,
     * telling the subscribers once.
     *
     * @param {string} kind
     * @param {Array<{ key : string|number , value : * }>} entries
     * @param {Object} [settings] - `{ pinned , token , ttl }`, for every entry.
     * @returns {Promise<number>} The records kept.
     */
    const rememberMany = async ( kind , entries , { pinned , token = null , ttl : own } = {} ) =>
    {
        const seenAt   = now() ;
        const previous = new Map( ( await repository.byKind( kind ) ).map( record => [ record.key , record ] ) ) ;

        await repository.putMany( entries.map( ( { key , value } ) => (
        {
            kind ,
            key ,
            value ,
            token ,
            seenAt ,
            expiresAt : seenAt + ( own ?? ttl ) ,
            pinned    : pinned ?? previous.get( key )?.pinned ?? false ,
        } ) ) ) ;

        emit( { kind } ) ;

        return entries.length ;
    } ;

    const read = async ( kind , key ) => expose( await repository.get( kind , key ) ) ;

    const list = async kind => ( await repository.byKind( kind ) ).sort( ( a , b ) => b.seenAt - a.seenAt ).map( expose ) ;

    const forget = async ( kind , key ) =>
    {
        await repository.delete( kind , key ) ;
        emit( { key , kind } ) ;
    } ;

    const pin = async ( kind , key , pinned = true ) =>
    {
        const record = await repository.get( kind , key ) ;
        if ( !record )
        {
            return null ;
        }
        const next = { ...record , pinned } ;
        await repository.put( next ) ;
        emit( { key , kind } ) ;
        return expose( next ) ;
    } ;

    const clear = async kind =>
    {
        await repository.clear( kind ) ;
        emit( { kind } ) ;
    } ;

    const describe = ( kind , description ) =>
    {
        if ( description !== undefined )
        {
            descriptions.set( kind , description ) ;
        }
        return descriptions.get( kind ) ?? {} ;
    } ;

    const query = async ( kind , request = {} ) =>
    {
        const records = await repository.byKind( kind ) ;
        return runQuery( records.map( record => record.value ) , request , descriptions.get( kind ) , request.locale ?? locale ) ;
    } ;

    /**
     * Removes the expired records, then — while the storage is over `softLimit`
     * — the oldest seen, a tenth at a time. Never a pinned one, never one in
     * `keep` (the records a waiting outbox item uses).
     *
     * @param {Object} [options]
     * @param {Array<[string, string|number]>} [options.keep=[]]
     * @returns {Promise<{ removed : number }>}
     */
    const sweep = async ( { keep = [] } = {} ) =>
    {
        const kept    = new Set( keep.map( ( [ kind , key ] ) => id( kind , key ) ) ) ;
        const movable = record => !record.pinned && !kept.has( id( record.kind , record.key ) ) ;

        const records = await repository.all() ;
        const expired = records.filter( record => movable( record ) && record.expiresAt <= now() ) ;

        for ( const record of expired )
        {
            await repository.delete( record.kind , record.key ) ;
        }

        let removed = expired.length ;

        let { usage } = await estimate() ;

        if ( usage > softLimit )
        {
            const left = records
                .filter( record => movable( record ) && record.expiresAt > now() )
                .sort( ( a , b ) => a.seenAt - b.seenAt ) ;

            const batch = Math.max( 1 , Math.ceil( left.length / 10 ) ) ;

            while ( usage > softLimit && left.length )
            {
                for ( const record of left.splice( 0 , batch ) )
                {
                    await repository.delete( record.kind , record.key ) ;
                    removed += 1 ;
                }
                ( { usage } = await estimate() ) ;
            }
        }

        if ( removed )
        {
            emit( {} ) ;
        }

        return { removed } ;
    } ;

    return {
        clear ,
        describe ,
        forget ,
        list ,
        pin ,
        query ,
        read ,
        remember ,
        rememberMany ,
        subscribe : listener =>
        {
            listeners.add( listener ) ;
            return () => listeners.delete( listener ) ;
        } ,
        sweep ,
    } ;
} ;

export default createStore ;

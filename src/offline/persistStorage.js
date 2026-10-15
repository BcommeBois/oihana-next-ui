/**
 * Asks the browser not to evict this origin's storage when space runs low —
 * without it, Safari may clear the data of a site unvisited for seven days.
 * Answers `false` where the API is missing.
 *
 * @returns {Promise<boolean>} Whether the storage is persistent.
 */
const persistStorage = async () =>
{
    const storage = globalThis.navigator?.storage ;

    if ( !storage?.persist )
    {
        return false ;
    }

    try
    {
        if ( await storage.persisted?.() )
        {
            return true ;
        }
        return await storage.persist() ;
    }
    catch
    {
        return false ;
    }
} ;

export default persistStorage ;

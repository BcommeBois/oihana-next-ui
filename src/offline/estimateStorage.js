/**
 * What this origin uses of its storage, and how much it may use. Answers
 * `{ usage : 0 , quota : Infinity }` where the API is missing.
 *
 * @returns {Promise<{ usage : number , quota : number }>} Bytes.
 */
const estimateStorage = async () =>
{
    const storage = globalThis.navigator?.storage ;

    if ( !storage?.estimate )
    {
        return { usage : 0 , quota : Number.POSITIVE_INFINITY } ;
    }

    try
    {
        const { usage = 0 , quota = Number.POSITIVE_INFINITY } = await storage.estimate() ;
        return { usage , quota } ;
    }
    catch
    {
        return { usage : 0 , quota : Number.POSITIVE_INFINITY } ;
    }
} ;

export default estimateStorage ;

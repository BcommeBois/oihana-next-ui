'use server'

import { revalidatePath } from 'next/cache'

/**
 * Revalidate and clear the server cache of the specific path.
 * @param path
 */
const clearCache = ( path = '/' ) =>
{
    revalidatePath( path );
}

export default clearCache ;
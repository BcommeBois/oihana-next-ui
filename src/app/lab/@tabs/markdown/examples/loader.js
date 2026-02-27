import { readFile } from 'fs/promises' ;
import { join } from 'path' ;

export async function loadMarkdown( filename )
{
    const filePath = join( process.cwd() , 'src/app/lab/@tabs/markdown/examples' , `${ filename }.md` ) ;
    return await readFile( filePath , 'utf-8' ) ;
}
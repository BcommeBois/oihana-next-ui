import matchAccept from './matchAccept' ;

/**
 * Why a file was refused.
 *
 * `custom` is a refusal of the host's own `validate`, which gives its message.
 *
 * @type {{ CUSTOM : string , DECODE : string , MAX_DIMENSIONS : string , MAX_FILES : string , MAX_SIZE : string , MIN_DIMENSIONS : string , MIN_SIZE : string , TYPE : string }}
 */
export const FILE_REFUSALS = Object.freeze(
{
    CUSTOM         : 'custom' ,
    DECODE         : 'decode' ,
    MAX_DIMENSIONS : 'maxDimensions' ,
    MAX_FILES      : 'maxFiles' ,
    MAX_SIZE       : 'maxSize' ,
    MIN_DIMENSIONS : 'minDimensions' ,
    MIN_SIZE       : 'minSize' ,
    TYPE           : 'type' ,
} ) ;

const has = value => value !== null && value !== undefined ;

/**
 * Whether the rules hold a dimension, so the images must be decoded to be checked.
 *
 * @param {Object} [rules]
 * @returns {boolean}
 */
export const needsDimensions = ( { maxHeight , maxWidth , minHeight , minWidth } = {} ) =>
    has( maxHeight ) || has( maxWidth ) || has( minHeight ) || has( minWidth ) ;

/**
 * Checks one file against the rules, the count left aside.
 *
 * In order : its type, its weight, its dimensions — for an image, when the
 * rules hold one and `dimensions` is given — then the host's `validate`.
 *
 * @param {File|{ name : string , size : number , type : string }} file
 * @param {Object} [rules]
 * @param {string|string[]} [rules.accept] - See {@link module:helpers/files/matchAccept}.
 * @param {number} [rules.maxSize] - In bytes.
 * @param {number} [rules.minSize] - In bytes.
 * @param {number} [rules.maxWidth] - In pixels, images only.
 * @param {number} [rules.maxHeight] - In pixels, images only.
 * @param {number} [rules.minWidth] - In pixels, images only.
 * @param {number} [rules.minHeight] - In pixels, images only.
 * @param {Function} [rules.validate] - `( file ) => true | string`.
 * @param {?{ width : number , height : number }|false} [dimensions] - The image's size ; `false` when it could not be read.
 *
 * @returns {?{ reason : string , message? : string }} `null` when the file is accepted.
 */
export const checkFile = ( file , rules = {} , dimensions ) =>
{
    const { accept , maxHeight , maxSize , maxWidth , minHeight , minSize , minWidth , validate } = rules ;

    if ( !matchAccept( file , accept ) )
    {
        return { reason : FILE_REFUSALS.TYPE } ;
    }

    if ( has( maxSize ) && file.size > maxSize )
    {
        return { reason : FILE_REFUSALS.MAX_SIZE } ;
    }

    if ( has( minSize ) && file.size < minSize )
    {
        return { reason : FILE_REFUSALS.MIN_SIZE } ;
    }

    if ( dimensions === false )
    {
        return { reason : FILE_REFUSALS.DECODE } ;
    }

    if ( dimensions )
    {
        const { height , width } = dimensions ;

        if ( ( has( minWidth ) && width < minWidth ) || ( has( minHeight ) && height < minHeight ) )
        {
            return { reason : FILE_REFUSALS.MIN_DIMENSIONS } ;
        }

        if ( ( has( maxWidth ) && width > maxWidth ) || ( has( maxHeight ) && height > maxHeight ) )
        {
            return { reason : FILE_REFUSALS.MAX_DIMENSIONS } ;
        }
    }

    if ( typeof validate === 'function' )
    {
        const verdict = validate( file ) ;

        if ( verdict !== true )
        {
            return { message : typeof verdict === 'string' ? verdict : undefined , reason : FILE_REFUSALS.CUSTOM } ;
        }
    }

    return null ;
} ;

/**
 * Sorts dropped or chosen files into accepted and refused.
 *
 * Each file is checked by {@link checkFile} ; `maxFiles` counts the files
 * already there (`count`) and those accepted before it, so the first ones
 * dropped are the ones kept.
 *
 * Pure : a file's dimensions are read by the caller — a browser task — and
 * given in `dimensions`, keyed by the file.
 *
 * @module helpers/files/checkFiles
 *
 * @param {Array<File>} files
 * @param {Object} [rules] - The rules of {@link checkFile}, and `maxFiles`.
 * @param {Object} [options]
 * @param {number} [options.count=0] - The files already accepted before these.
 * @param {Map<File,{ width : number , height : number }|false>} [options.dimensions] - The images' sizes.
 *
 * @returns {{ accepted : File[] , rejected : Array<{ file : File , reason : string , message? : string }> }}
 *
 * @example
 * ```js
 * const { accepted , rejected } = checkFiles( files , { accept : '.pdf' , maxSize : 5 * 1024 * 1024 , maxFiles : 3 } ) ;
 * ```
 */
const checkFiles = ( files , rules = {} , { count = 0 , dimensions } = {} ) =>
{
    const { maxFiles } = rules ;

    const accepted = [] ;
    const rejected = [] ;

    for ( const file of files ?? [] )
    {
        const refusal = checkFile( file , rules , dimensions?.get( file ) ) ;

        if ( refusal )
        {
            rejected.push( { file , ...refusal } ) ;
            continue ;
        }

        if ( has( maxFiles ) && count + accepted.length >= maxFiles )
        {
            rejected.push( { file , reason : FILE_REFUSALS.MAX_FILES } ) ;
            continue ;
        }

        accepted.push( file ) ;
    }

    return { accepted , rejected } ;
} ;

export default checkFiles ;

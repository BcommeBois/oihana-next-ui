/**
 * Queued, not sent yet (or sent and to be tried again).
 * @type {string}
 */
export const PENDING = 'pending' ;

/**
 * Handed to `send`, no answer yet.
 * @type {string}
 */
export const POSTING = 'posting' ;

/**
 * The server took it ; `result` holds its answer.
 * @type {string}
 */
export const DONE = 'done' ;

/**
 * The server refused it for good (a 4xx, or too many attempts) : a person decides.
 * @type {string}
 */
export const REJECTED = 'rejected' ;

/**
 * The target changed elsewhere (409, 412) : a person — or `onConflict` — decides.
 * @type {string}
 */
export const CONFLICT = 'conflict' ;

/**
 * One of its `dependsOn` failed or is gone : it cannot leave before that one does.
 * @type {string}
 */
export const BLOCKED = 'blocked' ;

/**
 * Every status, in the order of a life.
 * @type {string[]}
 */
export const STATUSES = [ PENDING , POSTING , DONE , REJECTED , CONFLICT , BLOCKED ] ;

/**
 * The statuses an item rests in until someone acts.
 * @type {string[]}
 */
export const FAILED = [ REJECTED , CONFLICT , BLOCKED ] ;

/**
 * The statuses that end a wait declared with `after`.
 * @type {string[]}
 */
export const SETTLED = [ DONE , REJECTED , CONFLICT , BLOCKED ] ;

/**
 * The `code` of an error raised when the storage cannot take the files.
 * @type {string}
 */
export const QUOTA = 'quota' ;

/**
 * The `code` set on `lastError` when the attempts ran out.
 * @type {string}
 */
export const EXHAUSTED = 'exhausted' ;

/**
 * Builds a new item, born on the device : its `id` is the primary key, the
 * idempotency key the server receives and the correlation id, all at once.
 *
 * @param {Object} init
 * @param {string} init.kind - What it is, for the transport (`'receipt'`, `'http'`…).
 * @param {*} [init.payload=null] - Structured-cloneable data ; never a function.
 * @param {?string} [init.target=null] - The business target ; two pending items of a kind and a target replace each other.
 * @param {string[]} [init.dependsOn=[]] - Items whose result this one needs (handed to `send` as `refs`).
 * @param {string[]} [init.after=[]] - Items that must be over first, whatever their outcome.
 * @param {Object[]} [init.files=[]] - `{ name , type , field , size }` — the bytes live in their own store.
 * @param {?string} [init.scope=null] - The account that queued it.
 * @param {Array<[string, string|number]>} [init.uses=[]] - The reserve records it needs, `[ kind , key ]` : kept until it is sent.
 * @param {number} [now=Date.now()]
 * @returns {Object} The item.
 */
export const createItem = ( { after = [] , dependsOn = [] , files = [] , kind , payload = null , scope = null , target = null , uses = [] } , now = Date.now() ) =>
{
    if ( typeof kind !== 'string' || kind === '' )
    {
        throw new TypeError( 'An outbox item needs a kind.' ) ;
    }

    return {
        id            : globalThis.crypto.randomUUID() ,
        kind ,
        target ,
        payload ,
        files ,
        dependsOn ,
        after ,
        uses ,
        scope ,
        status        : PENDING ,
        attempts      : 0 ,
        nextAttemptAt : now ,
        claimedAt     : null ,
        lastError     : null ,
        result        : null ,
        createdAt     : now ,
        updatedAt     : now ,
    } ;
} ;

/**
 * An error a transport throws : what the server said, readable.
 *
 * @param {Object} init
 * @param {number} [init.status=0] - The HTTP status ; `0` when nothing came back.
 * @param {?string} [init.code=null] - A code the API gives (`unit_already_consumed`…), or `network`, `timeout`, `aborted`.
 * @param {string} [init.message] - A sentence.
 * @param {?number} [init.retryAfter=null] - Milliseconds the server asks to wait (`Retry-After`) : the next attempt waits that long, uncounted, and the whole queue pauses.
 * @returns {Error & { status : number , code : ?string , retryAfter : ?number }}
 */
export const createOutboxError = ( { code = null , message , retryAfter = null , status = 0 } = {} ) =>
{
    const error = new Error( message ?? code ?? `HTTP ${ status }` ) ;
    error.status     = status ;
    error.code       = code ;
    error.retryAfter = retryAfter ;
    return error ;
} ;

/**
 * What an item keeps of an error : plain and storable.
 *
 * @param {*} error
 * @returns {{ status : ?number , code : ?string , message : string }}
 */
export const toLastError = error =>
({
    status  : typeof error?.status === 'number' ? error.status : null ,
    code    : error?.code ?? null ,
    message : error?.message ?? String( error ) ,
}) ;

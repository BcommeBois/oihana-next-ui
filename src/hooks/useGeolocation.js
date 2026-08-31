'use client' ;

/**
 * Where the user is, asked for explicitly.
 *
 * ### It lives outside a map, on purpose
 *
 * The engine has a geolocation control and it is a good one — but it only
 * exists inside a map. An address form wanting a « locate me » button has the
 * same need and nothing to draw, which is the whole reason this hook is not
 * part of `components/maps`.
 *
 * ### Nothing happens until you ask
 *
 * Mounting reads the *permission state*, which does not prompt. The browser
 * dialog only appears on `request()`. A hook that asked on mount would put a
 * permission prompt in front of anyone who merely loaded a page — the one
 * behaviour that teaches users to click « block ».
 *
 * @module hooks/useGeolocation
 */

import { useCallback , useEffect , useRef , useState } from 'react' ;

import { DENIED , GEOLOCATION , GRANTED , LOADING , PROMPT } from '../helpers/permissions' ;

/** The user refused, here or in the browser's settings. */
export const REFUSED = 'refused' ;

/** The device has no fix to give — no signal, no provider. */
export const UNAVAILABLE = 'unavailable' ;

/** Nothing came back in time. */
export const TIMEOUT = 'timeout' ;

/** The browser has no Geolocation API at all. */
export const UNSUPPORTED = 'unsupported' ;

/**
 * `GeolocationPositionError` codes, named.
 * @type {Object.<number,string>}
 */
const ERROR_KINDS =
{
    1 : REFUSED ,
    2 : UNAVAILABLE ,
    3 : TIMEOUT ,
} ;

/**
 * Reads a browser position into the shape the rest of the library speaks.
 *
 * `latitude` and `longitude`, flat — the same names `fromSchema` returns, so a
 * fix spreads straight into a map or a marker with nothing in between.
 *
 * @param {GeolocationPosition} position
 * @returns {Object}
 */
const readPosition = ( position ) =>
{
    const { accuracy , altitude , altitudeAccuracy , heading , latitude , longitude , speed } = position.coords ;

    return {
        accuracy ,
        altitude ,
        altitudeAccuracy ,
        heading ,
        latitude ,
        longitude ,
        speed ,
        timestamp : position.timestamp ,
    } ;
} ;

/**
 * @typedef {Object} GeolocationError
 * @property {string} kind - `refused`, `unavailable`, `timeout` or `unsupported`.
 * @property {number} [code] - The browser's own code, when there is one.
 * @property {string} message
 */

/**
 * The user's position, and the permission that guards it.
 *
 * The returned shape follows `useMediaPermission` — `permissionState`,
 * `isGranted`, `isDenied`, `isLoading`, `request` — so the two read the same
 * way, and adds what a position needs.
 *
 * **A refusal is a state, not an error to swallow.** It comes back as
 * `isDenied` with an `error.kind` of `refused`, and it is the caller's job to
 * say something useful about it — a map that silently does nothing when the
 * button is pressed is the worst of the three outcomes.
 *
 * @param {Object} [props]
 * @param {boolean} [props.enableHighAccuracy=false] - Ask the device for its best fix. Slower, and hungrier.
 * @param {number} [props.maximumAge=0] - How old a cached fix may be, in milliseconds.
 * @param {number} [props.timeout=10000] - How long to wait for a fix, in milliseconds.
 * @param {boolean} [props.watch=false] - `request()` then follows the user until `stop()`.
 *
 * @returns {Object} `{ error , isDenied , isGranted , isLoading , permissionState , position , request , stop , watching }`
 *
 * @example
 * ```jsx
 * const { isDenied , position , request } = useGeolocation() ;
 *
 * <Button onClick={ request }>Me localiser</Button>
 * { position && <Map { ...position } mapStyle={ style } /> }
 * { isDenied && <Alert level="warning">…</Alert> }
 * ```
 */
const useGeolocation = ( { enableHighAccuracy = false , maximumAge = 0 , timeout = 10000 , watch = false } = {} ) =>
{
    const [ error           , setError ]           = useState( null ) ;
    const [ permissionState , setPermissionState ] = useState( LOADING ) ;
    const [ position        , setPosition ]        = useState( null ) ;
    const [ watching        , setWatching ]        = useState( false ) ;

    const watchId = useRef( null ) ;

    // Reading the permission is not asking for it : this never prompts.
    useEffect( () =>
    {
        let mounted = true ;

        const check = async () =>
        {
            try
            {
                const result = await navigator.permissions.query( { name : GEOLOCATION } ) ;

                if ( mounted )
                {
                    setPermissionState( result.state ) ;
                }

                result.addEventListener( 'change' , () =>
                {
                    if ( mounted )
                    {
                        setPermissionState( result.state ) ;
                    }
                } ) ;
            }
            catch
            {
                // Safari answered nothing useful for years, and some browsers
                // refuse the query outright. `prompt` is the honest guess : we
                // do not know, and asking is still allowed.
                if ( mounted )
                {
                    setPermissionState( PROMPT ) ;
                }
            }
        } ;

        void check() ;

        return () => { mounted = false ; } ;
    }
    , [] ) ;

    const clear = useCallback( () =>
    {
        if ( watchId.current !== null )
        {
            navigator.geolocation.clearWatch( watchId.current ) ;
            watchId.current = null ;
        }
    }
    , [] ) ;

    useEffect( () => clear , [ clear ] ) ;

    const stop = useCallback( () =>
    {
        clear() ;
        setWatching( false ) ;
    }
    , [ clear ] ) ;

    const request = useCallback( () =>
    {
        if ( typeof navigator === 'undefined' || !navigator.geolocation )
        {
            setError( { kind : UNSUPPORTED , message : 'This browser has no Geolocation API.' } ) ;
            return ;
        }

        const onSuccess = ( result ) =>
        {
            setError( null ) ;
            setPosition( readPosition( result ) ) ;
            setPermissionState( GRANTED ) ;
        } ;

        const onError = ( failure ) =>
        {
            const kind = ERROR_KINDS[ failure.code ] ?? UNAVAILABLE ;

            setError( { code : failure.code , kind , message : failure.message } ) ;

            // The permission query does not always fire on a refusal, and a
            // caller reading `isDenied` should not have to know that.
            if ( kind === REFUSED )
            {
                setPermissionState( DENIED ) ;
                stop() ;
            }
        } ;

        const options = { enableHighAccuracy , maximumAge , timeout } ;

        if ( watch )
        {
            clear() ;
            watchId.current = navigator.geolocation.watchPosition( onSuccess , onError , options ) ;
            setWatching( true ) ;
            return ;
        }

        navigator.geolocation.getCurrentPosition( onSuccess , onError , options ) ;
    }
    , [ clear , enableHighAccuracy , maximumAge , stop , timeout , watch ] ) ;

    return {
        error ,
        isDenied  : permissionState === DENIED ,
        isGranted : permissionState === GRANTED ,
        isLoading : permissionState === LOADING ,
        permissionState ,
        position ,
        request ,
        stop ,
        watching ,
    } ;
} ;

export default useGeolocation ;

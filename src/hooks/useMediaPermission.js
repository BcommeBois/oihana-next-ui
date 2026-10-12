import { useEffect , useState } from 'react' ;

const LOADING = 'loading' ;
const GRANTED = 'granted' ;
const DENIED  = 'denied'  ;
const PROMPT  = 'prompt'  ;

/**
 * React hook to manage media permissions.
 *
 * 🚨 **`request()` asks, it does not keep.** Asking means opening the device :
 * the stream it returns is stopped at once, track by track. Left open, the
 * camera light stays on and the device stays busy until the tab closes — the
 * component that films opens its own stream when it needs one.
 *
 * @param {'camera' | 'microphone'} type - The permission type.
 */
const useMediaPermission = ( type ) =>
{
    const [ permissionState , setPermissionState ] = useState( LOADING ) ;

    useEffect( () =>
    {
        let mounted = true ;
        let status  = null ;

        const onChange = () =>
        {
            if ( mounted ) setPermissionState( status.state ) ;
        } ;

        const checkPermission = async () =>
        {
            try
            {
                const result = await navigator.permissions.query( { name: type } ) ;

                // Unmounted while the query ran : nothing to listen for.
                if ( !mounted ) return ;

                status = result ;
                setPermissionState( result.state ) ;
                result.addEventListener( 'change' , onChange ) ;
            }
            catch
            {
                if ( mounted ) setPermissionState( PROMPT ) ;
            }
        } ;

        void checkPermission() ;

        return () =>
        {
            mounted = false ;
            status?.removeEventListener( 'change' , onChange ) ;
        } ;
    }
    , [ type ] ) ;

    const request = async () =>
    {
        try
        {
            const constraints = type === 'camera' ? { video: true } : { audio: true } ;
            const stream = await navigator.mediaDevices.getUserMedia( constraints ) ;
            for ( const track of stream.getTracks() )
            {
                track.stop() ;
            }
            setPermissionState( GRANTED ) ;
        }
        catch ( err )
        {
            console.error( `${ type } access error:` , err ) ;
            setPermissionState( DENIED ) ;
        }
    } ;

    return {
        permissionState ,
        request ,
        isGranted : permissionState === GRANTED ,
        isDenied  : permissionState === DENIED  ,
        isLoading : permissionState === LOADING ,
    } ;
} ;

export default useMediaPermission ;
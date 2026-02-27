import { useEffect , useState } from 'react' ;

const LOADING = 'loading' ;
const GRANTED = 'granted' ;
const DENIED  = 'denied'  ;
const PROMPT  = 'prompt'  ;

/**
 * React hook to manage media permissions.
 *
 * @param {'camera' | 'microphone'} type - The permission type.
 */
const useMediaPermission = ( type ) =>
{
    const [ permissionState , setPermissionState ] = useState( LOADING ) ;

    useEffect( () =>
    {
        let mounted = true ;

        const checkPermission = async () =>
        {
            try
            {
                const result = await navigator.permissions.query( { name: type } ) ;

                if ( mounted ) setPermissionState( result.state ) ;

                result.addEventListener( 'change' , () =>
                {
                    if ( mounted ) setPermissionState( result.state ) ;
                } ) ;
            }
            catch
            {
                if ( mounted ) setPermissionState( PROMPT ) ;
            }
        } ;

        void checkPermission() ;

        return () => { mounted = false ; } ;
    }
    , [ type ] ) ;

    const request = async () =>
    {
        try
        {
            const constraints = type === 'camera' ? { video: true } : { audio: true } ;
            await navigator.mediaDevices.getUserMedia( constraints ) ;
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
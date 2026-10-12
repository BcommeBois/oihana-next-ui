/**
 * Default copy of the `components/barcodes` family.
 *
 * The accessible name says what the image is, never what it holds : a code
 * may carry a secret (a two-factor enrolment), which must not be read aloud.
 */
const barcode =
{
    fr :
    {
        barcode : { label : 'Code-barres' } ,
        qrCode  : { label : 'Code QR' } ,
        scanner :
        {
            label      : 'Lecteur de codes' ,
            starting   : 'Ouverture de la caméra…' ,
            scanning   : 'Visez un code.' ,
            denied     : 'L’accès à la caméra a été refusé.' ,
            deniedHelp : 'Autorisez la caméra pour ce site dans les réglages du navigateur, puis réessayez.' ,
            insecure   : 'La caméra demande une connexion sécurisée (HTTPS).' ,
            noCamera   : 'Aucune caméra disponible : elle est absente, ou déjà utilisée par une autre application.' ,
            error      : 'La caméra n’a pas pu démarrer.' ,
            retry      : 'Réessayer' ,
            torchOn    : 'Allumer la torche' ,
            torchOff   : 'Éteindre la torche' ,
        } ,
    } ,

    en :
    {
        barcode : { label : 'Barcode' } ,
        qrCode  : { label : 'QR code' } ,
        scanner :
        {
            label      : 'Code reader' ,
            starting   : 'Opening the camera…' ,
            scanning   : 'Aim at a code.' ,
            denied     : 'Access to the camera was refused.' ,
            deniedHelp : 'Allow the camera for this site in the browser settings, then try again.' ,
            insecure   : 'The camera needs a secure connection (HTTPS).' ,
            noCamera   : 'No camera available : there is none, or another application is using it.' ,
            error      : 'The camera could not start.' ,
            retry      : 'Try again' ,
            torchOn    : 'Turn the torch on' ,
            torchOff   : 'Turn the torch off' ,
        } ,
    } ,
} ;

export default barcode ;

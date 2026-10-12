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
        qrCode : { label : 'Code QR' } ,
    } ,

    en :
    {
        qrCode : { label : 'QR code' } ,
    } ,
} ;

export default barcode ;

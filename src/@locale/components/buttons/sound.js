/**
 * The sound toggle is named after what it does when pressed down — « Mute » —
 * and says whether it is down through `aria-pressed`. A name that flipped
 * between « Mute » and « Unmute » would change under the focus, and a screen
 * reader may announce it twice.
 */
const sound =
{
    fr :
    {
        title   : 'Couper le son' ,
        tooltip : 'Couper le son' ,
    } ,
    en :
    {
        title   : 'Mute' ,
        tooltip : 'Mute' ,
    }
}

export default sound ;

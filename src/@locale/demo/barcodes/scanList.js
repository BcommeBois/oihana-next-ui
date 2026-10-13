/**
 * Labels of the scan list demo.
 */
const scanList =
{
    fr :
    {
        title       : 'La liste des scans' ,
        text        : 'Un champ, et sous lui ce qu’il a lu : le dernier code en tête, un code déjà lu compte un de plus sur sa ligne (surlignée un instant) au lieu de s’ajouter. Balayez une ligne vers la gauche pour la retirer, ou utilisez ses boutons. Le nom derrière un code vient de la page (resolve) : la liste ne connaît aucun article.' ,
        label       : 'Scanner les colis' ,
        placeholder : 'Un code, puis Entrée — ou la caméra' ,
        use         : 'Lire « {0} »' ,
        clear       : 'Vider' ,
        help        : 'max={ 20 } : la vingt-et-unième ligne est refusée (bip d’erreur). Un code inconnu s’affiche tel quel, en mono.' ,
        names       : { cola : 'Boisson gazeuse 33 cl' , oak : 'Planche chêne 27 × 200' , pasta : 'Pâtes 500 g' } ,
        status      : { added : '{0} : ajouté.' , counted : '{0} : un de plus.' , refused : '{0} : refusé, liste pleine.' } ,
    } ,
    en :
    {
        title       : 'The scan list' ,
        text        : 'A field, and under it what it read: the latest code on top, a code read again counting one more on its line (lit for a moment) instead of adding one. Swipe a row to the left to remove it, or use its buttons. The name behind a code comes from the page (resolve): the list knows no article.' ,
        label       : 'Scan the parcels' ,
        placeholder : 'A code, then Enter — or the camera' ,
        use         : 'Read « {0} »' ,
        clear       : 'Clear' ,
        help        : 'max={ 20 }: the twenty-first line is refused (error beep). An unknown code shows as it is, in mono.' ,
        names       : { cola : 'Soft drink 33 cl' , oak : 'Oak board 27 × 200' , pasta : 'Pasta 500 g' } ,
        status      : { added : '{0}: added.' , counted : '{0}: one more.' , refused : '{0}: refused, list full.' } ,
    } ,
} ;

export default scanList ;

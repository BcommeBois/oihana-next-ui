/**
 * The theme toggle says what it does, not what it will do.
 *
 * « Passer en sombre » would have to read the current theme and would be wrong
 * for the half second the page renders before it is known — a name that changes
 * under a focus is also a name a screen reader may announce twice. « Basculer »
 * is true in both directions.
 */
const theme =
{
    fr :
    {
        title   : 'Basculer le thème' ,
        tooltip : 'Basculer le thème' ,
    } ,
    en :
    {
        title   : 'Toggle theme' ,
        tooltip : 'Toggle theme' ,
    }
}

export default theme ;

const keypad =
{
    fr :
    {
        sound : 'Bip et vibration' ,

        intro : 'Aucun clavier système ne s’ouvre : l’afficheur n’est pas un champ. Une touche au-delà d’une limite est refusée, la valeur ne bouge pas et onLimit dit pourquoi. Avec le focus sur le pavé, le clavier physique marche aussi (chiffres, virgule, retour arrière, Échap, + et -, Entrée).' ,

        simple :
        {
            title  : 'Un pavé simple' ,
            label  : 'Quantité' ,
            layout : 'Disposition' ,
            phone  : 'Téléphone' ,
            calc   : 'Calculatrice' ,
            size   : 'Taille' ,
        } ,

        volume :
        {
            title : 'Trois décimales, entre 0,5 et 50' ,
            label : 'Volume' ,
            note  : 'step={ 0.5 } sur les boutons − et +, et repeat : gardez-les appuyés, la valeur avance seule et s’arrête à 0,5 ou à 50. Essayez aussi une quatrième décimale, ou 51.' ,
        } ,

        sheet :
        {
            title    : 'Dans un BottomSheet' ,
            note     : 'Le cas du préparateur : il touche la ligne, le pavé monte, il valide, le pavé redescend. Stock disponible : 120.' ,
            product  : 'Planche chêne 27 × 200 — 2,40 m' ,
            quantity : 'Quantité : {0}' ,
            none     : 'à saisir' ,
            open     : 'Saisir la quantité' ,
            label    : 'Quantité à préparer' ,
            unit     : 'pièces' ,
        } ,

        limits :
        {
            max      : 'Au-delà du maximum.' ,
            min      : 'En dessous du minimum.' ,
            decimals : 'Une décimale de trop.' ,
            length   : 'Trop de chiffres.' ,
        } ,

        change : 'Dernier onChange' ,
        submit : 'Dernier onSubmit' ,
        limit  : 'Dernier onLimit' ,
        empty  : 'rien pour l’instant' ,
    } ,

    en :
    {
        sound : 'Beep and vibration' ,

        intro : 'No system keyboard opens : the display is not a field. A key past a limit is refused, the value stays as it was and onLimit says why. With the focus on the keypad, the physical keyboard works too (digits, separator, backspace, Escape, + and -, Enter).' ,

        simple :
        {
            title  : 'A plain keypad' ,
            label  : 'Quantity' ,
            layout : 'Layout' ,
            phone  : 'Phone' ,
            calc   : 'Calculator' ,
            size   : 'Size' ,
        } ,

        volume :
        {
            title : 'Three decimals, between 0.5 and 50' ,
            label : 'Volume' ,
            note  : 'step={ 0.5 } on the − and + buttons, and repeat : hold them down, the value moves on its own and stops at 0.5 or 50. Try a fourth decimal too, or 51.' ,
        } ,

        sheet :
        {
            title    : 'In a BottomSheet' ,
            note     : 'The picker’s case : touch the line, the keypad rises, confirm, it falls back. Stock available : 120.' ,
            product  : 'Oak board 27 × 200 — 2.40 m' ,
            quantity : 'Quantity : {0}' ,
            none     : 'to enter' ,
            open     : 'Enter the quantity' ,
            label    : 'Quantity to pick' ,
            unit     : 'pieces' ,
        } ,

        limits :
        {
            max      : 'Past the maximum.' ,
            min      : 'Under the minimum.' ,
            decimals : 'One decimal too many.' ,
            length   : 'Too many digits.' ,
        } ,

        change : 'Last onChange' ,
        submit : 'Last onSubmit' ,
        limit  : 'Last onLimit' ,
        empty  : 'nothing yet' ,
    } ,
} ;

export default keypad ;

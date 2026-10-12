const kbd =
{
    fr :
    {
        intro       : 'Une touche du clavier, ou un code court à taper à la main. Le rendu est l’élément HTML' ,
        single      : 'Une touche' ,
        enter       : 'Entrée' ,
        combination : 'keys — une combinaison' ,
        nesting     : [ 'Chaque touche a son propre' , ', l’ensemble est enveloppé dans un' , ' : c’est la manière HTML de dire « ensemble ». Le séparateur est du texte, lu par un lecteur d’écran.' ] ,
        sequence    : 'puis' ,
        icon        : 'separator — une icône' ,
        iconNote    : 'Un lecteur d’écran lit un séparateur texte, mais rien pour une icône : il faut lui adjoindre un texte masqué (' ,
        iconNoteEnd : '). Un emoji, lui, est lu par son nom Unicode.' ,
        plus        : 'plus' ,
        sentence    : 'Dans une phrase' ,
        search      : [ 'Appuyez sur' , 'pour ouvrir la recherche, puis sur' , 'pour la fermer.' ] ,
        checkCode   : [ 'Si l’étiquette est illisible, tapez le code de contrôle' , 'affiché dessous.' ] ,
    } ,

    en :
    {
        intro       : 'A key of the keyboard, or a short code typed by hand. It renders the HTML element' ,
        single      : 'One key' ,
        enter       : 'Enter' ,
        combination : 'keys — a combination' ,
        nesting     : [ 'Every key gets its own' , ', the whole is wrapped in a' , ' : that is how HTML says « together ». The separator is text, read out by a screen reader.' ] ,
        sequence    : 'then' ,
        icon        : 'separator — an icon' ,
        iconNote    : 'A screen reader reads a text separator, but nothing for an icon : give it visually hidden text (' ,
        iconNoteEnd : '). An emoji is read by its Unicode name.' ,
        plus        : 'plus' ,
        sentence    : 'Inside a sentence' ,
        search      : [ 'Press' , 'to open the search, then' , 'to close it.' ] ,
        checkCode   : [ 'If the label cannot be read, type the check code' , 'printed below it.' ] ,
    } ,
} ;

export default kbd ;

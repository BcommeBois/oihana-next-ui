const assignment =
{
    fr :
    {
        title       : 'AssignmentList et AssignmentEditorModal' ,
        description : 'Attacher et détacher, en disant au serveur la DIFFÉRENCE et non le résultat. La liste montre ce qui est attaché, la modale change la sélection, et le pied annonce en permanence ce qui partira.' ,

        listTitle : 'Modules attachés' ,
        empty     : 'Aucun module attaché.' ,
        manage    : 'Gérer les modules' ,

        editorTitle : 'Gérer les modules' ,
        lockedHint  : 'verrouillé — vous n’avez pas le droit de le changer' ,

        controls :
        {
            title    : 'De quoi éprouver la modale' ,
            fail     : 'Le serveur refuse l’enregistrement' ,
            reset    : 'Repartir de l’état initial' ,
            attached : 'Attachés : {0}' ,
        } ,

        toasts :
        {
            saved    : '{0} ajout(s) et {1} retrait(s) enregistré(s).' ,
            refused  : 'Le serveur a refusé : la modale reste ouverte avec vos modifications.' ,
        } ,

        notes :
        {
            title  : 'Trois choses à essayer' ,
            diff   : 'Cochez deux modules et décochez-en un : le pied annonce « +2 / −1 », et c’est exactement ce que recevra le serveur — jamais la liste entière, sinon deux lecteurs qui éditent la même entité s’écraseraient l’un l’autre.' ,
            locked : 'La ligne verrouillée est cochée et grisée : elle ne peut pas entrer dans la différence. Le garde-fou est dans le hook, pas dans l’affichage — une clé verrouillée qui se glisserait dans la sélection partirait quand même au serveur si on ne filtrait qu’à l’écran.' ,
            exit   : 'Modifiez quelque chose puis fermez : la question est posée, avec le nombre de modifications en jeu. Activez « le serveur refuse » et enregistrez : la modale reste ouverte, vos modifications intactes.' ,
        } ,
    } ,
    en :
    {
        title       : 'AssignmentList and AssignmentEditorModal' ,
        description : 'Attaching and detaching, telling the server the DIFFERENCE rather than the result. The list shows what is attached, the dialog changes the selection, and the footer says at all times what will travel.' ,

        listTitle : 'Attached modules' ,
        empty     : 'No module attached.' ,
        manage    : 'Manage the modules' ,

        editorTitle : 'Manage the modules' ,
        lockedHint  : 'locked — you are not allowed to change it' ,

        controls :
        {
            title    : 'What it takes to exercise the dialog' ,
            fail     : 'The server refuses the save' ,
            reset    : 'Back to the initial state' ,
            attached : 'Attached : {0}' ,
        } ,

        toasts :
        {
            saved    : '{0} added and {1} removed.' ,
            refused  : 'The server refused : the dialog stays open with your changes.' ,
        } ,

        notes :
        {
            title  : 'Three things to try' ,
            diff   : 'Tick two modules and untick one : the footer reads « +2 / −1 », and that is exactly what the server will receive — never the whole list, or two readers editing the same entity would overwrite each other.' ,
            locked : 'The locked row is ticked and greyed : it cannot enter the difference. The guard is in the hook, not in the rendering — a locked key that slipped into the selection would still travel to the server if only the screen filtered it.' ,
            exit   : 'Change something then close : the question is asked, with the number of changes at stake. Turn on « the server refuses » and save : the dialog stays open, your changes untouched.' ,
        } ,
    } ,
} ;

export default assignment ;

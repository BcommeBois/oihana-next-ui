const typography =
{
    fr :
    {
        title       : 'Typographie' ,
        description : 'Les composants de typographie : titres, paragraphes, citations, touches et libellés.' ,

        headings :
        {
            title  : 'Titres (H1 à H6)' ,
            levels :
            [
                { divider : 'H1 — Titre principal'  , text : 'Titre de niveau 1' } ,
                { divider : 'H2 — Titre secondaire' , text : 'Titre de niveau 2' } ,
                { divider : 'H3 — Titre tertiaire'  , text : 'Titre de niveau 3' } ,
                { divider : 'H4 — Sous-titre'       , text : 'Titre de niveau 4' } ,
                { divider : 'H5 — Petit titre'      , text : 'Titre de niveau 5' } ,
                { divider : 'H6 — Mini titre'       , text : 'Titre de niveau 6' } ,
            ] ,
        } ,

        paragraph :
        {
            title    : 'Paragraphe' ,
            standard : 'Paragraphe standard' ,
            custom   : 'Paragraphe avec une className personnalisée' ,
        } ,

        blockquote :
        {
            title   : 'Citation' ,
            simple  : { label : 'Citation simple'                    , text : 'Ceci est une citation simple, sans icône.' } ,
            icon    : { label : 'Citation avec icône'                , text : 'Ceci est une citation avec icône.' } ,
            html    : { label : 'Citation avec du HTML'              , strong : 'Citation importante' , rest : 'avec du' } ,
            primary : { label : 'Citation avec une bordure primaire' , text : 'Citation avec une bordure primaire.' } ,
            accent  : { label : 'Citation avec une bordure accent'   , text : 'Citation avec une bordure accent.' } ,
        } ,

        htmlString :
        {
            title        : 'Citation à partir d’une chaîne HTML' ,
            simpleLabel  : 'HTML simple' ,
            complexLabel : 'HTML complexe' ,
            simple       : '<strong>Citation importante</strong> avec du <em>HTML</em>.' ,
            complex      : '<p>Premier paragraphe avec du <strong>texte en gras</strong>.</p><p>Deuxième paragraphe avec de l’<em>italique</em> et du <u>souligné</u>.</p>' ,
        } ,

        typography :
        {
            title   : 'Composant Typography' ,
            label   : 'Typography avec un contenu mixte' ,
            heading : 'Un titre dans Typography' ,
            quote   : 'Une citation dans le composant Typography.' ,
        } ,

        hierarchy :
        {
            title    : 'Hiérarchie complète' ,
            subtitle : 'H2 — Bibliothèque d’interface sur daisyUI et Tailwind CSS' ,
            sections :
            [
                { heading : 'H3 — Les niveaux de titre' , text : 'Six niveaux, du titre de page au sous-titre de paragraphe, chacun avec sa graisse et son interligne.' } ,
                { heading : 'H4 — La hiérarchie'        , text : 'Un niveau sauté se voit : la page perd son plan, et un lecteur au clavier perd ses repères.' } ,
                { heading : 'H5 — Les réglages'         , text : 'Taille, graisse, interligne et marges verticales, en une seule échelle pour toute la page.' } ,
                { heading : 'H6 — Le dernier niveau'    , text : 'Plus bas, un paragraphe en gras dit la même chose sans promettre une section.' } ,
            ] ,
            quote : '« Une page bien composée se lit avant d’être regardée. »' ,
        } ,

        responsive :
        {
            title   : 'Test responsive' ,
            hint    : 'Redimensionnez la fenêtre pour voir les tailles s’adapter.' ,
            mobile  : { title : 'Mobile'     , text : 'Les titres s’adaptent automatiquement à la taille de l’écran.' } ,
            desktop : { title : 'Ordinateur' , text : 'Les classes responsive permettent une lecture confortable sur tous les appareils.' } ,
        } ,

        labels :
        {
            title       : 'Libellés' ,
            hint        : 'Les trois lignes qui se posent sous un champ : une erreur, une aide, une description.' ,
            error       : 'Ce champ est obligatoire.' ,
            helper      : 'Au moins 8 caractères, dont un chiffre.' ,
            description : 'Visible par tous les membres de l’équipe.' ,
        } ,
    } ,

    en :
    {
        title       : 'Typography' ,
        description : 'The typography components : headings, paragraphs, quotes, keys and labels.' ,

        headings :
        {
            title  : 'Headings (H1 to H6)' ,
            levels :
            [
                { divider : 'H1 — Main title'      , text : 'Level 1 heading' } ,
                { divider : 'H2 — Secondary title' , text : 'Level 2 heading' } ,
                { divider : 'H3 — Tertiary title'  , text : 'Level 3 heading' } ,
                { divider : 'H4 — Subtitle'        , text : 'Level 4 heading' } ,
                { divider : 'H5 — Small title'     , text : 'Level 5 heading' } ,
                { divider : 'H6 — Mini title'      , text : 'Level 6 heading' } ,
            ] ,
        } ,

        paragraph :
        {
            title    : 'Paragraph' ,
            standard : 'Standard paragraph' ,
            custom   : 'Paragraph with a custom className' ,
        } ,

        blockquote :
        {
            title   : 'Blockquote' ,
            simple  : { label : 'Simple quote'                , text : 'This is a simple quote, without an icon.' } ,
            icon    : { label : 'Quote with an icon'          , text : 'This is a quote with an icon.' } ,
            html    : { label : 'Quote with HTML'             , strong : 'Important quote' , rest : 'with some' } ,
            primary : { label : 'Quote with a primary border' , text : 'Quote with a primary border.' } ,
            accent  : { label : 'Quote with an accent border' , text : 'Quote with an accent border.' } ,
        } ,

        htmlString :
        {
            title        : 'Quote from an HTML string' ,
            simpleLabel  : 'Simple HTML' ,
            complexLabel : 'Complex HTML' ,
            simple       : '<strong>Important quote</strong> with some <em>HTML</em>.' ,
            complex      : '<p>First paragraph with <strong>bold text</strong>.</p><p>Second paragraph with <em>italics</em> and <u>underline</u>.</p>' ,
        } ,

        typography :
        {
            title   : 'Typography component' ,
            label   : 'Typography with mixed content' ,
            heading : 'A heading inside Typography' ,
            quote   : 'A quote inside the Typography component.' ,
        } ,

        hierarchy :
        {
            title    : 'Full hierarchy' ,
            subtitle : 'H2 — UI library built on daisyUI and Tailwind CSS' ,
            sections :
            [
                { heading : 'H3 — The heading levels' , text : 'Six levels, from the page title to the paragraph subtitle, each with its weight and line height.' } ,
                { heading : 'H4 — The hierarchy'      , text : 'A skipped level shows : the page loses its outline, and a keyboard reader loses their bearings.' } ,
                { heading : 'H5 — The settings'       , text : 'Size, weight, line height and vertical margins, on a single scale for the whole page.' } ,
                { heading : 'H6 — The last level'     , text : 'Below that, a bold paragraph says the same without promising a section.' } ,
            ] ,
            quote : '“A well-set page is read before it is looked at.”' ,
        } ,

        responsive :
        {
            title   : 'Responsive test' ,
            hint    : 'Resize the window to watch the sizes adapt.' ,
            mobile  : { title : 'Mobile'  , text : 'Headings adapt to the screen size on their own.' } ,
            desktop : { title : 'Desktop' , text : 'Responsive classes keep reading comfortable on every device.' } ,
        } ,

        labels :
        {
            title       : 'Labels' ,
            hint        : 'The three lines that sit under a field : an error, a helper, a description.' ,
            error       : 'This field is required.' ,
            helper      : 'At least 8 characters, including a digit.' ,
            description : 'Visible to every member of the team.' ,
        } ,
    } ,
} ;

export default typography ;

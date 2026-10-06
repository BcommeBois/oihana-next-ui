const textAreaCode =
{
    fr :
    {
        title : 'L’éditeur de code' ,

        sections :
        {
            block      : 'CodeBlock (affichage seul)' ,
            tab        : 'La tabulation (JavaScript)' ,
            right      : 'Aperçu coloré à droite' ,
            bottom     : 'Aperçu en dessous (HTML)' ,
            sql        : 'Une requête SQL' ,
            indent     : 'Largeur d’indentation' ,
            noTab       : 'Sans gestion de la tabulation' ,
            controlled : 'Contrôlé' ,
            autosize   : 'Qui pousse tout seul' ,
            fieldset   : 'Dans un fieldset' ,
            readOnly   : 'En lecture seule, avec aperçu' ,
            labels     : 'Libellés du CodeBlock' ,
            comparison : 'Deux CodeBlock côte à côte' ,
        } ,

        block :
        {
            label : 'Un composant React' ,
            note  : 'CodeBlock affiche un extrait figé, coloré, avec son bouton de copie.' ,
        } ,

        tab        : { label : 'Code JavaScript' , helper : 'La touche Tab indente de deux espaces.' } ,
        right      : { label : 'Code Python' , helper : 'Éditez à gauche, l’aperçu coloré suit à droite.' } ,
        bottom     : { label : 'Modèle HTML' } ,
        sql        : { label : 'Requête de base' } ,

        indent :
        {
            two  : { label : 'Indentation de deux espaces' } ,
            four : { label : 'Indentation de quatre espaces' } ,
        } ,

        noTab      : { label : 'Zone normale' , helper : 'La touche Tab reprend son rôle : elle change de champ.' } ,
        controlled : { label : 'Éditeur contrôlé' , chars : '{0} caractère(s)' , lines : '{0} ligne(s)' } ,
        autosize   : { label : 'Éditeur qui pousse' , helper : 'Il pousse tout seul jusqu’à 20 lignes.' } ,
        fieldset   : { legend : 'Configuration de l’API' } ,
        readOnly   : { label : 'Extrait en lecture seule' } ,

        labels :
        {
            defaults : 'Libellés par défaut' ,
            host     : 'Libellés donnés par l’hôte' ,
            toasts   : 'Messages de toast donnés par l’hôte' ,
            copy     : 'Copier' ,
            copied   : 'Copié !' ,
            success  : 'Code copié !' ,
            failure  : 'Échec de la copie' ,
        } ,

        comparison :
        {
            before : 'Avant' ,
            after  : 'Après' ,
        } ,
    } ,

    en :
    {
        title : 'The code editor' ,

        sections :
        {
            block      : 'CodeBlock (display only)' ,
            tab        : 'Tab handling (JavaScript)' ,
            right      : 'Highlighted preview on the right' ,
            bottom     : 'Preview below (HTML)' ,
            sql        : 'An SQL query' ,
            indent     : 'Indentation width' ,
            noTab       : 'Without tab handling' ,
            controlled : 'Controlled' ,
            autosize   : 'Growing on its own' ,
            fieldset   : 'In a fieldset' ,
            readOnly   : 'Read-only, with a preview' ,
            labels     : 'The CodeBlock labels' ,
            comparison : 'Two CodeBlocks side by side' ,
        } ,

        block :
        {
            label : 'A React component' ,
            note  : 'CodeBlock shows a fixed snippet, highlighted, with its copy button.' ,
        } ,

        tab        : { label : 'JavaScript code' , helper : 'The Tab key indents by two spaces.' } ,
        right      : { label : 'Python code' , helper : 'Edit on the left, the highlighted preview follows on the right.' } ,
        bottom     : { label : 'HTML template' } ,
        sql        : { label : 'Database query' } ,

        indent :
        {
            two  : { label : 'Two spaces indentation' } ,
            four : { label : 'Four spaces indentation' } ,
        } ,

        noTab      : { label : 'Plain area' , helper : 'The Tab key takes its role back : it moves to the next field.' } ,
        controlled : { label : 'Controlled editor' , chars : '{0} character(s)' , lines : '{0} line(s)' } ,
        autosize   : { label : 'Growing editor' , helper : 'It grows on its own up to 20 rows.' } ,
        fieldset   : { legend : 'API configuration' } ,
        readOnly   : { label : 'Read-only snippet' } ,

        labels :
        {
            defaults : 'Default labels' ,
            host     : 'Labels given by the host' ,
            toasts   : 'Toast messages given by the host' ,
            copy     : 'Copy' ,
            copied   : 'Copied !' ,
            success  : 'Code copied !' ,
            failure  : 'The copy failed' ,
        } ,

        comparison :
        {
            before : 'Before' ,
            after  : 'After' ,
        } ,
    } ,
} ;

export default textAreaCode ;

const textAreaMarkdown =
{
    fr :
    {
        title : 'L’éditeur Markdown' ,

        sections :
        {
            right      : 'Aperçu à droite (par défaut)' ,
            bottom     : 'Aperçu en dessous' ,
            tab        : 'En onglets (écrire | aperçu)' ,
            none       : 'Sans aperçu' ,
            custom     : 'Aperçu réglé' ,
            controlled : 'Contrôlé' ,
            fieldset   : 'Dans un fieldset' ,
            validation : 'Avec validation' ,
            autosize   : 'Qui pousse tout seul' ,
        } ,

        right      : { label : 'Contenu de l’article' , helper : 'Éditez à gauche, l’aperçu suit à droite.' } ,
        bottom     : { label : 'Documentation' } ,
        tab        : { label : 'Article' , helper : 'Les onglets basculent entre l’édition et l’aperçu.' } ,
        none       : { label : 'Markdown brut' } ,
        custom     : { label : 'Exemple de code' , helper : 'L’aperçu porte des boutons de copie et des numéros de ligne.' } ,
        controlled : { label : 'Éditeur contrôlé' , chars : '{0} caractère(s)' } ,
        fieldset   : { legend : 'Billet de blog' } ,
        validation : { label : 'Contenu obligatoire' , hint : 'Le contenu doit faire 20 caractères au moins.' } ,
        autosize   : { label : 'Éditeur qui pousse' , helper : 'L’éditeur pousse tout seul jusqu’à 15 lignes.' } ,
    } ,

    en :
    {
        title : 'The Markdown editor' ,

        sections :
        {
            right      : 'Preview on the right (default)' ,
            bottom     : 'Preview below' ,
            tab        : 'In tabs (write | preview)' ,
            none       : 'Without a preview' ,
            custom     : 'A preview of your own' ,
            controlled : 'Controlled' ,
            fieldset   : 'In a fieldset' ,
            validation : 'With validation' ,
            autosize   : 'Growing on its own' ,
        } ,

        right      : { label : 'Post content' , helper : 'Edit on the left, the preview follows on the right.' } ,
        bottom     : { label : 'Documentation' } ,
        tab        : { label : 'Article' , helper : 'The tabs switch between editing and preview.' } ,
        none       : { label : 'Raw Markdown' } ,
        custom     : { label : 'Code example' , helper : 'The preview carries copy buttons and line numbers.' } ,
        controlled : { label : 'Controlled editor' , chars : '{0} character(s)' } ,
        fieldset   : { legend : 'Blog post' } ,
        validation : { label : 'Required content' , hint : 'The content must be 20 characters at least.' } ,
        autosize   : { label : 'Growing editor' , helper : 'The editor grows on its own up to 15 rows.' } ,
    } ,
} ;

export default textAreaMarkdown ;

/**
 * Labels of the lab's TextAreas page : its title, its filter bar and the
 * sentence each demo shows when it is the one being looked at.
 *
 * The `items` keys are the filter keys of the page, dashes included, so a row
 * and its sentence are read by the same name and cannot drift apart. Same
 * shape as {@link module:@locale/app/lab/inputs}, which this page is the twin
 * of — with no categories, since seven rows need none.
 *
 * `title` and `description` are also what `I18nMetas` puts in the document.
 */
const textareas =
{
    fr :
    {
        title       : 'Les zones de texte' ,
        description : 'La zone de texte et ses variantes : ce qu’elle transforme à la frappe, un éditeur Markdown avec son aperçu, un éditeur de code, et une valeur par langue.' ,
        tip         : '💡 Les onglets isolent une variante.' ,
        count       : '{0} composant(s)' ,

        items :
        {
            'all' :
            {
                label       : 'Toutes' ,
                description : 'Toutes les zones de texte de la page.' ,
            } ,
            'text-area' :
            {
                label       : 'Zone de texte' ,
                description : 'La zone de texte et ses variantes.' ,
            } ,
            'text-transform' :
            {
                label       : 'Transformation' ,
                description : 'La saisie transformée à la frappe, ou en sortant du champ.' ,
            } ,
            'text-markdown' :
            {
                label       : 'Markdown' ,
                description : 'Un éditeur Markdown avec son aperçu.' ,
            } ,
            'text-code' :
            {
                label       : 'Code' ,
                description : 'Un éditeur de code, avec la tabulation et la coloration.' ,
            } ,
            'text-i18n' :
            {
                label       : 'Multilingue' ,
                description : 'Une zone de texte qui garde une valeur par langue.' ,
            } ,
            'text-i18n-markdown' :
            {
                label       : 'Markdown multilingue' ,
                description : 'Un éditeur Markdown par langue, dont l’aperçu suit la langue active.' ,
            } ,
        } ,
    } ,

    en :
    {
        title       : 'Text areas' ,
        description : 'The text area and its variants : what it transforms as you type, a Markdown editor with its preview, a code editor, and one value per language.' ,
        tip         : '💡 The tabs isolate one variant.' ,
        count       : '{0} component(s)' ,

        items :
        {
            'all' :
            {
                label       : 'All' ,
                description : 'Every text area of the page.' ,
            } ,
            'text-area' :
            {
                label       : 'Text area' ,
                description : 'The text area and its variants.' ,
            } ,
            'text-transform' :
            {
                label       : 'Transform' ,
                description : 'The draft transformed as you type, or on the way out of the field.' ,
            } ,
            'text-markdown' :
            {
                label       : 'Markdown' ,
                description : 'A Markdown editor with its preview.' ,
            } ,
            'text-code' :
            {
                label       : 'Code' ,
                description : 'A code editor, with tab handling and highlighting.' ,
            } ,
            'text-i18n' :
            {
                label       : 'Multilingual' ,
                description : 'A text area holding one value per language.' ,
            } ,
            'text-i18n-markdown' :
            {
                label       : 'Multilingual Markdown' ,
                description : 'One Markdown editor per language, its preview following the active one.' ,
            } ,
        } ,
    } ,
} ;

export default textareas ;

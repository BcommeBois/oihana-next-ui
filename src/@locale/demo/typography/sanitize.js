// Each sample carries what a mode keeps or drops : a script, a level-4 title,
// underline, code, a style on an allowed tag (only its colour survives the style
// filter) and an ftp link.
const sanitize =
{
    fr :
    {
        hint   : [ 'Le même HTML, brut puis nettoyé : par défaut toutes les balises tombent ; en mode' , ', la liste blanche de la configuration (' , ') s’applique. Le code est affiché, jamais rendu.' ] ,
        raw    : 'Brut' ,
        sample : '<script>alert( "xss" )</script><h4>Titre</h4><p>Texte <u>souligné</u>, <code>code</code>, <strong style="color:#c00;position:fixed">rouge</strong> et <a href="ftp://example.com/f">un lien ftp</a>.</p>' ,
    } ,

    en :
    {
        hint   : [ 'The same HTML, raw then cleaned : by default every tag is dropped ; in' , ' mode, the allow-list of the configuration (' , ') applies. The markup is printed, never rendered.' ] ,
        raw    : 'Raw' ,
        sample : '<script>alert( "xss" )</script><h4>Title</h4><p>Some <u>underlined</u> text, <code>code</code>, <strong style="color:#c00;position:fixed">red</strong> and <a href="ftp://example.com/f">an ftp link</a>.</p>' ,
    } ,
} ;

export default sanitize ;

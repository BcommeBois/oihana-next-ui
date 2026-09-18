'use client' ;

import useSanitize from '@/hooks/useSanitize' ;

// One sample carrying what each mode keeps or drops : a script, a level-4
// title, underline, code, a style on an allowed tag (only its colour survives
// the style filter) and an ftp link.
const SAMPLE = '<script>alert( "xss" )</script><h4>Titre</h4><p>Texte <u>souligné</u>, <code>code</code>, <strong style="color:#c00;position:fixed">rouge</strong> et <a href="ftp://example.com/f">un lien ftp</a>.</p>' ;

/**
 * useSanitize demo.
 *
 * The same HTML shown raw, cleaned in the default mode (every tag stripped)
 * and in the `html` mode (the allow-list of `config.html.sanitizeOptions`).
 * Every block prints the markup as text, never renders it.
 */
const SanitizeDemo = () =>
{
    const stripAll = useSanitize() ;
    const keepHtml = useSanitize( { html : true } ) ;

    const rows =
    [
        { label : 'Brut'                          , value : SAMPLE } ,
        { label : 'useSanitize()'                 , value : stripAll( SAMPLE ) } ,
        { label : 'useSanitize( { html : true } )' , value : keepHtml( SAMPLE ) } ,
    ] ;

    return (
        <section className="card bg-base-200 shadow-xl">
            <div className="card-body gap-4">
                <h3 className="card-title">useSanitize</h3>
                <p className="text-sm text-base-content/70">
                    Le même HTML, brut puis nettoyé : par défaut toutes les balises tombent ; en mode <code>html</code>,
                    la liste blanche de la configuration (<code>config.html.sanitizeOptions</code>) s'applique. Le code
                    est affiché, jamais rendu.
                </p>
                { rows.map( ( { label , value } ) => (
                    <div key={ label } className="flex flex-col gap-1">
                        <span className="font-mono text-sm">{ label }</span>
                        <pre className="whitespace-pre-wrap break-all rounded-box bg-base-100 p-3 text-xs">{ value }</pre>
                    </div>
                ) ) }
            </div>
        </section>
    ) ;
} ;

export default SanitizeDemo ;

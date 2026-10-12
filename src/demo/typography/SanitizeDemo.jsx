'use client' ;

import useSanitize from '@/hooks/useSanitize' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * useSanitize demo.
 *
 * The same HTML shown raw, cleaned in the default mode (every tag stripped)
 * and in the `html` mode (the allow-list of `config.html.sanitizeOptions`).
 * Every block prints the markup as text, never renders it.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.typography.sanitize'] - Dot notation path to the demo locale.
 */
const SanitizeDemo = ( { path = 'demo.typography.sanitize' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const stripAll = useSanitize() ;
    const keepHtml = useSanitize( { html : true } ) ;

    const sample = t.sample ?? '' ;

    const rows =
    [
        { label : t.raw                            , value : sample } ,
        { label : 'useSanitize()'                  , value : stripAll( sample ) } ,
        { label : 'useSanitize( { html : true } )' , value : keepHtml( sample ) } ,
    ] ;

    return (
        <section className="card bg-base-200 shadow-xl">
            <div className="card-body gap-4">
                <h3 className="card-title">useSanitize</h3>
                <p className="text-sm text-base-content/70">
                    { t.hint?.[ 0 ] } <code>html</code>{ t.hint?.[ 1 ] }<code>config.html.sanitizeOptions</code>{ t.hint?.[ 2 ] }
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

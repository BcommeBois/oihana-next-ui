'use client' ;

import H3        from '@/components/typography/H3' ;
import Paragraph from '@/components/typography/Paragraph' ;
import I18nText  from '@/components/i18n/I18nText' ;

/**
 * I18nText demo component.
 *
 * `I18nText` resolves ONE locale string client-side via `useI18n`, so it
 * reacts instantly to a language switch — no navigation, no frozen prop.
 * Switch the global language from the app's flag menu and every value
 * below updates live.
 *
 * Reads from the `app.lab.i18n` demo bundle (`@locale/app/lab/i18n.js`).
 */
const I18nTextDemo = () =>
{
    return (
        <section className="card bg-base-200 shadow-xl">
            <div className="card-body gap-4">

                <h3 className="card-title">
                    <I18nText path="app.lab.i18n" field="title" />
                </h3>

                <p className="text-sm text-base-content/70">
                    <I18nText path="app.lab.i18n" field="hint" />
                </p>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">

                    {/* Plain string */}
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <H3 size="base" className="font-mono">field="title"</H3>
                            <Paragraph>
                                <I18nText path="app.lab.i18n" field="title" />
                            </Paragraph>
                        </div>
                    </div>

                    {/* Interpolation via fastformat args */}
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <H3 size="base" className="font-mono">field="count" + args</H3>
                            <Paragraph>
                                <I18nText
                                    path  = "app.lab.i18n"
                                    field = "count"
                                    args  = { [ 1 , 20 , 137 ] }
                                />
                            </Paragraph>
                        </div>
                    </div>

                    {/* Missing field → fallback (still interpolated) */}
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <H3 size="base" className="font-mono">missing field → fallback</H3>
                            <Paragraph>
                                <I18nText
                                    path     = "app.lab.i18n"
                                    field    = "does.not.exist"
                                    fallback = "Fallback shown for {0}"
                                    args     = { [ 'this key' ] }
                                />
                            </Paragraph>
                        </div>
                    </div>

                    {/* The key holds a sub-object → fallback, the page stays up */}
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <H3 size="base" className="font-mono">field="error" (sous-objet) → fallback</H3>
                            <Paragraph>
                                <I18nText
                                    path     = "app.lab.i18n"
                                    field    = "error"
                                    fallback = "« error » est un objet { description } : le texte de repli s'affiche."
                                />
                            </Paragraph>
                        </div>
                    </div>

                </div>

                <div className="text-base-content/80">
                    <I18nText path="app.lab.i18n" field="intro" />
                </div>

            </div>
        </section>
    ) ;
} ;

export default I18nTextDemo ;

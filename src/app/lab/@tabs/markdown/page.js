import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import Markdown from '@/components/typography/Markdown' ;

import simpleMarkdown     from './examples/simple.md' ;
import codeMarkdown       from './examples/code.md' ;
import linksMarkdown      from './examples/links.md' ;
import tableMarkdown      from './examples/table.md' ;
import blockquoteMarkdown from './examples/blockquote.md' ;
import complexMarkdown    from './examples/complex.md' ;

/**
 * Markdown showcase page.
 *
 * Displays Markdown component with various examples and configurations.
 */
export default async function MarkdownShowcase()
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Markdown Components
                </h1>
                <p className="text-base-content/70">
                    Démonstration du composant Markdown avec différentes options
                </p>
            </Container>

            <Container className="flex flex-col gap-6 py-6" maxWidth="max-w-7xl">

                {/* Simple Markdown */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Markdown simple</h3>
                        <Markdown>{ simpleMarkdown }</Markdown>
                    </div>
                </section>

                {/* Code Highlighting */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Code avec coloration syntaxique</h3>
                        <Markdown showCopyButton showLineNumbers>
                            { codeMarkdown }
                        </Markdown>
                    </div>
                </section>

                {/* Mockup Style */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Code style mockup (DaisyUI)</h3>
                        <Markdown mockup showCopyButton showLineNumbers>
                            { codeMarkdown }
                        </Markdown>
                    </div>
                </section>

                {/* Links & Images */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Liens et images</h3>
                        <Markdown linkColor="secondary">
                            { linksMarkdown }
                        </Markdown>
                    </div>
                </section>

                {/* Tables */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Tableaux</h3>
                        <Markdown>{ tableMarkdown }</Markdown>
                    </div>
                </section>

                {/* Blockquotes */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Citations</h3>
                        <Markdown
                            blockquoteShowIcon
                            blockquoteClassName="border-l-primary"
                        >
                            { blockquoteMarkdown }
                        </Markdown>
                    </div>
                </section>

                {/* Complex Document */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Document complet</h3>
                        <Markdown
                            showCopyButton
                            showLineNumbers
                            blockquoteShowIcon
                            linkColor = "secondary"
                        >
                            { complexMarkdown }
                        </Markdown>
                    </div>
                </section>

                {/* With Toast */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Avec notification toast au copier</h3>
                        <Markdown showToast toastDelay={ 3000 }>
                            { codeMarkdown }
                        </Markdown>
                    </div>
                </section>

                {/* Without Copy Button */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Sans bouton copier</h3>
                        <Markdown showCopyButton={ false }>
                            { codeMarkdown }
                        </Markdown>
                    </div>
                </section>

                {/* Custom Background */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-sm">Mockup avec fond personnalisé</h3>
                        <Markdown mockup codeBgColor="bg-primary text-primary-content">
                            { codeMarkdown }
                        </Markdown>
                    </div>
                </section>

            </Container>

        </Page>
    ) ;
} ;
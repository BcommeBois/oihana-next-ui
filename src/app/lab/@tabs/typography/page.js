'use client' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import Blockquote from '@/components/typography/Blockquote' ;
import H1         from '@/components/typography/H1' ;
import H2         from '@/components/typography/H2' ;
import H3         from '@/components/typography/H3' ;
import H4         from '@/components/typography/H4' ;
import H5         from '@/components/typography/H5' ;
import H6         from '@/components/typography/H6' ;
import Paragraph  from '@/components/typography/Paragraph' ;
import Typography from '@/components/typography/Typography' ;

import BadgeDemo from '@/demo/BadgeDemo';

/**
 * Typography showcase page.
 *
 * Displays all typography components with variations.
 *
 * @param {Object} props
 * @param {string} [props.path='app.test'] - SEO path identifier.
 */
const TypographyShowcase = ({ path = 'app.test' }) =>
{
    const htmlContent = '<strong>Citation importante</strong> avec du <em>HTML</em>.' ;
    const complexHtml = `
        <p>Premier paragraphe avec <strong>texte en gras</strong>.</p>
        <p>Deuxième paragraphe avec <em>italique</em> et <u>souligné</u>.</p>
    ` ;

    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Typography Components
                </h1>
                <p className="text-base-content/70">
                    Démonstration des composants de typographie avec différentes variations
                </p>
            </Container>

            <Container className="flex flex-col gap-8 py-6" maxWidth="max-w-7xl">

                {/* Headings Section */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Headings (H1-H6)</h3>

                        <div className="space-y-4">
                            <div className="divider">H1 - Titre Principal</div>
                            <H1>Titre de niveau 1</H1>

                            <div className="divider">H2 - Titre Secondaire</div>
                            <H2>Titre de niveau 2</H2>

                            <div className="divider">H3 - Titre Tertiaire</div>
                            <H3>Titre de niveau 3</H3>

                            <div className="divider">H4 - Sous-titre</div>
                            <H4>Titre de niveau 4</H4>

                            <div className="divider">H5 - Petit titre</div>
                            <H5>Titre de niveau 5</H5>

                            <div className="divider">H6 - Mini titre</div>
                            <H6>Titre de niveau 6</H6>
                        </div>
                    </div>
                </section>

                {/* Paragraph Section */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Paragraph</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-semibold mb-2">Paragraphe standard</p>
                                <Paragraph>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </Paragraph>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">Paragraphe avec className personnalisée</p>
                                <Paragraph className="text-secondary">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </Paragraph>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blockquote Section */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Blockquote</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-semibold mb-2">Citation simple</p>
                                <Blockquote>
                                    Ceci est une citation simple sans icône.
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">Citation avec icône</p>
                                <Blockquote showIcon>
                                    Ceci est une citation avec icône.
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">Citation avec HTML</p>
                                <Blockquote showIcon html>
                                    <strong>Citation importante</strong> avec du <em>HTML</em>.
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">Citation avec bordure personnalisée</p>
                                <Blockquote showIcon className="border-l-primary">
                                    Citation avec bordure primaire.
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">Citation avec bordure accent</p>
                                <Blockquote showIcon className="border-l-accent">
                                    Citation avec bordure accent.
                                </Blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* With a HTML string variable */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Citation avec une chaine string HTML</h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold mb-2">HTML simple</p>
                                <Blockquote showIcon html>
                                    { htmlContent }
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">HTML complexe</p>
                                <Blockquote showIcon html>
                                    { complexHtml }
                                </Blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Typography Component */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Typography Component</h3>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <p className="text-sm font-semibold mb-2">Typography avec contenu mixte</p>
                                <Typography className="space-y-4">
                                    <H2>Titre dans Typography</H2>
                                    <Paragraph>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </Paragraph>
                                    <Blockquote showIcon>
                                        Une citation dans le composant Typography.
                                    </Blockquote>
                                    <Paragraph>
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </Paragraph>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hierarchy Demo */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Hiérarchie complète</h3>

                        <div className="space-y-2">
                            <H1>H1 - Oihana Next UI</H1>
                            <H2>H2 - UI Library based on DaisyUI and TailwindCSS</H2>
                            <Paragraph>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Paragraph>

                            <H3>H3 - Nos produits</H3>
                            <Paragraph>
                                Découvrez notre gamme complète de produits en bois de qualité supérieure.
                            </Paragraph>

                            <H4>H4 - Bois massif</H4>
                            <Paragraph>
                                Chêne, pin, érable et bien d'autres essences disponibles.
                            </Paragraph>

                            <H5>H5 - Caractéristiques</H5>
                            <Paragraph>
                                Dimensions personnalisables, traitement écologique, livraison rapide.
                            </Paragraph>

                            <H6>H6 - Contact</H6>
                            <Paragraph>
                                Pour plus d'informations, contactez notre équipe commerciale.
                            </Paragraph>

                            <Blockquote showIcon className="border-l-primary">
                                "La qualité du bois fait toute la différence dans vos projets."
                            </Blockquote>
                        </div>
                    </div>
                </section>

                {/* Responsive Demo */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">Test responsive</h3>
                        <p className="text-sm text-base-content/70 mb-4">
                            Redimensionnez la fenêtre pour voir les tailles s'adapter
                        </p>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="card bg-base-100">
                                <div className="card-body">
                                    <H3>Mobile</H3>
                                    <Paragraph>
                                        Les titres s'adaptent automatiquement à la taille de l'écran.
                                    </Paragraph>
                                </div>
                            </div>

                            <div className="card bg-base-100">
                                <div className="card-body">
                                    <H3>Desktop</H3>
                                    <Paragraph>
                                        Les classes responsive permettent une lecture optimale sur tous les appareils.
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Container>

        </Page>
    ) ;
} ;

export default TypographyShowcase ;
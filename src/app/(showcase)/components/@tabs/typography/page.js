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

import DescriptionLabel from '@/components/labels/DescriptionLabel' ;
import ErrorLabel       from '@/components/labels/ErrorLabel' ;
import HelperLabel      from '@/components/labels/HelperLabel' ;

import I18nMetas from '@/components/i18n/I18nMetas' ;
import useI18n   from '@/contexts/locale/useI18n' ;

import I18nTextDemo from '@/demo/typography/I18nTextDemo';
import KbdDemo      from '@/demo/typography/KbdDemo' ;
import SanitizeDemo from '@/demo/typography/SanitizeDemo' ;

// The heading components, in level order : the locale lists one entry per level.
const HEADINGS = [ H1 , H2 , H3 , H4 , H5 , H6 ] ;

// The hierarchy demo sets H3 to H6 under the page's H1 and H2.
const SUBHEADINGS = [ H3 , H4 , H5 , H6 ] ;

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' ;

const LOREM_LONG = `${ LOREM } Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.` ;

/**
 * Typography showcase page.
 *
 * Displays all typography components with variations.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.typography'] - Dot notation path to the page locale.
 */
const TypographyShowcase = ( { path = 'app.lab.typography' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const {
        blockquote ,
        headings ,
        hierarchy ,
        htmlString ,
        labels ,
        paragraph ,
        responsive ,
        typography ,
    } = t ;

    return (
        <Page full className='gap-8'>

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { t.title }
                </h1>
                <p className="text-base-content/70">
                    { t.description }
                </p>
            </Container>

            <Container className="flex flex-col gap-8 py-6" maxWidth="max-w-7xl">

                {/* Headings Section */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">{ headings?.title }</h3>

                        <div className="space-y-4">
                            { HEADINGS.map( ( Heading , index ) => (
                                <div key={ Heading.displayName ?? index } className="space-y-4">
                                    <div className="divider">{ headings?.levels?.[ index ]?.divider }</div>
                                    <Heading>{ headings?.levels?.[ index ]?.text }</Heading>
                                </div>
                            ) ) }
                        </div>
                    </div>
                </section>

                {/* Paragraph Section */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">{ paragraph?.title }</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-semibold mb-2">{ paragraph?.standard }</p>
                                <Paragraph>
                                    { LOREM_LONG }
                                </Paragraph>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">{ paragraph?.custom }</p>
                                <Paragraph className="text-secondary">
                                    { LOREM }
                                </Paragraph>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blockquote Section */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">{ blockquote?.title }</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-sm font-semibold mb-2">{ blockquote?.simple?.label }</p>
                                <Blockquote>
                                    { blockquote?.simple?.text }
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">{ blockquote?.icon?.label }</p>
                                <Blockquote showIcon>
                                    { blockquote?.icon?.text }
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">{ blockquote?.html?.label }</p>
                                <Blockquote showIcon html>
                                    <strong>{ blockquote?.html?.strong }</strong> { blockquote?.html?.rest } <em>HTML</em>.
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">{ blockquote?.primary?.label }</p>
                                <Blockquote showIcon className="border-l-primary">
                                    { blockquote?.primary?.text }
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">{ blockquote?.accent?.label }</p>
                                <Blockquote showIcon className="border-l-accent">
                                    { blockquote?.accent?.text }
                                </Blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* With a HTML string variable */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">{ htmlString?.title }</h3>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-semibold mb-2">{ htmlString?.simpleLabel }</p>
                                <Blockquote showIcon html>
                                    { htmlString?.simple }
                                </Blockquote>
                            </div>

                            <div>
                                <p className="text-sm font-semibold mb-2">{ htmlString?.complexLabel }</p>
                                <Blockquote showIcon html>
                                    { htmlString?.complex }
                                </Blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Typography Component */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">{ typography?.title }</h3>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <p className="text-sm font-semibold mb-2">{ typography?.label }</p>
                                <Typography className="space-y-4">
                                    <H2>{ typography?.heading }</H2>
                                    <Paragraph>
                                        { LOREM }
                                    </Paragraph>
                                    <Blockquote showIcon>
                                        { typography?.quote }
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
                        <h3 className="card-title">{ hierarchy?.title }</h3>

                        <div className="space-y-2">
                            <H1>H1 — Oihana Next UI</H1>
                            <H2>{ hierarchy?.subtitle }</H2>
                            <Paragraph>
                                { LOREM }
                            </Paragraph>

                            { SUBHEADINGS.map( ( Heading , index ) => (
                                <div key={ Heading.displayName ?? index } className="space-y-2">
                                    <Heading>{ hierarchy?.sections?.[ index ]?.heading }</Heading>
                                    <Paragraph>
                                        { hierarchy?.sections?.[ index ]?.text }
                                    </Paragraph>
                                </div>
                            ) ) }

                            <Blockquote showIcon className="border-l-primary">
                                { hierarchy?.quote }
                            </Blockquote>
                        </div>
                    </div>
                </section>

                {/* Responsive Demo */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title">{ responsive?.title }</h3>
                        <p className="text-sm text-base-content/70 mb-4">
                            { responsive?.hint }
                        </p>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="card bg-base-100">
                                <div className="card-body">
                                    <H3>{ responsive?.mobile?.title }</H3>
                                    <Paragraph>
                                        { responsive?.mobile?.text }
                                    </Paragraph>
                                </div>
                            </div>

                            <div className="card bg-base-100">
                                <div className="card-body">
                                    <H3>{ responsive?.desktop?.title }</H3>
                                    <Paragraph>
                                        { responsive?.desktop?.text }
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Kbd — a key, or a short code typed by hand */}
                <KbdDemo />

                {/* Labels — the three lines that sit under a field */}
                <section className="card bg-base-200 shadow-xl">
                    <div className="card-body gap-4">
                        <h3 className="card-title">{ labels?.title }</h3>
                        <p className="text-sm text-base-content/70">
                            { labels?.hint }
                        </p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="card bg-base-100">
                                <div className="card-body gap-1">
                                    <span className="font-mono text-sm">ErrorLabel</span>
                                    <ErrorLabel>{ labels?.error }</ErrorLabel>
                                </div>
                            </div>
                            <div className="card bg-base-100">
                                <div className="card-body gap-1">
                                    <span className="font-mono text-sm">HelperLabel</span>
                                    <HelperLabel>{ labels?.helper }</HelperLabel>
                                </div>
                            </div>
                            <div className="card bg-base-100">
                                <div className="card-body gap-1">
                                    <span className="font-mono text-sm">DescriptionLabel</span>
                                    <DescriptionLabel>{ labels?.description }</DescriptionLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* I18nText — client-side, reacts to global language switch */}
                <I18nTextDemo />

                {/* useSanitize — what each mode keeps */}
                <SanitizeDemo />

            </Container>

        </Page>
    ) ;
} ;

export default TypographyShowcase ;

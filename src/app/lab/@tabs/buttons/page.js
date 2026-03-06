'use client' ;

import ButtonDemo from '@/demo/buttons/ButtonDemo' ;
import Container  from '@/display/Container' ;
import I18nMetas  from '@/components/i18n/I18nMetas';
import Page       from '@/display/Page' ;
import LinkDemo   from '@/demo/links/LinkDemo' ;
import useI18n    from '@/contexts/locale/useI18n';

export default function ButtonsPage( { path = 'app.lab.buttons' })
{
    const { description , title } = useI18n( path ) ;

    return (
        <Page className="gap-8" full>

            <I18nMetas path={ path } />

            {/* Header */}
            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { title }
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    { description }
                </p>
            </Container>

            {/* Links Showcase */}
            <Container maxWidth="max-w-6xl">
                <LinkDemo />
            </Container>

            {/* Buttons Showcase */}
            <Container maxWidth="max-w-6xl">
                <ButtonDemo />
            </Container>
        </Page>
    ) ;
}
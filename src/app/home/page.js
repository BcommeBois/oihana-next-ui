'use client' ;

import Container      from '@/display/Container' ;
import Page           from '@/display/Page' ;
import Jump           from '@/motions/Jump' ;
import LetterReveal   from '@/motions/LetterReveal' ;

export default function Home()
{
    return (
        <Page full className="justify-center gap-8 *:text-base-content pattern-topography text-base-300/20">

            <Container className="flex flex-col items-center gap-12">

                <hgroup className="text-center min-w-0 max-w-full">

                    <Jump delay={0.5} bounce={0.5}>
                        <h1 className="font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                            Oihana Next UI
                        </h1>
                    </Jump>

                    <LetterReveal
                        as="h6"
                        delay={0.8}
                        text="Bienvenue sur notre plateforme"
                    />

                </hgroup>

            </Container>

        </Page>
) ;
}
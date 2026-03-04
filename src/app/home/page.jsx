'use client' ;

import Container from '../../display/Container' ;
import Page      from '../../display/Page' ;

import Markdown from '../../components/typography/Markdown';

import readme from '../../../README.md' ;

export default function Home()
{
    return (
        <Page full className="justify-center gap-8 *:text-base-content pattern-topography text-base-300/20">

            <Container>
                <Markdown>{ readme }</Markdown>
            </Container>

        </Page>
) ;
}
'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n.js' ;

import BarListDemo     from '@/demo/metrics/BarListDemo' ;
import CategoryBarDemo from '@/demo/metrics/CategoryBarDemo' ;
import SparklineDemo   from '@/demo/metrics/SparklineDemo' ;
import TrackerDemo     from '@/demo/metrics/TrackerDemo' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Page      from '@/display/Page' ;

/**
 * Metrics showcase page.
 *
 * Micro-visualisations : compact, dependency-free readings meant to sit inside a card or
 * a table rather than to fill a chart frame.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.metrics'] - Dot notation path to the page locale.
 */
const MetricsShowcase = ( { path = 'app.lab.metrics' } ) =>
{
    const { description , title } = useI18n( path ) ;

    return (
        <Page full className="gap-8">

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="inline-block bg-linear-to-r from-secondary to-primary bg-clip-text text-4xl font-bold text-transparent">
                    { title }
                </h1>
                <p className="mt-2 italic text-base-content/60">
                    { description }
                </p>
            </Container>

            <CategoryBarDemo />

            <Divider />

            <BarListDemo />

            <Divider />

            <TrackerDemo />

            <Divider />

            <SparklineDemo />

        </Page>
    ) ;
} ;

export default MetricsShowcase ;

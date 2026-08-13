'use client' ;

import { Fragment , useState } from 'react' ;

import I18nMetas from '@/components/i18n/I18nMetas.jsx' ;
import useI18n   from '@/contexts/locale/useI18n.js' ;

import BarListDemo      from '@/demo/metrics/BarListDemo' ;
import CategoryBarDemo  from '@/demo/metrics/CategoryBarDemo' ;
import DeltaDemo        from '@/demo/metrics/DeltaDemo' ;
import MetricLegendDemo from '@/demo/metrics/MetricLegendDemo' ;
import SparklineDemo    from '@/demo/metrics/SparklineDemo' ;
import TrackerDemo      from '@/demo/metrics/TrackerDemo' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Page      from '@/display/Page' ;
import Tabs      from '@/components/tabs/Tabs' ;

const ALL = 'all' ;

/**
 * The sections of the page, in the order they were built.
 *
 * Component names are proper nouns : they are the tab labels as they are, and the only
 * thing the locale has to carry is the "all" entry.
 */
const SECTIONS =
[
    { Demo : CategoryBarDemo  , id : 'categoryBar'  , label : 'CategoryBar'  } ,
    { Demo : BarListDemo      , id : 'barList'      , label : 'BarList'      } ,
    { Demo : TrackerDemo      , id : 'tracker'      , label : 'Tracker'      } ,
    { Demo : SparklineDemo    , id : 'sparkline'    , label : 'Sparkline'    } ,
    { Demo : DeltaDemo        , id : 'delta'        , label : 'Delta'        } ,
    { Demo : MetricLegendDemo , id : 'metricLegend' , label : 'MetricLegend' } ,
] ;

/**
 * Metrics showcase page.
 *
 * Micro-visualisations : compact, dependency-free readings meant to sit inside a card or
 * a table rather than to fill a chart frame.
 *
 * The page grew past what one scroll can hold, so a tab bar filters it down to a single
 * component — `all` still shows everything, which is what makes the sections comparable.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.metrics'] - Dot notation path to the page locale.
 */
const MetricsShowcase = ( { path = 'app.lab.metrics' } ) =>
{
    const { all , description , title } = useI18n( path ) ;

    const [ section , setSection ] = useState( ALL ) ;

    const visible = section === ALL ? SECTIONS : SECTIONS.filter( item => item.id === section ) ;

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

            {/* Seven tabs do not fit on a phone : the row scrolls rather than wraps, so
                the selected tab keeps its place in a single line. */}
            <Container maxWidth="max-w-4xl">
                <div className="overflow-x-auto">
                    <Tabs
                        ariaLabel = { title }
                        className = "inline-flex min-w-full"
                        items     = {[
                            { id : ALL , label : all } ,
                            ...SECTIONS.map( ( { id , label } ) => ( { id , label } ) ) ,
                        ]}
                        onChange  = { setSection }
                        size      = {{ xs : 'sm' , md : 'md' }}
                        style     = "box"
                        value     = { section }
                    />
                </div>
            </Container>

            { visible.map( ( { Demo , id } , index ) => (
                <Fragment key={ id }>
                    { index > 0 ? <Divider /> : null }
                    <Demo />
                </Fragment>
            ) ) }

        </Page>
    ) ;
} ;

export default MetricsShowcase ;

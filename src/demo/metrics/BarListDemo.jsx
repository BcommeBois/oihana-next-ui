'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import useI18n from '@/contexts/locale/useI18n' ;

import BarList   from '@/components/metrics/BarList' ;
import Button    from '@/components/Button' ;
import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;

import Section from '@/demo/charts/Section' ;

import { TbAlertTriangle as ErrorIcon , TbFileText as PageIcon } from 'react-icons/tb' ;

const PAGES =
[
    { name : '/home'          , value : 843 } ,
    { name : '/imprint'       , value : 46  } ,
    { name : '/cancellation'  , value : 3   } ,
    { name : '/blocks'        , value : 108 } ,
    { name : '/documentation' , value : 384 } ,
] ;

const ERRORS =
[
    { name : '500 Internal Server Error' , value : 128 , color : 'error'   } ,
    { name : '404 Not Found'             , value : 302 , color : 'warning' } ,
    { name : '403 Forbidden'             , value : 41  , color : 'warning' } ,
    { name : '429 Too Many Requests'     , value : 12  , color : 'neutral' } ,
] ;

const THIS_WEEK = [ { name : '/home' , value : 420 } , { name : '/blocks' , value : 180 } , { name : '/imprint' , value : 60 } ] ;
const LAST_WEEK = [ { name : '/home' , value : 940 } , { name : '/blocks' , value : 410 } , { name : '/imprint' , value : 130 } ] ;

/**
 * Interpolates a locale pattern, and keeps quiet when the locale has not resolved yet.
 *
 * @param {string} [pattern] - The locale pattern, with `{0}` placeholders.
 * @param {...*} args - The values to interpolate.
 * @returns {string | undefined} The formatted string.
 */
const t = ( pattern , ...args ) => pattern ? format( pattern , ...args ) : undefined ;

/**
 * BarList demo.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.metrics.barList'] - Dot notation path to the demo locale.
 */
const BarListDemo = ( { path = 'demo.metrics.barList' } ) =>
{
    const { colors , description , errors , formatter , interactive , reveal , scale , simple , sizes , states , title } = useI18n( path ) ;

    const [ selected , setSelected ] = useState( null ) ;

    // The two ways an entrance is asked for : a value that changes, and a load that ends.
    const [ replay  , setReplay  ] = useState( 0 ) ;
    const [ loading , setLoading ] = useState( false ) ;

    const refetch = () =>
    {
        setLoading( true ) ;
        setTimeout( () => setLoading( false ) , 900 ) ;
    } ;

    const pagesWithIcons = PAGES.map( item => ({ ...item , icon : <PageIcon /> }) ) ;

    return (
        <Container className="flex flex-col gap-8 rounded-box bg-base-200/60 p-8" maxWidth="max-w-4xl">

            <header className="flex flex-col gap-1" id="barList">
                <h2 className="text-2xl font-bold">{ title }</h2>
                <p className="text-sm text-base-content/60">{ description }</p>
            </header>

            <Divider />

            <Section title={ simple?.title } description={ simple?.description }>
                <BarList data={ PAGES } />
            </Section>

            <Divider />

            <Section title={ formatter?.title } description={ formatter?.description }>
                <BarList
                    data           = { PAGES }
                    showPercentage
                    valueFormatter = { value => t( formatter?.visitors , value ) ?? String( value ) }
                />
            </Section>

            <Divider />

            <Section title={ sizes?.title } description={ sizes?.description }>
                <div className="flex flex-col gap-6">
                    <BarList data={ PAGES.slice( 0 , 3 ) } size="sm" />
                    <BarList data={ PAGES.slice( 0 , 3 ) } size="md" />
                    <BarList data={ PAGES.slice( 0 , 3 ) } size="lg" />
                    <BarList data={ PAGES.slice( 0 , 3 ) } size={ { xs : 'lg' , lg : 'sm' } } />
                </div>
            </Section>

            <Divider />

            <Section title={ colors?.title } description={ colors?.description }>
                <div className="flex flex-col gap-6">
                    <BarList data={ PAGES } color="accent" />
                    <BarList
                        data = { ERRORS.map( item => ({ ...item , icon : <ErrorIcon /> }) ) }
                        size = "lg"
                    />
                    <BarList data={ PAGES.slice( 0 , 3 ) } color="#4E79A7" />
                </div>
            </Section>

            <Divider />

            <Section title={ scale?.title } description={ scale?.description }>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ scale?.before }</p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <BarList data={ THIS_WEEK } />
                            <BarList data={ LAST_WEEK } />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase text-base-content/50">{ scale?.after }</p>
                        <div className="grid gap-6 md:grid-cols-2">
                            <BarList data={ THIS_WEEK } max={ 1000 } />
                            <BarList data={ LAST_WEEK } max={ 1000 } />
                        </div>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ interactive?.title } description={ interactive?.description }>
                <div className="flex flex-col gap-4">
                    <BarList
                        data     = { pagesWithIcons }
                        onSelect = { item => setSelected( item.name ) }
                        size     = "lg"
                    />
                    <p className="text-sm text-base-content/60">
                        { selected ? t( interactive?.selected , selected ) : interactive?.none }
                    </p>

                    <BarList
                        data = { PAGES.slice( 0 , 3 ).map( item => ({
                            ...item ,
                            external : true ,
                            href     : 'https://github.com/BcommeBois/oihana-next-ui' ,
                        }) ) }
                    />
                </div>
            </Section>

            <Divider />

            <Section title={ states?.title } description={ states?.description }>
                <div className="flex flex-col gap-6">
                    <BarList data={ PAGES } loading />
                    <BarList
                        data       = { [] }
                        emptyLabel = { states?.empty }
                        emptyProps = { { description : states?.hint } }
                    />
                </div>
            </Section>

            <Divider />

            <Section title={ reveal?.title } description={ reveal?.description }>
                <div className="flex flex-col gap-6">
                    <BarList
                        data          = { PAGES }
                        loading       = { loading }
                        reveal
                        revealKey     = { replay }
                        showPercentage
                    />
                    <div className="flex flex-wrap gap-3">
                        <Button color="primary" onClick={ () => setReplay( count => count + 1 ) }>
                            { reveal?.replay }
                        </Button>
                        <Button disabled={ loading } onClick={ refetch } style="outline">
                            { reveal?.refetch }
                        </Button>
                    </div>
                </div>
            </Section>

            <Divider />

            <Section title={ errors?.title }>
                <BarList data={ ERRORS } sortOrder="none" showPercentage />
            </Section>

        </Container>
    ) ;
} ;

export default BarListDemo ;

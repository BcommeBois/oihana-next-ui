'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Badge    from '@/components/Badge' ;
import Divider  from '@/components/Divider' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import I18nMetas from '@/components/i18n/I18nMetas' ;
import useI18n   from '@/contexts/locale/useI18n' ;

import TextAreaDemo             from '@/demo/inputs/TextAreaDemo' ;
import TextAreaTransformDemo    from '@/demo/inputs/TextAreaTransformDemo' ;
import TextAreaMarkdownDemo     from '@/demo/inputs/TextAreaMarkdownDemo' ;
import TextAreaCodeDemo         from '@/demo/inputs/TextAreaCodeDemo' ;
import I18nTextAreaDemo         from '@/demo/inputs/I18nTextAreaDemo' ;
import I18nTextAreaMarkdownDemo from '@/demo/inputs/I18nTextAreaMarkdownDemo' ;

import {
    MdCode ,
    MdFormatAlignLeft ,
    MdGTranslate ,
    MdTextFields ,
    MdTranslate ,
    MdViewModule ,
} from 'react-icons/md' ;

import { IoLogoMarkdown } from "react-icons/io5";

/**
 * The page's rows : what each one shows.
 *
 * Their copy lives in the bundle under the same key, so a row and its sentence
 * are read by one name and cannot drift apart. The `all` row shows no
 * component : it is the filter that lays every other one out.
 *
 * @type {Array<{ key : string , icon : React.ElementType , component : ?React.ReactNode }>}
 */
const ROWS =
[
    { key : 'all'                , icon : MdViewModule       , component : null } ,
    { key : 'text-area'          , icon : MdTextFields       , component : <TextAreaDemo /> } ,
    { key : 'text-transform'     , icon : MdFormatAlignLeft  , component : <TextAreaTransformDemo /> } ,
    { key : 'text-markdown'      , icon : IoLogoMarkdown     , component : <TextAreaMarkdownDemo /> } ,
    { key : 'text-code'          , icon : MdCode             , component : <TextAreaCodeDemo /> } ,
    { key : 'text-i18n'          , icon : MdTranslate        , component : <I18nTextAreaDemo /> } ,
    { key : 'text-i18n-markdown' , icon : MdGTranslate       , component : <I18nTextAreaMarkdownDemo /> } ,
] ;

/**
 * TextArea showcase page : a filter bar, then every variant.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.textareas'] - Dot notation path to the page locale.
 */
const TextAreas = ( { path = 'app.lab.textareas' } = {} ) =>
{
    const { count , description , items , tip , title } = useI18n( path ) ;

    const [ filter , setFilter ] = useState( 'all' ) ;

    const filterConfig = ROWS.map( row => (
    {
        ...row ,
        description : items?.[ row.key ]?.description ,
        label       : items?.[ row.key ]?.label ,
    } ) ) ;

    const componentsToShow = filter === 'all'
        ? filterConfig.filter( item => item.component !== null )
        : filterConfig.filter( item => item.key === filter ) ;

    const activeFilter = filterConfig.find( item => item.key === filter ) ;

    const handleFilterChange = ( key ) =>
    {
        setFilter( key ) ;
    } ;

    return (
        <Page className="gap-8" maxWidth="max-w-7xl">

            <I18nMetas path={ path } />

            <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                        { title }
                    </h1>
                    <Badge color="primary" size="lg">
                        { componentsToShow.length }
                    </Badge>
                </div>

                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    { description }
                </p>
            </Container>

            <Divider />

            <Container maxWidth="max-w-5xl">
                <div className="flex flex-col gap-4">
                    <div role="tablist" className="tabs tabs-boxed bg-base-200 p-2 rounded-box shadow-inner">
                        { filterConfig.map( ({ key , label , icon: Icon }) => (
                            <button
                                key       = { key }
                                role      = "tab"
                                className = { `tab gap-2 ${ filter === key ? 'tab-active' : '' }` }
                                onClick   = { () => handleFilterChange( key ) }
                            >
                                <Icon size={ 18 } />
                                <span className="hidden sm:inline">{ label }</span>
                            </button>
                        ))}
                    </div>

                    { activeFilter && (
                        <div className="alert bg-base-100 shadow-md">
                            <activeFilter.icon className="text-primary" size={ 24 } />
                            <div className="flex-1">
                                <h3 className="font-semibold">{ activeFilter.label }</h3>
                                <p className="text-xs opacity-70">{ activeFilter.description }</p>
                            </div>
                            <Badge style="ghost" size="sm">
                                { format( count ?? '{0}' , filter === 'all' ? componentsToShow.length : 1 ) }
                            </Badge>
                        </div>
                    )}
                </div>
            </Container>

            <Divider />

            <Container className="flex flex-col gap-8" maxWidth="max-w-7xl">
                { componentsToShow.map( ({ component , description : rowDescription , icon : Icon , key , label }) => (
                    <div key={ key } className="animate-fadeIn">

                        { filter === 'all' && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <span className="text-primary">
                                        <Icon size={ 28 } />
                                    </span>
                                    { label }
                                </h2>
                                <p className="text-sm opacity-70 mt-1">
                                    { rowDescription }
                                </p>
                                <Divider className="my-4" />
                            </div>
                        )}

                        { component }
                    </div>
                ))}
            </Container>

            <Container className="text-center opacity-60" maxWidth="max-w-4xl">
                <p className="text-sm">
                    { tip }
                </p>
            </Container>

        </Page>
    ) ;
} ;

export default TextAreas ;

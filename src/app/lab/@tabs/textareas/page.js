'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Divider  from '@/components/Divider' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import TextAreaDemo          from '@/demo/inputs/TextAreaDemo' ;
import TextAreaTransformDemo from '@/demo/inputs/TextAreaTransformDemo' ;
import TextAreaMarkdownDemo  from '@/demo/inputs/TextAreaMarkdownDemo' ;
import TextAreaCodeDemo      from '@/demo/inputs/TextAreaCodeDemo' ;

import {
    MdCode ,
    MdFormatAlignLeft ,
    MdTextFields ,
    MdViewModule ,
} from 'react-icons/md' ;

import { IoLogoMarkdown } from "react-icons/io5";

/**
 * TextArea showcase page with improved filter UI.
 */
const TextAreas = ({ path = 'app.test' }) =>
{
    const [ filter , setFilter ] = useState( 'all' ) ;

    const filterConfig =
    [
        {
            key         : 'all' ,
            label       : 'All' ,
            icon        : MdViewModule ,
            description : 'View all TextArea components' ,
            component   : null ,
        } ,
        {
            key         : 'text-area' ,
            label       : 'TextArea' ,
            icon        : MdTextFields ,
            description : 'Basic TextArea component with variants' ,
            component   : <TextAreaDemo /> ,
        } ,
        {
            key         : 'text-transform' ,
            label       : 'Transform' ,
            icon        : MdFormatAlignLeft ,
            description : 'TextArea with text transformations' ,
            component   : <TextAreaTransformDemo /> ,
        } ,
        {
            key         : 'text-markdown' ,
            label       : 'Markdown' ,
            icon        : IoLogoMarkdown ,
            description : 'TextArea with Markdown preview' ,
            component   : <TextAreaMarkdownDemo /> ,
        } ,
        {
            key         : 'text-code' ,
            label       : 'Code' ,
            icon        : MdCode ,
            description : 'TextArea for code editing' ,
            component   : <TextAreaCodeDemo /> ,
        } ,
    ] ;

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

            {/* Header Section */}
            <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                        TextArea Components
                    </h1>
                    <Badge color="primary" size="lg">
                        { componentsToShow.length }
                    </Badge>
                </div>

                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    Explore our collection of powerful TextArea components with various features:
                    basic input, text transformations, Markdown editing, and code highlighting.
                </p>
            </Container>

            <Divider />

            {/* Filter Tabs */}
            <Container maxWidth="max-w-5xl">
                <div className="flex flex-col gap-4">
                    {/* Tab Buttons */}
                    <div role="tablist" className="tabs tabs-boxed bg-base-200 p-2 rounded-box shadow-inner">
                        { filterConfig.map( ({ key , label , icon: Icon }) => (
                            <button
                                key      = { key }
                                role     = "tab"
                                className = { `tab gap-2 ${ filter === key ? 'tab-active' : '' }` }
                                onClick   = { () => handleFilterChange( key ) }
                            >
                                <Icon size={ 18 } />
                                <span className="hidden sm:inline">{ label }</span>
                            </button>
                        ))}
                    </div>

                    {/* Active Filter Description */}
                    { activeFilter && (
                        <div className="alert bg-base-100 shadow-md">
                            <activeFilter.icon className="text-primary" size={ 24 } />
                            <div className="flex-1">
                                <h3 className="font-semibold">{ activeFilter.label }</h3>
                                <p className="text-xs opacity-70">{ activeFilter.description }</p>
                            </div>
                            <Badge color="ghost" size="sm">
                                { filter === 'all' ? `${ componentsToShow.length } components` : '1 component' }
                            </Badge>
                        </div>
                    )}
                </div>
            </Container>

            <Divider />

            {/* Components Display */}
            <Container className="flex flex-col gap-8" maxWidth="max-w-7xl">
                { componentsToShow.map( ({ key , label , component }) => (
                    <div
                        key       = { key }
                        className = "animate-fadeIn"
                    >
                        { filter === 'all' && (
                            <div className="mb-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    { filterConfig.find( item => item.key === key )?.icon &&
                                        <span className="text-primary">
                                            { (() => {
                                                const Icon = filterConfig.find( item => item.key === key )?.icon ;
                                                return <Icon size={ 28 } /> ;
                                            })()}
                                        </span>
                                    }
                                    { label }
                                </h2>
                                <p className="text-sm opacity-70 mt-1">
                                    { filterConfig.find( item => item.key === key )?.description }
                                </p>
                                <Divider className="my-4" />
                            </div>
                        )}

                        { component }
                    </div>
                ))}
            </Container>

            {/* Footer Info */}
            <Container className="text-center opacity-60" maxWidth="max-w-4xl">
                <p className="text-sm">
                    💡 Tip: Use the tabs above to filter and explore specific TextArea variants
                </p>
            </Container>

        </Page>
    ) ;
} ;

export default TextAreas ;
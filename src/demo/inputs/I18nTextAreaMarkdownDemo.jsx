'use client' ;

import { useState } from 'react' ;

import Container            from '@/display/Container' ;
import I18nTextAreaMarkdown from '@/components/i18n/I18nTextAreaMarkdown' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * I18nTextAreaMarkdown demo component.
 *
 * Demonstrates the multi-language Markdown editor : a single field
 * whose value is a `{ [lang]: string }` map. Clicking a flag swaps
 * both the editor content and the Markdown preview ; languages with
 * non-empty content carry a dot indicator. A live JSON preview shows
 * that the whole map is a single value (single dirty signal for the
 * parent form).
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.i18nTextAreaMarkdown'] - Dot notation path to the demo locale.
 */
const I18nTextAreaMarkdownDemo = ( { path = 'demo.inputs.i18nTextAreaMarkdown' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    // The maps below are the demo's DATA, not its copy : a markdown document
    // per language is the value this editor exists to hold.
    const [ description , setDescription ] = useState({
        fr : '# Bonjour\n\nUne **description** multilingue en _markdown_.\n\n- la preview suit la langue active\n- les drapeaux remplis portent un point' ,
        en : ''
    }) ;

    const [ notes , setNotes ] = useState( { fr : '' , en : '' } ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">{ t.title }</h3>

            <I18nTextAreaMarkdown
                label       = { t.description?.label }
                helper      = { t.description?.helper }
                placeholder = { t.description?.placeholder }
                value       = { description }
                onChange    = { setDescription }
                autosize
                minRows     = { 4 }
                maxRows     = { 10 }
            />

            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium opacity-70">{ t.stored }</span>
                <pre className="bg-base-300/60 rounded-box p-4 text-xs overflow-auto">
                    { JSON.stringify( description , null , 2 ) }
                </pre>
            </div>

            <I18nTextAreaMarkdown
                label           = { t.notes?.label }
                previewPosition = "tab"
                placeholder     = { t.notes?.placeholder }
                value           = { notes }
                onChange        = { setNotes }
                minRows         = { 3 }
            />

            <I18nTextAreaMarkdown
                label    = { t.disabled?.label }
                value    = { { fr : '**Contenu figé**' , en : '**Frozen content**' } }
                disabled
            />

        </Container>
    ) ;
} ;

export default I18nTextAreaMarkdownDemo ;

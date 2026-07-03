'use client' ;

import { useState } from 'react' ;

import Container            from '@/display/Container' ;
import I18nTextAreaMarkdown from '@/components/i18n/I18nTextAreaMarkdown' ;

/**
 * I18nTextAreaMarkdown demo component.
 *
 * Demonstrates the multi-language Markdown editor : a single field
 * whose value is a `{ [lang]: string }` map. Clicking a flag swaps
 * both the editor content and the Markdown preview ; languages with
 * non-empty content carry a dot indicator. A live JSON preview shows
 * that the whole map is a single value (single dirty signal for the
 * parent form).
 */
const I18nTextAreaMarkdownDemo = () =>
{
    const [ description , setDescription ] = useState({
        fr : '# Bonjour\n\nUne **description** multilingue en _markdown_.\n\n- la preview suit la langue active\n- les drapeaux remplis portent un point' ,
        en : ''
    }) ;

    const [ notes , setNotes ] = useState( { fr : '' , en : '' } ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">I18n TextArea Markdown Examples</h3>

            {/* Controlled multi-language markdown field (side-by-side preview) */}
            <I18nTextAreaMarkdown
                label       = "Description"
                helper      = "Click a flag to edit that language — the preview follows"
                placeholder = "Écrivez en markdown…"
                value       = { description }
                onChange    = { setDescription }
                autosize
                minRows     = { 4 }
                maxRows     = { 10 }
            />

            {/* Stored value */}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-medium opacity-70">Stored value (single object)</span>
                <pre className="bg-base-300/60 rounded-box p-4 text-xs overflow-auto">
                    { JSON.stringify( description , null , 2 ) }
                </pre>
            </div>

            {/* Tab mode : Write | Preview */}
            <I18nTextAreaMarkdown
                label           = "Notes (tab mode)"
                previewPosition = "tab"
                placeholder     = "Write markdown…"
                value           = { notes }
                onChange        = { setNotes }
                minRows         = { 3 }
            />

            {/* Disabled */}
            <I18nTextAreaMarkdown
                label    = "Disabled"
                value    = { { fr : '**Contenu figé**' , en : '**Frozen content**' } }
                disabled
            />

        </Container>
    ) ;
} ;

export default I18nTextAreaMarkdownDemo ;

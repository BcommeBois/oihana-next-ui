'use client' ;

import { useState } from 'react' ;

import Container    from '@/display/Container' ;
import I18nTextArea from '@/components/i18n/I18nTextArea' ;

/**
 * I18nTextArea demo component.
 *
 * Demonstrates the multi-language TextArea : a single field whose value
 * is a `{ [lang]: string }` map. Clicking a flag swaps the textarea
 * content ; languages with non-empty content carry a dot indicator.
 * A live JSON preview shows that the whole map is a single value
 * (single dirty signal for the parent form).
 */
const I18nTextAreaDemo = () =>
{
    const [ description , setDescription ] = useState( { fr : 'Bonjour le monde' , en : '' } ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">I18n TextArea Examples</h3>

            {/* Controlled multi-language field + live value preview */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <I18nTextArea
                    label       = "Description"
                    helper      = "Click a flag to edit that language — filled ones show a dot"
                    placeholder = "Décrivez votre service…"
                    value       = { description }
                    onChange    = { setDescription }
                    autosize
                    minRows     = { 3 }
                    maxRows     = { 6 }
                />

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium opacity-70">Stored value (single object)</span>
                    <pre className="bg-base-300/60 rounded-box p-4 text-xs overflow-auto">
                        { JSON.stringify( description , null , 2 ) }
                    </pre>
                </div>
            </div>

            {/* Disabled */}
            <I18nTextArea
                label    = "Disabled"
                value    = { { fr : 'Contenu figé' , en : 'Frozen content' } }
                disabled
                minRows  = { 2 }
            />

        </Container>
    ) ;
} ;

export default I18nTextAreaDemo ;

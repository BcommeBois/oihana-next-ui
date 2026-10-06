'use client' ;

import { useState } from 'react' ;

import Container    from '@/display/Container' ;
import I18nTextArea from '@/components/i18n/I18nTextArea' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * I18nTextArea demo component.
 *
 * Demonstrates the multi-language TextArea : a single field whose value
 * is a `{ [lang]: string }` map. Clicking a flag swaps the textarea
 * content ; languages with non-empty content carry a dot indicator.
 * A live JSON preview shows that the whole map is a single value
 * (single dirty signal for the parent form).
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.i18nTextArea'] - Dot notation path to the demo locale.
 */
const I18nTextAreaDemo = ( { path = 'demo.inputs.i18nTextArea' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    // The maps below are the demo's DATA, not its copy : one language filled
    // and the other empty is what shows the dot indicator doing its job.
    const [ description , setDescription ] = useState( { fr : 'Bonjour le monde' , en : '' } ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">{ t.title }</h3>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <I18nTextArea
                    label       = { t.description?.label }
                    helper      = { t.description?.helper }
                    placeholder = { t.description?.placeholder }
                    value       = { description }
                    onChange    = { setDescription }
                    autosize
                    minRows     = { 3 }
                    maxRows     = { 6 }
                />

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium opacity-70">{ t.stored }</span>
                    <pre className="bg-base-300/60 rounded-box p-4 text-xs overflow-auto">
                        { JSON.stringify( description , null , 2 ) }
                    </pre>
                </div>
            </div>

            <I18nTextArea
                label    = { t.disabled?.label }
                value    = { { fr : 'Contenu figé' , en : 'Frozen content' } }
                disabled
                minRows  = { 2 }
            />

        </Container>
    ) ;
} ;

export default I18nTextAreaDemo ;

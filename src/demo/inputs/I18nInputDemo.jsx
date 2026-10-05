'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import I18nInput from '@/components/i18n/I18nInput' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { MdTitle } from 'react-icons/md' ;

/**
 * I18nInput demo component.
 *
 * Demonstrates the multi-language Input : a single field whose value
 * is a `{ [lang]: string }` map. Clicking a flag swaps the input
 * content ; languages with non-empty content carry a dot indicator.
 * A live JSON preview shows that the whole map is a single value
 * (single dirty signal for the parent form).
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.i18nInput'] - Dot notation path to the demo locale.
 */
const I18nInputDemo = ( { path = 'demo.inputs.i18nInput' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    // The maps below are the demo's DATA, not its copy : one language filled and
    // the other empty is what shows the dot indicator doing its job.
    const [ title , setTitle ] = useState( { fr : 'Bonjour le monde' , en : '' } ) ;
    const [ slogan , setSlogan ] = useState( { fr : '' , en : '' } ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">{ t.title }</h3>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <I18nInput
                    label       = { t.heading?.label }
                    helper      = { t.heading?.helper }
                    placeholder = { t.heading?.placeholder }
                    value       = { title }
                    onChange    = { setTitle }
                />

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium opacity-70">{ t.stored }</span>
                    <pre className="bg-base-300/60 rounded-box p-4 text-xs overflow-auto">
                        { JSON.stringify( title , null , 2 ) }
                    </pre>
                </div>
            </div>

            <I18nInput
                label       = { t.slogan?.label }
                helper      = { t.slogan?.helper }
                placeholder = { t.slogan?.placeholder }
                icon        = { <MdTitle size={ 18 } /> }
                maxLength   = { 60 }
                value       = { slogan }
                onChange    = { setSlogan }
            />

            <I18nInput
                label    = { t.disabled?.label }
                value    = { { fr : 'Contenu figé' , en : 'Frozen content' } }
                disabled
            />

        </Container>
    ) ;
} ;

export default I18nInputDemo ;

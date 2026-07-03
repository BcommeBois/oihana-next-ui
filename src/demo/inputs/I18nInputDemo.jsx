'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;
import I18nInput from '@/components/i18n/I18nInput' ;

import { MdTitle } from 'react-icons/md' ;

/**
 * I18nInput demo component.
 *
 * Demonstrates the multi-language Input : a single field whose value
 * is a `{ [lang]: string }` map. Clicking a flag swaps the input
 * content ; languages with non-empty content carry a dot indicator.
 * A live JSON preview shows that the whole map is a single value
 * (single dirty signal for the parent form).
 */
const I18nInputDemo = () =>
{
    const [ title , setTitle ] = useState( { fr : 'Bonjour le monde' , en : '' } ) ;
    const [ slogan , setSlogan ] = useState( { fr : '' , en : '' } ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">I18n Input Examples</h3>

            {/* Controlled multi-language field + live value preview */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <I18nInput
                    label       = "Titre"
                    helper      = "Click a flag to edit that language — filled ones show a dot"
                    placeholder = "Mon service…"
                    value       = { title }
                    onChange    = { setTitle }
                />

                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium opacity-70">Stored value (single object)</span>
                    <pre className="bg-base-300/60 rounded-box p-4 text-xs overflow-auto">
                        { JSON.stringify( title , null , 2 ) }
                    </pre>
                </div>
            </div>

            {/* With icon + maxLength */}
            <I18nInput
                label       = "Slogan"
                helper      = "With an icon and a 60 characters limit"
                placeholder = "Un slogan accrocheur…"
                icon        = { <MdTitle size={ 18 } /> }
                maxLength   = { 60 }
                value       = { slogan }
                onChange    = { setSlogan }
            />

            {/* Disabled */}
            <I18nInput
                label    = "Disabled"
                value    = { { fr : 'Contenu figé' , en : 'Frozen content' } }
                disabled
            />

        </Container>
    ) ;
} ;

export default I18nInputDemo ;

'use client' ;

import { useState } from 'react' ;

import { MdTag } from 'react-icons/md' ;

import Container from '@/display/Container' ;
import InputTags from '@/components/inputs/InputTags' ;

/**
 * InputTags demo component.
 *
 * Five faces of the same field : free entries, an entry refused with the
 * host's own sentence, one refused with the bundle's, a chip drawn by the
 * host, and a field that only shows what it holds.
 */
const InputTagsDemo = () =>
{
    const [ keywords , setKeywords ] = useState( [ 'draft' , 'review' ] ) ;
    const [ emails   , setEmails   ] = useState( [] ) ;
    const [ codes    , setCodes    ] = useState( [ 'ABC' ] ) ;
    const [ colours  , setColours  ] = useState( [ 'teal' , 'amber' ] ) ;

    const isEmail = ( entry ) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test( entry ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">Input Tags Examples</h3>

            <InputTags
                helper      = "Type a word, then press Enter or click +"
                label       = "Keywords"
                placeholder = "Add a keyword…"
                value       = { keywords }
                onChange    = { setKeywords }
            />

            <InputTags
                helper      = "An entry that is not an address is refused, and stays in the field"
                label       = "Recipients"
                placeholder = "someone@example.com"
                value       = { emails }
                validateTag = { entry => isEmail( entry ) || 'That does not look like an address.' }
                onChange    = { setEmails }
            />

            <InputTags
                chipClassName = "font-mono"
                helper        = "Three capital letters. Refusing with false shows the bundle's own sentence."
                label         = "Codes"
                placeholder   = "ABC"
                value         = { codes }
                validateTag   = { entry => /^[A-Z]{3}$/.test( entry ) }
                onChange      = { setCodes }
            />

            <InputTags
                label       = "Drawn by the host"
                helper      = "renderChip gets the entry, whether the field is disabled, and the way out"
                placeholder = "Add a name…"
                value       = { colours }
                onChange    = { setColours }
                renderChip  = { ( { remove , value } ) => (
                    <span className="badge badge-outline gap-1">
                        <MdTag className="size-3 opacity-60" />
                        { value }
                        <button
                            aria-label = { `Remove ${ value }` }
                            className  = "cursor-pointer opacity-70 hover:opacity-100"
                            type       = "button"
                            onClick    = { remove }
                        >
                            ✕
                        </button>
                    </span>
                ) }
            />

            <InputTags
                disabled
                helper      = "Disabled : the entries stay readable and lose their way out"
                label       = "Locked"
                placeholder = "Unavailable"
                value       = { [ 'alpha' , 'beta' , 'gamma' ] }
            />

        </Container>
    ) ;
} ;

export default InputTagsDemo ;

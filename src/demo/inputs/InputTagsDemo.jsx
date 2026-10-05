'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import { MdTag } from 'react-icons/md' ;

import Container from '@/display/Container' ;
import InputTags from '@/components/inputs/InputTags' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * InputTags demo component.
 *
 * Five faces of the same field : free entries, an entry refused with the
 * host's own sentence, one refused with the bundle's, a chip drawn by the
 * host, and a field that only shows what it holds.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.tags'] - Dot notation path to the demo locale.
 */
const InputTagsDemo = ( { path = 'demo.inputs.tags' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ keywords , setKeywords ] = useState( [ 'draft' , 'review' ] ) ;
    const [ emails   , setEmails   ] = useState( [] ) ;
    const [ codes    , setCodes    ] = useState( [ 'ABC' ] ) ;
    const [ colours  , setColours  ] = useState( [ 'teal' , 'amber' ] ) ;

    const isEmail = ( entry ) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test( entry ) ;

    return (
        <Container className="flex flex-col gap-8 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h3 className="text-2xl font-bold">{ t.title }</h3>

            <InputTags
                helper      = { t.keywords?.helper }
                label       = { t.keywords?.label }
                placeholder = { t.keywords?.placeholder }
                value       = { keywords }
                onChange    = { setKeywords }
            />

            <InputTags
                helper      = { t.recipients?.helper }
                label       = { t.recipients?.label }
                placeholder = { t.recipients?.placeholder }
                value       = { emails }
                validateTag = { entry => isEmail( entry ) || t.recipients?.invalid }
                onChange    = { setEmails }
            />

            <InputTags
                chipClassName = "font-mono"
                helper        = { t.codes?.helper }
                label         = { t.codes?.label }
                placeholder   = { t.codes?.placeholder }
                value         = { codes }
                validateTag   = { entry => /^[A-Z]{3}$/.test( entry ) }
                onChange      = { setCodes }
            />

            <InputTags
                helper      = { t.drawn?.helper }
                label       = { t.drawn?.label }
                placeholder = { t.drawn?.placeholder }
                value       = { colours }
                onChange    = { setColours }
                renderChip  = { ( { remove , value } ) => (
                    <span className="badge badge-outline gap-1">
                        <MdTag className="size-3 opacity-60" />
                        { value }
                        <button
                            aria-label = { format( t.remove ?? '' , value ) }
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
                helper      = { t.locked?.helper }
                label       = { t.locked?.label }
                placeholder = { t.locked?.placeholder }
                value       = { [ 'alpha' , 'beta' , 'gamma' ] }
            />

        </Container>
    ) ;
} ;

export default InputTagsDemo ;

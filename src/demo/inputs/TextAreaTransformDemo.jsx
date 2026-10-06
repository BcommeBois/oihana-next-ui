'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;
import TextArea  from '@/components/inputs/TextArea' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * TextArea transform demo component.
 *
 * Nine settings of the same field : what it changes as you type, and what it
 * settles when you leave it.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.textAreaTransform'] - Dot notation path to the demo locale.
 */
const TextAreaTransformDemo = ( { path = 'demo.inputs.textAreaTransform' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ comment , setComment ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.upper }</h3>

                <TextArea
                    label       = { t.upper?.label }
                    transform   = { v => v.toUpperCase() }
                    placeholder = { t.upper?.placeholder }
                    rows        = { 4 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.trim }</h3>

                <TextArea
                    label         = { t.trim?.label }
                    processOnBlur = { v => v.trim() }
                    placeholder   = { t.trim?.placeholder }
                    rows          = { 4 }
                    helper        = { t.trim?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.limit }</h3>

                <TextArea
                    label       = { t.limit?.label }
                    validate    = { v => v.length <= 100 }
                    value       = { comment }
                    onChange    = { setComment }
                    placeholder = { t.limit?.placeholder }
                    rows        = { 3 }
                    helper      = { format( t.limit?.helper ?? '' , comment.length ) }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.capitalize }</h3>

                <TextArea
                    label         = { t.capitalize?.label }
                    processOnBlur = { v => v.charAt( 0 ).toUpperCase() + v.slice( 1 ) }
                    placeholder   = { t.capitalize?.placeholder }
                    rows          = { 4 }
                    helper        = { t.capitalize?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.whitespace }</h3>

                <TextArea
                    label         = { t.whitespace?.label }
                    processOnBlur = { v => v.replace( /\s+/g , ' ' ).trim() }
                    placeholder   = { t.whitespace?.placeholder }
                    rows          = { 5 }
                    helper        = { t.whitespace?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.stripHtml }</h3>

                <TextArea
                    label       = { t.stripHtml?.label }
                    transform   = { v => v.replace( /<[^>]*>/g , '' ) }
                    placeholder = { t.stripHtml?.placeholder }
                    rows        = { 4 }
                    helper      = { t.stripHtml?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.list }</h3>

                <TextArea
                    label         = { t.list?.label }
                    processOnBlur = { v =>
                        v.split( '\n' )
                         .filter( line => line.trim() )
                         .map( line => line.startsWith( '- ' ) ? line : `- ${ line }` )
                         .join( '\n' )
                    }
                    placeholder = { t.list?.placeholder }
                    rows        = { 6 }
                    helper      = { t.list?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <TextArea
                    useFieldset
                    legend        = { t.fieldset?.legend }
                    processOnBlur = { v => v.trim() }
                    placeholder   = { t.fieldset?.placeholder }
                    rows          = { 6 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.validation }</h3>

                <TextArea
                    useValidator
                    required
                    label         = { t.validation?.label }
                    minLength     = { 20 }
                    validatorHint = { t.validation?.hint }
                    placeholder   = { t.validation?.placeholder }
                    rows          = { 4 }
                />
            </div>

        </Container>
    ) ;
} ;

export default TextAreaTransformDemo ;

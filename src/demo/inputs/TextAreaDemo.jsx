'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Container from '@/display/Container' ;
import TextArea  from '@/components/inputs/TextArea' ;

import useI18n from '@/contexts/locale/useI18n' ;

import ValueProbe from './ValueProbe' ;

/** Smallest to largest. */
const SIZES = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

/** The daisyUI colours a field can carry. */
const COLORS = [ 'primary' , 'secondary' , 'accent' , 'info' , 'success' , 'warning' ] ;

/** The four values of `resize`, in the order the section shows them. */
const RESIZES = [ 'vertical' , 'horizontal' , 'both' , 'none' ] ;

/** The row counts of the « number of rows » section, and their key. */
const ROWS = [ [ 1 , 'one' ] , [ 5 , 'five' ] , [ 10 , 'ten' ] ] ;

/**
 * The read-only sample — a document, not copy : what matters is that the field
 * shows a long text it refuses to let go of.
 */
const SAMPLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' ;

/**
 * TextArea demo component.
 *
 * Thirteen sections : the plain field, every size, every colour, what it
 * transforms, how it resizes, how many rows it holds, and the four states.
 *
 * 🔑 The sizes, colours, resize modes and row counts are LOOPED over their API
 * values, each labelled with the value itself : eleven near-identical blocks
 * said the same thing eleven times, and a value is not copy.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.textArea'] - Dot notation path to the demo locale.
 */
const TextAreaDemo = ( { path = 'demo.inputs.textArea' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ message , setMessage ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.basic }</h3>

                <TextArea
                    label       = { t.basic?.label }
                    className   = "w-full"
                    placeholder = { t.basic?.placeholder }
                    helper      = { t.basic?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.sizes }</h3>

                { SIZES.map( size => (
                    <TextArea
                        key         = { size }
                        label       = { `size="${ size }"` }
                        size        = { size }
                        placeholder = { t.sizes?.placeholder }
                    />
                ) ) }
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.colors }</h3>

                { COLORS.map( color => (
                    <TextArea
                        key         = { color }
                        label       = { `color="${ color }"` }
                        color       = { color }
                        placeholder = { t.colors?.placeholder }
                    />
                ) ) }
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.transform }</h3>

                <TextArea
                    label     = { t.transform?.label }
                    transform = { val => val.toUpperCase() }
                    helper    = { t.transform?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.ghost }</h3>

                <TextArea
                    label       = { t.ghost?.label }
                    style       = "ghost"
                    placeholder = { t.ghost?.placeholder }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.resize }</h3>

                { RESIZES.map( resize => (
                    <TextArea
                        key         = { resize }
                        label       = { t.resize?.[ resize ]?.label }
                        resize      = { resize }
                        placeholder = { t.resize?.[ resize ]?.placeholder }
                    />
                ) ) }

                <TextArea label={ t.resize?.fixed?.label } rows={ 5 } />

                <TextArea
                    autosize
                    minRows = { 3 }
                    maxRows = { 10 }
                    label   = { t.resize?.growing?.label }
                />

                <TextArea
                    autosize
                    minRows = { 2 }
                    label   = { t.resize?.infinite?.label }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.rows }</h3>

                { ROWS.map( ( [ count , key ] ) => (
                    <TextArea
                        key         = { key }
                        label       = { t.rows?.[ key ]?.label }
                        rows        = { count }
                        placeholder = { t.rows?.[ key ]?.placeholder }
                    />
                ) ) }
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.validation }</h3>

                <TextArea
                    useValidator
                    required
                    label         = { t.validation?.label }
                    minLength     = { 10 }
                    maxLength     = { 500 }
                    placeholder   = { t.validation?.placeholder }
                    validatorHint = { t.validation?.hint }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.controlled }</h3>

                <TextArea
                    label       = { t.controlled?.label }
                    value       = { message }
                    onChange    = { setMessage }
                    placeholder = { t.controlled?.placeholder }
                    helper      = { format( t.controlled?.chars ?? '' , message.length ) }
                />
                <ValueProbe label="message" value={ message } />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <TextArea
                    useFieldset
                    legend      = { t.fieldset?.legend }
                    rows        = { 5 }
                    placeholder = { t.fieldset?.placeholder }
                    helper      = { t.fieldset?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.error }</h3>

                <TextArea
                    label       = { t.error?.label }
                    error       = { t.error?.error }
                    placeholder = { t.error?.placeholder }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.disabled }</h3>

                <TextArea
                    label       = { t.disabled?.label }
                    disabled
                    placeholder = { t.disabled?.placeholder }
                    helper      = { t.disabled?.helper }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.readOnly }</h3>

                <TextArea
                    label        = { t.readOnly?.label }
                    readOnly
                    rows         = { 6 }
                    defaultValue = { SAMPLE }
                />
            </div>

        </Container>
    ) ;
} ;

export default TextAreaDemo ;

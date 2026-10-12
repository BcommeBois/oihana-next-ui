'use client' ;

import { useState } from 'react' ;

import Container from '@/display/Container' ;

import Button      from '@/components/Button' ;
import Divider     from '@/components/Divider' ;
import Input       from '@/components/inputs/Input' ;
import RadioFilter from '@/components/radios/RadioFilter' ;

import useI18n from '@/contexts/locale/useI18n' ;

const REASONS = [ 'damaged' , 'missing' , 'label' , 'other' ] ;

const SIZES = [ 'xs' , 'sm' , 'md' , 'lg' , 'xl' ] ;

/**
 * RadioFilter demo.
 *
 * The reason for a discrepancy, the value received printed ; the sizes ; the
 * colours and styles ; and the filter inside a form, where `×` takes back the
 * choice and nothing else.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.radios.filter'] - Dot notation path to the demo locale.
 */
const RadioFilterDemo = ( { path = 'demo.radios.filter' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const options = REASONS.map( value => ( { label : t.reasons?.[ value ] , value } ) ) ;

    const [ reason     , setReason     ] = useState( null ) ;
    const [ formReason , setFormReason ] = useState( null ) ;
    const [ missing    , setMissing    ] = useState( false ) ;
    const [ sent       , setSent       ] = useState( null ) ;

    const onSubmit = event =>
    {
        event.preventDefault() ;

        if ( formReason === null )
        {
            setMissing( true ) ;
            setSent( null ) ;
            return ;
        }

        setMissing( false ) ;
        setSent( Object.fromEntries( new FormData( event.currentTarget ) ) ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>
            <p className="text-sm text-base-content/70">{ t.intro }</p>

            {/* The reason for a discrepancy */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.reason?.title }</h3>
                <RadioFilter
                    label    = { t.reason?.label }
                    name     = "filter-reason"
                    onChange = { setReason }
                    options  = { options }
                    size     = "lg"
                    value    = { reason }
                />
                <pre className="rounded-box bg-base-100 p-3 text-xs">
                    onChange → { reason === null ? `null (${ t.reason?.none })` : JSON.stringify( reason ) }
                </pre>
            </section>

            <Divider />

            {/* Sizes */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.sizes?.title }</h3>
                { SIZES.map( size => (
                    <div className="flex flex-wrap items-center gap-4" key={ size }>
                        <span className="w-8 font-mono text-sm">{ size }</span>
                        <RadioFilter name={ `filter-size-${ size }` } options={ options.slice( 0 , 3 ) } size={ size } />
                    </div>
                ) ) }
            </section>

            <Divider />

            {/* Colours, styles, a disabled option */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.looks?.title }</h3>
                <RadioFilter color="primary" label={ t.looks?.primary } name="filter-primary" options={ options } />
                <RadioFilter color="secondary" label={ t.looks?.outline } name="filter-outline" options={ options } style="outline" />
                <RadioFilter
                    color   = "accent"
                    label   = { t.looks?.soft }
                    name    = "filter-soft"
                    options = { options.map( option => ( option.value === 'other' ? { ...option , disabled : true } : option ) ) }
                    style   = "soft"
                />
            </section>

            <Divider />

            {/* In a form */}
            <section className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">{ t.form?.title }</h3>
                <p className="text-sm text-base-content/70">{ t.form?.note }</p>
                <form className="flex max-w-xl flex-col gap-4" onSubmit={ onSubmit }>
                    <Input defaultValue={ t.form?.commentValue } label={ t.form?.comment } name="comment" />
                    <RadioFilter
                        error    = { missing ? t.form?.required : undefined }
                        label    = { t.reason?.label }
                        name     = "reason"
                        onChange = { value =>
                        {
                            setFormReason( value ) ;
                            setMissing( false ) ;
                        } }
                        options  = { options }
                        size     = "lg"
                        value    = { formReason }
                    />
                    <div>
                        <Button color="primary" type="submit">{ t.form?.submit }</Button>
                    </div>
                </form>
                { sent && (
                    <pre className="rounded-box bg-base-100 p-3 text-xs">
                        { t.form?.sent } : { JSON.stringify( sent ) }
                    </pre>
                ) }
            </section>

        </Container>
    ) ;
} ;

export default RadioFilterDemo ;

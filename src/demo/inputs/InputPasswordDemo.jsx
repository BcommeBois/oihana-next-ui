'use client' ;

import Container      from '@/display/Container' ;
import InputPassword  from '@/components/inputs/InputPassword' ;

import useI18n from '@/contexts/locale/useI18n' ;

import { MdKey as KeyIcon } from 'react-icons/md' ;

const PATTERN_PASSWORD = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' ;

/**
 * InputPassword demo component.
 *
 * Demonstrates various configurations for InputPassword, ending on the one
 * case the bundle does not cover : accessible names the HOST passes, which is
 * what `showPasswordLabel` and `hidePasswordLabel` exist for.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.password'] - Dot notation path to the demo locale.
 */
const InputPasswordDemo = ( { path = 'demo.inputs.password' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const handleSubmit = event =>
    {
        event.preventDefault() ;
        console.log( 'Form submitted!' ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <InputPassword placeholder={ t.simple?.placeholder } />

            <InputPassword
                placeholder = { t.noToggle?.placeholder }
                showToggle  = { false }
            />

            <InputPassword
                placeholder = { t.noIcon?.placeholder }
                showIcon    = { false }
            />

            <InputPassword
                label       = { t.labelled?.label }
                placeholder = { t.labelled?.placeholder }
                helper      = { t.labelled?.helper }
            />

            <InputPassword
                useFieldset
                legend      = { t.fieldset?.legend }
                placeholder = { t.fieldset?.placeholder }
                helper      = { t.fieldset?.helper }
            />

            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <InputPassword
                    useValidator
                    label         = { t.secure?.label }
                    placeholder   = { t.secure?.placeholder }
                    required
                    pattern       = { PATTERN_PASSWORD }
                    minLength     = { 8 }
                    title         = { t.secure?.title }
                    validatorHint = { t.secure?.hint }
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    { t.secure?.submit }
                </button>
            </form>

            <InputPassword
                icon        = { <KeyIcon /> }
                placeholder = { t.customIcon?.placeholder }
            />

            <InputPassword
                placeholder = { t.error?.placeholder }
                error       = { t.error?.error }
            />

            <InputPassword
                disabled
                defaultValue = "disabled123"
                placeholder  = { t.disabled?.placeholder }
            />

            <InputPassword
                readOnly
                defaultValue = "readonly123"
                placeholder  = { t.readOnly?.placeholder }
            />

            <InputPassword
                label             = { t.custom?.label }
                placeholder       = { t.custom?.placeholder }
                showPasswordLabel = { t.custom?.show }
                hidePasswordLabel = { t.custom?.hide }
                helper            = { t.custom?.helper }
            />

        </Container>
    ) ;
} ;

export default InputPasswordDemo ;

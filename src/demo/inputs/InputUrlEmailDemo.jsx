'use client' ;

import { useState } from 'react' ;

import Container  from '@/display/Container' ;
import InputEmail from '@/components/inputs/InputEmail' ;
import InputURL   from '@/components/inputs/InputUrl' ;

import useI18n from '@/contexts/locale/useI18n' ;

/**
 * InputEmail and InputUrl demo component.
 *
 * Two fields that know what they expect : one address or several, and an
 * address whose protocol is added, demanded or left alone.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.urlEmail'] - Dot notation path to the demo locale.
 */
const InputEmailURLDemo = ( { path = 'demo.inputs.urlEmail' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const email = t.email ?? {} ;
    const url   = t.url   ?? {} ;

    const [ emailValue , setEmailValue ] = useState( '' ) ;
    const [ urlValue , setUrlValue ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.email }</h3>

                <InputEmail
                    label    = { email.basic?.label }
                    value    = { emailValue }
                    onChange = { setEmailValue }
                    helper   = { email.basic?.helper }
                />

                <InputEmail
                    useValidator
                    label         = { email.required?.label }
                    validatorHint = { email.required?.hint }
                />

                <InputEmail
                    multiple
                    label       = { email.multiple?.label }
                    placeholder = { email.multiple?.placeholder }
                    helper      = { email.multiple?.helper }
                />

                <InputEmail
                    multiple
                    useValidator
                    label         = { email.multipleV?.label }
                    placeholder   = { email.multiple?.placeholder }
                    validatorHint = { email.multipleV?.hint }
                    helper        = { email.multipleV?.helper }
                />

                <InputEmail
                    useFieldset
                    legend = { email.fieldset?.legend }
                    helper = { email.fieldset?.helper }
                />

                <InputEmail
                    label    = { email.noIcon?.label }
                    showIcon = { false }
                />

                <InputEmail
                    label = { email.error?.label }
                    error = { email.error?.error }
                />

                <InputEmail
                    label        = { email.disabled?.label }
                    defaultValue = "user@example.com"
                    disabled
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.url }</h3>

                <InputURL
                    label    = { url.basic?.label }
                    value    = { urlValue }
                    onChange = { setUrlValue }
                    helper   = { url.basic?.helper }
                />

                <InputURL
                    allowedProtocols = "https"
                    validatorHint    = { url.secure?.hint }
                />

                <InputURL
                    allowedProtocols = "http"
                    placeholder      = { url.plain?.placeholder }
                />

                <InputURL
                    allowedProtocols = "https"
                    autoProtocol     = { false }
                    validatorHint    = { url.strict?.hint }
                />

                <InputURL
                    label        = { url.noProtocol?.label }
                    autoProtocol = { false }
                    helper       = { url.noProtocol?.helper }
                />

                <InputURL
                    useValidator
                    label         = { url.required?.label }
                    validatorHint = { url.required?.hint }
                />

                <InputURL
                    showOpenButton = { false }
                    label          = { url.noButton?.label }
                    helper         = { url.noButton?.helper }
                />

                <InputURL
                    useFieldset
                    legend = { url.fieldset?.legend }
                    helper = { url.fieldset?.helper }
                />

                <InputURL
                    label    = { url.noIcon?.label }
                    showIcon = { false }
                />

                <InputURL
                    label = { url.error?.label }
                    error = { url.error?.error }
                />

                <InputURL
                    label        = { url.disabled?.label }
                    defaultValue = "https://example.com"
                    disabled
                />

                <InputURL
                    label        = { url.readOnly?.label }
                    defaultValue = "https://example.com"
                    readOnly
                />
            </div>

        </Container>
    ) ;
} ;

export default InputEmailURLDemo ;

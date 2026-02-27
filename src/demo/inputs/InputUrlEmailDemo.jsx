'use client' ;

import { useState } from 'react' ;

import Container  from '@/display/Container' ;
import InputEmail from '@/components/inputs/InputEmail' ;
import InputURL   from '@/components/inputs/InputUrl' ;

const InputEmailURLDemo = () =>
{
    const [ email, setEmail ] = useState( '' ) ;
    const [ url, setUrl ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Email & URL Examples</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Email Input</h3>

                <InputEmail
                    label  = "Email Address"
                    value  = { email }
                    onChange = { setEmail }
                    helper = "Enter your email address"
                />

                <InputEmail
                    useValidator
                    // required
                    label         = "Email (Required)"
                    validatorHint = "Please enter a valid email address"
                />

                <InputEmail
                    multiple
                    label       = "Multiple Emails"
                    placeholder = "email1@example.com, email2@example.com"
                    helper      = "Separate multiple emails with commas"
                />

                {/* Multiple emails - Validation native */}
                <InputEmail
                    multiple
                    useValidator
                    // required
                    label="Multiple Emails"
                    placeholder="email1@example.com, email2@example.com"
                    validatorHint="Enter one or more valid emails separated by commas"
                    helper="HTML5 validation handles multiple emails automatically"
                />

                <InputEmail
                    useFieldset
                    legend = "Contact Email"
                    helper = "We'll never share your email"
                />

                <InputEmail
                    label    = "Email without icon"
                    showIcon = { false }
                />

                <InputEmail
                    label = "Email with error"
                    error = "This email is already taken"
                />

                <InputEmail
                    label        = "Disabled Email"
                    defaultValue = "user@example.com"
                    disabled
                />
            </div>

            {/* URL Examples */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">URL Input</h3>

                <InputURL
                    label    = "Website URL"
                    value    = { url }
                    onChange = { setUrl }
                    helper   = "https:// will be added automatically"
                />

                <InputURL
                    allowedProtocols = "https"
                    validatorHint    = "Only secure HTTPS URLs allowed"
                />

                <InputURL
                    allowedProtocols = "http"
                    placeholder      = "http://localhost:3000"
                />

                <InputURL
                    allowedProtocols = "https"
                    autoProtocol     = { false }
                    validatorHint    = "Must start with https://"
                />

                <InputURL
                    label        = "Portfolio URL"
                    autoProtocol = { false }
                    helper       = "Enter URL without protocol"
                />

                <InputURL
                    useValidator
                    // required
                    label         = "Company Website (Required)"
                    validatorHint = "Please enter a valid URL"
                />

                <InputURL
                    showOpenButton = { false }
                    label          = "URL without open button"
                    helper         = "Just the input, no action button"
                />

                <InputURL
                    useFieldset
                    legend = "Social Media Link"
                    helper = "Your public profile URL"
                />

                <InputURL
                    label    = "URL without icon"
                    showIcon = { false }
                />

                <InputURL
                    label = "URL with error"
                    error = "Invalid URL format"
                />

                <InputURL
                    label        = "Disabled URL"
                    defaultValue = "https://example.com"
                    disabled
                />

                <InputURL
                    label        = "Read-only URL"
                    defaultValue = "https://example.com"
                    readOnly
                />


            </div>

        </Container>
    ) ;
} ;

export default InputEmailURLDemo ;
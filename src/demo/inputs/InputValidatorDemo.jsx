'use client' ;

import Container  from '@/display/Container' ;
import Input from '@/components/inputs/Input' ;

import {
    FaEnvelope as EmailIcon    ,
    FaUser     as UserIcon     ,
    FaLock     as PasswordIcon ,
    FaPhone    as PhoneIcon    ,
    FaLink     as LinkIcon     ,
}
from "react-icons/fa" ;

const PATTERN_USERNAME = '[A-Za-z][A-Za-z0-9\\-]*' ;
const PATTERN_PASSWORD = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' ;
const PATTERN_PHONE    = '[0-9]*' ;
const PATTERN_URL      = '^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\\-].*[a-zA-Z0-9])?\\.)+[a-zA-Z].*$' ;

/**
 * InputValidator demo component.
 *
 * Demonstrates HTML5 validation features with DaisyUI validator styling.
 */
const InputValidatorDemo = () =>
{
    const handleSubmit = ( event ) =>
    {
        event.preventDefault() ;
        console.log( 'Form submitted!' ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Validator Examples</h2>
            <p className="text-sm text-base-content/70">
                Try submitting with invalid data to see validation hints
            </p>

            {/* Email validation */}
            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = "Email Address"
                    icon          = { <EmailIcon /> }
                    type          = "email"
                    placeholder   = "mail@site.com"
                    required
                    validatorHint = "Enter valid email address"
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    Validate Email
                </button>
            </form>

            {/* Username validation */}
            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = "Username"
                    icon          = { <UserIcon /> }
                    type          = "text"
                    placeholder   = "Username"
                    required
                    pattern       = { PATTERN_USERNAME }
                    minLength     = { 3 }
                    maxLength     = { 30 }
                    title         = "Only letters, numbers or dash"
                    validatorHint = "Must be 3 to 30 characters containing only letters, numbers or dash"
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    Validate Username
                </button>
            </form>

            {/* Password validation */}
            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    useFieldset
                    legend        = "Password"
                    icon          = { <PasswordIcon /> }
                    type          = "password"
                    placeholder   = "Password"
                    required
                    pattern       = { PATTERN_PASSWORD }
                    minLength     = { 8 }
                    title         = "Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    validatorHint = "Must be more than 8 characters, including at least one number, one lowercase letter, one uppercase letter"
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    Validate Password
                </button>
            </form>

            {/* Phone validation */}
            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = "Phone Number"
                    icon          = { <PhoneIcon /> }
                    type          = "tel"
                    placeholder   = "0123456789"
                    required
                    pattern       = { PATTERN_PHONE }
                    minLength     = { 10 }
                    maxLength     = { 10 }
                    title         = "Must be 10 digits"
                    validatorHint = "Must be 10 digits"
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    Validate Phone
                </button>
            </form>

            {/* Number validation */}
            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = "Age"
                    type          = "number"
                    placeholder   = "Type a number between 1 to 100"
                    required
                    min           = { 1 }
                    max           = { 100 }
                    title         = "Must be between 1 to 100"
                    validatorHint = "Must be between 1 to 100"
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    Validate Age
                </button>
            </form>

            {/* URL validation */}
            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = "Website URL"
                    icon          = { <LinkIcon /> }
                    type          = "url"
                    placeholder   = "https://example.com"
                    required
                    pattern       = { PATTERN_URL }
                    title         = "Must be valid URL"
                    validatorHint = "Must be valid URL"
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    Validate URL
                </button>
            </form>

            {/* Combined: validator + helper + action buttons */}
            <form onSubmit={ handleSubmit }>
                <Input
                    useValidator
                    useFieldset
                    legend        = "Email Newsletter"
                    icon          = { <EmailIcon /> }
                    type          = "email"
                    placeholder   = "mail@site.com"
                    required
                    validatorHint = "Enter valid email address"
                    helper        = "We'll send you a confirmation email"
                    actions       =
                    {
                        <button type="submit" className="btn btn-input join-item btn-square font-semibold">
                            Join
                        </button>
                    }
                />
            </form>

        </Container>
    ) ;
} ;

export default InputValidatorDemo ;
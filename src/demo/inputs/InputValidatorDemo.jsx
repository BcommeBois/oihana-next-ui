'use client' ;

import Container from '@/display/Container' ;
import Input     from '@/components/inputs/Input' ;

import useI18n from '@/contexts/locale/useI18n' ;

import {
    FaEnvelope as EmailIcon    ,
    FaUser     as UserIcon     ,
    FaLock     as PasswordIcon ,
    FaPhone    as PhoneIcon    ,
    FaLink     as LinkIcon     ,
}
from "react-icons/fa" ;

import cn     from '../../themes/helpers/cn' ;
import styles from '../../components/inputs/styles/InputActions.module.css' ;

const PATTERN_USERNAME = '[A-Za-z][A-Za-z0-9\\-]*' ;
const PATTERN_PASSWORD = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' ;
const PATTERN_PHONE    = '[0-9]*' ;
const PATTERN_URL      = '^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\\-].*[a-zA-Z0-9])?\\.)+[a-zA-Z].*$' ;

/**
 * InputValidator demo component.
 *
 * Demonstrates HTML5 validation features with DaisyUI validator styling.
 *
 * ⚠️ The patterns above are the contract, not copy : what a reader is shown is
 * the `title` and the `validatorHint` beside them.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.validator'] - Dot notation path to the demo locale.
 */
const InputValidatorDemo = ( { path = 'demo.inputs.validator' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const handleSubmit = ( event ) =>
    {
        event.preventDefault() ;
        console.log( 'Form submitted!' ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>
            <p className="text-sm text-base-content/70">
                { t.note }
            </p>

            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = { t.email?.label }
                    icon          = { <EmailIcon /> }
                    type          = "email"
                    placeholder   = "mail@site.com"
                    required
                    validatorHint = { t.email?.hint }
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    { t.email?.submit }
                </button>
            </form>

            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = { t.username?.label }
                    icon          = { <UserIcon /> }
                    type          = "text"
                    placeholder   = { t.username?.label }
                    required
                    pattern       = { PATTERN_USERNAME }
                    minLength     = { 3 }
                    maxLength     = { 30 }
                    title         = { t.username?.title }
                    validatorHint = { t.username?.hint }
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    { t.username?.submit }
                </button>
            </form>

            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    useFieldset
                    legend        = { t.password?.legend }
                    icon          = { <PasswordIcon /> }
                    type          = "password"
                    placeholder   = { t.password?.legend }
                    required
                    pattern       = { PATTERN_PASSWORD }
                    minLength     = { 8 }
                    title         = { t.password?.title }
                    validatorHint = { t.password?.hint }
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    { t.password?.submit }
                </button>
            </form>

            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = { t.phone?.label }
                    icon          = { <PhoneIcon /> }
                    type          = "tel"
                    placeholder   = "0123456789"
                    required
                    pattern       = { PATTERN_PHONE }
                    minLength     = { 10 }
                    maxLength     = { 10 }
                    title         = { t.phone?.title }
                    validatorHint = { t.phone?.hint }
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    { t.phone?.submit }
                </button>
            </form>

            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = { t.age?.label }
                    type          = "number"
                    placeholder   = { t.age?.placeholder }
                    required
                    min           = { 1 }
                    max           = { 100 }
                    title         = { t.age?.title }
                    validatorHint = { t.age?.hint }
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    { t.age?.submit }
                </button>
            </form>

            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <Input
                    useValidator
                    label         = { t.url?.label }
                    icon          = { <LinkIcon /> }
                    type          = "url"
                    placeholder   = "https://example.com"
                    required
                    pattern       = { PATTERN_URL }
                    title         = { t.url?.title }
                    validatorHint = { t.url?.hint }
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    { t.url?.submit }
                </button>
            </form>

            <form onSubmit={ handleSubmit }>
                <Input
                    useValidator
                    useFieldset
                    legend        = { t.newsletter?.legend }
                    icon          = { <EmailIcon /> }
                    type          = "email"
                    placeholder   = "mail@site.com"
                    required
                    validatorHint = { t.newsletter?.hint }
                    helper        = { t.newsletter?.helper }
                    actions       =
                    {
                        <button
                            className = { cn( 'btn join-item btn-square font-semibold' , styles.btnInput ) }
                            type      = "submit"
                        >
                            { t.newsletter?.join }
                        </button>
                    }
                />
            </form>

        </Container>
    ) ;
} ;

export default InputValidatorDemo ;

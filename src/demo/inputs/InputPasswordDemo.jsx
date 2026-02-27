'use client' ;

import Container      from '@/display/Container' ;
import InputPassword  from '@/components/inputs/InputPassword' ;

import { MdKey as KeyIcon } from 'react-icons/md' ;

const PATTERN_PASSWORD = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' ;

/**
 * InputPassword demo component.
 *
 * Demonstrates various configurations for InputPassword.
 */
const InputPasswordDemo = () =>
{
    const handleSubmit = event =>
    {
        event.preventDefault() ;
        console.log( 'Form submitted!' ) ;
    } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Input Password Examples</h2>

            {/* Simple password */}
            <InputPassword placeholder="Enter your password" />

            {/* Without toggle button */}
            <InputPassword
                placeholder = "Password without toggle"
                showToggle  = { false }
            />

            {/* Without icon */}
            <InputPassword
                placeholder = "Password without icon"
                showIcon    = { false }
            />

            {/* With label */}
            <InputPassword
                label       = "Password"
                placeholder = "Enter password"
                helper      = "Must be at least 8 characters"
            />

            {/* With fieldset */}
            <InputPassword
                useFieldset
                legend      = "Your Password"
                placeholder = "Enter password"
                helper      = "Click the eye icon to show/hide"
            />

            {/* With validation */}
            <form onSubmit={ handleSubmit } className="flex flex-col gap-2">
                <InputPassword
                    useValidator
                    label         = "Secure Password"
                    placeholder   = "Password"
                    required
                    pattern       = { PATTERN_PASSWORD }
                    minLength     = { 8 }
                    title         = "Must be 8+ characters with number, lowercase and uppercase"
                    validatorHint = "Must be more than 8 characters, including at least one number, one lowercase letter, one uppercase letter"
                />
                <button type="submit" className="btn btn-primary btn-sm self-start">
                    Validate Password
                </button>
            </form>

            {/* Custom icon */}
            <InputPassword
                icon        = { <KeyIcon /> }
                placeholder = "Password with custom icon"
            />

            {/* With error */}
            <InputPassword
                placeholder = "Password"
                error       = "Password is incorrect"
            />

            {/* Disabled */}
            <InputPassword
                disabled
                defaultValue = "disabled123"
                placeholder  = "Disabled password"
            />

            {/* Read-only (no toggle) */}
            <InputPassword
                readOnly
                defaultValue = "readonly123"
                placeholder  = "Read-only password"
            />

            {/* Custom A11y / Translation */}
            <InputPassword
                label             = "Mot de passe (FR)"
                placeholder       = "Entrez votre mot de passe"
                showPasswordLabel = "Afficher le mot de passe"
                hidePasswordLabel = "Masquer le mot de passe"
                helper            = "Survolez l'œil pour voir l'infobulle en français"
            />

        </Container>
    ) ;
} ;

export default InputPasswordDemo ;
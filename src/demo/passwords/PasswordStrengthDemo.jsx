'use client' ;

/**
 * What a form asking for a new password is made of : a field, the meter, a
 * confirm field, the checklist, and a button that stays disabled until both
 * agree.
 *
 * Three settings one after the other — the default policy, a stricter length,
 * and a lone field with no confirmation — because the three differ only by
 * what is passed, never by what is written.
 *
 * @module demo/passwords/PasswordStrengthDemo
 */

import { useState } from 'react' ;

import Button    from '@/components/Button' ;
import Divider   from '@/components/Divider' ;
import Container from '@/display/Container' ;

import InputPassword from '@/components/inputs/InputPassword' ;

import PasswordRuleList    from '@/components/passwords/PasswordRuleList' ;
import PasswordStrengthBar from '@/components/passwords/PasswordStrengthBar' ;

import usePasswordPair from '@/hooks/usePasswordPair' ;

/** How long a passphrase has to be in the second example. */
const PASSPHRASE_MIN_LENGTH = 12 ;

/**
 * The full couple, on the default policy.
 */
const SignUpExample = () =>
{
    const [ submitted , setSubmitted ] = useState( false ) ;

    const pair = usePasswordPair( { mismatchMessage : 'Both passwords must be identical' } ) ;

    const canSubmit = pair.allRulesPass && pair.matches ;

    const handleSubmit = event =>
    {
        event.preventDefault() ;
        setSubmitted( true ) ;
        pair.reset() ;
    } ;

    return (
        <form className="flex flex-col gap-4 max-w-md" onSubmit={ handleSubmit } noValidate>

            <InputPassword
                autoComplete = "new-password"
                label        = "New password"
                onChange     = { pair.handleNewChange }
                value        = { pair.newPassword }
            />

            <PasswordStrengthBar password={ pair.newPassword } />

            <InputPassword
                autoComplete = "new-password"
                error        = { pair.confirmError ?? undefined }
                label        = "Confirm password"
                onBlur       = { pair.handleConfirmBlur }
                onChange     = { pair.handleConfirmChange }
                value        = { pair.confirm }
            />

            <PasswordRuleList matches={ pair.matches } password={ pair.newPassword } />

            <Button color="primary" disabled={ !canSubmit } type="submit">
                Create the account
            </Button>

            { submitted && (
                <p className="text-sm text-success">Submitted — both fields were emptied by reset().</p>
            ) }

        </form>
    ) ;
} ;

/**
 * The same couple, on a policy asking for twelve characters.
 *
 * `minLength` goes to the hook AND to the two components : the hook decides
 * whether the button unlocks, the components decide what is shown.
 */
const PassphraseExample = () =>
{
    const pair = usePasswordPair
    ({
        minLength       : PASSPHRASE_MIN_LENGTH ,
        mismatchMessage : 'Both passphrases must be identical' ,
    }) ;

    return (
        <div className="flex flex-col gap-4 max-w-md">

            <InputPassword
                autoComplete = "new-password"
                label        = "Passphrase"
                onChange     = { pair.handleNewChange }
                value        = { pair.newPassword }
            />

            <PasswordStrengthBar minLength={ PASSPHRASE_MIN_LENGTH } password={ pair.newPassword } />

            <InputPassword
                autoComplete = "new-password"
                error        = { pair.confirmError ?? undefined }
                label        = "Confirm passphrase"
                onBlur       = { pair.handleConfirmBlur }
                onChange     = { pair.handleConfirmChange }
                value        = { pair.confirm }
            />

            <PasswordRuleList
                matches   = { pair.matches }
                minLength = { PASSPHRASE_MIN_LENGTH }
                password  = { pair.newPassword }
            />

        </div>
    ) ;
} ;

/**
 * A single field : `matches` is not passed, so the « both passwords match »
 * line is not rendered at all.
 */
const SingleFieldExample = () =>
{
    const [ password , setPassword ] = useState( '' ) ;

    return (
        <div className="flex flex-col gap-4 max-w-md">

            <InputPassword
                autoComplete = "new-password"
                label        = "Password"
                onChange     = { setPassword }
                value        = { password }
            />

            <PasswordStrengthBar password={ password } />
            <PasswordRuleList    password={ password } />

        </div>
    ) ;
} ;

const PasswordStrengthDemo = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Password strength</h2>

        <p className="text-sm text-base-content/70 max-w-2xl">
            The meter and the checklist render nothing while the field is empty. Start typing to see
            them appear, and watch the button unlock once every line is ticked.
        </p>

        <Divider>Sign-up form</Divider>
        <SignUpExample />

        <Divider>Twelve characters</Divider>
        <PassphraseExample />

        <Divider>No confirmation field</Divider>
        <SingleFieldExample />

    </Container>
) ;

PasswordStrengthDemo.displayName = 'PasswordStrengthDemo' ;

export default PasswordStrengthDemo ;

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

import useI18n from '@/contexts/locale/useI18n' ;

import usePasswordPair from '@/hooks/usePasswordPair' ;

/** How long a passphrase has to be in the second example. */
const PASSPHRASE_MIN_LENGTH = 12 ;

/** Where the three examples read their labels. */
const PATH = 'demo.passwords.strength' ;

/**
 * The full couple, on the default policy.
 */
const SignUpExample = () =>
{
    const t = useI18n( PATH ) ?? {} ;

    const labels = t.signUp ?? {} ;

    const [ submitted , setSubmitted ] = useState( false ) ;

    const pair = usePasswordPair( { mismatchMessage : labels.mismatch } ) ;

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
                label        = { labels.password }
                onChange     = { pair.handleNewChange }
                value        = { pair.newPassword }
            />

            <PasswordStrengthBar password={ pair.newPassword } />

            <InputPassword
                autoComplete = "new-password"
                error        = { pair.confirmError ?? undefined }
                label        = { labels.confirm }
                onBlur       = { pair.handleConfirmBlur }
                onChange     = { pair.handleConfirmChange }
                value        = { pair.confirm }
            />

            <PasswordRuleList matches={ pair.matches } password={ pair.newPassword } />

            <Button color="primary" disabled={ !canSubmit } type="submit">
                { labels.submit }
            </Button>

            { submitted && (
                <p className="text-sm text-success">{ labels.submitted }</p>
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
    const t = useI18n( PATH ) ?? {} ;

    const labels = t.passphrase ?? {} ;

    const pair = usePasswordPair
    ({
        minLength       : PASSPHRASE_MIN_LENGTH ,
        mismatchMessage : labels.mismatch ,
    }) ;

    return (
        <div className="flex flex-col gap-4 max-w-md">

            <InputPassword
                autoComplete = "new-password"
                label        = { labels.password }
                onChange     = { pair.handleNewChange }
                value        = { pair.newPassword }
            />

            <PasswordStrengthBar minLength={ PASSPHRASE_MIN_LENGTH } password={ pair.newPassword } />

            <InputPassword
                autoComplete = "new-password"
                error        = { pair.confirmError ?? undefined }
                label        = { labels.confirm }
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
    const t = useI18n( PATH ) ?? {} ;

    const [ password , setPassword ] = useState( '' ) ;

    return (
        <div className="flex flex-col gap-4 max-w-md">

            <InputPassword
                autoComplete = "new-password"
                label        = { t.single?.password }
                onChange     = { setPassword }
                value        = { password }
            />

            <PasswordStrengthBar password={ password } />
            <PasswordRuleList    password={ password } />

        </div>
    ) ;
} ;

/**
 * @param {Object} props
 * @param {string} [props.path='demo.passwords.strength'] - Dot notation path to the demo locale.
 */
const PasswordStrengthDemo = ( { path = PATH } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <p className="text-sm text-base-content/70 max-w-2xl">
                { t.note }
            </p>

            <Divider>{ t.sections?.signUp }</Divider>
            <SignUpExample />

            <Divider>{ t.sections?.twelve }</Divider>
            <PassphraseExample />

            <Divider>{ t.sections?.single }</Divider>
            <SingleFieldExample />

        </Container>
    ) ;
} ;

PasswordStrengthDemo.displayName = 'PasswordStrengthDemo' ;

export default PasswordStrengthDemo ;

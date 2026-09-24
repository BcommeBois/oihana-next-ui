'use client' ;

/**
 * usePasswordPair — the state and the handlers of a « new password / confirm
 * password » couple, with the five-rule gate already computed.
 *
 * What every form asking for a new password writes again : two controlled
 * values, two error slots, handlers that clear an error as the reader fixes
 * it, the mismatch check on leaving the confirm field, and the two booleans a
 * submit button is gated on.
 *
 * 🚨 **Pass the same `minLength` to the hook and to the two components.** The
 * hook decides whether the form may be submitted ; `PasswordStrengthBar` and
 * `PasswordRuleList` decide what the reader is shown. Give them different
 * lengths and the checklist ticks every line while the button stays disabled,
 * with nothing on screen saying why.
 *
 * The handlers are rebuilt on every render rather than memoised, so they
 * always read the current state and the current `mismatchMessage` — they are
 * handed straight to an input and never live in a dependency array.
 *
 * The form keeps whatever is NOT part of the couple : a current-password
 * field, the submit lifecycle, what the server answered. On success it calls
 * `reset()`.
 *
 * @module hooks/usePasswordPair
 *
 * @example
 * ```jsx
 * const pair = usePasswordPair( { mismatchMessage : copy.mismatch } ) ;
 *
 * <InputPassword value={ pair.newPassword } onChange={ pair.handleNewChange } error={ pair.newPasswordError ?? undefined } />
 * <PasswordStrengthBar password={ pair.newPassword } />
 *
 * <InputPassword
 *     value    = { pair.confirm }
 *     onChange = { pair.handleConfirmChange }
 *     onBlur   = { pair.handleConfirmBlur }
 *     error    = { pair.confirmError ?? undefined }
 * />
 * <PasswordRuleList password={ pair.newPassword } matches={ pair.matches } />
 *
 * const canSubmit = pair.allRulesPass && pair.matches && !submitting ;
 * ```
 */

import { useMemo , useState } from 'react' ;

import computePasswordStrength from '../helpers/passwords/computePasswordStrength' ;
import evaluatePassword        from '../helpers/passwords/evaluatePassword' ;

import {
    DEFAULT_PASSWORD_MIN_LENGTH ,
    PASSWORD_RULES_COUNT ,
} from '../helpers/passwords/passwordStrengthLevels' ;

/**
 * @typedef {Object} PasswordPair
 * @property {boolean}  allRulesPass         - Every complexity rule is satisfied.
 * @property {string}   confirm              - The confirm field's value.
 * @property {?string}  confirmError         - What is shown under the confirm field, or `null`.
 * @property {Function} handleConfirmBlur    - `onBlur` of the confirm field : raises the mismatch.
 * @property {Function} handleConfirmChange  - `onChange` of the confirm field.
 * @property {Function} handleNewChange      - `onChange` of the new-password field.
 * @property {boolean}  matches              - Both fields are filled and equal.
 * @property {string}   newPassword          - The new-password field's value.
 * @property {?string}  newPasswordError     - What is shown under the new-password field, or `null`.
 * @property {Function} reset                - Empties both fields and both errors.
 * @property {Function} setNewPasswordError  - Puts the server's answer under the new-password field.
 */

/**
 * @param   {Object}  [options]
 * @param   {number}  [options.minLength=8]         - Characters the length rule asks for.
 * @param   {?string} [options.mismatchMessage=null] - What is shown under the confirm field when the two differ.
 * @returns {PasswordPair}
 */
const usePasswordPair = ( { minLength = DEFAULT_PASSWORD_MIN_LENGTH , mismatchMessage = null } = {} ) =>
{
    const [ newPassword      , setNewPassword      ] = useState( ''   ) ;
    const [ confirm          , setConfirm          ] = useState( ''   ) ;
    const [ newPasswordError , setNewPasswordError ] = useState( null ) ;
    const [ confirmError     , setConfirmError     ] = useState( null ) ;

    const rules    = useMemo( () => evaluatePassword( newPassword , { minLength } ) , [ newPassword , minLength ] ) ;
    const strength = useMemo( () => computePasswordStrength( rules ) , [ rules ] ) ;

    const allRulesPass = strength.score === PASSWORD_RULES_COUNT ;
    const matches      = newPassword.length > 0 && newPassword === confirm ;

    const handleNewChange = value =>
    {
        setNewPassword( value ) ;

        if ( newPasswordError )
        {
            setNewPasswordError( null ) ;
        }

        // Retyping the new password until it meets the confirm field is a fix
        // too — leaving the mismatch up would blame a couple that now agrees.
        if ( confirmError && confirm === value )
        {
            setConfirmError( null ) ;
        }
    } ;

    const handleConfirmChange = value =>
    {
        setConfirm( value ) ;

        if ( confirmError )
        {
            setConfirmError( null ) ;
        }
    } ;

    // On leaving the field, never while typing : a mismatch raised on the
    // first keystroke is a reproach for having started.
    const handleConfirmBlur = () =>
    {
        if ( confirm.length > 0 && confirm !== newPassword )
        {
            setConfirmError( mismatchMessage ) ;
        }
    } ;

    const reset = () =>
    {
        setNewPassword      ( ''   ) ;
        setConfirm          ( ''   ) ;
        setNewPasswordError ( null ) ;
        setConfirmError     ( null ) ;
    } ;

    return {
        allRulesPass ,
        confirm ,
        confirmError ,
        handleConfirmBlur ,
        handleConfirmChange ,
        handleNewChange ,
        matches ,
        newPassword ,
        newPasswordError ,
        reset ,
        setNewPasswordError ,
    } ;
} ;

export default usePasswordPair ;

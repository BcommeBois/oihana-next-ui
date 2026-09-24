/**
 * Where the password meter and its checklist read their copy when the host
 * names no bundle of its own.
 *
 * It points inside `components.input.password`, which already holds the
 * show / hide labels of {@link module:components/inputs/InputPassword} : the
 * three surfaces belong to one field, and a reader meets them together.
 *
 * Both components take a `path`, and a host that owns the wording of its own
 * sign-up form passes it — what matters is that they are given the SAME one,
 * or a reader sees a checklist and a meter that disagree.
 *
 * @module components/passwords/passwordI18n
 *
 * @example
 * ```jsx
 * <PasswordStrengthBar password={ value } path="app.signUp" />
 * <PasswordRuleList    password={ value } path="app.signUp" />
 * ```
 */

/**
 * The default i18n path of the password family.
 * @type {string}
 */
export const PASSWORD_I18N_PATH = 'components.input.password' ;

export default PASSWORD_I18N_PATH ;

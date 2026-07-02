'use client' ;

/**
 * RevokeButton — pre-configured "revoke" affordance with a `Jump` animation, mirroring the `RemoveButton`
 * but with semantics that match a *soft cancel* :
 *
 * Use this for actions that flip a document to a `cancelled` state while preserving the audit trail
 * (invitation revoke, session revoke, policy assignment revoke, …) — anywhere `RemoveButton`
 * would be visually misleading because the row stays in the database.
 *
 * @example
 * ```jsx
 * <RevokeButton
 *     color           = "ghost"
 *     onClick         = { handleClick }
 *     shape           = "circle"
 *     size            = "xs"
 *     tooltip         = "Révoquer"
 *     tooltipPosition = "left"
 * />
 * ```
 */

import { MdRemoveCircle } from 'react-icons/md' ;

import Jump         from '../../motions/Jump' ;
import MotionButton from './MotionButton' ;

/**
 * @param {Object} props
 * @param {import('oihana-next-ui/themes/components/button').ButtonColorValue} [props.color='primary']
 * @param {Function}          [props.icon]                                     - Override the default MdRemoveCircle.
 * @param {React.ElementType} [props.motion]                                   - Motion wrapper component (Jump by default ; pass `null` to disable).
 * @param {Object}            [props.motionProps]                              - Props forwarded to the motion wrapper.
 * @param {string}            [props.path='components.buttons.revoke']         - i18n path resolving label / title / tooltip.
 * @param {import('oihana-next-ui/themes/components/button').ButtonShape} [props.shape='circle']
 * @param {import('oihana-next-ui/themes/components/button').ButtonSize}  [props.size='md']
 * @param {*}                 [props.rest]                                     - Additional Button props.
 */
const RevokeButton =
({
    color  = 'primary' ,
    icon   = MdRemoveCircle ,
    motion = Jump ,
    motionProps,
    path   = 'components.buttons.revoke' ,
    shape  = 'circle' ,
    size   = 'md' ,
    ...rest
}) =>
(
    <MotionButton
        color       = { color }
        icon        = { icon }
        motion      = { motion }
        motionProps = { motionProps }
        path        = { path }
        shape       = { shape }
        size        = { size }
        { ...rest }
    />
) ;

RevokeButton.displayName = 'RevokeButton' ;

export default RevokeButton ;

/**
 * Pre-configured download button with jump animation.
 *
 * @module components/buttons/DownloadButton
 *
 * @example
 * ```jsx
 * // Default
 * <DownloadButton />
 *
 * // Custom color
 * <DownloadButton color="primary" />
 *
 * // Without animation
 * <DownloadButton motion={null} />
 * ```
 */

import { MdDownload } from 'react-icons/md' ;

import Jump from '@/motions/Jump' ;

import MotionButton from './MotionButton' ;

/**
 * @param {Object} props
 * @param {Function} [props.icon] - Icon component.
 * @param {React.ElementType} [props.motion] - Motion wrapper component.
 * @param {Object} [props.motionProps] - Props passed to the motion wrapper.
 * @param {string} [props.path] - i18n path.
 * @param {import('@/themes/components/button').ButtonShape} [props.shape='circle'] - Button shape.
 * @param {import('@/themes/components/button').ButtonSize} [props.size='md'] - Button size.
 * @param {import('@/themes/components/button').ButtonStyle} [props.style='ghost'] - Button style.
 * @param {*} [props.rest] - Additional Button props.
 */
const DownloadButton =
({
    icon   = MdDownload ,
    motion = Jump ,
    path   = 'components.buttons.download' ,
    shape  = 'circle' ,
    size ,
    style  = 'ghost' ,
    ...rest
}) =>
(
    <MotionButton
        icon   = { icon }
        motion = { motion }
        path   = { path }
        shape  = { shape }
        size   = { size }
        style  = { style }
        { ...rest }
    />
) ;

export default DownloadButton ;
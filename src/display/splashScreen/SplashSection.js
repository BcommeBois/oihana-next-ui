'use client';

import cn from '@/themes/helpers/cn';

/**
 * @typedef {Object} SplashSectionProps
 * @property {React.ReactNode} children - Content to display
 * @property {'header'|'footer'|'div'} [as='div'] - HTML element to render
 * @property {string} [className] - Additional CSS classes
 */

/**
 * Reusable section wrapper for splash screen header and footer.
 *
 * @param {SplashSectionProps} props
 * @returns {React.JSX.Element}
 */
const SplashSection = ( { children, as: Component = 'div', className = '' } ) =>
(
    <Component className={ cn( 'flex-none flex flex-col items-center p-4', className ) }>
        { children }
    </Component>
);

export default SplashSection;
'use client';

import ThemedImage from '@/components/images/ThemedImage';

import cn from '@/themes/helpers/cn';

/**
 * @typedef {Object} SplashLogoProps
 * @property {string} logo - Path to logo image
 * @property {string} [alt='Application logo'] - Alternative text for logo
 * @property {string} [className] - Additional CSS classes for container
 */

/**
 * Logo component for splash screen.
 * Uses ThemedImage for automatic theme-aware switching.
 *
 * @param {SplashLogoProps} props
 * @returns {React.JSX.Element}
 */
const SplashLogo = ( { logo, alt = 'Application logo', className = '' } ) => (
    <div className={ cn( 'relative size-48', className ) }>
        <ThemedImage
            src      = { logo }
            alt      = { alt }
            fill     = { true }
            priority
        />
    </div>
);

export default SplashLogo;
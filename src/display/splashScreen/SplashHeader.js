'use client';

import cn from '@/themes/helpers/cn';

import SplashSection from './SplashSection';

/**
 * @typedef {Object} SplashHeaderProps
 * @property {string} text - Header text content
 * @property {string} [className] - CSS classes for text styling
 */

/**
 * Header component for splash screen.
 * Displays application title and version information.
 *
 * @param {SplashHeaderProps} props
 * @returns {React.JSX.Element}
 */
const SplashHeader = ( { text, className = '' } ) =>
(
    <SplashSection as="header">
        <p className={ cn( 'font-mono text-xs font-medium', className ) }>
            { text }
        </p>
    </SplashSection>
);

export default SplashHeader;
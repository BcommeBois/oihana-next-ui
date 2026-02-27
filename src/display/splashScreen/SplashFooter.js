'use client';

import cn from '@/themes/helpers/cn';

import SplashSection from './SplashSection';

/**
 * @typedef {Object} SplashFooterProps
 * @property {string} text - Footer text content
 * @property {string} [className] - CSS classes for text styling
 */

/**
 * Footer component for splash screen.
 * Displays author, copyright or other footer information.
 *
 * @param {SplashFooterProps} props
 * @returns {React.JSX.Element}
 */
const SplashFooter = ( { text, className = '' } ) =>
(
    <SplashSection as="footer">
        <p className={ cn( 'font-mono text-sm font-medium', className ) }>
            { text }
        </p>
    </SplashSection>
);

export default SplashFooter;
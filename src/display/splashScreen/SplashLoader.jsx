'use client';

import cn from '../../themes/helpers/cn';

/**
 * @typedef {Object} SplashLoaderProps
 * @property {string} [label='Loading'] - ARIA label for screen readers
 * @property {string} [className] - Additional CSS classes for loader styling
 */

/**
 * Loading spinner component for splash screen.
 * Includes proper ARIA attributes for accessibility.
 *
 * Supports DaisyUI loading variants:
 * - loading-spinner (default circular spinner)
 * - loading-dots (three dots animation)
 * - loading-ring (ring animation)
 * - loading-ball (bouncing ball)
 * - loading-bars (vertical bars)
 * - loading-infinity (infinity symbol)
 *
 * And sizes: loading-xs, loading-sm, loading-md, loading-lg
 *
 * @param {SplashLoaderProps} props
 * @returns {React.JSX.Element}
 */
const SplashLoader = ( { label = 'Loading', className = '' } ) => (
    <span
        className  = { cn( 'loading loading-ring loading-lg', className ) }
        aria-label = { label }
        role       = "progressbar"
        aria-busy  = "true"
    />
);

export default SplashLoader ;
'use client' ;

import ThemedImage from '@/components/images/ThemedImage' ;

/**
 * Logo component with automatic dark mode support.
 *
 * Specialized wrapper around ThemedImage for logo usage.
 * Sets default preload to true for better LCP performance.
 *
 * @param {Object} props - Component props.
 * @param {string} [props.alt='Logo'] - Alt text for the logo.
 * @param {string | import('next/image').StaticImageData} props.lightSrc - Light mode logo source.
 * @param {string | import('next/image').StaticImageData} [props.darkSrc] - Dark mode logo source.
 * @param {boolean} [props.preload=true] - Preload the logo (default true for logos).
 *
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * // With theme switching
 * <Logo
 *     src       = { lightLogo }
 *     dark      = { darkLogo }
 *     alt       = "Company Logo"
 *     className = "w-24"
 * />
 * ```
 *
 * @example
 * ```jsx
 * // Single logo (no theme switching)
 * <Logo src={ logo } alt="Company Logo" />
 * ```
 */
const Logo =
({
   alt= 'Logo' ,
   src ,
   dark ,
   preload  = true , // ← Logos sont préchargés par défaut
   ...rest
}) =>
{
    return (
        <ThemedImage
            src     = { src }
            dark    = { dark }
            alt     = { alt }
            preload = { preload }
            { ...rest }
        />
    ) ;
} ;

export default Logo ;
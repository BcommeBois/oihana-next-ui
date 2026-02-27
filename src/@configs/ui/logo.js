/**
 * @typedef {Object} LogoConfig
 * @property {boolean} [show=true] - Whether to display the logo.
 * @property {string} light - Light mode logo source.
 * @property {string} [dark] - Dark mode logo source.
 * @property {string} [className] - CSS classes for logo container (default: 'size-24').
 */

/**
 * @typedef {LogoConfig | React.ComponentType<{className?: string}>} LogoProp
 */

/**
 * @type {LogoConfig}
 */
const logo =
{
    show               : true ,
    light              : process.env.NEXT_PUBLIC_LOGO_LIGHT  ,
    dark               : process.env.NEXT_PUBLIC_LOGO_DARK  ,
    href               : '/' ,
    className          : 'p-4 border-b-2 border-base-content/10' ,
    containerClassName : 'size-24 drop-shadow-xl' ,
}

export default logo ;
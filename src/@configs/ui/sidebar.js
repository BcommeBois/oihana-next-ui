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
 * @typedef {Object} NavigationConfig
 * @property {boolean} [show=true] - Whether to display the navigation.
 * @property {string} [className] - CSS classes for Navigation component (default: 'p-1').
 */

/**
 * @typedef {Object} VersionConfig
 * @property {boolean} [show=true] - Whether to display the version footer.
 * @property {string} [className] - CSS classes for version footer.
 */

/**
 * @typedef {import('@/themes/sizing/sizes').FixedSize} FixedSize
 */

/**
 * @typedef {Object} SidebarConfig
 * @property {string} [backgroundColor] - DaisyUI base color name.
 * @property {string} [backgroundPattern] - Background pattern effect name.
 * @property {LogoProp} [logo] - Logo configuration or component.
 * @property {NavigationConfig} [navigation] - Navigation configuration.
 * @property {string} [shadow] - Box shadow size.
 * @property {VersionConfig} [version] - Version footer configuration.
 * @property {FixedSize} [width] - Sidebar width using Tailwind spacing scale.
 */

/**
 * @type {SidebarConfig}
 */
const sidebar =
{
    className : 'bg-base-200 w-8/12 lg:w-68 lg:max-w-none pattern-lines-diagonal-right text-base-content/10 *:text-base-content' ,
    navigation :
    {
        show      : true ,
        // className : ''
    } ,
    swipe :
    {
        threshold         : 60 ,
        velocityThreshold : 0.5 ,
    } ,
}

export default sidebar ;
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
 * Settings the {@link module:display/ui/Sidebar} reads from `ui.sidebar`.
 *
 * The surface — background, width, pattern, shadow — is expressed in `className`
 * rather than as named properties, which is how `navbar` and `splashScreen` do it
 * too. There is one way to say it, and it is a Tailwind class.
 *
 * @typedef {Object} SidebarConfig
 * @property {string} [className] - Classes for the sidebar element itself.
 * @property {NavigationConfig} [navigation] - Navigation configuration.
 * @property {SwipeConfig} [swipe] - Swipe-to-close gesture configuration.
 * @property {VersionConfig} [version] - Version footer configuration.
 */

/**
 * @type {SidebarConfig}
 */
const sidebar =
{
    // On a phone the drawer takes the whole screen but a strip of overlay to close it : three levels of
    // entries (« Scénarios › Tableaux de bord › Ventes et support client ») need the room.
    className : 'bg-base-200 w-[calc(100%-2.5rem)] max-w-md sm:w-8/12 lg:w-76 lg:max-w-none pattern-lines-diagonal-right after:text-base-content/10' ,
    navigation :
    {
        show : true ,
    } ,
    swipe :
    {
        threshold         : 60 ,
        velocityThreshold : 0.5 ,
    } ,
}

export default sidebar ;
/**
 * @typedef {'aside' | 'top'} DashboardLayout
 */

/**
 * @typedef {Object} DashboardConfig
 * @property {string} [breakpoint='lg'] - Responsive breakpoint for permanent sidebar.
 * @property {DashboardLayout} [layout='aside'] - Navbar layout mode.
 * @property {Object|boolean} [scrollReset] - How the shell scrolls back to the top on a route change — `{ behavior , disabled , ignore }`, or `false`.
 * @property {SwipeConfig} [swipe] - Swipe gesture configuration for mobile drawer.
 * @property {string} [titleClassName] - Additional title class names for Navbar.
 */

/**
 * @type {DashboardConfig}
 */
const dashboard =
{
    breakpoint : 'lg' ,
    layout     : 'aside' , // aside | top

    // Which query parameters do NOT move the page. It belongs to the
    // application rather than to a page : the shell owns the scroll container,
    // so it is the only place that can know. `preview` is the lab's own — see
    // `ResetScrollDemo` on the pagination page.
    scrollReset :
    {
        ignore : [ 'preview' ] ,
    } ,

    swipe      :
    {
        threshold         : 80 ,
        velocityThreshold : 0.5 ,
    } ,
}

export default dashboard ;
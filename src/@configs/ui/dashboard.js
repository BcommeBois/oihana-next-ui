/**
 * @typedef {'aside' | 'top'} DashboardLayout
 */

/**
 * @typedef {Object} DashboardConfig
 * @property {string} [breakpoint='lg'] - Responsive breakpoint for permanent sidebar.
 * @property {DashboardLayout} [layout='aside'] - Navbar layout mode.
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
    swipe      :
    {
        threshold         : 80 ,
        velocityThreshold : 0.5 ,
    } ,
}

export default dashboard ;
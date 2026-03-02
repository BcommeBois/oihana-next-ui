/**
 * @typedef {Object} VersionConfig
 * @property {boolean} [show=true] - Whether to display the version footer.
 * @property {string} [className] - CSS classes for version footer.
 * @property {string} [version] - The version label
 */

import currentVersion from '../../version';

/**
 * @type {VersionConfig}
 */
const version =
{
    className : 'border-t-2 border-base-content/10' ,
    show      : true ,
    version   : currentVersion ,
}

export default version ;
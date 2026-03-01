/**
 * Create the inline theme bootstrap script.
 *
 * This script runs BEFORE React hydration
 * to prevent theme flashing (FOUC).
 *
 * @param {Object} options
 * @param {string} options.light
 * @param {string} options.dark
 *
 * @returns {string}
 */
const getThemeScript = ( { light, dark } ) =>
{
    return `
(function ()
{
    const storageKey = 'theme';
    const light = '${light}';
    const dark  = '${dark}';

    const stored = localStorage.getItem(storageKey);
    let isDark;

    if (stored !== null)
    {
        try
        {
            isDark = JSON.parse(stored);
        }
        catch
        {
            isDark = false;
        }
    }
    else
    {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    const root = document.documentElement;

    root.setAttribute('data-theme', isDark ? dark : light);
    root.setAttribute('data-dark', isDark ? 'true' : 'false');

})();
`;
}

export default getThemeScript ;
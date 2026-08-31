/**
 * @typedef {Object} MapConfig
 * @property {string} style - Style URL passed to the map components.
 */

/**
 * Map settings for the application, read once from the environment.
 *
 * The components never read `process.env` themselves : a style is a prop, and
 * where it comes from is the application's business. This is the lab's answer
 * to that question, and it is the only one in the repository.
 *
 * `NEXT_PUBLIC_` is not carelessness. A tile request leaves from the browser,
 * so a key inside a style URL is public whatever we do with it — which is why
 * providers protect a key by restricting it to a domain rather than by keeping
 * it secret. Never put a real key in `.env.example`, which is committed.
 *
 * @type {MapConfig}
 */
const map =
{
    style : process.env.NEXT_PUBLIC_MAP_STYLE ,
} ;

export default map ;

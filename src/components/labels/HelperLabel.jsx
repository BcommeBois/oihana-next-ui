import InitLabel from './InitLabel' ;

/**
 * Helper label component — the hint under a field, in the same ink `Input` gives its `helper`.
 *
 * @param {Object} props
 * @param {string} [props.defaultClassName='label text-base-content/70 text-xs'] - Default classes.
 * @param {string} [props.className] - Additional classes.
 * @param {React.ReactNode} [props.children] - Label content.
 * @param {boolean} [props.html=false] - Parse children as HTML.
 */
const HelperLabel =
({
     defaultClassName = 'label text-base-content/70 text-xs' ,
     className ,
     children,
     html
}) =>
(
    <InitLabel
        defaultClassName = { defaultClassName }
        className        = { className }
        html             = { html }
    >
        { children }
    </InitLabel>
) ;

export default HelperLabel ;
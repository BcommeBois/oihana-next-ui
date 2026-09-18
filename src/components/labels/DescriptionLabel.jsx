import InitLabel from './InitLabel' ;

/**
 * Description label component — a muted line of text under a field or a block.
 *
 * @param {Object} props
 * @param {string} [props.defaultClassName='label text-base-content/60 text-xs'] - Default classes.
 * @param {string} [props.className] - Additional classes.
 * @param {React.ReactNode} [props.children] - Label content.
 * @param {boolean} [props.html=false] - Parse children as HTML.
 */
const DescriptionLabel =
({
     defaultClassName = 'label text-base-content/60 text-xs',
     className,
     children,
     html,
}) => (
    <InitLabel
        defaultClassName = { defaultClassName }
        className        = { className }
        html             = { html }
    >
        { children }
    </InitLabel>
) ;

export default DescriptionLabel ;
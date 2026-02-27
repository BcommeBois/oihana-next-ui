import InitLabel from './InitLabel' ;

/**
 * Error label component.
 *
 * @param {Object} props
 * @param {string} [props.defaultClassName='label text-error text-xs'] - Default classes.
 * @param {string} [props.className] - Additional classes.
 * @param {React.ReactNode} [props.children] - Label content.
 * @param {boolean} [props.html=false] - Parse children as HTML.
 */
const ErrorLabel =
({
     defaultClassName = 'label text-error text-xs' ,
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

export default ErrorLabel ;
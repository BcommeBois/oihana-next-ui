/**
 * Markdown text renderers (p, ul, ol, li).
 *
 * @module components/typography/markdown/renderers/text
 */

export const p = props =>
(
    <p className="my-4 leading-relaxed">
        { props.children }
    </p>
) ;

export const ul = props =>
(
    <ul className="list-disc list-inside my-2! space-y-1! [&::marker]:text-base-content">
        { props.children }
    </ul>
) ;

export const ol = props =>
(
    <ol className="list-decimal list-inside my-2! space-y-1! [&::marker]:text-base-content">
        { props.children }
    </ol>
) ;

export const li = props =>
(
    <li className="ml-4! leading-normal!">
        { props.children }
    </li>
) ;
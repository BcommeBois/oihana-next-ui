'use client' ;

import { useState } from 'react' ;

import TextArea from './TextArea' ;

import Markdown from '../typography/Markdown' ;

import cn       from '../../themes/helpers/cn' ;
import useValue from '../../hooks/useValue' ;

/**
 * TextArea with Markdown preview.
 *
 * Supports both uncontrolled (`defaultValue`) and controlled
 * (`value` + `onChange`) modes : in controlled mode the parent value
 * drives the editor **and** the preview, so a wrapper can swap the
 * content externally (e.g. `I18nTextAreaMarkdown` switching languages).
 *
 * @param {Object} props
 * @param {boolean} [props.showPreview=true] - Show Markdown preview
 * @param {string} [props.previewPosition='right'] - 'right', 'bottom', 'tab'
 * @param {import('../typography/Markdown').default} [props.markdownProps] - Props passed to Markdown component
 * @param {string} [props.defaultValue] - Default value (uncontrolled mode)
 * @param {string} [props.value] - Controlled value
 * @param {Function} [props.onChange] - Change handler (`(string) => void`)
 * @param {Object} props.rest - Other props passed to TextArea
 */
const TextAreaMarkdown =
({
    showPreview = true,
    previewPosition = 'right',
    markdownProps = /** @type {any} */ ({}) ,
    defaultValue ,
    value : valueFromProps ,
    onChange : onChangeFromProps ,
    ref,
    ...rest
}) =>
{
    const [ value, setValue ] = useValue( defaultValue || '' , valueFromProps , onChangeFromProps ) ;
    const [ activeTab, setActiveTab ] = useState( 'write' ) ;

    const handleChange = newValue =>
    {
        setValue( newValue ) ;
    } ;

    // Tab mode : Write | Preview
    if ( previewPosition === 'tab' )
    {
        return (
            <div className="flex flex-col gap-2">
                {/* Tabs */}
                <div role="tablist" className="tabs tabs-boxed">
                    <button
                        type="button"
                        role="tab"
                        className={ cn( 'tab', activeTab === 'write' && 'tab-active' ) }
                        onClick={ () => setActiveTab( 'write' ) }
                    >
                        Write
                    </button>
                    <button
                        type="button"
                        role="tab"
                        className={ cn( 'tab', activeTab === 'preview' && 'tab-active' ) }
                        onClick={ () => setActiveTab( 'preview' ) }
                    >
                        Preview
                    </button>
                </div>

                {/* Content */}
                { activeTab === 'write' ? (
                    <TextArea
                        { ...rest }
                        ref      = { ref }
                        value    =  { value }
                        onChange = { handleChange }
                    />
                ) : (
                    <div className="border border-base-300 rounded-box p-4 min-h-50">
                        <Markdown { ...markdownProps }>
                            { value || '*Nothing to preview*' }
                        </Markdown>
                    </div>
                )}
            </div>
        ) ;
    }

    // Split view : Side by side or vertical
    const isHorizontal = previewPosition === 'right' ;

    return (
        <div className={ cn(
            'grid gap-4',
            isHorizontal ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
        )}>
            {/* Editor */}
            <div>
                <TextArea
                    { ...rest }
                    ref      = { ref }
                    value    = { value }
                    onChange = { handleChange }
                />
            </div>

            {/* Preview */}
            { showPreview && (
                <div>
                    { rest.label && (
                        <span className="label">
                            <span className="label-text">Preview</span>
                        </span>
                    )}
                    <div className="border border-base-300 rounded-box p-4 min-h-50 overflow-auto">
                        <Markdown { ...markdownProps }>
                            { value || '*Nothing to preview*' }
                        </Markdown>
                    </div>
                </div>
            )}
        </div>
    ) ;
} ;

TextAreaMarkdown.displayName = 'TextAreaMarkdown' ;

export default TextAreaMarkdown ;
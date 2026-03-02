'use client' ;

import { useState } from 'react' ;

import TextArea from './TextArea' ;

import Markdown from '../typography/Markdown' ;

import cn from '../../themes/helpers/cn' ;

/**
 * TextArea with Markdown preview.
 *
 * @param {Object} props
 * @param {boolean} [props.showPreview=true] - Show Markdown preview
 * @param {string} [props.previewPosition='right'] - 'right', 'bottom', 'tab'
 * @param {import('../typography/Markdown').default} [props.markdownProps] - Props passed to Markdown component
 * @param {Object} props.rest - Other props passed to TextArea
 */
const TextAreaMarkdown =
({
    showPreview = true,
    previewPosition = 'right',
    markdownProps = /** @type {any} */ ({}) ,
    ref,
    ...rest
}) =>
{
    const [ value, setValue ] = useState( rest.defaultValue || '' ) ;
    const [ activeTab, setActiveTab ] = useState( 'write' ) ;

    const handleChange = newValue =>
    {
        setValue( newValue ) ;
        rest.onChange?.( newValue ) ;
    } ;

    // Tab mode : Write | Preview
    if ( previewPosition === 'tab' )
    {
        return (
            <div className="flex flex-col gap-2">
                {/* Tabs */}
                <div role="tablist" className="tabs tabs-boxed">
                    <button
                        role="tab"
                        className={ cn( 'tab', activeTab === 'write' && 'tab-active' ) }
                        onClick={ () => setActiveTab( 'write' ) }
                    >
                        Write
                    </button>
                    <button
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
                    value={ value }
                    onChange={ handleChange }
                />
            </div>

            {/* Preview */}
            { showPreview && (
                <div>
                    { rest.label && (
                        <label className="label">
                            <span className="label-text">Preview</span>
                        </label>
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

export default TextAreaMarkdown ;
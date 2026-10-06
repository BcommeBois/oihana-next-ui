'use client' ;

import { useState } from 'react' ;
import format from 'vegas-js-core/src/strings/fastformat' ;

import Container        from '@/display/Container' ;
import TextAreaMarkdown from '@/components/inputs/TextAreaMarkdown' ;

import useI18n from '@/contexts/locale/useI18n' ;

// --- Constants (Content)

const CONTENT_DEFAULT = `# Hello World

This is a **Markdown** editor with *live preview*.

## Features

- Syntax highlighting for code
- Tables support
- Blockquotes
- And more!

\`\`\`javascript
const greeting = 'Hello from Markdown!' ;
console.log( greeting ) ;
\`\`\`

> **Note**: This is a blockquote with **bold** text.

| Feature | Status |
|---------|--------|
| Preview | ✅ |
| Syntax  | ✅ |
| Tables  | ✅ |
` ;

const CONTENT_AUTOSIZE   = `# Auto-resize\n\nThis editor grows as you type!\n\nKeep adding lines...` ;
const CONTENT_BLOG       = `# My Blog Post\n\nWrite your **amazing** content here!` ;
const CONTENT_BOTTOM     = `## Bottom Preview\n\nPreview appears **below** the editor.` ;
const CONTENT_CONTROLLED = `## Controlled Example\n\nType here...` ;
const CONTENT_PYTHON     = `\`\`\`python\ndef hello():\n    print("Hello World")\n\`\`\`` ;
const CONTENT_RAW        = `# No Preview\n\nJust a simple markdown editor.` ;
const CONTENT_TAB        = `# Tab Mode\n\nSwitch between **Write** and **Preview** tabs.` ;

/**
 * TextAreaMarkdown demo component.
 *
 * Nine settings of the Markdown editor : where the preview sits, whether there
 * is one at all, what it is given, and how the editor grows.
 *
 * ⚠️ The `CONTENT_*` samples above are DOCUMENTS, not copy : they are what the
 * editor is editing, and what the preview has to render.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.textAreaMarkdown'] - Dot notation path to the demo locale.
 */
const TextAreaMarkdownDemo = ( { path = 'demo.inputs.textAreaMarkdown' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ controlledValue , setControlledValue ] = useState( CONTENT_CONTROLLED ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-8xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.right }</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_DEFAULT }
                    helper          = { t.right?.helper }
                    label           = { t.right?.label }
                    previewPosition = "right"
                    rows            = { 24 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.bottom }</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_BOTTOM }
                    label           = { t.bottom?.label }
                    previewPosition = "bottom"
                    rows            = { 5 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.tab }</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_TAB }
                    helper          = { t.tab?.helper }
                    label           = { t.tab?.label }
                    previewPosition = "tab"
                    rows            = { 8 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.none }</h3>

                <TextAreaMarkdown
                    defaultValue = { CONTENT_RAW }
                    label        = { t.none?.label }
                    rows         = { 5 }
                    showPreview  = { false }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.custom }</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_PYTHON }
                    helper          = { t.custom?.helper }
                    label           = { t.custom?.label }
                    markdownProps   = {{
                        linkColor       : 'secondary',
                        showCopyButton  : true,
                        showLineNumbers : true,
                        showToast       : true
                    }}
                    previewPosition = "right"
                    rows            = { 6 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.controlled }</h3>

                <TextAreaMarkdown
                    label           = { t.controlled?.label }
                    onChange        = { setControlledValue }
                    previewPosition = "right"
                    rows            = { 6 }
                    value           = { controlledValue }
                />

                <div className="alert">
                    <span className="font-mono text-sm">
                        { format( t.controlled?.chars ?? '' , controlledValue.length ) }
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_BLOG }
                    legend          = { t.fieldset?.legend }
                    previewPosition = "right"
                    rows            = { 8 }
                    useFieldset
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.validation }</h3>

                <TextAreaMarkdown
                    label           = { t.validation?.label }
                    minLength       = { 20 }
                    previewPosition = "tab"
                    required
                    rows            = { 6 }
                    useValidator
                    validatorHint   = { t.validation?.hint }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.autosize }</h3>

                <TextAreaMarkdown
                    autosize
                    defaultValue    = { CONTENT_AUTOSIZE }
                    helper          = { t.autosize?.helper }
                    label           = { t.autosize?.label }
                    maxRows         = { 15 }
                    minRows         = { 3 }
                    previewPosition = "right"
                />
            </div>

        </Container>
    ) ;
} ;

export default TextAreaMarkdownDemo ;
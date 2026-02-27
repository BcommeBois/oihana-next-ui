'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import TextAreaMarkdown from '@/components/inputs/TextAreaMarkdown' ;

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

const TextAreaMarkdownDemo = () =>
{
    const [ controlledValue, setControlledValue ] = useState( CONTENT_CONTROLLED ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-8xl">

            <h2 className="text-3xl font-bold">TextArea Markdown Examples</h2>

            {/* Basic with right preview */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Preview Right (Default)</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_DEFAULT }
                    helper          = "Edit on the left, see preview on the right"
                    label           = "Post Content"
                    previewPosition = "right"
                    rows            = { 24 }
                />
            </div>

            {/* Preview bottom */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Preview Bottom</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_BOTTOM }
                    label           = "Documentation"
                    previewPosition = "bottom"
                    rows            = { 5 }
                />
            </div>

            {/* Tab mode */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Tab Mode (Write | Preview)</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_TAB }
                    helper          = "Click tabs to switch between edit and preview"
                    label           = "Article"
                    previewPosition = "tab"
                    rows            = { 8 }
                />
            </div>

            {/* Without preview */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Without Preview</h3>

                <TextAreaMarkdown
                    defaultValue = { CONTENT_RAW }
                    label        = "Raw Markdown"
                    rows         = { 5 }
                    showPreview  = { false }
                />
            </div>

            {/* Custom Markdown props */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Markdown Props</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_PYTHON }
                    helper          = "Preview has copy buttons and line numbers"
                    label           = "Code Example"
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

            {/* Controlled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Controlled Component</h3>

                <TextAreaMarkdown
                    label           = "Controlled Editor"
                    onChange        = { setControlledValue }
                    previewPosition = "right"
                    rows            = { 6 }
                    value           = { controlledValue }
                />

                <div className="alert">
                    <span className="font-mono text-sm">
                        Character count: { controlledValue.length }
                    </span>
                </div>
            </div>

            {/* With fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldset</h3>

                <TextAreaMarkdown
                    defaultValue    = { CONTENT_BLOG }
                    legend          = "Blog Post"
                    previewPosition = "right"
                    rows            = { 8 }
                    useFieldset
                />
            </div>

            {/* With validation */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Validation</h3>

                <TextAreaMarkdown
                    label           = "Required Content"
                    minLength       = { 20 }
                    previewPosition = "tab"
                    required
                    rows            = { 6 }
                    useValidator
                    validatorHint   = "Content must be at least 20 characters"
                />
            </div>

            {/* Autosize */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Auto-resize</h3>

                <TextAreaMarkdown
                    autosize
                    defaultValue    = { CONTENT_AUTOSIZE }
                    helper          = "Editor grows automatically up to 15 rows"
                    label           = "Growing Editor"
                    maxRows         = { 15 }
                    minRows         = { 3 }
                    previewPosition = "right"
                />
            </div>

        </Container>
    ) ;
} ;

export default TextAreaMarkdownDemo ;
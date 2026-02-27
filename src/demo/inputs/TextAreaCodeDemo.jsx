'use client' ;

import { useState } from 'react' ;

import CodeBlock          from '@/components/typography/CodeBlock'
import CodeBlockWithToast from '@/components/typography/CodeBlockWithToast'
import Container          from '@/display/Container'
import TextAreaCode       from '@/components/inputs/TextAreaCode'

import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// --- Constants (Code Content)

const JS_EXAMPLE      = `function fibonacci(n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));` ;
const PY_EXAMPLE      = `def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\nprint(quicksort([3,6,8,10,1,2,1]))` ;
const HTML_EXAMPLE    = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello World!</h1>\n</body>\n</html>` ;
const SQL_EXAMPLE     = `SELECT users.name, COUNT(orders.id) as order_count\nFROM users\nLEFT JOIN orders ON users.id = orders.user_id\nWHERE users.created_at > '2024-01-01'\nGROUP BY users.id\nHAVING order_count > 5\nORDER BY order_count DESC;` ;
const REACT_EXAMPLE   = `import { useState } from 'react';\n\nfunction Counter() {\n    const [count, setCount] = useState(0);\n    \n    return (\n        <div>\n            <p>Count: {count}</p>\n            <button onClick={() => setCount(count + 1)}>\n                Increment\n            </button>\n        </div>\n    );\n}\n\nexport default Counter;` ;
const OLD_JS          = `// Old approach\nvar x = 10;\nvar y = 20;\nvar sum = x + y;\nconsole.log(sum);` ;
const MODERN_JS       = `// Modern approach\nconst x = 10;\nconst y = 20;\nconst sum = x + y;\nconsole.log(sum);` ;
const INDENT_2        = `function example() {\n  return true;\n}` ;
const INDENT_4        = `function example() {\n    return true;\n}` ;
const BASH_EXAMPLE    = `npm install next@latest\nnpm run dev` ;
const JSON_EXAMPLE    = `{\n  "apiKey": "your-key-here",\n  "endpoint": "https://api.example.com"\n}` ;
const AUTOSIZE_CODE   = `// Editor grows as you add lines\n\nfunction example() {\n  // Add more code...\n}` ;

const TextAreaCodeDemo = () =>
{
    const [ codeValue, setCodeValue ] = useState( JS_EXAMPLE ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-8xl">

            <h2 className="text-3xl font-bold">TextArea Code Examples</h2>

            {/* CodeBlock standalone example */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">CodeBlock Component (Display Only)</h3>

                <div className="flex flex-col gap-2">
                    <label className="label">
                        <span className="label-text">React Component Example</span>
                    </label>

                    <CodeBlock
                        language        = "jsx"
                        showCopyButton
                        showLineNumbers
                        style           = { oneDark }
                    >
                        { REACT_EXAMPLE }
                    </CodeBlock>

                    <p className="label text-xs text-base-content/70">
                        CodeBlock is perfect for displaying static code snippets with syntax highlighting and copy functionality
                    </p>
                </div>
            </div>

            {/* Basic with tab handling */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Tab Handling (JavaScript)</h3>

                <TextAreaCode
                    defaultValue    = { JS_EXAMPLE }
                    helper          = "Press Tab to indent (inserts 2 spaces)"
                    label           = "JavaScript Code"
                    language        = "javascript"
                    rows            = { 10 }
                    tabSize         = { 2 }
                />
            </div>

            {/* With preview */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Syntax Preview (Right)</h3>

                <TextAreaCode
                    defaultValue    = { PY_EXAMPLE }
                    helper          = "Edit on left, see syntax-highlighted preview on right"
                    label           = "Python Code"
                    language        = "python"
                    previewPosition = "right"
                    rows            = { 12 }
                    showLineNumbers
                    showPreview
                    tabSize         = { 4 }
                />
            </div>

            {/* Preview bottom */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Preview Bottom (HTML)</h3>

                <TextAreaCode
                    defaultValue    = { HTML_EXAMPLE }
                    label           = "HTML Template"
                    language        = "html"
                    previewPosition = "bottom"
                    rows            = { 10 }
                    showLineNumbers
                    showPreview
                />
            </div>

            {/* SQL */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">SQL Query</h3>

                <TextAreaCode
                    defaultValue    = { SQL_EXAMPLE }
                    label           = "Database Query"
                    language        = "sql"
                    rows            = { 8 }
                    tabSize         = { 2 }
                />
            </div>

            {/* Tab size variations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="text-lg font-semibold mb-2">Tab Size: 2 spaces</h4>
                    <TextAreaCode
                        defaultValue = { INDENT_2 }
                        label        = "2-space indentation"
                        language     = "javascript"
                        rows         = { 5 }
                        tabSize      = { 2 }
                    />
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-2">Tab Size: 4 spaces</h4>
                    <TextAreaCode
                        defaultValue = { INDENT_4 }
                        label        = "4-space indentation"
                        language     = "javascript"
                        rows         = { 5 }
                        tabSize      = { 4 }
                    />
                </div>
            </div>

            {/* Without tab handling */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Without Tab Handling</h3>

                <TextAreaCode
                    defaultValue = "// Tab key changes focus instead of indenting"
                    handleTab    = { false }
                    helper       = "Tab key works normally (changes focus)"
                    label        = "Normal Textarea"
                    language     = "javascript"
                    rows         = { 5 }
                />
            </div>

            {/* Controlled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Controlled Component</h3>

                <TextAreaCode
                    label           = "Controlled Editor"
                    language        = "javascript"
                    onChange        = { setCodeValue }
                    previewPosition = "right"
                    rows            = { 10 }
                    showLineNumbers
                    showPreview
                    value           = { codeValue }
                />

                <div className="alert">
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-sm">Lines: { codeValue.split('\n').length }</span>
                        <span className="font-mono text-sm">Characters: { codeValue.length }</span>
                    </div>
                </div>
            </div>

            {/* Autosize */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Auto-resize</h3>

                <TextAreaCode
                    autosize
                    defaultValue    = { AUTOSIZE_CODE }
                    helper          = "Grows automatically up to 20 rows"
                    label           = "Growing Code Editor"
                    language        = "javascript"
                    maxRows         = { 20 }
                    minRows         = { 5 }
                />
            </div>

            {/* With fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldset</h3>

                <TextAreaCode
                    defaultValue = { JSON_EXAMPLE }
                    language     = "json"
                    legend       = "API Configuration"
                    rows         = { 6 }
                    useFieldset
                />
            </div>

            {/* Read-only with preview */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Read-only with Preview</h3>

                <TextAreaCode
                    defaultValue    = { BASH_EXAMPLE }
                    label           = "Code Snippet (Read-only)"
                    language        = "bash"
                    previewPosition = "right"
                    readOnly
                    rows            = { 3 }
                    showPreview
                />
            </div>

            {/* CodeBlock Customization */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">CodeBlock Customizations</h3>

                <CodeBlock language="js" style={ oneDark }>
                    const x = 10;
                </CodeBlock>

                <CodeBlock
                    copiedButtonText = "Copied!"
                    copyButtonText   = "Copy"
                    language         = "js"
                    style            = { oneDark }
                >
                    const x = 10;
                </CodeBlock>

                <CodeBlock
                    copiedButtonText = "Copié !"
                    copyButtonText   = "Copier"
                    errorMessage     = "Échec de la copie"
                    language         = "js"
                    style            = { oneDark }
                    successMessage   = "Code copié !"
                >
                    const x = 10;
                </CodeBlock>
            </div>

            {/* Comparison */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Multiple CodeBlocks (Comparison)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Before</span>
                        </label>
                        <CodeBlock
                            language        = "javascript"
                            showCopyButton
                            showLineNumbers
                            style           = { oneDark }
                        >
                            { OLD_JS }
                        </CodeBlock>
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">After</span>
                        </label>
                        <CodeBlock
                            language        = "javascript"
                            showCopyButton
                            showLineNumbers
                            style           = { oneDark }
                        >
                            { MODERN_JS }
                        </CodeBlock>
                    </div>
                </div>

                <CodeBlockWithToast
                    language       = "js"
                    style          = { oneDark }
                    successMessage = "Copied!"
                >
                    { MODERN_JS }
                </CodeBlockWithToast>
            </div>

        </Container>
    ) ;
} ;

export default TextAreaCodeDemo ;
'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import CodeBlock          from '@/components/typography/CodeBlock'
import CodeBlockWithToast from '@/components/typography/CodeBlockWithToast'
import Container          from '@/display/Container'
import TextAreaCode       from '@/components/inputs/TextAreaCode'

import useI18n from '@/contexts/locale/useI18n' ;

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

/**
 * TextAreaCode demo component.
 *
 * The code editor and the display-only `CodeBlock` beside it : tab handling,
 * highlighted previews, indentation widths, and the labels a host can pass.
 *
 * ⚠️ The snippets above are CODE, not copy : they are what the editor is
 * editing and what the highlighter has to colour.
 *
 * @param {Object} props
 * @param {string} [props.path='demo.inputs.textAreaCode'] - Dot notation path to the demo locale.
 */
const TextAreaCodeDemo = ( { path = 'demo.inputs.textAreaCode' } = {} ) =>
{
    const t = useI18n( path ) ?? {} ;

    const [ codeValue , setCodeValue ] = useState( JS_EXAMPLE ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-8xl">

            <h2 className="text-3xl font-bold">{ t.title }</h2>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.block }</h3>

                <div className="flex flex-col gap-2">
                    <label className="label">
                        <span className="label-text">{ t.block?.label }</span>
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
                        { t.block?.note }
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.tab }</h3>

                <TextAreaCode
                    defaultValue    = { JS_EXAMPLE }
                    helper          = { t.tab?.helper }
                    label           = { t.tab?.label }
                    language        = "javascript"
                    rows            = { 10 }
                    tabSize         = { 2 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.right }</h3>

                <TextAreaCode
                    defaultValue    = { PY_EXAMPLE }
                    helper          = { t.right?.helper }
                    label           = { t.right?.label }
                    language        = "python"
                    previewPosition = "right"
                    rows            = { 12 }
                    showLineNumbers
                    showPreview
                    tabSize         = { 4 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.bottom }</h3>

                <TextAreaCode
                    defaultValue    = { HTML_EXAMPLE }
                    label           = { t.bottom?.label }
                    language        = "html"
                    previewPosition = "bottom"
                    rows            = { 10 }
                    showLineNumbers
                    showPreview
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.sql }</h3>

                <TextAreaCode
                    defaultValue    = { SQL_EXAMPLE }
                    label           = { t.sql?.label }
                    language        = "sql"
                    rows            = { 8 }
                    tabSize         = { 2 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.indent }</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="text-lg font-semibold mb-2 font-mono">tabSize = { 2 }</h4>
                    <TextAreaCode
                        defaultValue = { INDENT_2 }
                        label        = { t.indent?.two?.label }
                        language     = "javascript"
                        rows         = { 5 }
                        tabSize      = { 2 }
                    />
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-2 font-mono">tabSize = { 4 }</h4>
                    <TextAreaCode
                        defaultValue = { INDENT_4 }
                        label        = { t.indent?.four?.label }
                        language     = "javascript"
                        rows         = { 5 }
                        tabSize      = { 4 }
                    />
                </div>
            </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.noTab }</h3>

                <TextAreaCode
                    defaultValue = "// Tab key changes focus instead of indenting"
                    handleTab    = { false }
                    helper       = { t.noTab?.helper }
                    label        = { t.noTab?.label }
                    language     = "javascript"
                    rows         = { 5 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.controlled }</h3>

                <TextAreaCode
                    label           = { t.controlled?.label }
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
                        <span className="font-mono text-sm">{ format( t.controlled?.lines ?? '' , codeValue.split( '\n' ).length ) }</span>
                        <span className="font-mono text-sm">{ format( t.controlled?.chars ?? '' , codeValue.length ) }</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.autosize }</h3>

                <TextAreaCode
                    autosize
                    defaultValue    = { AUTOSIZE_CODE }
                    helper          = { t.autosize?.helper }
                    label           = { t.autosize?.label }
                    language        = "javascript"
                    maxRows         = { 20 }
                    minRows         = { 5 }
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.fieldset }</h3>

                <TextAreaCode
                    defaultValue = { JSON_EXAMPLE }
                    language     = "json"
                    legend       = { t.fieldset?.legend }
                    rows         = { 6 }
                    useFieldset
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.readOnly }</h3>

                <TextAreaCode
                    defaultValue    = { BASH_EXAMPLE }
                    label           = { t.readOnly?.label }
                    language        = "bash"
                    previewPosition = "right"
                    readOnly
                    rows            = { 3 }
                    showPreview
                />
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.labels }</h3>

                <p className="text-sm text-base-content/70">{ t.labels?.defaults }</p>

                <CodeBlock language="js" style={ oneDark }>
                    const x = 10;
                </CodeBlock>

                <p className="text-sm text-base-content/70">{ t.labels?.host }</p>

                <CodeBlock
                    copiedButtonText = { t.labels?.copied }
                    copyButtonText   = { t.labels?.copy }
                    language         = "js"
                    style            = { oneDark }
                >
                    const x = 10;
                </CodeBlock>

                <p className="text-sm text-base-content/70">{ t.labels?.toasts }</p>

                <CodeBlock
                    copiedButtonText = { t.labels?.copied }
                    copyButtonText   = { t.labels?.copy }
                    errorMessage     = { t.labels?.failure }
                    language         = "js"
                    style            = { oneDark }
                    successMessage   = { t.labels?.success }
                >
                    const x = 10;
                </CodeBlock>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{ t.sections?.comparison }</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text">{ t.comparison?.before }</span>
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
                            <span className="label-text">{ t.comparison?.after }</span>
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
                    successMessage = { t.labels?.success }
                >
                    { MODERN_JS }
                </CodeBlockWithToast>
            </div>

        </Container>
    ) ;
} ;

export default TextAreaCodeDemo ;
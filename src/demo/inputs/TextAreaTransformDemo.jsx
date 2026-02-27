'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import TextArea from '@/components/inputs/TextArea' ;

const TextAreaTransformDemo = () =>
{
    const [ comment, setComment ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">TextArea Transform Examples</h2>

            {/* Uppercase transformation */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Uppercase Transformation</h3>

                <TextArea
                    label       = "Code Snippet"
                    transform   = { v => v.toUpperCase() }
                    placeholder = "Enter code (will be converted to uppercase)"
                    rows        = { 4 }
                />
            </div>

            {/* Trim on blur */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Trim on Blur</h3>

                <TextArea
                    label         = "Message"
                    processOnBlur = { v => v.trim() }
                    placeholder   = "Trailing spaces will be removed on blur"
                    rows          = { 4 }
                    helper        = "Spaces at start/end removed when you leave the field"
                />
            </div>

            {/* Character limit with validation */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Character Limit (Max 100)</h3>

                <TextArea
                    label     = "Short Comment"
                    validate  = { v => v.length <= 100 }
                    value     = { comment }
                    onChange  = { setComment }
                    placeholder = "Maximum 100 characters"
                    rows      = { 3 }
                    helper    = { `${comment.length}/100 characters` }
                />
            </div>

            {/* Auto-capitalize sentences */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Auto-Capitalize on Blur</h3>

                <TextArea
                    label         = "Description"
                    processOnBlur = { v => v.charAt(0).toUpperCase() + v.slice(1) }
                    placeholder   = "First letter will be capitalized on blur"
                    rows          = { 4 }
                    helper        = "First character capitalized automatically"
                />
            </div>

            {/* Remove extra spaces */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Normalize Whitespace</h3>

                <TextArea
                    label         = "Clean Text"
                    processOnBlur = { v => v.replace(/\s+/g, ' ').trim() }
                    placeholder   = "Multiple spaces will be normalized on blur"
                    rows          = { 5 }
                    helper        = "Extra whitespace removed when you leave the field"
                />
            </div>

            {/* Strip HTML tags */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Strip HTML Tags</h3>

                <TextArea
                    label     = "Plain Text Only"
                    transform = { v => v.replace(/<[^>]*>/g, '') }
                    placeholder = "HTML tags will be removed as you type"
                    rows      = { 4 }
                    helper    = "HTML tags are automatically removed"
                />
            </div>

            {/* Format as list */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Auto-Format as List</h3>

                <TextArea
                    label         = "Todo List"
                    processOnBlur = { v =>
                        v.split('\n')
                         .filter(line => line.trim())
                         .map(line => line.startsWith('- ') ? line : `- ${line}`)
                         .join('\n')
                    }
                    placeholder = "Each line will be prefixed with '- ' on blur"
                    rows        = { 6 }
                    helper      = "Lines automatically formatted as list items"
                />
            </div>

            {/* With fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldset</h3>

                <TextArea
                    useFieldset
                    legend        = "Bio"
                    processOnBlur = { v => v.trim() }
                    placeholder   = "Tell us about yourself"
                    rows          = { 6 }
                />
            </div>

            {/* With validation error */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Validation</h3>

                <TextArea
                    useValidator
                    required
                    label         = "Required Message"
                    minLength     = { 20 }
                    validatorHint = "Message must be at least 20 characters"
                    placeholder   = "Enter at least 20 characters"
                    rows          = { 4 }
                />
            </div>

        </Container>
    ) ;
} ;

export default TextAreaTransformDemo ;
'use client' ;

import { useState } from 'react' ;
import Container from '@/display/Container' ;
import TextArea from '@/components/inputs/TextArea' ;

const TextAreaDemo = () =>
{
    const [ message, setMessage ] = useState( '' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">TextArea Examples</h2>

            {/* Basic */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Basic Usage</h3>

                <TextArea
                    label       = "Message"
                    className   = "w-full"
                    placeholder = "Enter your message..."
                    helper      = "Maximum 500 characters"
                />
            </div>

            {/* Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Sizes</h3>

                <TextArea
                    label       = "Extra Small"
                    size        = "xs"
                    placeholder = "Extra small textarea..."
                />

                <TextArea
                    label       = "Small"
                    size        = "sm"
                    placeholder = "Small textarea..."
                />

                <TextArea
                    label       = "Medium (Default)"
                    size        = "md"
                    placeholder = "Medium textarea..."
                />

                <TextArea
                    label       = "Large"
                    size        = "lg"
                    placeholder = "Large textarea..."
                />

                <TextArea
                    label       = "Extra Large"
                    size        = "xl"
                    placeholder = "Extra large textarea..."
                />
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Colors</h3>

                <TextArea
                    label       = "Primary"
                    color       = "primary"
                    placeholder = "Primary textarea..."
                />

                <TextArea
                    label       = "Secondary"
                    color       = "secondary"
                    placeholder = "Secondary textarea..."
                />

                <TextArea
                    label       = "Accent"
                    color       = "accent"
                    placeholder = "Accent textarea..."
                />

                <TextArea
                    label       = "Info"
                    color       = "info"
                    placeholder = "Info textarea..."
                />

                <TextArea
                    label       = "Success"
                    color       = "success"
                    placeholder = "Success textarea..."
                />

                <TextArea
                    label       = "Warning"
                    color       = "warning"
                    placeholder = "Warning textarea..."
                />
            </div>

            {/* Transformation Example */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Transformations</h3>
                <TextArea
                    label     = "Uppercase Description"
                    transform = { val => val.toUpperCase() }
                    helper    = "Automatically converted to uppercase"
                />
            </div>

            {/* Ghost style */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Ghost Style</h3>

                <TextArea
                    label       = "Ghost Textarea"
                    style       = "ghost"
                    placeholder = "Ghost style textarea..."
                />
            </div>

            {/* Resize options */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Resize Options</h3>

                <TextArea
                    label       = "Vertical Resize (Default)"
                    resize      = "vertical"
                    placeholder = "Can only resize vertically..."
                />

                <TextArea
                    label       = "Horizontal Resize"
                    resize      = "horizontal"
                    placeholder = "Can only resize horizontally..."
                />

                <TextArea
                    label       = "Both Directions"
                    resize      = "both"
                    placeholder = "Can resize both ways..."
                />

                <TextArea
                    label       = "No Resize"
                    resize      = "none"
                    placeholder = "Cannot resize..."
                />

                <TextArea rows={5} label="Comment" />

                <TextArea
                    autosize
                    minRows = {3}
                    maxRows = {10}
                    label   = "Growing Comment"
                />

                {/* unlimited auto-resize */}
                <TextArea
                    autosize
                    minRows = {2}
                    label   = "Expands infinitely"
                />

            </div>

            {/* Custom rows */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Rows</h3>

                <TextArea
                    label       = "1 Row"
                    rows        = { 1 }
                    placeholder = "Single line..."
                />

                <TextArea
                    label       = "5 Rows"
                    rows        = { 5 }
                    placeholder = "Five lines..."
                />

                <TextArea
                    label       = "10 Rows"
                    rows        = { 10 }
                    placeholder = "Ten lines..."
                />
            </div>

            {/* With validation */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Validation</h3>

                <TextArea
                    useValidator
                    required
                    label         = "Required Message"
                    minLength     = { 10 }
                    maxLength     = { 500 }
                    placeholder   = "At least 10 characters..."
                    validatorHint = "Message must be between 10 and 500 characters"
                />
            </div>

            {/* Controlled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Controlled</h3>

                <TextArea
                    label       = "Your Message"
                    value       = { message }
                    onChange    = { e => setMessage( e.target.value ) }
                    placeholder = "Type something..."
                    helper      = { `${message.length} characters` }
                />
            </div>

            {/* With fieldset */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Fieldset</h3>

                <TextArea
                    useFieldset
                    legend      = "Project Description"
                    rows        = { 5 }
                    placeholder = "Describe your project in detail..."
                    helper      = "Be as detailed as possible"
                />
            </div>

            {/* Error state */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Error State</h3>

                <TextArea
                    label       = "Comment"
                    error       = "Comment is required and must be at least 20 characters"
                    placeholder = "Add your comment..."
                />
            </div>

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled</h3>

                <TextArea
                    label       = "Disabled Message"
                    disabled
                    placeholder = "This textarea is disabled..."
                    helper      = "Cannot edit this field"
                />
            </div>

            {/* Read-only */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Read-only</h3>

                <TextArea
                    label       = "Terms and Conditions"
                    readOnly
                    rows        = { 6 }
                    defaultValue = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
                />
            </div>

        </Container>
    ) ;
} ;

export default TextAreaDemo ;
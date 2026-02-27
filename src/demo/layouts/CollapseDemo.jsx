'use client' ;

import Collapse, { CHECKBOX, DETAILS, FOCUS, RADIO } from '@/components/layouts/Collapse' ;

const CollapseDemo = () =>
(
    <div className="flex flex-col gap-8">
        {/* Basic Modes */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Collapse Modes</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Checkbox Mode */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Checkbox Mode (Click to toggle)
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300"
                            mode      = { CHECKBOX }
                            title     = "How do I create an account?"
                        >
                            <p className="text-sm">
                                Click the "Sign Up" button in the top right corner and follow the registration process.
                            </p>
                        </Collapse>
                    </div>

                    {/* Focus Mode */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Focus Mode (Opens on focus, closes on blur)
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300"
                            mode      = { FOCUS }
                            title     = "How do I reset my password?"
                        >
                            <p className="text-sm">
                                Click on "Forgot Password" on the login page and follow the instructions sent to your email.
                            </p>
                        </Collapse>
                    </div>

                    {/* Details Mode */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Details Mode (Native HTML, searchable in browser)
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300"
                            mode      = { DETAILS }
                            title     = "What payment methods do you accept?"
                        >
                            <p className="text-sm">
                                We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.
                            </p>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>

        {/* Icons */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Icon Variants</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Arrow Icon */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Arrow Icon
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300"
                            icon      = "arrow"
                            title     = "Is shipping included?"
                        >
                            <p className="text-sm">
                                Yes, we offer free shipping on all orders over $50.
                            </p>
                        </Collapse>
                    </div>

                    {/* Plus Icon */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Plus/Minus Icon
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300"
                            icon      = "plus"
                            title     = "Can I cancel my subscription?"
                        >
                            <p className="text-sm">
                                Yes, you can cancel anytime from your account settings. No cancellation fees apply.
                            </p>
                        </Collapse>
                    </div>

                    {/* No Icon */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            No Icon
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300"
                            title     = "Do you offer refunds?"
                        >
                            <p className="text-sm">
                                Yes, we have a 30-day money-back guarantee for all purchases.
                            </p>
                        </Collapse>
                    </div>

                    {/* Disabled */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Disabled State
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300 opacity-50"
                            disabled
                            icon      = "arrow"
                            title     = "This collapse is disabled"
                        >
                            <p className="text-sm">
                                This content cannot be accessed.
                            </p>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>

        {/* Radio Mode (Accordion) */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Accordion (Radio Mode)</h2>
                <p className="text-sm text-base-content/60 mb-4">
                    Only one item can be open at a time
                </p>
                <div className="flex flex-col gap-2">
                    <Collapse
                        className = "bg-base-100 border border-base-300"
                        icon      = "arrow"
                        mode      = { RADIO }
                        name      = "faq"
                        title     = "What are your business hours?"
                    >
                        <p className="text-sm">
                            We're open Monday to Friday, 9 AM to 6 PM EST. Customer support is available 24/7.
                        </p>
                    </Collapse>

                    <Collapse
                        className      = "bg-base-100 border border-base-300"
                        defaultChecked
                        icon           = "arrow"
                        mode           = { RADIO }
                        name           = "faq"
                        title          = "Where are you located?"
                    >
                        <p className="text-sm">
                            Our headquarters is in San Francisco, CA, with offices in New York and London.
                        </p>
                    </Collapse>

                    <Collapse
                        className = "bg-base-100 border border-base-300"
                        icon      = "arrow"
                        mode      = { RADIO }
                        name      = "faq"
                        title     = "Do you ship internationally?"
                    >
                        <p className="text-sm">
                            Yes, we ship to over 100 countries worldwide. Shipping times vary by location.
                        </p>
                    </Collapse>

                    <Collapse
                        className = "bg-base-100 border border-base-300"
                        icon      = "arrow"
                        mode      = { RADIO }
                        name      = "faq"
                        title     = "How do I track my order?"
                    >
                        <p className="text-sm">
                            You'll receive a tracking number via email once your order ships. Use it on our tracking page.
                        </p>
                    </Collapse>
                </div>
            </div>
        </div>

        {/* Force States */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Forced States</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Force Open */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Force Open
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300"
                            icon      = "arrow"
                            open
                            title     = "Always Open"
                        >
                            <p className="text-sm">
                                This collapse is forced open with the `open` prop.
                            </p>
                        </Collapse>
                    </div>

                    {/* Force Close */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Force Close
                        </h3>
                        <Collapse
                            className = "bg-base-100 border border-base-300"
                            close
                            icon      = "arrow"
                            title     = "Always Closed"
                        >
                            <p className="text-sm">
                                This collapse is forced closed with the `close` prop.
                            </p>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>

        {/* Custom Styling */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Custom Styling</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Without Border */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Without Border
                        </h3>
                        <Collapse
                            icon  = "plus"
                            title = "Minimal Style"
                        >
                            <p className="text-sm">
                                No border or background color.
                            </p>
                        </Collapse>
                    </div>

                    {/* Colored */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Colored (Focus)
                        </h3>
                        <Collapse
                            className = "bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content"
                            icon      = "arrow"
                            mode      = { FOCUS }
                            title     = "Colored on Focus"
                        >
                            <p className="text-sm">
                                Click to see the color change.
                            </p>
                        </Collapse>
                    </div>

                    {/* Colored with Checkbox */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Colored (Checkbox with peer)
                        </h3>
                        <Collapse
                            className      = "bg-base-100 border border-base-300"
                            contentClassName = "bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
                            icon           = "plus"
                            title          = "Check me!"
                            titleClassName = "bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
                        >
                            <p className="text-sm">
                                Content changes color when checked.
                            </p>
                        </Collapse>
                    </div>

                    {/* Icon Position */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Icon on Left
                        </h3>
                        <Collapse
                            className      = "bg-base-100 border border-base-300"
                            icon           = "arrow"
                            title          = "Icon on the left side"
                            titleClassName = "after:start-5 after:end-auto pe-4 ps-12"
                        >
                            <p className="text-sm">
                                Using utility classes to reposition the icon.
                            </p>
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    </div>
) ;

export default CollapseDemo ;
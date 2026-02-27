'use client' ;

import { useState } from 'react' ;

import Container   from '@/display/Container' ;
import Badge       from '@/components/Badge' ;
import Divider     from '@/components/Divider' ;
import Radio       from '@/components/radios/Radio' ;
import RadioGroup  from '@/components/radios/RadioGroup' ;

const RadioDemo = () =>
{
    const [ plan, setPlan ] = useState( 'pro' ) ;
    const [ size, setSize ] = useState( 'medium' ) ;
    const [ delivery, setDelivery ] = useState( 'standard' ) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Radio Examples</h2>

            {/* Simple Radio */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Simple Radio Buttons</h3>

                <div className="flex flex-col gap-2">
                    <Radio name="radio-simple" value="option1" label="Option 1" defaultChecked />
                    <Radio name="radio-simple" value="option2" label="Option 2" />
                    <Radio name="radio-simple" value="option3" label="Option 3" />
                </div>
            </div>

            <Divider />

            {/* Label Position */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Label Position</h3>

                <div className="flex flex-col gap-3">
                    <Radio name="radio-pos-1" label="Label on right (default)" labelPosition="right" defaultChecked />
                    <Radio name="radio-pos-2" label="Label on left" labelPosition="left" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Sizes</h3>

                <div className="flex flex-col gap-3">
                    <Radio name="radio-xs" label="Extra Small" size="xs" defaultChecked />
                    <Radio name="radio-sm" label="Small" size="sm" defaultChecked />
                    <Radio name="radio-md" label="Medium (Default)" size="md" defaultChecked />
                    <Radio name="radio-lg" label="Large" size="lg" defaultChecked />
                    <Radio name="radio-xl" label="Extra Large" size="xl" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Colors</h3>

                <div className="flex flex-col gap-3">
                    <Radio name="radio-primary" label="Primary" color="primary" defaultChecked />
                    <Radio name="radio-secondary" label="Secondary" color="secondary" defaultChecked />
                    <Radio name="radio-accent" label="Accent" color="accent" defaultChecked />
                    <Radio name="radio-neutral" label="Neutral" color="neutral" defaultChecked />
                    <Radio name="radio-info" label="Info" color="info" defaultChecked />
                    <Radio name="radio-success" label="Success" color="success" defaultChecked />
                    <Radio name="radio-warning" label="Warning" color="warning" defaultChecked />
                    <Radio name="radio-error" label="Error" color="error" defaultChecked />
                </div>
            </div>

            <Divider />

            {/* With Helper Text */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Helper Text</h3>

                <div className="flex flex-col gap-2">
                    <Radio
                        name="radio-helper"
                        value="free"
                        label="Free Plan"
                        helper="Perfect for trying out our service"
                        defaultChecked
                    />
                    <Radio
                        name="radio-helper"
                        value="pro"
                        label="Pro Plan"
                        helper="For professionals and small teams"
                    />
                </div>
            </div>

            <Divider />

            {/* Disabled */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Disabled</h3>

                <div className="flex flex-col gap-3">
                    <Radio name="radio-disabled-1" label="Disabled unchecked" disabled />
                    <Radio name="radio-disabled-2" label="Disabled checked" disabled defaultChecked />
                </div>
            </div>

            <Divider />

            {/* RadioGroup - Vertical */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">RadioGroup (Vertical)</h3>

                <RadioGroup
                    name="plan-group"
                    label="Choose your plan"
                    value={ plan }
                    onChange={ setPlan }
                    color="primary"
                    options={[
                        { value: 'free', label: 'Free', helper: '$0/month - Basic features' },
                        { value: 'pro', label: 'Pro', helper: '$29/month - All features' },
                        { value: 'enterprise', label: 'Enterprise', helper: 'Custom pricing' },
                    ]}
                />

                <div className="flex items-center gap-2">
                    <span>Selected plan:</span>
                    <Badge color="primary">{ plan }</Badge>
                </div>
            </div>

            <Divider />

            {/* RadioGroup - Horizontal */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">RadioGroup (Horizontal)</h3>

                <RadioGroup
                    name="size-group"
                    label="Select size"
                    value={ size }
                    onChange={ setSize }
                    color="secondary"
                    layout="horizontal"
                    options={[
                        { value: 'small', label: 'S' },
                        { value: 'medium', label: 'M' },
                        { value: 'large', label: 'L' },
                        { value: 'xlarge', label: 'XL' },
                    ]}
                />

                <div className="flex items-center gap-2">
                    <span>Selected size:</span>
                    <Badge color="secondary">{ size }</Badge>
                </div>
            </div>

            <Divider />

            {/* RadioGroup - Grid */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">RadioGroup (Grid)</h3>

                <RadioGroup
                    name="delivery-group"
                    useFieldset
                    legend="Delivery options"
                    value={ delivery }
                    onChange={ setDelivery }
                    color="accent"
                    layout="grid"
                    options={[
                        { value: 'standard', label: 'Standard Delivery', helper: '5-7 business days' },
                        { value: 'express', label: 'Express Delivery', helper: '2-3 business days' },
                        { value: 'overnight', label: 'Overnight', helper: 'Next business day' },
                        { value: 'pickup', label: 'Store Pickup', helper: 'Pick up in store' },
                    ]}
                />
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Payment method */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Payment Method</h2>

                        <RadioGroup
                            name="payment"
                            defaultValue="card"
                            color="primary"
                            options={[
                                {
                                    value: 'card',
                                    label: '💳 Credit/Debit Card',
                                    helper: 'Visa, Mastercard, Amex'
                                },
                                {
                                    value: 'paypal',
                                    label: '🅿️ PayPal',
                                    helper: 'Pay with your PayPal account'
                                },
                                {
                                    value: 'bank',
                                    label: '🏦 Bank Transfer',
                                    helper: 'Direct bank transfer'
                                },
                            ]}
                        />

                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-primary">Continue</button>
                        </div>
                    </div>
                </div>

                {/* Subscription */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Choose Plan</h2>

                        <div className="flex flex-col gap-2">
                            <div className="card bg-base-200">
                                <div className="card-body p-4">
                                    <Radio
                                        name="subscription"
                                        value="monthly"
                                        label="Monthly"
                                        color="primary"
                                        defaultChecked
                                    />
                                    <div className="ml-8">
                                        <p className="text-2xl font-bold">$29<span className="text-sm font-normal">/mo</span></p>
                                        <p className="text-sm text-base-content/70">Cancel anytime</p>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body p-4">
                                    <Radio
                                        name="subscription"
                                        value="yearly"
                                        label="Yearly"
                                        color="primary"
                                    />
                                    <div className="ml-8">
                                        <p className="text-2xl font-bold">$290<span className="text-sm font-normal">/year</span></p>
                                        <p className="text-sm text-base-content/70">Save 20%</p>
                                        <div className="badge badge-success badge-sm mt-1">Best Value</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary mt-4">Subscribe</button>
                    </div>
                </div>

                {/* Survey */}
                <div className="card bg-base-100 shadow-xl max-w-lg">
                    <div className="card-body">
                        <h2 className="card-title">Customer Survey</h2>

                        <div className="flex flex-col gap-4">
                            <RadioGroup
                                name="satisfaction"
                                label="How satisfied are you with our service?"
                                color="success"
                                options={[
                                    { value: '5', label: '⭐⭐⭐⭐⭐ Extremely satisfied' },
                                    { value: '4', label: '⭐⭐⭐⭐ Very satisfied' },
                                    { value: '3', label: '⭐⭐⭐ Satisfied' },
                                    { value: '2', label: '⭐⭐ Unsatisfied' },
                                    { value: '1', label: '⭐ Very unsatisfied' },
                                ]}
                            />

                            <RadioGroup
                                name="recommend"
                                label="Would you recommend us to a friend?"
                                color="primary"
                                layout="horizontal"
                                options={[
                                    { value: 'yes', label: '👍 Yes' },
                                    { value: 'no', label: '👎 No' },
                                    { value: 'maybe', label: '🤔 Maybe' },
                                ]}
                            />
                        </div>

                        <button className="btn btn-primary mt-4">Submit Survey</button>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default RadioDemo ;
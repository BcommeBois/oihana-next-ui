'use client' ;

import Container from '@/display/Container' ;

import Status from '@/components/Status' ;
import Divider from '@/components/Divider' ;

/**
 * Four colours no palette holds — what a mark looks like when its colour is a
 * value rather than a choice.
 * @type {Array<{ color : string , name : string }>}
 */
const FREE_COLOURS =
[
    { color : '#7C3AED' , name : 'Violet' } ,
    { color : '#F59E0B' , name : 'Amber' } ,
    { color : '#0EA5E9' , name : 'Sky' } ,
    { color : 'rebeccapurple' , name : 'Named, not hex' } ,
] ;

const StatusDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Status Examples</h2>

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">All Colors</h3>

                <div className="flex flex-wrap gap-4">
                    <Status color="primary"   label="Primary"   />
                    <Status color="secondary" label="Secondary" />
                    <Status color="accent"    label="Accent"    />
                    <Status color="neutral"   label="Neutral"   />
                    <Status color="info"      label="Info"      />
                    <Status color="success"   label="Success"   />
                    <Status color="warning"   label="Warning"   />
                    <Status color="error"     label="Error"     />
                </div>
            </div>

            <Divider />

            {/* All Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">All Sizes</h3>

                <div className="flex flex-wrap items-center gap-6">
                    <Status color="primary" size="xs" label="XS" />
                    <Status color="primary" size="sm" label="SM" />
                    <Status color="primary" size="md" label="MD (default)" />
                    <Status color="primary" size="lg" label="LG" />
                    <Status color="primary" size="xl" label="XL" />
                </div>
            </div>

            <Divider />

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">A Colour Of Its Own</h3>

                <p className="text-sm opacity-70">
                    Any CSS colour, for a mark whose colour is data rather than a choice — a label an
                    administrator picked, a palette served by an API. The eight daisyUI names keep
                    going through daisyUI ; everything else is painted inline.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                    { FREE_COLOURS.map( ( { color , name } ) => (
                        <Status key={ name } color={ color } label={ name } size="md" labelSize="sm" />
                    ) ) }
                </div>

                <p className="text-sm opacity-70">
                    <code className="badge badge-sm">labelSize</code> makes the text follow the mark.
                    Left out, a label reads at <code className="badge badge-sm">text-sm</code> whatever
                    the size — the two scales are not the same scale, a mark can shrink below what a
                    sentence can.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                    <Status color="#7C3AED" label="xs" size="xs" labelSize="xs" />
                    <Status color="#7C3AED" label="sm" size="sm" labelSize="sm" />
                    <Status color="#7C3AED" label="md" size="md" labelSize="md" />
                    <Status color="#7C3AED" label="lg" size="lg" labelSize="lg" />
                    <Status color="#7C3AED" label="xl" size="xl" labelSize="xl" />
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;Status</code></pre>
                    <pre data-prefix="2"><code>    color={'{ term.color }'} <span className="text-success">// any CSS colour</span></code></pre>
                    <pre data-prefix="3"><code>    label={'{ term.label }'}</code></pre>
                    <pre data-prefix="4"><code>    labelSize="sm" <span className="text-info">// the text follows the mark</span></code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* No Label */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">Without Label</h3>

                <div className="flex flex-wrap items-center gap-4">
                    <Status color="primary"   />
                    <Status color="secondary" />
                    <Status color="accent"    />
                    <Status color="neutral"   />
                    <Status color="info"      />
                    <Status color="success"   />
                    <Status color="warning"   />
                    <Status color="error"     />
                </div>
            </div>

            <Divider />

            {/* Label Position */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">Label Position</h3>

                <div className="flex flex-wrap gap-6">
                    <Status color="success" label="Label right (default)" labelPosition="right" />
                    <Status color="success" label="Label left"            labelPosition="left"  />
                </div>
            </div>

            <Divider />

            {/* Animations */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">Animations</h3>

                <div className="flex flex-wrap gap-6">
                    <Status color="success" ping   label="Ping"   />
                    <Status color="warning" bounce label="Bounce" />
                    <Status color="info"    animate="pulse" label="Pulse" />
                    <Status color="error"   animate="spin"  label="Spin"  />
                </div>
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">Practical Use Cases</h3>

                {/* Server status */}
                <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-medium">Server Status</h4>
                    <div className="flex flex-col gap-2">
                        <Status color="success" ping   label="API Server — Online"    />
                        <Status color="warning" bounce label="Database — Degraded"    />
                        <Status color="error"   ping   label="Cache — Offline"        />
                        <Status color="neutral"        label="Backup — Maintenance"   />
                    </div>
                </div>

                {/* User presence */}
                <div className="flex flex-col gap-2 mt-2">
                    <h4 className="text-lg font-medium">User Presence</h4>
                    <div className="flex flex-wrap gap-4">
                        <Status color="success" size="sm" label="Online"  />
                        <Status color="warning" size="sm" label="Away"    />
                        <Status color="error"   size="sm" label="Busy"    />
                        <Status color="neutral" size="sm" label="Offline" />
                    </div>
                </div>

                {/* In a list */}
                <div className="flex flex-col gap-2 mt-2">
                    <h4 className="text-lg font-medium">In a List</h4>
                    <div className="flex flex-col gap-2 w-full max-w-sm">
                        {
                            [
                                { name : 'Build'   , color : 'success' , label : 'Passed'   } ,
                                { name : 'Tests'   , color : 'success' , label : 'Passed'   } ,
                                { name : 'Lint'    , color : 'warning' , label : 'Warnings' } ,
                                { name : 'Deploy'  , color : 'error'   , label : 'Failed'   } ,
                                { name : 'Release' , color : 'neutral' , label : 'Pending'  } ,
                            ].map( ( { name , color , label } ) => (
                                <div
                                    key       = { name }
                                    className = "flex items-center justify-between px-3 py-2 bg-base-100 rounded-box"
                                >
                                    <span className="text-sm font-medium">{ name }</span>
                                    <Status color={ color } size="sm" label={ label } />
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>

            <Divider />

            {/* Custom Element */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">Custom Element</h3>

                <div className="flex flex-wrap gap-4">
                    <Status as="span"   color="primary" label="As span"   />
                    <Status as="li"     color="success" label="As li"     />
                    <Status as="button" color="accent"  label="As button" className="cursor-pointer" />
                </div>
            </div>

        </Container>
    ) ;
} ;

export default StatusDemo ;
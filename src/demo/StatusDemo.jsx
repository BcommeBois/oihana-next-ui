'use client' ;

import Container from '@/display/Container' ;

import Status from '@/components/Status' ;
import Divider from '@/components/Divider' ;

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
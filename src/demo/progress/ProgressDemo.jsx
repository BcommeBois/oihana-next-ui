'use client' ;

import { useState, useEffect } from 'react' ;

import cn from '@/themes/helpers/cn' ;

import Container from '@/display/Container' ;
import Divider   from '@/components/Divider' ;
import Progress  from '@/components/progress/Progress' ;

const ProgressDemo = () =>
{
    const [ upload   , setUpload   ] = useState( 0  ) ;
    const [ download , setDownload ] = useState( 45 ) ;

    // Simulate upload progress
    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            setUpload(( prev ) =>
            {
                if ( prev >= 100 ) return 0 ;
                return prev + 10 ;
            }) ;
        }, 1000 ) ;

        return () => clearInterval( interval ) ;
    }
    , []) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Simple Progress */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="text-xl font-semibold">Simple Progress</h3>

                <div className="flex flex-col gap-2">
                    <Progress value={ 0 } />
                    <Progress value={ 10 } />
                    <Progress value={ 40 } />
                    <Progress value={ 70 } />
                    <Progress value={ 100 } />
                </div>
            </div>

            <Divider />

            {/* With Label */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="text-xl font-semibold">With Label</h3>

                <Progress label="Loading" value={ 50 } />
                <Progress label="Processing" value={ 75 } color="primary" />
            </div>

            <Divider />

            {/* Show Value */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="text-xl font-semibold">Show Percentage</h3>

                <Progress
                    label="Download"
                    value={ download }
                    showValue
                    color="info"
                />

                <Progress
                    label="Upload"
                    value={ upload }
                    showValue
                    color="success"
                />
            </div>

            <Divider />

            {/* All Colors */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="text-xl font-semibold">All Colors</h3>

                <div className="flex flex-col gap-3">
                    <Progress label="Primary" value={ 40 } color="primary" showValue />
                    <Progress label="Secondary" value={ 40 } color="secondary" showValue />
                    <Progress label="Accent" value={ 40 } color="accent" showValue />
                    <Progress label="Neutral" value={ 40 } color="neutral" showValue />
                    <Progress label="Info" value={ 40 } color="info" showValue />
                    <Progress label="Success" value={ 40 } color="success" showValue />
                    <Progress label="Warning" value={ 40 } color="warning" showValue />
                    <Progress label="Error" value={ 40 } color="error" showValue />
                </div>
            </div>

            <Divider />

            {/* Custom Format */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="text-xl font-semibold">Custom Format</h3>

                <Progress
                    label="Storage Used"
                    value={ 45 }
                    max={ 100 }
                    showValue
                    formatValue={ (v, max) => `${v}GB / ${max}GB` }
                    color="warning"
                />

                <Progress
                    label="Tasks Completed"
                    value={ 7 }
                    max={ 10 }
                    showValue
                    formatValue={ (v, max) => `${v} of ${max}` }
                    color="success"
                />

                <Progress
                    label="Level Progress"
                    value={ 850 }
                    max={ 1000 }
                    showValue
                    formatValue={ (v, max) => `${v} XP / ${max} XP` }
                    color="accent"
                />
            </div>

            <Divider />

            {/* With Helper Text */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="text-xl font-semibold">With Helper Text</h3>

                <Progress
                    label="Installation"
                    value={ 65 }
                    showValue
                    helper="Installing dependencies..."
                    color="primary"
                />

                <Progress
                    label="Backup"
                    value={ 30 }
                    showValue
                    helper="Estimated time: 5 minutes"
                    color="info"
                />
            </div>

            <Divider />

            {/* With Error */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="text-xl font-semibold">With Error</h3>

                <Progress
                    label="Upload Failed"
                    value={ 45 }
                    showValue
                    error="Connection lost. Please try again."
                />
            </div>

            <Divider />

            {/* Indeterminate (Loading) */}
            <div className="flex flex-col gap-4 max-w-2xl">
                <h3 className="text-xl font-semibold">Indeterminate (Loading)</h3>

                <Progress label="Processing..." color="primary" />
                <Progress label="Uploading..." color="success" />
                <Progress label="Analyzing..." color="info" />
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Upload card */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">File Upload</h2>

                        <div className="flex flex-col gap-4">
                            <Progress
                                label="document.pdf"
                                value={ upload }
                                showValue
                                formatValue={ (v) => `${v}%` }
                                helper={ upload < 100 ? "Uploading..." : "Upload complete!" }
                                color={ upload < 100 ? "primary" : "success" }
                            />

                            <div className="flex justify-between text-sm">
                                <span>2.4 MB / 5.8 MB</span>
                                <span>{ upload < 100 ? '30s remaining' : 'Done' }</span>
                            </div>

                            <button
                                className={ cn(
                                    'btn',
                                    upload < 100 ? 'btn-error' : 'btn-success'
                                )}
                            >
                                { upload < 100 ? 'Cancel' : 'Open File' }
                            </button>
                        </div>
                    </div>
                </div>

                {/* Profile completion */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Profile Completion</h2>

                        <Progress
                            label="Your profile is 60% complete"
                            value={ 60 }
                            showValue
                            color="warning"
                            helper="Complete your profile to unlock all features"
                        />

                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✅</span>
                                <span className="text-sm">Basic information</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✅</span>
                                <span className="text-sm">Profile picture</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">⬜</span>
                                <span className="text-sm">Bio description</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">⬜</span>
                                <span className="text-sm">Social links</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Multi-step process */}
                <div className="card bg-base-100 shadow-xl max-w-lg">
                    <div className="card-body">
                        <h2 className="card-title">Installation Progress</h2>

                        <div className="flex flex-col gap-4">
                            <Progress
                                label="Step 1: Download"
                                value={ 100 }
                                showValue
                                color="success"
                            />

                            <Progress
                                label="Step 2: Extract"
                                value={ 100 }
                                showValue
                                color="success"
                            />

                            <Progress
                                label="Step 3: Install"
                                value={ 75 }
                                showValue
                                color="primary"
                                helper="Installing dependencies..."
                            />

                            <Progress
                                label="Step 4: Configure"
                                value={ 0 }
                                showValue
                                color="neutral"
                            />
                        </div>
                    </div>
                </div>

                {/* Storage usage */}
                <div className="card bg-base-100 shadow-xl max-w-sm">
                    <div className="card-body">
                        <h2 className="card-title">Storage</h2>

                        <div className="flex flex-col gap-4">
                            <Progress
                                label="Documents"
                                value={ 25 }
                                max={ 100 }
                                showValue
                                formatValue={ (v) => `${v}GB` }
                                color="info"
                            />

                            <Progress
                                label="Photos"
                                value={ 45 }
                                max={ 100 }
                                showValue
                                formatValue={ (v) => `${v}GB` }
                                color="success"
                            />

                            <Progress
                                label="Videos"
                                value={ 85 }
                                max={ 100 }
                                showValue
                                formatValue={ (v) => `${v}GB` }
                                color="warning"
                            />

                            <Progress
                                label="Other"
                                value={ 15 }
                                max={ 100 }
                                showValue
                                formatValue={ (v) => `${v}GB` }
                                color="neutral"
                            />

                            <div className="divider"></div>

                            <div className="flex justify-between">
                                <span className="font-semibold">Total Used:</span>
                                <span className="font-bold">170GB / 200GB</span>
                            </div>

                            <button className="btn btn-primary btn-sm">Upgrade Storage</button>
                        </div>
                    </div>
                </div>

                {/* Skills/Stats */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Skills</h2>

                        <div className="flex flex-col gap-3">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">React</span>
                                    <span className="text-sm font-semibold">90%</span>
                                </div>
                                <Progress value={ 90 } color="primary" />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">TypeScript</span>
                                    <span className="text-sm font-semibold">85%</span>
                                </div>
                                <Progress value={ 85 } color="secondary" />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">Node.js</span>
                                    <span className="text-sm font-semibold">75%</span>
                                </div>
                                <Progress value={ 75 } color="accent" />
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">Python</span>
                                    <span className="text-sm font-semibold">60%</span>
                                </div>
                                <Progress value={ 60 } color="info" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default ProgressDemo ;
'use client' ;

import { useState, useEffect } from 'react' ;

import Badge          from '@/components/Badge' ;
import Container      from '@/display/Container' ;
import Divider        from '@/components/Divider' ;
import RadialProgress from '@/components/progress/RadialProgress' ;

const RadialProgressDemo = () =>
{
    const [ progress, setProgress ] = useState( 0 ) ;

    // Animate progress
    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            setProgress(( prev ) => ( prev >= 100 ? 0 : prev + 5 )) ;
        }, 200 ) ;

        return () => clearInterval( interval ) ;
    }, []) ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Simple Radial Progress */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Simple Radial Progress</h3>

                <div className="flex gap-4 flex-wrap">
                    <RadialProgress value={ 0 } />
                    <RadialProgress value={ 20 } />
                    <RadialProgress value={ 60 } />
                    <RadialProgress value={ 80 } />
                    <RadialProgress value={ 100 } />
                </div>
            </div>

            <Divider />

            {/* All Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">All Colors</h3>

                <div className="flex gap-4 flex-wrap">
                    <RadialProgress value={ 70 } color="primary" />
                    <RadialProgress value={ 70 } color="secondary" />
                    <RadialProgress value={ 70 } color="accent" />
                    <RadialProgress value={ 70 } color="neutral" />
                    <RadialProgress value={ 70 } color="info" />
                    <RadialProgress value={ 70 } color="success" />
                    <RadialProgress value={ 70 } color="warning" />
                    <RadialProgress value={ 70 } color="error" />
                </div>
            </div>

            <Divider />

            {/* With Background and Border */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Background and Border</h3>

                <div className="flex gap-4 flex-wrap">
                    <RadialProgress
                        value={ 70 }
                        color="primary-content"
                        bgColor="primary"
                        borderColor="primary"
                        borderWidth={ 4 }
                    />

                    <RadialProgress
                        value={ 85 }
                        color="success-content"
                        bgColor="success"
                        borderColor="success"
                        borderWidth={ 4 }
                    />

                    <RadialProgress
                        value={ 45 }
                        color="warning-content"
                        bgColor="warning"
                        borderColor="warning"
                        borderWidth={ 4 }
                    />
                </div>
            </div>

            <Divider />

            {/* Different Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Different Sizes</h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <RadialProgress value={ 70 } size="3rem" color="primary" />
                    <RadialProgress value={ 70 } size="5rem" color="secondary" />
                    <RadialProgress value={ 70 } size="8rem" color="accent" />
                    <RadialProgress value={ 70 } size="12rem" color="info" />
                </div>
            </div>

            <Divider />

            {/* Different Thickness */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Different Thickness</h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <RadialProgress value={ 70 } size="8rem" thickness="2px" color="primary" />
                    <RadialProgress value={ 70 } size="8rem" thickness="0.5rem" color="secondary" />
                    <RadialProgress value={ 70 } size="8rem" thickness="1rem" color="accent" />
                    <RadialProgress value={ 70 } size="8rem" thickness="2rem" color="success" />
                </div>
            </div>

            <Divider />

            {/* Custom Format */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Format</h3>

                <div className="flex gap-4 flex-wrap">
                    <RadialProgress
                        value={ 45 }
                        max={ 100 }
                        formatValue={ (v) => `${v}GB` }
                        color="info"
                    />

                    <RadialProgress
                        value={ 7 }
                        max={ 10 }
                        formatValue={ (v, max) => `${v}/${max}` }
                        color="success"
                    />

                    <RadialProgress
                        value={ 850 }
                        max={ 1000 }
                        formatValue={ (v) => `${v} XP` }
                        color="warning"
                    />
                </div>
            </div>

            <Divider />

            {/* Custom Content */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Custom Content</h3>

                <div className="flex gap-4 flex-wrap">
                    <RadialProgress value={ 75 } color="primary">
                        <div className="text-center">
                            <div className="text-2xl font-bold">75%</div>
                            <div className="text-xs">Complete</div>
                        </div>
                    </RadialProgress>

                    <RadialProgress value={ 60 } color="success">
                        <div className="text-center">
                            <div className="text-3xl">✓</div>
                            <div className="text-sm">Done</div>
                        </div>
                    </RadialProgress>

                    <RadialProgress value={ 90 } color="warning">
                        <div className="text-center">
                            <div className="text-xl font-bold">A+</div>
                            <div className="text-xs">Grade</div>
                        </div>
                    </RadialProgress>
                </div>
            </div>

            <Divider />

            {/* Animated */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Animated Progress</h3>

                <div className="flex gap-4 items-center flex-wrap">
                    <RadialProgress value={ progress } color="primary" size="8rem" />

                    <div className="flex flex-col gap-2">
                        <Badge color="primary">Current: { progress }%</Badge>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setProgress( 0 )}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Stats dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center">
                            <RadialProgress
                                value={ 85 }
                                color="primary"
                                size="8rem"
                            />
                            <h3 className="card-title text-sm mt-2">Tasks Complete</h3>
                            <p className="text-xs text-base-content/70">17 of 20 done</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center">
                            <RadialProgress
                                value={ 62 }
                                color="success"
                                size="8rem"
                            />
                            <h3 className="card-title text-sm mt-2">Storage Used</h3>
                            <p className="text-xs text-base-content/70">62GB of 100GB</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center">
                            <RadialProgress
                                value={ 45 }
                                color="warning"
                                size="8rem"
                            />
                            <h3 className="card-title text-sm mt-2">Battery</h3>
                            <p className="text-xs text-base-content/70">2h 15m remaining</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center">
                            <RadialProgress
                                value={ 92 }
                                color="info"
                                size="8rem"
                            />
                            <h3 className="card-title text-sm mt-2">CPU Usage</h3>
                            <p className="text-xs text-base-content/70">High load</p>
                        </div>
                    </div>
                </div>

                {/* Skills / Level */}
                <div className="card bg-base-100 shadow-xl max-w-2xl">
                    <div className="card-body">
                        <h2 className="card-title">Skill Levels</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <RadialProgress
                                    value={ 90 }
                                    color="primary"
                                    size="6rem"
                                >
                                    <div className="text-center">
                                        <div className="text-xl font-bold">90</div>
                                        <div className="text-xs">React</div>
                                    </div>
                                </RadialProgress>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <RadialProgress
                                    value={ 85 }
                                    color="secondary"
                                    size="6rem"
                                >
                                    <div className="text-center">
                                        <div className="text-xl font-bold">85</div>
                                        <div className="text-xs">TS</div>
                                    </div>
                                </RadialProgress>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <RadialProgress
                                    value={ 75 }
                                    color="accent"
                                    size="6rem"
                                >
                                    <div className="text-center">
                                        <div className="text-xl font-bold">75</div>
                                        <div className="text-xs">Node</div>
                                    </div>
                                </RadialProgress>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <RadialProgress
                                    value={ 60 }
                                    color="info"
                                    size="6rem"
                                >
                                    <div className="text-center">
                                        <div className="text-xl font-bold">60</div>
                                        <div className="text-xs">Python</div>
                                    </div>
                                </RadialProgress>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Goals / Achievements */}
                <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body">
                        <h2 className="card-title">Monthly Goals</h2>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <RadialProgress
                                    value={ 100 }
                                    color="success"
                                    size="4rem"
                                >
                                    ✓
                                </RadialProgress>
                                <div className="flex-1">
                                    <p className="font-semibold">Exercise 20 days</p>
                                    <p className="text-xs text-base-content/70">Completed!</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <RadialProgress
                                    value={ 80 }
                                    color="primary"
                                    size="4rem"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">Read 4 books</p>
                                    <p className="text-xs text-base-content/70">3.2 of 4 books</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <RadialProgress
                                    value={ 45 }
                                    color="warning"
                                    size="4rem"
                                />
                                <div className="flex-1">
                                    <p className="font-semibold">Save $500</p>
                                    <p className="text-xs text-base-content/70">$225 saved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score / Rating */}
                <div className="card bg-base-100 shadow-xl max-w-sm">
                    <div className="card-body items-center">
                        <RadialProgress
                            value={ 88 }
                            color="success"
                            size="12rem"
                            bgColor="success"
                            borderColor="success"
                            borderWidth={ 8 }
                        >
                            <div className="text-center">
                                <div className="text-4xl font-bold text-success-content">88</div>
                                <div className="text-sm text-success-content">Excellent</div>
                            </div>
                        </RadialProgress>
                        <h3 className="card-title mt-4">Credit Score</h3>
                        <p className="text-sm text-center text-base-content/70">
                            Your credit score is excellent. Keep up the good work!
                        </p>
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default RadialProgressDemo ;
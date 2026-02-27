'use client' ;

import Container from '@/display/Container' ;
import getMaskClasses from '@/themes/components/mask' ;

const MaskDemo = () =>
{
    const imageSrc = 'https://picsum.photos/200?random=' ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* All Mask Shapes */}
            <div className="flex flex-col gap-8">
                <h3 className="text-xl font-semibold">All Mask Shapes</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}1`}
                            alt="Squircle mask"
                            className={getMaskClasses({ shape: 'squircle', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Squircle</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}2`}
                            alt="Heart mask"
                            className={getMaskClasses({ shape: 'heart', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Heart</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}3`}
                            alt="Hexagon mask"
                            className={getMaskClasses({ shape: 'hexagon', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Hexagon</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}4`}
                            alt="Hexagon-2 mask"
                            className={getMaskClasses({ shape: 'hexagon-2', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Hexagon-2</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}5`}
                            alt="Decagon mask"
                            className={getMaskClasses({ shape: 'decagon', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Decagon</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}6`}
                            alt="Pentagon mask"
                            className={getMaskClasses({ shape: 'pentagon', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Pentagon</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}7`}
                            alt="Diamond mask"
                            className={getMaskClasses({ shape: 'diamond', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Diamond</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}8`}
                            alt="Square mask"
                            className={getMaskClasses({ shape: 'square', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Square</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}9`}
                            alt="Circle mask"
                            className={getMaskClasses({ shape: 'circle', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Circle</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}10`}
                            alt="Star mask"
                            className={getMaskClasses({ shape: 'star', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Star</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}11`}
                            alt="Star-2 mask"
                            className={getMaskClasses({ shape: 'star-2', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Star-2 (Bold)</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}12`}
                            alt="Triangle mask"
                            className={getMaskClasses({ shape: 'triangle', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Triangle ↑</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}13`}
                            alt="Triangle-2 mask"
                            className={getMaskClasses({ shape: 'triangle-2', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Triangle ↓</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}14`}
                            alt="Triangle-3 mask"
                            className={getMaskClasses({ shape: 'triangle-3', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Triangle ←</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <img
                            src={`${imageSrc}15`}
                            alt="Triangle-4 mask"
                            className={getMaskClasses({ shape: 'triangle-4', className: 'w-32 h-32' })}
                        />
                        <span className="text-sm font-medium">Triangle →</span>
                    </div>
                </div>
            </div>

            {/* With Background Colors */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">With Background Colors (No Image)</h3>

                <div className="flex flex-wrap gap-4">
                    <div className={getMaskClasses({ shape: 'star-2', color: 'primary', className: 'w-20 h-20' })} />
                    <div className={getMaskClasses({ shape: 'star-2', color: 'secondary', className: 'w-20 h-20' })} />
                    <div className={getMaskClasses({ shape: 'star-2', color: 'accent', className: 'w-20 h-20' })} />
                    <div className={getMaskClasses({ shape: 'heart', color: 'error', className: 'w-20 h-20' })} />
                    <div className={getMaskClasses({ shape: 'heart', color: 'warning', className: 'w-20 h-20' })} />
                    <div className={getMaskClasses({ shape: 'heart', color: 'success', className: 'w-20 h-20' })} />
                    <div className={getMaskClasses({ shape: 'circle', color: 'info', className: 'w-20 h-20' })} />
                    <div className={getMaskClasses({ shape: 'circle', color: 'neutral', className: 'w-20 h-20' })} />
                </div>
            </div>

            {/* Half Masks */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Half Masks (for Ratings)</h3>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className={getMaskClasses({ shape: 'star-2', color: 'warning', half: 'half-1', className: 'w-20 h-20' })} />
                        <span className="text-sm">Half 1 (Left)</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className={getMaskClasses({ shape: 'star-2', color: 'warning', half: 'half-2', className: 'w-20 h-20' })} />
                        <span className="text-sm">Half 2 (Right)</span>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="flex">
                            <div className={getMaskClasses({ shape: 'star-2', color: 'warning', half: 'half-1', className: 'w-20 h-20' })} />
                            <div className={getMaskClasses({ shape: 'star-2', color: 'warning', half: 'half-2', className: 'w-20 h-20' })} />
                        </div>
                        <span className="text-sm">Combined</span>
                    </div>
                </div>
            </div>

            {/* Different Sizes */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Different Sizes</h3>

                <div className="flex items-end gap-4">
                    <img
                        src={`${imageSrc}20`}
                        alt="Small"
                        className={getMaskClasses({ shape: 'squircle', className: 'w-12 h-12' })}
                    />
                    <img
                        src={`${imageSrc}21`}
                        alt="Medium"
                        className={getMaskClasses({ shape: 'squircle', className: 'w-20 h-20' })}
                    />
                    <img
                        src={`${imageSrc}22`}
                        alt="Large"
                        className={getMaskClasses({ shape: 'squircle', className: 'w-32 h-32' })}
                    />
                    <img
                        src={`${imageSrc}23`}
                        alt="Extra Large"
                        className={getMaskClasses({ shape: 'squircle', className: 'w-40 h-40' })}
                    />
                </div>
            </div>

            {/* Practical Use Cases */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Practical Use Cases</h3>

                {/* Profile card with masked avatar */}
                <div className="card bg-base-100 shadow-xl max-w-sm">
                    <div className="card-body items-center text-center">
                        <img
                            src={`${imageSrc}30`}
                            alt="Profile"
                            className={getMaskClasses({ shape: 'squircle', className: 'w-32 h-32 mb-4' })}
                        />
                        <h2 className="card-title">John Doe</h2>
                        <p>Software Developer</p>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-sm">Follow</button>
                        </div>
                    </div>
                </div>

                {/* Gallery with different masks */}
                <div>
                    <h4 className="text-lg font-medium mb-3">Gallery</h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        <img src={`${imageSrc}31`} alt="" className={getMaskClasses({ shape: 'hexagon', className: 'w-24 h-24' })} />
                        <img src={`${imageSrc}32`} alt="" className={getMaskClasses({ shape: 'circle', className: 'w-24 h-24' })} />
                        <img src={`${imageSrc}33`} alt="" className={getMaskClasses({ shape: 'squircle', className: 'w-24 h-24' })} />
                        <img src={`${imageSrc}34`} alt="" className={getMaskClasses({ shape: 'diamond', className: 'w-24 h-24' })} />
                        <img src={`${imageSrc}35`} alt="" className={getMaskClasses({ shape: 'star', className: 'w-24 h-24' })} />
                        <img src={`${imageSrc}36`} alt="" className={getMaskClasses({ shape: 'heart', className: 'w-24 h-24' })} />
                    </div>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default MaskDemo ;
'use client' ;

import { useState } from 'react' ;

import Battery         from '@/components/spinners/Battery' ;
import Bear            from '@/components/spinners/Bear' ;
import Bike            from '@/components/spinners/Bike' ;
import Book            from '@/components/spinners/Book' ;
import Bounce          from '@/components/spinners/Bounce' ;
import BouncingBlocks  from '@/components/spinners/BouncingBlocks' ;
import Chase           from '@/components/spinners/Chase' ;
import Circle          from '@/components/spinners/Circle' ;
import CircleFade      from '@/components/spinners/CircleFade' ;
import Clock           from '@/components/spinners/Clock' ;
import Coffee          from '@/components/spinners/Coffee' ;
import Corners         from '@/components/spinners/Corners' ;
import Down            from '@/components/spinners/Down' ;
import Fold            from '@/components/spinners/Fold' ;
import Flow            from '@/components/spinners/Flow' ;
import FourSquares     from '@/components/spinners/FourSquares' ;
import Grid            from '@/components/spinners/Grid' ;
import IceCream        from '@/components/spinners/IceCream' ;
import Image           from '@/components/spinners/Image' ;
import Kit             from '@/components/spinners/Kit' ;
import MagnifyingGlass from '@/components/spinners/MagnifyingGlass' ;
import MatrixRain      from '@/components/spinners/MatrixRain' ;
import MouseWheel      from '@/components/spinners/MouseWheel';
import Notes           from '@/components/spinners/Notes';
import Pacman          from '@/components/spinners/Pacman';
import Padlock         from '@/components/spinners/Padlock';
import Plane           from '@/components/spinners/Plane';
import Pulse           from '@/components/spinners/Pulse';
import Quote           from '@/components/spinners/Quote';
import Speak           from '@/components/spinners/Speak';
import Spin            from '@/components/spinners/Spin';
import Spot            from '@/components/spinners/Spot';
import Swing           from '@/components/spinners/Swing';
import Up              from '@/components/spinners/Up' ;
import Wave            from '@/components/spinners/Wave';
import Wifi            from '@/components/spinners/Wifi';

const SPINNERS =
{
    battery        : { name : 'Battery'         , Component : Battery         } ,
    bear           : { name : 'Bear'            , Component : Bear            } ,
    bike           : { name : 'Bike'            , Component : Bike            } ,
    book           : { name : 'Book'            , Component : Book            } ,
    bounce         : { name : 'Bounce'          , Component : Bounce          } ,
    bouncingBlocks : { name : 'BouncingBlocks'  , Component : BouncingBlocks  } ,
    chase          : { name : 'Chase'           , Component : Chase           } ,
    circle         : { name : 'Circle'          , Component : Circle          } ,
    circleFade     : { name : 'CircleFade'      , Component : CircleFade      } ,
    clock          : { name : 'Clock'           , Component : Clock           } ,
    coffee         : { name : 'Coffee'          , Component : Coffee          } ,
    corners        : { name : 'Corners'         , Component : Corners         } ,
    down           : { name : 'Down'            , Component : Down            } ,
    flow           : { name : 'Flow'            , Component : Flow            } ,
    fold           : { name : 'Fold'            , Component : Fold            } ,
    fourSquares    : { name : 'FourSquares'     , Component : FourSquares     } ,
    grid           : { name : 'Grid'            , Component : Grid            } ,
    iceCream       : { name : 'IceCream'        , Component : IceCream        } ,
    image          : { name : 'Image'           , Component : Image           , invertColors : true } ,
    kit            : { name : 'Kit'             , Component : Kit             } ,
    magnifying     : { name : 'MagnifyingGlass' , Component : MagnifyingGlass } ,
    matrixRain     : { name : 'MatrixRain'      , Component : MatrixRain      } ,
    mouseWheel     : { name : 'MouseWheel'      , Component : MouseWheel      } ,
    notes          : { name : 'Notes'           , Component : Notes           , invertColors : true } ,
    pacman         : { name : 'Pacman'          , Component : Pacman          } ,
    padlock        : { name : 'Padlock'         , Component : Padlock         } ,
    plane          : { name : 'Plane'           , Component : Plane           } ,
    pulse          : { name : 'Pulse'           , Component : Pulse           } ,
    quote          : { name : 'Quote'           , Component : Quote           } ,
    speak          : { name : 'Speak'           , Component : Speak           , invertColors : true } ,
    spin           : { name : 'Spin'            , Component : Spin            , invertColors : true } ,
    spot           : { name : 'Spot'            , Component : Spot            } ,
    swing          : { name : 'Swing'           , Component : Swing           } ,
    up             : { name : 'Up'              , Component : Up              } ,
    wave           : { name : 'Wave'            , Component : Wave            } ,
    wifi           : { name : 'Wifi'            , Component : Wifi            } ,
} ;

const COLORS =
[
    { key: 'base-100'  , label: 'Base'      } ,
    { key: 'primary'   , label: 'Primary'   } ,
    { key: 'secondary' , label: 'Secondary' } ,
    { key: 'accent'    , label: 'Accent'    } ,
    { key: 'info'      , label: 'Info'      } ,
    { key: 'success'   , label: 'Success'   } ,
    { key: 'warning'   , label: 'Warning'   } ,
    { key: 'error'     , label: 'Error'     } ,
] ;

const SpinnersDemo = () =>
{
    const [ selectedSpinner , setSelectedSpinner ] = useState( 'battery' ) ;
    const [ selectedColor , setSelectedColor ] = useState( 'base-100' ) ;

    const currentSpinner   = SPINNERS[ selectedSpinner ] ;
    const SpinnerComponent = currentSpinner?.Component ;

    return (
        <div className="flex flex-col gap-8">
            {/* Spinner Selector */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4">Spinner Gallery</h2>

                    {/* Spinner Type Buttons */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Select Spinner Type
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            { Object.entries( SPINNERS ).map( ([ key , { name } ]) => (
                                <button
                                    key       = { key }
                                    className = { selectedSpinner === key ? 'btn btn-sm btn-primary' : 'btn btn-sm' }
                                    onClick   = { () => setSelectedSpinner( key ) }
                                >
                                    { name }
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Selector */}
                    <div className="flex flex-col gap-3 mt-4">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Select Color
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            { COLORS.map( ({ key , label }) => (
                                <button
                                    key       = { key }
                                    className = { selectedColor === key ? 'btn btn-sm btn-secondary' : 'btn btn-sm btn-ghost' }
                                    onClick   = { () => setSelectedColor( key ) }
                                >
                                    { label }
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="flex flex-col gap-3 mt-6">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Live Preview
                        </h3>
                        <div className="flex items-center justify-center p-8 rounded-xl bg-base-300 min-h-64">
                            { SpinnerComponent && (
                                currentSpinner.invertColors ? (
                                    <SpinnerComponent
                                        backgroundColor = { selectedColor }
                                        color           = "base-content"
                                    />
                                ) : (
                                    <SpinnerComponent color={ selectedColor } />
                                )
                            )}
                        </div>
                    </div>

                    {/* Current Selection Info */}
                    <div className="alert alert-info mt-4">
                        <div className="flex flex-col gap-1">
                            <div className="font-semibold">
                                Current: { currentSpinner?.name || 'Unknown' }
                            </div>
                            <div className="text-sm opacity-70">
                                Color: { selectedColor }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) ;
} ;

export default SpinnersDemo ;
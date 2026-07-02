'use client' ;

import {
    MdAdd ,
    MdEdit ,
    MdMic ,
    MdPhotoCamera ,
    MdPhotoLibrary ,
    MdPoll ,
} from 'react-icons/md' ;

import Container from '@/display/Container' ;

import Fab     from '@/components/menus/Fab' ;
import Divider from '@/components/Divider' ;

/**
 * Positioned frame that contains an (absolute) FAB so it sits in the corner of
 * the demo box instead of floating over the whole screen.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
const Frame = ( { children } ) => (
    <div className="relative h-56 w-full bg-base-300 rounded-box overflow-hidden">
        { children }
    </div>
) ;

const FabDemo = () =>
{
    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">FAB / Speed Dial Examples</h2>
            <p className="text-base-content/70">
                Hover or focus the button in the bottom-right corner of each frame to open the speed dial.
            </p>

            {/* Vertical */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">Vertical</h3>

                <Frame>
                    <Fab
                        label    = "F"
                        color    = "primary"
                        position = "absolute"
                        actions  =
                        {[
                            { id : 'a' , text : 'A' } ,
                            { id : 'b' , text : 'B' } ,
                            { id : 'c' , text : 'C' } ,
                        ]}
                    />
                </Frame>
            </div>

            <Divider />

            {/* With SVG icons */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">With icons</h3>

                <Frame>
                    <Fab
                        icon     = { MdAdd }
                        color    = "secondary"
                        position = "absolute"
                        actions  =
                        {[
                            { id : 'cam'     , icon : MdPhotoCamera } ,
                            { id : 'gallery' , icon : MdPhotoLibrary } ,
                            { id : 'voice'   , icon : MdMic } ,
                        ]}
                    />
                </Frame>
            </div>

            <Divider />

            {/* With labels */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">With labels</h3>

                <Frame>
                    <Fab
                        label    = "F"
                        color    = "success"
                        position = "absolute"
                        actions  =
                        {[
                            { id : 'a' , text : 'A' , label : 'Label A' } ,
                            { id : 'b' , text : 'B' , label : 'Label B' } ,
                            { id : 'c' , text : 'C' , label : 'Label C' } ,
                        ]}
                    />
                </Frame>
            </div>

            <Divider />

            {/* Rectangle buttons */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">Rectangle buttons</h3>

                <Frame>
                    <Fab
                        label    = "F"
                        color    = "success"
                        position = "absolute"
                        actions  =
                        {[
                            { id : 'a' , text : 'Button A' , circle : false } ,
                            { id : 'b' , text : 'Button B' , circle : false } ,
                            { id : 'c' , text : 'Button C' , circle : false } ,
                        ]}
                    />
                </Frame>
            </div>

            <Divider />

            {/* With close button */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">With close button</h3>

                <Frame>
                    <Fab
                        label       = "F"
                        color       = "info"
                        position    = "absolute"
                        closeButton = {{ text : '✕' , color : 'error' , label : 'Close' }}
                        actions     =
                        {[
                            { id : 'a' , text : 'A' , label : 'Label A' } ,
                            { id : 'b' , text : 'B' , label : 'Label B' } ,
                            { id : 'c' , text : 'C' , label : 'Label C' } ,
                        ]}
                    />
                </Frame>
            </div>

            <Divider />

            {/* With main action */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">With main action</h3>

                <Frame>
                    <Fab
                        label      = "F"
                        color      = "primary"
                        position   = "absolute"
                        mainAction = {{ text : 'M' , color : 'secondary' , label : 'Main Action' }}
                        actions    =
                        {[
                            { id : 'a' , text : 'A' , label : 'Label A' } ,
                            { id : 'b' , text : 'B' , label : 'Label B' } ,
                            { id : 'c' , text : 'C' , label : 'Label C' } ,
                        ]}
                    />
                </Frame>
            </div>

            <Divider />

            {/* Single FAB */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">Single FAB</h3>

                <Frame>
                    <Fab label="F" color="primary" position="absolute" />
                </Frame>
            </div>

            <Divider />

            {/* Flower + main action */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">Flower (quarter circle)</h3>

                <Frame>
                    <Fab
                        label      = "F"
                        color      = "success"
                        flower
                        position   = "absolute"
                        mainAction = {{ text : 'M' }}
                        actions    =
                        {[
                            { id : 'a' , text : 'A' } ,
                            { id : 'b' , text : 'B' } ,
                            { id : 'c' , text : 'C' } ,
                            { id : 'd' , text : 'D' } ,
                        ]}
                    />
                </Frame>
            </div>

            <Divider />

            {/* Flower with icons + tooltips */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">Flower with icons & tooltips</h3>

                <Frame>
                    <Fab
                        icon       = { MdAdd }
                        flower
                        position   = "absolute"
                        mainAction = {{ icon : MdEdit , color : 'primary' }}
                        actions    =
                        {[
                            { id : 'cam'     , icon : MdPhotoCamera  , label : 'Camera'  , tooltipPosition : 'left' } ,
                            { id : 'poll'    , icon : MdPoll         , label : 'Poll'    , tooltipPosition : 'left' } ,
                            { id : 'gallery' , icon : MdPhotoLibrary , label : 'Gallery' } ,
                            { id : 'voice'   , icon : MdMic          , label : 'Voice'   } ,
                        ]}
                    />
                </Frame>
            </div>

        </Container>
    ) ;
} ;

export default FabDemo ;

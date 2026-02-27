'use client' ;

import Flex from '@/components/layouts/Flex' ;

const DemoBox = ({ children, className = '' }) => (
    <div className={ `bg-primary/20 border-2 border-primary rounded-lg p-4 text-center font-semibold ${className}` }>
        { children }
    </div>
) ;

const FlexDemo = () =>
(
    <div className="flex flex-col gap-8">
        {/* Direction Variants */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Flex Direction</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Row */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Row (default)</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" gap={2}>
                            <DemoBox>1</DemoBox>
                            <DemoBox>2</DemoBox>
                            <DemoBox>3</DemoBox>
                        </Flex>
                    </div>

                    {/* Row Reverse */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Row Reverse</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" direction="row-reverse" gap={2}>
                            <DemoBox>1</DemoBox>
                            <DemoBox>2</DemoBox>
                            <DemoBox>3</DemoBox>
                        </Flex>
                    </div>

                    {/* Column */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Column</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" direction="col" gap={2}>
                            <DemoBox>1</DemoBox>
                            <DemoBox>2</DemoBox>
                            <DemoBox>3</DemoBox>
                        </Flex>
                    </div>

                    {/* Column Reverse */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Column Reverse</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" direction="col-reverse" gap={2}>
                            <DemoBox>1</DemoBox>
                            <DemoBox>2</DemoBox>
                            <DemoBox>3</DemoBox>
                        </Flex>
                    </div>
                </div>
            </div>
        </div>

        {/* Alignment */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Alignment</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Justify Content */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Justify Content - Center</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" gap={2} justifyContent="center">
                            <DemoBox>1</DemoBox>
                            <DemoBox>2</DemoBox>
                            <DemoBox>3</DemoBox>
                        </Flex>
                    </div>

                    {/* Space Between */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Justify Content - Between</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" gap={2} justifyContent="between">
                            <DemoBox>1</DemoBox>
                            <DemoBox>2</DemoBox>
                            <DemoBox>3</DemoBox>
                        </Flex>
                    </div>

                    {/* Align Items */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Align Items - Center</h3>
                        <Flex alignItems="center" className="bg-base-300 rounded-lg p-4 min-h-32" gap={2}>
                            <DemoBox>1</DemoBox>
                            <DemoBox className="py-8">2</DemoBox>
                            <DemoBox>3</DemoBox>
                        </Flex>
                    </div>

                    {/* Stretch */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Align Items - Stretch</h3>
                        <Flex alignItems="stretch" className="bg-base-300 rounded-lg p-4 min-h-32" gap={2}>
                            <DemoBox className="flex items-center justify-center">1</DemoBox>
                            <DemoBox className="flex items-center justify-center py-8">2</DemoBox>
                            <DemoBox className="flex items-center justify-center">3</DemoBox>
                        </Flex>
                    </div>
                </div>
            </div>
        </div>

        {/* Wrapping & Gaps */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Wrapping & Spacing</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Wrap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Flex Wrap</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" gap={2} wrap>
                            <DemoBox className="min-w-24">1</DemoBox>
                            <DemoBox className="min-w-24">2</DemoBox>
                            <DemoBox className="min-w-24">3</DemoBox>
                            <DemoBox className="min-w-24">4</DemoBox>
                            <DemoBox className="min-w-24">5</DemoBox>
                            <DemoBox className="min-w-24">6</DemoBox>
                        </Flex>
                    </div>

                    {/* Large Gap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Large Gap (gap=6)</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" gap={6}>
                            <DemoBox>1</DemoBox>
                            <DemoBox>2</DemoBox>
                            <DemoBox>3</DemoBox>
                        </Flex>
                    </div>

                    {/* Gap X/Y */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Gap X & Y Different</h3>
                        <Flex className="bg-base-300 rounded-lg p-4" gapX={4} gapY={2} wrap>
                            <DemoBox>1</DemoBox>
                            <DemoBox>2</DemoBox>
                            <DemoBox>3</DemoBox>
                            <DemoBox>4</DemoBox>
                        </Flex>
                    </div>

                    {/* Complex Layout */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Complex: Center + Padding</h3>
                        <Flex
                            alignItems     = "center"
                            className      = "bg-base-300 rounded-lg"
                            gap            = {3}
                            justifyContent = "center"
                            padding        = {6}
                        >
                            <DemoBox>A</DemoBox>
                            <DemoBox>B</DemoBox>
                            <DemoBox>C</DemoBox>
                        </Flex>
                    </div>
                </div>
            </div>
        </div>

        {/* Custom Component */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Custom Component (as prop)</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Flex as Section</h3>
                        <Flex
                            alignItems     = "center"
                            as             = "section"
                            className      = "bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-dashed border-primary/30"
                            gap            = {4}
                            justifyContent = "between"
                            padding        = {6}
                        >
                            <DemoBox className="bg-secondary/20 border-secondary">Header</DemoBox>
                            <DemoBox className="bg-accent/20 border-accent grow">Content</DemoBox>
                            <DemoBox className="bg-secondary/20 border-secondary">Footer</DemoBox>
                        </Flex>
                    </div>
                </div>
            </div>
        </div>
    </div>
) ;

export default FlexDemo ;
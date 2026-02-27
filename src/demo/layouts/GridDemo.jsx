'use client' ;

import Grid from '@/components/layouts/Grid' ;

const GridBox = ({ children, className = '' }) => (
    <div className={ `bg-secondary/20 border-2 border-secondary rounded-lg p-4 text-center font-semibold ${className}` }>
        { children }
    </div>
) ;

const GridDemo = () =>
(
    <div className="flex flex-col gap-8">
        {/* Basic Columns */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Grid Columns</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* 2 Columns */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">2 Columns</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={2} gap={3}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                        </Grid>
                    </div>

                    {/* 3 Columns */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">3 Columns</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={3} gap={3}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                            <GridBox>5</GridBox>
                            <GridBox>6</GridBox>
                        </Grid>
                    </div>

                    {/* 4 Columns */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">4 Columns</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={4} gap={3}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                            <GridBox>5</GridBox>
                            <GridBox>6</GridBox>
                            <GridBox>7</GridBox>
                            <GridBox>8</GridBox>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

        {/* Rows & Cols */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Grid Rows & Columns</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Explicit Grid */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">2 Rows × 2 Cols</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={2} gap={3} rows={2}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                        </Grid>
                    </div>

                    {/* 3x3 Grid */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">3 Rows × 3 Cols</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={3} gap={2} rows={3}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                            <GridBox>5</GridBox>
                            <GridBox>6</GridBox>
                            <GridBox>7</GridBox>
                            <GridBox>8</GridBox>
                            <GridBox>9</GridBox>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

        {/* Auto Flow */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Grid Flow</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Flow Row (default) */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Flow Row (default)</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={3} gap={2}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                            <GridBox>5</GridBox>
                        </Grid>
                    </div>

                    {/* Flow Column */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Flow Column</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" flow="col" gap={2} rows={3}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                            <GridBox>5</GridBox>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

        {/* Alignment */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Grid Alignment</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Center Items */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Place Items - Center</h3>
                        <Grid className="bg-base-300 rounded-lg p-4 min-h-48" cols={2} gap={3} placeItems="center">
                            <GridBox className="w-16 h-16 flex items-center justify-center">1</GridBox>
                            <GridBox className="w-16 h-16 flex items-center justify-center">2</GridBox>
                            <GridBox className="w-16 h-16 flex items-center justify-center">3</GridBox>
                            <GridBox className="w-16 h-16 flex items-center justify-center">4</GridBox>
                        </Grid>
                    </div>

                    {/* Stretch (default) */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Align Items - Stretch</h3>
                        <Grid alignItems="stretch" className="bg-base-300 rounded-lg p-4" cols={2} gap={3}>
                            <GridBox className="flex items-center justify-center">1</GridBox>
                            <GridBox className="flex items-center justify-center py-12">2</GridBox>
                            <GridBox className="flex items-center justify-center">3</GridBox>
                            <GridBox className="flex items-center justify-center">4</GridBox>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>

        {/* Gap Variations */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Gap Variations</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* No Gap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">No Gap</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={3}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                            <GridBox>5</GridBox>
                            <GridBox>6</GridBox>
                        </Grid>
                    </div>

                    {/* Large Gap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Large Gap (gap=6)</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={3} gap={6}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                            <GridBox>5</GridBox>
                            <GridBox>6</GridBox>
                        </Grid>
                    </div>

                    {/* Different X/Y Gap */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Gap X=6, Y=2</h3>
                        <Grid className="bg-base-300 rounded-lg p-4" cols={3} gapX={6} gapY={2}>
                            <GridBox>1</GridBox>
                            <GridBox>2</GridBox>
                            <GridBox>3</GridBox>
                            <GridBox>4</GridBox>
                            <GridBox>5</GridBox>
                            <GridBox>6</GridBox>
                        </Grid>
                    </div>

                    {/* Complex Layout */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Complex: Center + Padding</h3>
                        <Grid
                            className   = "bg-base-300 rounded-lg"
                            cols        = {2}
                            gap         = {4}
                            padding     = {6}
                            placeItems  = "center"
                        >
                            <GridBox className="w-20 h-20 flex items-center justify-center">A</GridBox>
                            <GridBox className="w-20 h-20 flex items-center justify-center">B</GridBox>
                            <GridBox className="w-20 h-20 flex items-center justify-center">C</GridBox>
                            <GridBox className="w-20 h-20 flex items-center justify-center">D</GridBox>
                        </Grid>
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
                        <h3 className="text-sm font-semibold opacity-70 uppercase">Grid as Article</h3>
                        <Grid
                            as        = "article"
                            className = "bg-linear-to-br from-accent/10 to-info/10 rounded-lg border-2 border-dashed border-accent/30"
                            cols      = {3}
                            gap       = {4}
                            padding   = {6}
                        >
                            <GridBox className="bg-info/20 border-info">Header</GridBox>
                            <GridBox className="bg-accent/20 border-accent col-span-2">Main Content</GridBox>
                            <GridBox className="bg-warning/20 border-warning">Sidebar</GridBox>
                            <GridBox className="bg-success/20 border-success col-span-2">Article</GridBox>
                            <GridBox className="bg-info/20 border-info col-span-3">Footer</GridBox>
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    </div>
) ;

export default GridDemo ;
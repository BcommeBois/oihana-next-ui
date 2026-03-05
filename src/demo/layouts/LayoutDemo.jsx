'use client' ;

import Layout, { FLEX, GRID, MASONRY, NONE } from '@/components/layouts/Layout' ;

const DemoItem = ({ children, className = '' }) => (
    <div className={ `bg-accent/20 border-2 border-accent rounded-lg p-4 text-center font-semibold ${className}` }>
        { children }
    </div>
) ;

const LayoutDemo = () =>
(
    <div className="flex flex-col gap-8">

        { /* Display Modes */ }

        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Display Modes</h2>
                <div className="grid grid-cols-1 gap-6">

                    { /* Flex Mode (default) */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Flex Mode (default)
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            display   = { FLEX }
                            gap       = { 3 }
                        >
                            <DemoItem>Item 1</DemoItem>
                            <DemoItem>Item 2</DemoItem>
                            <DemoItem>Item 3</DemoItem>
                            <DemoItem>Item 4</DemoItem>
                        </Layout>
                    </div>

                    { /* Grid Mode */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Grid Mode
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            cols      = { 3 }
                            display   = { GRID }
                            gap       = { 3 }
                        >
                            <DemoItem>Cell 1</DemoItem>
                            <DemoItem>Cell 2</DemoItem>
                            <DemoItem>Cell 3</DemoItem>
                            <DemoItem>Cell 4</DemoItem>
                            <DemoItem>Cell 5</DemoItem>
                            <DemoItem>Cell 6</DemoItem>
                        </Layout>
                    </div>

                    { /* Masonry Mode */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Masonry Mode
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = { 3 }
                            display   = { MASONRY }
                            gap       = { 3 }
                        >
                            <DemoItem>Tile 1</DemoItem>
                            <DemoItem className="py-10">Tile 2 (tall)</DemoItem>
                            <DemoItem>Tile 3</DemoItem>
                            <DemoItem className="py-6">Tile 4</DemoItem>
                            <DemoItem>Tile 5</DemoItem>
                            <DemoItem className="py-12">Tile 6 (taller)</DemoItem>
                        </Layout>
                    </div>

                    { /* None Mode */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            None Mode (plain div)
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            display   = { NONE }
                        >
                            <div className="space-y-2">
                                <DemoItem>Plain content 1</DemoItem>
                                <DemoItem>Plain content 2</DemoItem>
                                <DemoItem>Plain content 3</DemoItem>
                            </div>
                        </Layout>
                    </div>

                </div>
            </div>
        </div>

        { /* Flex Layouts */ }

        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Flex Layouts</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    { /* Horizontal with wrap */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Horizontal with Wrap
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            gap       = { 2 }
                            wrap
                        >
                            <DemoItem className="min-w-24">1</DemoItem>
                            <DemoItem className="min-w-24">2</DemoItem>
                            <DemoItem className="min-w-24">3</DemoItem>
                            <DemoItem className="min-w-24">4</DemoItem>
                            <DemoItem className="min-w-24">5</DemoItem>
                        </Layout>
                    </div>

                    { /* Vertical */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Vertical Column
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            direction = "col"
                            gap       = { 2 }
                        >
                            <DemoItem>Top</DemoItem>
                            <DemoItem>Middle</DemoItem>
                            <DemoItem>Bottom</DemoItem>
                        </Layout>
                    </div>

                    { /* Centered */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Centered Content
                        </h3>
                        <Layout
                            alignItems     = "center"
                            className      = "bg-base-300 rounded-lg p-4 min-h-32"
                            gap            = { 3 }
                            justifyContent = "center"
                        >
                            <DemoItem>A</DemoItem>
                            <DemoItem>B</DemoItem>
                            <DemoItem>C</DemoItem>
                        </Layout>
                    </div>

                    { /* Space Between */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Space Between
                        </h3>
                        <Layout
                            className      = "bg-base-300 rounded-lg p-4"
                            gap            = { 2 }
                            justifyContent = "between"
                        >
                            <DemoItem>Start</DemoItem>
                            <DemoItem>Middle</DemoItem>
                            <DemoItem>End</DemoItem>
                        </Layout>
                    </div>

                </div>
            </div>
        </div>

        { /* Grid Layouts */ }

        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Grid Layouts</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    { /* 2 Columns */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            2 Columns Grid
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            cols      = { 2 }
                            display   = { GRID }
                            gap       = { 3 }
                        >
                            <DemoItem>1</DemoItem>
                            <DemoItem>2</DemoItem>
                            <DemoItem>3</DemoItem>
                            <DemoItem>4</DemoItem>
                        </Layout>
                    </div>

                    { /* 4 Columns */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            4 Columns Grid
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            cols      = { 4 }
                            display   = { GRID }
                            gap       = { 2 }
                        >
                            <DemoItem>1</DemoItem>
                            <DemoItem>2</DemoItem>
                            <DemoItem>3</DemoItem>
                            <DemoItem>4</DemoItem>
                            <DemoItem>5</DemoItem>
                            <DemoItem>6</DemoItem>
                            <DemoItem>7</DemoItem>
                            <DemoItem>8</DemoItem>
                        </Layout>
                    </div>

                    { /* Rows and Columns */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            3×2 Grid (Rows × Cols)
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            cols      = { 3 }
                            display   = { GRID }
                            gap       = { 3 }
                            rows      = { 2 }
                        >
                            <DemoItem>1</DemoItem>
                            <DemoItem>2</DemoItem>
                            <DemoItem>3</DemoItem>
                            <DemoItem>4</DemoItem>
                            <DemoItem>5</DemoItem>
                            <DemoItem>6</DemoItem>
                        </Layout>
                    </div>

                    { /* Centered Grid */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Centered Grid Items
                        </h3>
                        <Layout
                            className  = "bg-base-300 rounded-lg p-4 min-h-32"
                            cols       = { 2 }
                            display    = { GRID }
                            gap        = { 3 }
                            placeItems = "center"
                        >
                            <DemoItem className="w-20 h-20 flex items-center justify-center">A</DemoItem>
                            <DemoItem className="w-20 h-20 flex items-center justify-center">B</DemoItem>
                            <DemoItem className="w-20 h-20 flex items-center justify-center">C</DemoItem>
                            <DemoItem className="w-20 h-20 flex items-center justify-center">D</DemoItem>
                        </Layout>
                    </div>

                </div>
            </div>
        </div>

        { /* Masonry Layouts */ }

        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Masonry Layouts</h2>
                <div className="grid grid-cols-1 gap-6">

                    { /* Fixed columns */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            3 Columns — variable heights
                        </h3>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = { 3 }
                            display   = { MASONRY }
                            gap       = { 3 }
                        >
                            <DemoItem>Short</DemoItem>
                            <DemoItem className="py-10">Tall</DemoItem>
                            <DemoItem>Short</DemoItem>
                            <DemoItem className="py-6">Medium</DemoItem>
                            <DemoItem>Short</DemoItem>
                            <DemoItem className="py-14">Very tall</DemoItem>
                            <DemoItem className="py-4">Medium</DemoItem>
                            <DemoItem>Short</DemoItem>
                            <DemoItem className="py-8">Tall</DemoItem>
                        </Layout>
                    </div>

                    { /* Responsive columns */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Responsive (1 → 2 → 3 → 4 columns)
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Redimensionner la fenêtre pour voir les colonnes s'ajuster
                        </p>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = { { xs: 1, sm: 2, lg: 3, xl: 4 } }
                            display   = { MASONRY }
                            gap       = { 4 }
                        >
                            <DemoItem>Item 1</DemoItem>
                            <DemoItem className="py-8">Item 2 (tall)</DemoItem>
                            <DemoItem>Item 3</DemoItem>
                            <DemoItem className="py-5">Item 4</DemoItem>
                            <DemoItem className="py-12">Item 5 (very tall)</DemoItem>
                            <DemoItem>Item 6</DemoItem>
                            <DemoItem className="py-6">Item 7</DemoItem>
                            <DemoItem>Item 8</DemoItem>
                        </Layout>
                    </div>

                    { /* columnClassName */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            columnClassName — style par colonne
                        </h3>
                        <Layout
                            className       = "bg-base-300 rounded-lg p-4"
                            columnClassName = "bg-base-200 rounded-lg p-2"
                            columns         = { { xs: 1, md: 2, xl: 3 } }
                            display         = { MASONRY }
                            gap             = { 4 }
                        >
                            <DemoItem>A</DemoItem>
                            <DemoItem className="py-10">B (tall)</DemoItem>
                            <DemoItem>C</DemoItem>
                            <DemoItem className="py-6">D</DemoItem>
                            <DemoItem>E</DemoItem>
                            <DemoItem className="py-8">F</DemoItem>
                        </Layout>
                    </div>

                    { /* Masonry vs Grid comparison */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Comparaison Masonry vs Grid — mêmes items, hauteurs variables
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-base-content/60 font-mono">display="grid" — hauteurs uniformisées</p>
                                <Layout
                                    className = "bg-warning/10 border border-warning/30 rounded-lg p-3"
                                    cols      = { 2 }
                                    display   = { GRID }
                                    gap       = { 3 }
                                >
                                    <DemoItem>Short</DemoItem>
                                    <DemoItem className="py-10">Tall</DemoItem>
                                    <DemoItem className="py-6">Medium</DemoItem>
                                    <DemoItem>Short</DemoItem>
                                </Layout>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-xs text-base-content/60 font-mono">display="masonry" — hauteurs naturelles</p>
                                <Layout
                                    className = "bg-success/10 border border-success/30 rounded-lg p-3"
                                    columns   = { 2 }
                                    display   = { MASONRY }
                                    gap       = { 3 }
                                >
                                    <DemoItem>Short</DemoItem>
                                    <DemoItem className="py-10">Tall</DemoItem>
                                    <DemoItem className="py-6">Medium</DemoItem>
                                    <DemoItem>Short</DemoItem>
                                </Layout>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

        { /* Responsive Layouts */ }

        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Responsive Layouts</h2>
                <div className="grid grid-cols-1 gap-6">

                    { /* Responsive Grid */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Responsive Grid (1 → 2 → 3 → 4 columns)
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Try resizing your browser: 1 col on mobile, 2 on tablet, 3 on desktop, 4 on xl screens
                        </p>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            columns   = { { xs: 1, sm: 2, lg: 3, xl: 4 } }
                            display   = { GRID }
                            gap       = { { xs: 2, md: 3, xl: 4 } }
                        >
                            <DemoItem>01</DemoItem>
                            <DemoItem>02</DemoItem>
                            <DemoItem>03</DemoItem>
                            <DemoItem>04</DemoItem>
                            <DemoItem>05</DemoItem>
                            <DemoItem>06</DemoItem>
                            <DemoItem>07</DemoItem>
                            <DemoItem>08</DemoItem>
                        </Layout>
                    </div>

                    { /* Responsive Flex Direction */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Responsive Flex (Column → Row)
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Column on mobile, row on desktop
                        </p>
                        <Layout
                            className = "bg-base-300 rounded-lg p-4"
                            direction = { { xs: 'col', md: 'row' } }
                            gap       = { { xs: 2, md: 4 } }
                        >
                            <DemoItem className="flex-1">Header</DemoItem>
                            <DemoItem className="flex-1">Content</DemoItem>
                            <DemoItem className="flex-1">Footer</DemoItem>
                        </Layout>
                    </div>

                    { /* Responsive Spacing */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Responsive Gap & Padding
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Small spacing on mobile, larger on desktop
                        </p>
                        <Layout
                            className = "bg-base-300 rounded-lg"
                            cols      = { { xs: 2, lg: 3 } }
                            display   = { GRID }
                            gap       = { { xs: 1, md: 3, lg: 6 } }
                            padding   = { { xs: 2, md: 4, lg: 8 } }
                        >
                            <DemoItem>1</DemoItem>
                            <DemoItem>2</DemoItem>
                            <DemoItem>3</DemoItem>
                            <DemoItem>4</DemoItem>
                            <DemoItem>5</DemoItem>
                            <DemoItem>6</DemoItem>
                        </Layout>
                    </div>

                </div>
            </div>
        </div>

        { /* Advanced Examples */ }

        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Advanced Examples</h2>
                <div className="grid grid-cols-1 gap-6">

                    { /* Complex Dashboard Layout */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Dashboard Layout
                        </h3>
                        <Layout
                            as        = "section"
                            className = "bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border-2 border-dashed border-primary/30"
                            cols      = { 4 }
                            display   = { GRID }
                            gap       = { 4 }
                            padding   = { 6 }
                        >
                            <DemoItem className="col-span-4 bg-info/20 border-info">
                                Header
                            </DemoItem>
                            <DemoItem className="col-span-1 row-span-2 bg-warning/20 border-warning">
                                Sidebar
                            </DemoItem>
                            <DemoItem className="col-span-3 row-span-2 bg-success/20 border-success">
                                Main Content
                            </DemoItem>
                            <DemoItem className="col-span-4 bg-info/20 border-info">
                                Footer
                            </DemoItem>
                        </Layout>
                    </div>

                    { /* Card Grid */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Card Grid with Custom Styling
                        </h3>
                        <Layout
                            className = "*:bg-base-300 *:shadow *:rounded-lg *:p-4"
                            cols      = { { xs: 1, sm: 2, md: 3 } }
                            display   = { GRID }
                            gap       = { 4 }
                        >
                            <div className="card">
                                <h4 className="font-bold">Card 1</h4>
                                <p className="text-sm opacity-70">Content here</p>
                            </div>
                            <div className="card">
                                <h4 className="font-bold">Card 2</h4>
                                <p className="text-sm opacity-70">Content here</p>
                            </div>
                            <div className="card">
                                <h4 className="font-bold">Card 3</h4>
                                <p className="text-sm opacity-70">Content here</p>
                            </div>
                        </Layout>
                    </div>

                    { /* Auto-fit Grid */ }

                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Auto-fit Grid (Responsive without breakpoints)
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Using autoCols for automatic responsive layout
                        </p>
                        <Layout
                            autoCols  = "minmax(200px, 1fr)"
                            className = "bg-base-300 rounded-lg p-4"
                            display   = { GRID }
                            flow      = "col"
                            gap       = { 3 }
                        >
                            <DemoItem>Auto 1</DemoItem>
                            <DemoItem className="py-12">Auto 2<br/>(taller)</DemoItem>
                            <DemoItem>Auto 3</DemoItem>
                            <DemoItem>Auto 4</DemoItem>
                            <DemoItem className="py-8">Auto 5</DemoItem>
                        </Layout>
                    </div>

                </div>
            </div>
        </div>

    </div>
) ;

export default LayoutDemo ;
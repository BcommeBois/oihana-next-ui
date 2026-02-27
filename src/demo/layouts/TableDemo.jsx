'use client' ;

import Avatar from '@/components/avatars/Avatar' ;
import Checkbox from '@/components/checkboxes/Checkbox' ;
import Table from '@/components/layouts/Table' ;

const sampleData =
[
    { id: 1 , name: 'Cy Ganderton' , job: 'Quality Control Specialist' , color: 'Blue'   } ,
    { id: 2 , name: 'Hart Hagerty' , job: 'Desktop Support Technician' , color: 'Purple' } ,
    { id: 3 , name: 'Brice Swyre'  , job: 'Tax Accountant'             , color: 'Red'    } ,
] ;

const largeSampleData = Array.from({ length: 20 }, ( _, i ) => ({
    id       : i + 1 ,
    name     : `Person ${i + 1}` ,
    job      : `Job ${i + 1}` ,
    company  : `Company ${i + 1}` ,
    location : `Location ${i + 1}` ,
    date     : `01/${(i % 12) + 1}/2024` ,
    color    : [ 'Blue', 'Red', 'Green', 'Purple', 'Yellow' ][ i % 5 ] ,
})) ;

const TableDemo = () =>
(
    <div className="flex flex-col gap-8">
        {/* Basic Table */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Basic Table</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Simple */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Simple Table
                        </h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                { sampleData.map( row => (
                                    <tr key={ row.id }>
                                        <th>{ row.id }</th>
                                        <td>{ row.name }</td>
                                        <td>{ row.job }</td>
                                        <td>{ row.color }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    {/* With Border and Background */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            With Border and Background
                        </h3>
                        <Table containerClassName="rounded-box border border-base-content/5 bg-base-100">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                { sampleData.map( row => (
                                    <tr key={ row.id }>
                                        <th>{ row.id }</th>
                                        <td>{ row.name }</td>
                                        <td>{ row.job }</td>
                                        <td>{ row.color }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

        {/* Row States */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Row States</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Row */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            With Active Row
                        </h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-base-200">
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    {/* Hover Row */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Hover Highlight
                        </h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                </tr>
                                <tr className="hover:bg-base-300">
                                    <th>2</th>
                                    <td>Hart Hagerty (hover me)</td>
                                    <td>Desktop Support Technician</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

        {/* Zebra Striping */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Zebra Striping</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Zebra Stripes
                        </h3>
                        <Table zebra>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                { sampleData.map( row => (
                                    <tr key={ row.id }>
                                        <th>{ row.id }</th>
                                        <td>{ row.name }</td>
                                        <td>{ row.job }</td>
                                        <td>{ row.color }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

        {/* Sizes */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Table Sizes</h2>
                <div className="grid grid-cols-1 gap-6">
                    {/* Extra Small */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Extra Small (xs)
                        </h3>
                        <Table size="xs" zebra>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Company</th>
                                    <th>Location</th>
                                    <th>Date</th>
                                    <th>Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                { largeSampleData.slice( 0 , 5 ).map( row => (
                                    <tr key={ row.id }>
                                        <th>{ row.id }</th>
                                        <td>{ row.name }</td>
                                        <td>{ row.job }</td>
                                        <td>{ row.company }</td>
                                        <td>{ row.location }</td>
                                        <td>{ row.date }</td>
                                        <td>{ row.color }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    {/* Small */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Small (sm)
                        </h3>
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                { sampleData.map( row => (
                                    <tr key={ row.id }>
                                        <th>{ row.id }</th>
                                        <td>{ row.name }</td>
                                        <td>{ row.job }</td>
                                        <td>{ row.color }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    {/* Large */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Large (lg)
                        </h3>
                        <Table size="lg">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                { sampleData.map( row => (
                                    <tr key={ row.id }>
                                        <th>{ row.id }</th>
                                        <td>{ row.name }</td>
                                        <td>{ row.job }</td>
                                        <td>{ row.color }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

        {/* Pinned Rows */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Pinned Rows (Sticky Header/Footer)</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Scrollable with Pinned Headers
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Scroll to see sticky headers
                        </p>
                        <Table
                            containerClassName="h-96 bg-base-200"
                            pinRows
                            size="sm"
                        >
                            <thead>
                                <tr><th>Heroes - A</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Ant-Man</td></tr>
                                <tr><td>Aquaman</td></tr>
                                <tr><td>Asterix</td></tr>
                            </tbody>
                            <thead>
                                <tr><th>Heroes - B</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Batman</td></tr>
                                <tr><td>Black Panther</td></tr>
                            </tbody>
                            <thead>
                                <tr><th>Heroes - C</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Captain America</td></tr>
                                <tr><td>Captain Marvel</td></tr>
                            </tbody>
                            <thead>
                                <tr><th>Heroes - D</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Daredevil</td></tr>
                                <tr><td>Doctor Strange</td></tr>
                            </tbody>
                            <thead>
                                <tr><th>Heroes - S</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Spider-Man</td></tr>
                                <tr><td>Superman</td></tr>
                            </tbody>
                            <thead>
                                <tr><th>Heroes - T</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Thor</td></tr>
                            </tbody>
                            <thead>
                                <tr><th>Heroes - W</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>Wolverine</td></tr>
                                <tr><td>Wonder Woman</td></tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

        {/* Pinned Rows and Cols */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Pinned Rows & Columns</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Sticky Header and First/Last Columns
                        </h3>
                        <p className="text-xs text-base-content/60 mb-2">
                            Scroll horizontally and vertically to see sticky elements
                        </p>
                        <Table
                            containerClassName="h-96 w-full max-w-4xl"
                            pinCols
                            pinRows
                            size="xs"
                        >
                            <thead>
                                <tr>
                                    <th></th>
                                    <td>Name</td>
                                    <td>Job</td>
                                    <td>Company</td>
                                    <td>Location</td>
                                    <td>Date</td>
                                    <td>Color</td>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { largeSampleData.map( row => (
                                    <tr key={ row.id }>
                                        <th>{ row.id }</th>
                                        <td>{ row.name }</td>
                                        <td>{ row.job }</td>
                                        <td>{ row.company }</td>
                                        <td>{ row.location }</td>
                                        <td>{ row.date }</td>
                                        <td>{ row.color }</td>
                                        <th>{ row.id }</th>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <td>Name</td>
                                    <td>Job</td>
                                    <td>Company</td>
                                    <td>Location</td>
                                    <td>Date</td>
                                    <td>Color</td>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

        {/* With Visual Elements */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">With Visual Elements</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Checkboxes, Avatars, Badges, and Buttons
                        </h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        <Checkbox />
                                    </th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { sampleData.map( row => (
                                    <tr key={ row.id }>
                                        <th>
                                            <Checkbox />
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    innerClassName="bg-neutral text-neutral-content w-12 rounded-full"
                                                    placeholder
                                                >
                                                    <span className="text-xl">
                                                        { row.name.charAt( 0 ) }
                                                    </span>
                                                </Avatar>
                                                <div>
                                                    <div className="font-bold">{ row.name }</div>
                                                    <div className="text-sm opacity-50">United States</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            { row.job }
                                            <br />
                                            <span className="badge badge-ghost badge-sm">Department</span>
                                        </td>
                                        <td>{ row.color }</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>

        {/* With Online Indicators */}
        <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">With Status Indicators</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-semibold opacity-70 uppercase">
                            Avatars with Online/Offline Status
                        </h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                indicator="online"
                                                innerClassName="w-12 rounded-full bg-primary text-primary-content"
                                                placeholder
                                            >
                                                <span className="text-xl">C</span>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold">Cy Ganderton</div>
                                                <div className="text-sm opacity-50">cy@example.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-success badge-sm">Online</span>
                                    </td>
                                    <td>Quality Control</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                indicator="offline"
                                                innerClassName="w-12 rounded-full bg-secondary text-secondary-content"
                                                placeholder
                                            >
                                                <span className="text-xl">H</span>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold">Hart Hagerty</div>
                                                <div className="text-sm opacity-50">hart@example.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm">Offline</span>
                                    </td>
                                    <td>Desktop Support</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                indicator="online"
                                                innerClassName="w-12 rounded-full bg-accent text-accent-content"
                                                placeholder
                                            >
                                                <span className="text-xl">B</span>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold">Brice Swyre</div>
                                                <div className="text-sm opacity-50">brice@example.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-success badge-sm">Online</span>
                                    </td>
                                    <td>Tax Accountant</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
) ;

export default TableDemo ;
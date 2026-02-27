'use client' ;

import { useState } from 'react' ;

import Avatar     from '@/components/avatars/Avatar' ;
import Badge      from '@/components/Badge' ;
import Button     from '@/components/Button' ;
import Divider    from '@/components/Divider' ;
import List       from '@/components/lists/List' ;
import ListRow    from '@/components/lists/ListRow' ;
import Pagination from '@/components/paginations/Pagination' ;

import Container from '@/display/Container' ;

import {
    MdCheckCircle ,
    MdDelete ,
    MdEdit ,
    MdFavorite ,
    MdPlayArrow ,
    MdShare ,
    MdStar ,
} from 'react-icons/md' ;

const ListDemo = () =>
{
// --------- Basic list with avatars (Updated to i.pravatar.cc)

    const songs =
        [
            { id : 1 , title : 'Dio Lupa'         , artist : 'Remaining Reason' , image : 'https://i.pravatar.cc/150?u=1' } ,
            { id : 2 , title : 'Ellie Beilish'    , artist : 'Bears of a fever' , image : 'https://i.pravatar.cc/150?u=2' } ,
            { id : 3 , title : 'Sabrino Gardener' , artist : 'Cappuccino'       , image : 'https://i.pravatar.cc/150?u=3' } ,
        ] ;

    // --------- Selectable list

    const [ selectedSongs , setSelectedSongs ] = useState( [] ) ;

    const toggleSong = ( songId ) =>
    {
        setSelectedSongs( prev =>
            prev.includes( songId )
                ? prev.filter( id => id !== songId )
                : [ ...prev , songId ]
        ) ;
    } ;

    const selectAll = () =>
    {
        setSelectedSongs( songs.map( s => s.id ) ) ;
    } ;

    const deselectAll = () =>
    {
        setSelectedSongs( [] ) ;
    } ;

    // --------- List with numbers (Updated to i.pravatar.cc)

    const topTracks =
    [
        { id : 1 , rank : '01' , title : 'Dio Lupa'         , artist : 'Remaining Reason' , image : 'https://i.pravatar.cc/150?u=11' } ,
        { id : 2 , rank : '02' , title : 'Ellie Beilish'    , artist : 'Bears of a fever' , image : 'https://i.pravatar.cc/150?u=12' } ,
        { id : 3 , rank : '03' , title : 'Sabrino Gardener' , artist : 'Cappuccino'       , image : 'https://i.pravatar.cc/150?u=13' } ,
    ] ;

    // --------- List with wrapped content (Updated to i.pravatar.cc)

    const songsWithDesc =
    [
        {
            id    : 1 ,
            title : 'Dio Lupa' ,
            artist: 'Remaining Reason' ,
            desc  : '"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth.' ,
            image : 'https://i.pravatar.cc/150?u=21' ,
        } ,
        {
            id    : 2 ,
            title : 'Ellie Beilish' ,
            artist: 'Bears of a fever' ,
            desc  : '"Bears of a Fever" captivated audiences with its intense energy and mysterious lyrics.' ,
            image : 'https://i.pravatar.cc/150?u=22' ,
        } ,
        {
            id    : 3 ,
            title : 'Sabrino Gardener' ,
            artist: 'Cappuccino' ,
            desc  : '"Cappuccino" quickly gained attention for its smooth melody and relatable themes.' ,
            image : 'https://i.pravatar.cc/150?u=23' ,
        } ,
    ] ;

    // --------- Clickable list

    const [ clickedItem , setClickedItem ] = useState( null ) ;

    // --------- Users list (Already used i.pravatar.cc)

    const users =
    [
        { id : 1 , name : 'Jane Cooper'   , email : 'jane@example.com'   , role : 'Admin'  , status : 'Active'   , image : 'https://i.pravatar.cc/150?u=jane' } ,
        { id : 2 , name : 'Wade Warren'   , email : 'wade@example.com'   , role : 'Editor' , status : 'Active'   , image : 'https://i.pravatar.cc/150?u=wade' } ,
        { id : 3 , name : 'Esther Howard' , email : 'esther@example.com' , role : 'Viewer' , status : 'Inactive' , image : 'https://i.pravatar.cc/150?u=esther' } ,
    ] ;

    // --------- Paginated List Example (Updated to i.pravatar.cc)

    const paginatedItems = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        title: `Item ${i + 1}`,
        artist: `Artist for item ${i + 1}`,
        image: `https://i.pravatar.cc/150?u=paginated-${i}`
    }));

    const [pageOffset, setPageOffset] = useState(0);
    const pageLimit = 5;

    const currentPageItems = paginatedItems.slice(pageOffset, pageOffset + pageLimit);

    const handlePageChange = (offset) => {
        setPageOffset(offset);
    };

    // --------- Render

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            {/* Basic List */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Basic List with Avatars
                </h3>

                <div className="w-full">
                    <List className="bg-base-100 rounded-box shadow-md ">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                            Most played songs this week
                        </li>

                        { songs.map( song => (
                            <ListRow
                                key={ song.id }
                                avatar={
                                    <Avatar innerClassName="w-10 h-10 rounded-box">
                                        <img src={ song.image } alt={ song.title } />
                                    </Avatar>
                                }
                                title={ song.title }
                                subtitle={ song.artist }
                                actions={[
                                    <Button key="play" size="sm" shape="square" color="ghost" icon={ MdPlayArrow } /> ,
                                    <Button key="like" size="sm" shape="square" color="ghost" icon={ MdFavorite } /> ,
                                ]}
                            />
                        ))}
                    </List>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;List className="bg-base-100 rounded-box shadow-md"&gt;</code></pre>
                    <pre data-prefix="2"><code>    &lt;ListRow</code></pre>
                    <pre data-prefix="3"><code>        avatar={'{ <Avatar>...</Avatar> }'}</code></pre>
                    <pre data-prefix="4"><code>        title="Song Title"</code></pre>
                    <pre data-prefix="5"><code>        subtitle="Artist Name"</code></pre>
                    <pre data-prefix="6"><code>        actions={'{ [<Button />, <Button />] }'}</code></pre>
                    <pre data-prefix="7"><code>    /&gt;</code></pre>
                    <pre data-prefix="8"><code>&lt;/List&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Selectable List */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-secondary pb-2">
                    Selectable List with Checkboxes
                </h3>

                <div className="flex gap-2 items-center">
                    <Badge color={ selectedSongs.length > 0 ? 'primary' : 'neutral' }>
                        { selectedSongs.length } selected
                    </Badge>

                    <Button size="sm" color="ghost" onClick={ selectAll }>
                        Select All
                    </Button>

                    <Button size="sm" color="ghost" onClick={ deselectAll }>
                        Deselect All
                    </Button>
                </div>

                <div className="w-full max-w-lg">
                    <List className="bg-base-100 rounded-box shadow-md p-2 gap-2">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                            Select songs to add to playlist
                        </li>

                        { songs.map( song => (
                            <ListRow
                                key={ song.id }
                                selectable
                                selected={ selectedSongs.includes( song.id ) }
                                onSelect={ () => toggleSong( song.id ) }
                                avatar={
                                    <Avatar innerClassName="w-10 h-10 rounded-box">
                                        <img src={ song.image } alt={ song.title } />
                                    </Avatar>
                                }
                                title={ song.title }
                                subtitle={ song.artist }
                                actions={
                                    <Button size="sm" shape="square" color="ghost" icon={ MdPlayArrow } />
                                }
                            />
                        ))}
                    </List>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;ListRow</code></pre>
                    <pre data-prefix="2"><code>    selectable</code></pre>
                    <pre data-prefix="3"><code>    selected={'{ isSelected }'}</code></pre>
                    <pre data-prefix="4"><code>    onSelect={'{ (checked) => setSelected(checked) }'}</code></pre>
                    <pre data-prefix="5"><code>    avatar={'{ <Avatar>...</Avatar> }'}</code></pre>
                    <pre data-prefix="6"><code>    title="Item title"</code></pre>
                    <pre data-prefix="7"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Paginated List Example */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    List with Pagination
                </h3>

                <div className="w-full max-w-lg flex flex-col gap-4">
                    {/* La Liste */}
                    <List className="bg-base-100 rounded-box shadow-md overflow-hidden">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide bg-base-200/50">
                            Displaying {pageOffset + 1} to {Math.min(pageOffset + pageLimit, paginatedItems.length)} of {paginatedItems.length} items
                        </li>

                        {currentPageItems.map(item => (
                            <ListRow
                                key={item.id}
                                avatar={
                                    <Avatar innerClassName="w-10 h-10 rounded-box">
                                        <img src={item.image} alt={item.title} />
                                    </Avatar>
                                }
                                title={item.title}
                                subtitle={item.artist}
                                actions={
                                    <Button size="sm" shape="square" color="ghost" icon={MdPlayArrow} />
                                }
                            />
                        ))}
                    </List>

                    {/* Le Composant Pagination */}
                    <div className="flex justify-center p-2 bg-base-100 rounded-box shadow-sm">
                        <Pagination
                            limit={pageLimit}
                            offset={pageOffset}
                            total={paginatedItems.length}
                            onChange={handlePageChange}
                            size="sm"
                            color="ghost"
                            activeColor="primary"
                        />
                    </div>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>{`// Example layout structure`}</code></pre>
                    <pre data-prefix="2"><code>{`<div className="flex flex-col gap-4">`}</code></pre>
                    <pre data-prefix="3"><code>{`    <List>...</List>`}</code></pre>
                    <pre data-prefix="4"><code>{`    <div className="flex justify-center">`}</code></pre>
                    <pre data-prefix="5"><code>{`        <Pagination ... />`}</code></pre>
                    <pre data-prefix="6"><code>{`    </div>`}</code></pre>
                    <pre data-prefix="7"><code>{`</div>`}</code></pre>
                </div>
            </div>

            <Divider />

            {/* List with Leading Numbers */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-accent pb-2">
                    List with Leading Numbers (Third Column Grows)
                </h3>

                <div className="w-full max-w-lg">
                    <List className="bg-base-100 rounded-box shadow-md">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                            Top tracks of the month
                        </li>

                        { topTracks.map( track => (
                            <ListRow
                                key={ track.id }
                                leading={
                                    <div className="text-4xl font-thin opacity-30 tabular-nums">
                                        { track.rank }
                                    </div>
                                }
                                avatar={
                                    <Avatar innerClassName="w-10 h-10 rounded-box">
                                        <img src={ track.image } alt={ track.title } />
                                    </Avatar>
                                }
                                grow={
                                    <div>
                                        <div>{ track.title }</div>
                                        <div className="text-xs uppercase font-semibold opacity-60">
                                            { track.artist }
                                        </div>
                                    </div>
                                }
                                growColumn={ 3 }
                                actions={
                                    <Button size="sm" shape="square" color="ghost" icon={ MdPlayArrow } />
                                }
                            />
                        ))}
                    </List>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;ListRow</code></pre>
                    <pre data-prefix="2"><code>    leading={'{ <div className="text-4xl">01</div> }'}</code></pre>
                    <pre data-prefix="3"><code>    avatar={'{ <Avatar>...</Avatar> }'}</code></pre>
                    <pre data-prefix="4"><code>    grow={'{ <CustomContent /> }'}</code></pre>
                    <pre data-prefix="5"><code>    growColumn={'{ 3 }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* List with Wrapped Content */}
            <div className="flex flex-col gap-4 w-full">
                <h3 className="text-xl font-semibold border-b-2 border-info pb-2">
                    List with Wrapped Content
                </h3>

                <div className="w-full max-w-lg">
                    <List className="bg-base-100 rounded-box shadow-md">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                            Songs with descriptions
                        </li>

                        { songsWithDesc.map( song => (
                            <ListRow
                                key={ song.id }
                                avatar={
                                    <Avatar innerClassName="w-10 h-10 rounded-box">
                                        <img src={ song.image } alt={ song.title } />
                                    </Avatar>
                                }
                                title={ song.title }
                                subtitle={ song.artist }
                                wrap={
                                    <p className="text-xs opacity-70">
                                        { song.desc }
                                    </p>
                                }
                                actions={[
                                    <Button key="play" size="sm" shape="square" color="ghost" icon={ MdPlayArrow } /> ,
                                    <Button key="like" size="sm" shape="square" color="ghost" icon={ MdFavorite } /> ,
                                ]}
                            />
                        ))}
                    </List>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;ListRow</code></pre>
                    <pre data-prefix="2"><code>    avatar={'{ <Avatar>...</Avatar> }'}</code></pre>
                    <pre data-prefix="3"><code>    title="Title"</code></pre>
                    <pre data-prefix="4"><code>    subtitle="Subtitle"</code></pre>
                    <pre data-prefix="5"><code>    wrap={'{ <p>Long description that wraps...</p> }'}</code></pre>
                    <pre data-prefix="6"><code>    actions={'{ <Button /> }'}</code></pre>
                    <pre data-prefix="7"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Clickable List */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-success pb-2">
                    Clickable List Rows
                </h3>

                { clickedItem && (
                    <div className="alert alert-success">
                        <MdCheckCircle size={ 24 } />
                        <span>You clicked: { clickedItem }</span>
                    </div>
                )}

                <div className="w-full max-w-lg">
                    <List className="bg-base-100 rounded-box shadow-md">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                            Click on a row
                        </li>

                        { songs.map( song => (
                            <ListRow
                                key={ song.id }
                                clickable
                                onClick={ () => setClickedItem( song.title ) }
                                avatar={
                                    <Avatar innerClassName="w-10 h-10 rounded-box">
                                        <img src={ song.image } alt={ song.title } />
                                    </Avatar>
                                }
                                title={ song.title }
                                subtitle={ song.artist }
                            />
                        ))}
                    </List>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;ListRow</code></pre>
                    <pre data-prefix="2"><code>    clickable</code></pre>
                    <pre data-prefix="3"><code>    onClick={'{ () => handleClick() }'}</code></pre>
                    <pre data-prefix="4"><code>    title="Clickable item"</code></pre>
                    <pre data-prefix="5"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Users List with Multiple Actions */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-warning pb-2">
                    Users List with Status and Multiple Actions
                </h3>

                <div className="w-full max-w-2xl">
                    <List className="bg-base-100 rounded-box shadow-md">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                            Team members
                        </li>

                        { users.map( user => (
                            <ListRow
                                key={ user.id }
                                avatar={
                                    <Avatar
                                        indicator={ user.status === 'Active' ? 'online' : 'offline' }
                                        innerClassName="w-12 h-12 rounded-full"
                                    >
                                        <img src={ user.image } alt={ user.name } />
                                    </Avatar>
                                }
                                grow={
                                    <div>
                                        <div className="font-semibold">{ user.name }</div>
                                        <div className="text-sm opacity-60">{ user.email }</div>
                                    </div>
                                }
                                content={
                                    <div className="flex flex-col items-end gap-1">
                                        <Badge
                                            size="sm"
                                            color={
                                                user.role === 'Admin' ? 'primary' :
                                                user.role === 'Editor' ? 'secondary' :
                                                'neutral'
                                            }
                                        >
                                            { user.role }
                                        </Badge>
                                        <Badge
                                            size="sm"
                                            color={ user.status === 'Active' ? 'success' : 'neutral' }
                                        >
                                            { user.status }
                                        </Badge>
                                    </div>
                                }
                                actions={[
                                    <Button key="edit"   size="sm" shape='square' color="ghost" icon={ MdEdit }   /> ,
                                    <Button key="share"  size="sm" shape='square' color="ghost" icon={ MdShare }  /> ,
                                    <Button key="delete" size="sm" shape='square' color="ghost" icon={ MdDelete } /> ,
                                ]}
                            />
                        ))}
                    </List>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;ListRow</code></pre>
                    <pre data-prefix="2"><code>    avatar={'{ <Avatar indicator="online">...</Avatar> }'}</code></pre>
                    <pre data-prefix="3"><code>    grow={'{ <div><h3>Name</h3><p>Email</p></div> }'}</code></pre>
                    <pre data-prefix="4"><code>    content={'{ <div><Badge>Role</Badge></div> }'}</code></pre>
                    <pre data-prefix="5"><code>    actions={'{ [<Button />, <Button />, <Button />] }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Custom Content */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-error pb-2">
                    Custom Content Layout
                </h3>

                <div className="w-full max-w-lg">
                    <List className="bg-base-100 rounded-box shadow-md">
                        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                            Featured products
                        </li>

                        <ListRow
                            leading={
                                <div className="flex items-center gap-1">
                                    <MdStar className="text-warning" size={ 20 } />
                                    <span className="font-bold">4.8</span>
                                </div>
                            }
                            grow={
                                <div>
                                    <div className="font-semibold">Premium Wooden Table</div>
                                    <div className="text-sm opacity-60">Handcrafted oak wood</div>
                                    <div className="flex gap-2 mt-2">
                                        <Badge size="xs" color="primary">New</Badge>
                                        <Badge size="xs" color="success">In Stock</Badge>
                                    </div>
                                </div>
                            }
                            content={
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary">$499</div>
                                    <div className="text-sm line-through opacity-50">$599</div>
                                </div>
                            }
                            actions={
                                <Button size="sm" color="primary">
                                    Add to Cart
                                </Button>
                            }
                        />

                        <ListRow
                            leading={
                                <div className="flex items-center gap-1">
                                    <MdStar className="text-warning" size={ 20 } />
                                    <span className="font-bold">4.6</span>
                                </div>
                            }
                            grow={
                                <div>
                                    <div className="font-semibold">Ergonomic Chair</div>
                                    <div className="text-sm opacity-60">Comfortable design</div>
                                    <div className="flex gap-2 mt-2">
                                        <Badge size="xs" color="warning">Sale</Badge>
                                    </div>
                                </div>
                            }
                            content={
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-primary">$299</div>
                                    <div className="text-sm line-through opacity-50">$399</div>
                                </div>
                            }
                            actions={
                                <Button size="sm" color="primary">
                                    Add to Cart
                                </Button>
                            }
                        />
                    </List>
                </div>

                <div className="mockup-code text-xs">
                    <pre data-prefix="1"><code>&lt;ListRow</code></pre>
                    <pre data-prefix="2"><code>    leading={'{ <Rating /> }'}</code></pre>
                    <pre data-prefix="3"><code>    grow={'{ <ProductInfo /> }'}</code></pre>
                    <pre data-prefix="4"><code>    content={'{ <Price /> }'}</code></pre>
                    <pre data-prefix="5"><code>    actions={'{ <Button>Add to Cart</Button> }'}</code></pre>
                    <pre data-prefix="6"><code>/&gt;</code></pre>
                </div>
            </div>

            <Divider />

            {/* Props Reference */}
            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold border-b-2 border-primary pb-2">
                    Props Reference
                </h3>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Prop</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code className="text-xs">avatar</code></td>
                                <td>ReactNode</td>
                                <td>Avatar element (replaced by checkbox when selectable)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">selectable</code></td>
                                <td>boolean</td>
                                <td>Show checkbox instead of avatar</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">selected</code></td>
                                <td>boolean</td>
                                <td>Checkbox selected state</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onSelect</code></td>
                                <td>function</td>
                                <td>Selection change handler: (checked) =&gt; void</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">title</code></td>
                                <td>string</td>
                                <td>Main title text</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">subtitle</code></td>
                                <td>string</td>
                                <td>Subtitle text (small, uppercase)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">leading</code></td>
                                <td>ReactNode</td>
                                <td>Element before avatar/checkbox</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">grow</code></td>
                                <td>ReactNode</td>
                                <td>Custom content for grow column</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">growColumn</code></td>
                                <td>number</td>
                                <td>Which column grows (default: 2)</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">wrap</code></td>
                                <td>ReactNode</td>
                                <td>Content that wraps to next row</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">actions</code></td>
                                <td>ReactNode | Array</td>
                                <td>Action buttons on the right</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">clickable</code></td>
                                <td>boolean</td>
                                <td>Add hover/cursor styles</td>
                            </tr>
                            <tr>
                                <td><code className="text-xs">onClick</code></td>
                                <td>function</td>
                                <td>Row click handler</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </Container>
    ) ;
} ;

export default ListDemo ;
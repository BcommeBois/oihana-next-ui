'use client' ;

import { useCallback , useEffect , useState } from 'react' ;

import InfiniteScroll from '@/components/layouts/InfiniteScroll' ;
import List           from '@/components/lists/List' ;
import ListRow        from '@/components/lists/ListRow' ;

/**
 * Number of items appended on each load.
 * @type {number}
 */
const PAGE_SIZE = 15 ;

/**
 * Total number of items available in the simulated dataset.
 * @type {number}
 */
const TOTAL_ITEMS = 75 ;

/**
 * Simulated network latency, in milliseconds.
 * @type {number}
 */
const LATENCY = 700 ;

/**
 * Simulates a paginated API call returning a slice of items.
 *
 * @param {number} page - Zero-based page index to fetch.
 * @returns {Promise<{ items: Array<{ id: number, title: string, subtitle: string }>, hasMore: boolean }>}
 */
const fetchPage = ( page ) => new Promise( resolve =>
{
    setTimeout( () =>
    {
        const start = page * PAGE_SIZE ;
        const end   = Math.min( start + PAGE_SIZE , TOTAL_ITEMS ) ;

        const items = [] ;

        for ( let i = start ; i < end ; i++ )
        {
            items.push
            ({
                id       : i + 1 ,
                title    : `Item #${ i + 1 }` ,
                subtitle : `Loaded on page ${ page + 1 }` ,
            }) ;
        }

        resolve({ items , hasMore : end < TOTAL_ITEMS }) ;
    }
    , LATENCY ) ;
}) ;

// ============================================================================
//  Reverse / chat demo
// ============================================================================

/**
 * Number of messages loaded on each "load older" request.
 * @type {number}
 */
const CHAT_PAGE_SIZE = 8 ;

/**
 * Side of the conversation a speaker sits on.
 */
const START = 'start' ;
const END   = 'end' ;

/**
 * Avatars used by the two speakers.
 */
const KENOBI_AVATAR = 'https://img.daisyui.com/images/profile/demo/kenobee@192.webp' ;
const ANAKIN_AVATAR = 'https://img.daisyui.com/images/profile/demo/anakeen@192.webp' ;

/**
 * Bubble color (DaisyUI) used for the "current user" (Anakin).
 * @type {string}
 */
const OWN_BUBBLE_COLOR = 'chat-bubble-primary' ;

/**
 * The conversation, ordered oldest → newest. Each line alternates between
 * Obi-Wan (chat-start) and Anakin (chat-end).
 */
const SCRIPT =
[
    [ 'obiwan' , 'It was said that you would destroy the Sith, not join them.' ] ,
    [ 'anakin' , "Don't lecture me, Obi-Wan." ] ,
    [ 'obiwan' , 'It was you who would bring balance to the Force…' ] ,
    [ 'anakin' , 'I should have known the Jedi were plotting to take over.' ] ,
    [ 'obiwan' , '…not leave it in Darkness.' ] ,
    [ 'anakin' , "If you're not with me, then you're my enemy." ] ,
    [ 'obiwan' , 'Only a Sith deals in absolutes.' ] ,
    [ 'anakin' , 'You will try.' ] ,
    [ 'obiwan' , 'You were the Chosen One!' ] ,
    [ 'anakin' , 'I hate you!' ] ,
    [ 'obiwan' , 'You were my brother, Anakin.' ] ,
    [ 'obiwan' , 'I loved you.' ] ,
    [ 'anakin' , 'What kind of nonsense is this?' ] ,
    [ 'anakin' , 'Put me on the Council and not make me a Master!?' ] ,
    [ 'obiwan' , 'Anakin, calm down.' ] ,
    [ 'anakin' , "That's never been done in the history of the Jedi." ] ,
    [ 'anakin' , "It's insulting!" ] ,
    [ 'obiwan' , 'You have been given a great honor.' ] ,
    [ 'obiwan' , 'To be on the Council at your age…' ] ,
    [ 'obiwan' , "It's never happened before." ] ,
    [ 'anakin' , 'The Council wants me to spy on the Chancellor?' ] ,
    [ 'obiwan' , 'The Council is asking you.' ] ,
    [ 'anakin' , 'This is treason.' ] ,
    [ 'obiwan' , 'Be mindful of your thoughts, Anakin.' ] ,
    [ 'anakin' , 'I have brought peace, freedom, justice…' ] ,
    [ 'obiwan' , 'Your new empire?!' ] ,
    [ 'anakin' , "Don't make me kill you." ] ,
    [ 'obiwan' , 'I will do what I must.' ] ,
] ;

/**
 * Builds the full conversation as message objects, oldest → newest.
 *
 * @returns {Array<{ id: number, side: string, author: string, avatar: string, color: string, text: string, time: string }>}
 */
const buildConversation = () => SCRIPT.map( ( [ speaker , text ] , index ) =>
{
    const isObiwan = speaker === 'obiwan' ;

    const hours   = 12 + Math.floor( index / 60 ) ;
    const minutes = index % 60 ;

    return {
        id     : index + 1 ,
        side   : isObiwan ? START : END ,
        author : isObiwan ? 'Obi-Wan Kenobi' : 'Anakin' ,
        avatar : isObiwan ? KENOBI_AVATAR : ANAKIN_AVATAR ,
        color  : isObiwan ? '' : OWN_BUBBLE_COLOR ,
        text   ,
        time   : `${ hours }:${ String( minutes ).padStart( 2 , '0' ) }` ,
    } ;
} ) ;

/**
 * Full conversation, computed once.
 */
const CONVERSATION = buildConversation() ;

/**
 * A single chat message, rendered with DaisyUI chat bubble classes.
 *
 * @param {Object} props
 * @param {string} props.author - Author name shown in the header.
 * @param {string} props.avatar - Author image URL.
 * @param {string} props.color  - DaisyUI chat-bubble color class.
 * @param {string} props.side   - 'start' or 'end'.
 * @param {string} props.text   - Message body.
 * @param {string} props.time   - Timestamp shown in the header.
 */
const ChatMessage =
({
    author ,
    avatar ,
    color ,
    side ,
    text ,
    time ,
}) =>
(
    <div className={ `chat ${ side === END ? 'chat-end' : 'chat-start' }` }>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img alt={ author } src={ avatar } />
            </div>
        </div>
        <div className="chat-header text-xs">
            { author }
            <time className="opacity-50 ml-1">{ time }</time>
        </div>
        <div className={ `chat-bubble ${ color }` }>{ text }</div>
    </div>
) ;

/**
 * Chat panel : a reverse infinite scroll that loads older messages when the
 * user scrolls up. Messages are kept oldest → newest in state and rendered
 * newest-first, as required by `<InfiniteScroll reverse>`.
 */
const ChatPanel = () =>
{
    const [ loaded  , setLoaded  ] = useState( [] ) ;
    const [ loading , setLoading ] = useState( false ) ;
    const [ hasMore , setHasMore ] = useState( true ) ;

    // --------- Prepend the previous (older) page of messages

    const loadOlder = useCallback( async () =>
    {
        if ( loading || !hasMore )
        {
            return ;
        }

        setLoading( true ) ;

        await new Promise( resolve => setTimeout( resolve , LATENCY ) ) ;

        const remaining = CONVERSATION.length - loaded.length ;
        const start     = Math.max( 0 , remaining - CHAT_PAGE_SIZE ) ;
        const older     = CONVERSATION.slice( start , remaining ) ;

        setLoaded( prev => [ ...older , ...prev ] ) ;
        setHasMore( start > 0 ) ;
        setLoading( false ) ;
    }
    , [ hasMore , loaded.length , loading ] ) ;

    // --------- Initial load (most recent page)

    useEffect( () =>
    {
        loadOlder() ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] ) ;

    return (
        <InfiniteScroll
            className  = "max-h-96 p-4 gap-1 rounded-box border border-base-300 bg-base-100"
            endMessage = {
                <p className="text-center text-xs opacity-60 py-2">
                    — Beginning of the conversation —
                </p>
            }
            hasMore    = { hasMore }
            loading    = { loading }
            onLoadMore = { loadOlder }
            reverse
            scrollable
        >
            { [ ...loaded ].reverse().map( message => (
                <ChatMessage key={ message.id } { ...message } />
            ) ) }
        </InfiniteScroll>
    ) ;
} ;

/**
 * InfiniteScroll showcase : a forward scrollable list and a reverse chat panel,
 * both lazily loading paginated content.
 */
const InfiniteScrollDemo = () =>
{
    const [ items   , setItems   ] = useState( [] ) ;
    const [ page    , setPage    ] = useState( 0 ) ;
    const [ loading , setLoading ] = useState( false ) ;
    const [ hasMore , setHasMore ] = useState( true ) ;

    // --------- Append the next page, guarding against concurrent loads

    const loadMore = useCallback( async () =>
    {
        if ( loading || !hasMore )
        {
            return ;
        }

        setLoading( true ) ;

        const { items : newItems , hasMore : more } = await fetchPage( page ) ;

        setItems( prev => [ ...prev , ...newItems ] ) ;
        setHasMore( more ) ;
        setPage( prev => prev + 1 ) ;
        setLoading( false ) ;
    }
    , [ hasMore , loading , page ] ) ;

    // --------- Initial load

    useEffect( () =>
    {
        loadMore() ;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] ) ;

    return (
        <div className="flex flex-col gap-8">

            {/* Forward scroll */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">

                    <h2 className="card-title text-2xl mb-2">Scrollable container</h2>
                    <p className="text-sm opacity-70 mb-4">
                        { items.length } / { TOTAL_ITEMS } items loaded — scroll down to load more.
                    </p>

                    <InfiniteScroll
                        className  = "max-h-96 py-2 rounded-box border border-base-300 bg-base-100"
                        endMessage = {
                            <p className="text-center text-sm opacity-60 py-4">
                                — End of the list —
                            </p>
                        }
                        hasMore    = { hasMore }
                        loading    = { loading }
                        onLoadMore = { loadMore }
                        scrollable
                    >
                        <List>
                            { items.map( item => (
                                <ListRow
                                    key      = { item.id }
                                    title    = { item.title }
                                    subtitle = { item.subtitle }
                                />
                            ) ) }
                        </List>
                    </InfiniteScroll>

                </div>
            </div>

            {/* Reverse / chat */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">

                    <h2 className="card-title text-2xl mb-2">Reverse mode — chat</h2>
                    <p className="text-sm opacity-70 mb-4">
                        Scroll up to load older messages. New messages stay pinned at the
                        bottom and the scroll position never jumps.
                    </p>

                    <ChatPanel />

                </div>
            </div>

        </div>
    ) ;
} ;

export default InfiniteScrollDemo ;

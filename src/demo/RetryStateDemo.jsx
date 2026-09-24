'use client' ;

/**
 * What a block shows when what it had to read could not be read.
 *
 * @module demo/RetryStateDemo
 */

import { useState } from 'react' ;

import { MdSearchOff } from 'react-icons/md' ;

import Divider    from '@/components/Divider' ;
import RetryState from '@/components/RetryState' ;

import Container from '@/display/Container' ;

/**
 * A block that fetches for itself : the retry is its own, and it succeeds on
 * the second attempt so the failure can be left behind.
 */
const OwnRetryExample = () =>
{
    const [ attempts , setAttempts ] = useState( 1 ) ;

    if ( attempts > 1 )
    {
        return (
            <div className="rounded-box border border-base-300 p-6 text-sm">
                Loaded on attempt { attempts }.{ ' ' }
                <button className="link" onClick={ () => setAttempts( 1 ) } type="button">Fail again</button>
            </div>
        ) ;
    }

    return (
        <RetryState
            description = "The report could not be read."
            onRetry     = { () => setAttempts( n => n + 1 ) }
            size        = "md"
            title       = "Report unavailable"
        />
    ) ;
} ;

const RetryStateDemo = () =>
(
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h2 className="text-3xl font-bold">Retry state</h2>

        <p className="text-sm text-base-content/70 max-w-2xl">
            A failure and an absence are different sentences. Served as an empty list, a failed read
            says « there is nothing here » — a statement about the subject, invented out of a network
            problem. This says what happened instead, and offers the only useful next move.
        </p>

        <Divider>Its own words</Divider>

        <RetryState />

        <Divider>Named by the screen</Divider>

        <RetryState
            description = "The figures for this year could not be loaded."
            icon        = { <MdSearchOff /> }
            size        = "md"
            title       = "Figures unavailable"
        />

        <Divider>A retry the block owns</Divider>

        <p className="text-sm text-base-content/70 max-w-2xl">
            Without <code>onRetry</code> the button refreshes the page at the same url. A block that
            fetches for itself passes its own — this one succeeds on the second attempt.
        </p>

        <OwnRetryExample />

        <Divider>Nothing to be done</Divider>

        <p className="text-sm text-base-content/70 max-w-2xl">
            A failure nobody can act on still has to be said, so the button can be taken away.
        </p>

        <RetryState
            description = "This block is unavailable while the maintenance runs."
            showRetry   = { false }
            size        = "md"
            title       = "Under maintenance"
        />

    </Container>
) ;

RetryStateDemo.displayName = 'RetryStateDemo' ;

export default RetryStateDemo ;

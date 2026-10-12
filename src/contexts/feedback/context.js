'use client' ;

import { createContext } from 'react' ;

/**
 * The device's feedback settings : `{ sound , vibration , volume }` and their setters.
 *
 * `null` outside a `FeedbackProvider` : every signal then plays as the screen asks.
 *
 * @module contexts/feedback/context
 */
const FeedbackContext = createContext( null ) ;

export default FeedbackContext ;

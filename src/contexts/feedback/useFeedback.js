'use client' ;

import { use } from 'react' ;

import FeedbackContext from './context' ;

/**
 * The device's feedback settings, or `null` outside a `FeedbackProvider`.
 *
 * Unlike the hooks of the other contexts it does not throw without a provider :
 * a signal works without one, and a control that needs one hides itself.
 *
 * @module contexts/feedback/useFeedback
 *
 * @returns {?{ sound : boolean , vibration : boolean , volume : number , setSound : Function , setVibration : Function , setVolume : Function , toggleSound : Function }}
 *
 * @example
 * ```jsx
 * const { sound , toggleSound } = useFeedback() ?? {} ;
 * ```
 */
const useFeedback = () => use( FeedbackContext ) ;

export default useFeedback ;

'use client' ;

/**
 * Toast notification hook.
 *
 * @module contexts/toasts/useToast
 */

import { useContext } from 'react' ;

import generateUUID from 'vegas-js-core/src/random/generateUUID' ;
import notEmpty     from 'vegas-js-core/src/strings/notEmpty' ;
import ucFirst      from 'vegas-js-core/src/strings/ucFirst' ;

import ToastContext from './context' ;

export { ERROR , INFO , SUCCESS , WARNING } from '../../themes/colors' ;

/**
 * Toast notification hook.
 *
 * @param {Object} [options]
 * @param {number} [options.delay=4000] - Auto-close delay in milliseconds.
 * @param {boolean} [options.show=true] - Whether alert() shows a toast.
 * @returns {{ alert: Function , toast: Function }}
 *
 * @throws {Error} If used outside ToastProvider.
 *
 * @example
 * ```jsx
 * const { toast , alert } = useToast() ;
 *
 * // Simple toast
 * toast( 'Item saved!' , 'success' ) ;
 *
 * // With options
 * toast( 'Error occurred' , 'error' , { closable: false } ) ;
 *
 * // Alert with auto-capitalize
 * alert( 'operation completed' , 'success' ) ;
 *
 * // Custom delay
 * const { toast } = useToast({ delay: 6000 }) ;
 * ```
 */
const useToast = ({ delay = 4000 , show = true } = {}) =>
{
    const context = useContext( ToastContext ) ;

    if ( !context )
    {
        throw new Error( 'useToast must be used within a ToastProvider' ) ;
    }

    const { closeToast , openToast } = context ;

    const toast = ( message , level = null , options = {} ) =>
    {
        const id = generateUUID() ;

        openToast( id , message , level , options ) ;

        if ( delay > 0 )
        {
            setTimeout( closeToast( id ) , delay ) ;
        }
    } ;

    const alert = ( message , level ) =>
    {
        if ( show && notEmpty( message ) )
        {
            toast( ucFirst( message ) , level ) ;
        }
    } ;

    return { alert , toast } ;
} ;

export default useToast ;
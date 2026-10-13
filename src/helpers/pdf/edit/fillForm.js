import { fieldType } from './listFormFields' ;
import openPdf        from './openPdf' ;

/**
 * Fills the fields of a PDF form by name, and flattens it if asked — the
 * values then part of the page, no longer fields anyone edits.
 *
 * A text field takes a string, a checkbox a boolean, a radio group or a
 * dropdown the option's name, a list one name or several. A name the form
 * does not have is skipped ; `onMissing` says which.
 *
 * @module helpers/pdf/edit/fillForm
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {Object.<string,string|boolean|string[]>} values - By field name.
 * @param {Object} [options]
 * @param {boolean} [options.flatten=false] - Make the values part of the pages.
 * @param {Function} [options.onMissing] - `( name ) => void` for a name the form does not have.
 * @param {AbortSignal} [options.signal]
 *
 * @returns {Promise<Uint8Array>}
 *
 * @example
 * ```js
 * await fillForm( form , { name : 'Camille Martin' , agreed : true , delivery : 'relay' } , { flatten : true } ) ;
 * ```
 */
const fillForm = async ( source , values , { flatten = false , onMissing , signal } = {} ) =>
{
    const { document , lib } = await openPdf( source , { signal } ) ;

    const form = document.getForm() ;

    for ( const [ name , value ] of Object.entries( values ?? {} ) )
    {
        const field = form.getFieldMaybe( name ) ;

        if ( !field )
        {
            onMissing?.( name ) ;
            continue ;
        }

        switch ( fieldType( lib , field ) )
        {
            case 'text' :
                field.setText( value === null || value === undefined ? '' : String( value ) ) ;
                break ;

            case 'checkbox' :
                if ( value ) field.check() ; else field.uncheck() ;
                break ;

            case 'radio' :
            case 'dropdown' :
                if ( value === null || value === undefined || value === '' ) field.clear?.() ; else field.select( String( value ) ) ;
                break ;

            case 'list' :
                field.clear() ;
                for ( const option of ( Array.isArray( value ) ? value : [ value ] ).filter( Boolean ) )
                {
                    field.select( String( option ) , true ) ;
                }
                break ;

            default :
                onMissing?.( name ) ;
        }
    }

    if ( flatten )
    {
        form.flatten() ;
    }

    return document.save() ;
} ;

export default fillForm ;

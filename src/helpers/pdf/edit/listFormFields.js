import openPdf from './openPdf' ;

/**
 * The fields of a PDF form : their names, kinds, values and, for a choice,
 * its options — what a page needs to draw its own form, and what `fillForm`
 * takes by name.
 *
 * @module helpers/pdf/edit/listFormFields
 *
 * @typedef {Object} FormField
 * @property {string} name
 * @property {'text'|'checkbox'|'radio'|'dropdown'|'list'|'button'|'signature'|'unknown'} type
 * @property {string|boolean|string[]|null} value - The text, whether checked, the selected option(s).
 * @property {string[]} [options] - The choices of a radio group, a dropdown or a list.
 *
 * @param {import('../toPdfSource').PdfSource|Uint8Array} source
 * @param {Object} [options]
 * @param {AbortSignal} [options.signal]
 *
 * @returns {Promise<FormField[]>} Empty for a document with no form.
 */

/** The kind of a field, from the engine's class. */
export const fieldType = ( lib , field ) =>
{
    if ( field instanceof lib.PDFTextField )  return 'text' ;
    if ( field instanceof lib.PDFCheckBox )   return 'checkbox' ;
    if ( field instanceof lib.PDFRadioGroup ) return 'radio' ;
    if ( field instanceof lib.PDFDropdown )   return 'dropdown' ;
    if ( field instanceof lib.PDFOptionList ) return 'list' ;
    if ( field instanceof lib.PDFButton )     return 'button' ;
    if ( field instanceof lib.PDFSignature )  return 'signature' ;
    return 'unknown' ;
} ;

const listFormFields = async ( source , { signal } = {} ) =>
{
    const { document , lib } = await openPdf( source , { signal } ) ;

    return document.getForm().getFields().map( field =>
    {
        const type = fieldType( lib , field ) ;
        const name = field.getName() ;

        switch ( type )
        {
            case 'text'     : return { name , type , value : field.getText() ?? '' } ;
            case 'checkbox' : return { name , type , value : field.isChecked() } ;
            case 'radio'    : return { name , options : field.getOptions() , type , value : field.getSelected() ?? null } ;
            case 'dropdown' : return { name , options : field.getOptions() , type , value : field.getSelected() } ;
            case 'list'     : return { name , options : field.getOptions() , type , value : field.getSelected() } ;
            default         : return { name , type , value : null } ;
        }
    } ) ;
} ;

export default listFormFields ;

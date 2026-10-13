'use client' ;

/**
 * PdfDownloadButton — a button that generates a document of
 * `@react-pdf/renderer` and hands it to the browser as a file to save.
 *
 * 🔑 **Nothing is generated, nor loaded, before the click** : the engine
 * weighs 1.4 MB, and a page that offers a download pays for it only when
 * someone takes it. The button shows a spinner meanwhile, and stays
 * focusable.
 *
 * @module components/documents/PdfDownloadButton
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - The label. Defaults to « Download » from the bundle.
 * @param {React.ReactElement} props.document - The `<Document>` to render.
 * @param {string} [props.fileName='document.pdf'] - The name the file is saved under ; `.pdf` is added when missing.
 * @param {React.ElementType} [props.icon=MdDownload]
 * @param {Function} [props.onDone] - `( { blob , fileName } ) => void` once the download is dispatched.
 * @param {Function} [props.onError] - `( error ) => void` when the generation fails.
 * @param {string} [props.path='components.document'] - i18n path the default label is read from.
 * @param {Object} [props.buttonProps] - Every other prop goes to {@link module:components/Button} : `color`, `size`, `style`…
 *
 * @example
 * ```jsx
 * <PdfDownloadButton color="primary" document={ <Invoice order={ order } /> } fileName={ `facture-${ order.number }.pdf` } />
 * ```
 */

import { useEffect , useRef , useState } from 'react' ;

import { MdDownload } from 'react-icons/md' ;

import Button from '../Button' ;

import { renderToBlob } from './engine/renderer' ;

import forceDownload from '../../helpers/net/forceDownload' ;

import NO_LOCALE from '../../contexts/locale/noLocale' ;
import useI18n   from '../../contexts/locale/useI18n' ;

const PdfDownloadButton =
({
    children ,
    document : element ,
    fileName = 'document.pdf' ,
    icon = MdDownload ,
    onDone ,
    onError ,
    path = 'components.document' ,
    ...rest
}) =>
{
    const labels = useI18n( path , NO_LOCALE , false ) ?? {} ;

    const [ busy , setBusy ] = useState( false ) ;

    const alive = useRef( true ) ;

    useEffect( () =>
    {
        alive.current = true ;
        return () => { alive.current = false ; } ;
    }
    , [] ) ;

    const onClick = async () =>
    {
        if ( !element || busy )
        {
            return ;
        }

        setBusy( true ) ;

        try
        {
            const blob = await renderToBlob( element ) ;
            const name = /\.pdf$/i.test( fileName ) ? fileName : `${ fileName }.pdf` ;

            forceDownload( name , URL.createObjectURL( blob ) , true ) ;

            onDone?.( { blob , fileName : name } ) ;
        }
        catch ( error )
        {
            onError?.( error ) ;
        }
        finally
        {
            if ( alive.current )
            {
                setBusy( false ) ;
            }
        }
    } ;

    return (
        <Button icon={ icon } loading={ busy } onClick={ onClick } { ...rest }>
            { children ?? labels.download }
        </Button>
    ) ;
} ;

PdfDownloadButton.displayName = 'PdfDownloadButton' ;

export default PdfDownloadButton ;

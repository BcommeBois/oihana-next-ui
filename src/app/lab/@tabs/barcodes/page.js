'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas' ;
import useI18n   from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import Divider from '@/components/Divider' ;

import BarcodeDemo from '@/demo/barcodes/BarcodeDemo' ;
import QRCodeDemo  from '@/demo/barcodes/QRCodeDemo' ;

/**
 * QR code and barcode showcase page.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.barcodes'] - Dot notation path to the page locale.
 */
const BarcodesShowcase = ( { path = 'app.lab.barcodes' } = {} ) =>
{
    const { barcode , description , qrCode , title } = useI18n( path ) ?? {} ;

    return (
        <Page full className='gap-8'>

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { title }
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    { description }
                </p>
            </Container>

            <Container className="flex flex-col gap-2" maxWidth="max-w-7xl">
                <h2 className="text-3xl font-bold text-primary">{ qrCode?.title }</h2>
                <p className="text-base-content/70">{ qrCode?.description }</p>
            </Container>

            <QRCodeDemo />

            <Divider />

            <Container className="flex flex-col gap-2" maxWidth="max-w-7xl">
                <h2 className="text-3xl font-bold text-primary">{ barcode?.title }</h2>
                <p className="text-base-content/70">{ barcode?.description }</p>
            </Container>

            <BarcodeDemo />

        </Page>
    ) ;
} ;

export default BarcodesShowcase ;

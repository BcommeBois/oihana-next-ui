import "./global.css" ;

import courierPrime  from '@/themes/fonts/courrierPrime' ;
import bitter        from '@/themes/fonts/bitter' ;
import nunito        from '@/themes/fonts/nunito' ;
import merriweather  from '@/themes/fonts/merriweather' ;
import redHatMono    from '@/themes/fonts/redHatMono' ;


import getFontClassNames from '@/themes/helpers/getFontClassNames';
import getThemeScript    from '@/contexts/themes/getThemeScript' ;

import { initServerI18n } from '@/helpers/i18n/serverI18nConfig' ;

import Application   from '@/display/Application' ;
import ServiceWorker from '@/display/ServiceWorker';

import getServerI18n      from '@/helpers/i18n/getServerI18n' ;
import getServerMetadatas from '@/helpers/i18n/getServerMetadatas' ;

import config from '@/@configs' ;
import locale from '@/@locale'

// `static` : the language cookie is never read on the server, so every page is
// prerendered. The client switches to the stored language on its own.
initServerI18n(
{
    locale      : locale ,
    defaultLang : config.defaultLang ,
    languages   : config.languages   ,
    metadatas   : config.metadatas   ,
    static      : true ,
}) ;

export async function generateMetadata()
{
    const i18n      = await getServerI18n() ;
    const metadatas = getServerMetadatas() ;

    const { description , title } = i18n( 'seo' ) ;

    return {
        ...metadatas ,
        title :
        {
            default  : title ,
            template : `%s — ${ title }` ,
        } ,
        description : description ,
        appleWebApp :
        {
            ...metadatas.appleWebApp ,
            title ,
        } ,
    } ;
}

export const viewport =
{
    width        : 'device-width' ,
    initialScale : 1 ,
    maximumScale : 1 ,
    userScalable : false ,
    viewportFit  : 'cover' ,
};

export default function RootLayout ( { children } )
{
    const initialLang = config.defaultLang ;

    const classNames  = getFontClassNames([
        bitter ,
        courierPrime ,
        merriweather ,
        nunito ,
        redHatMono ,
    ]
    , 'h-full' );

    const { dark , light } = config ;

    const themeScript = getThemeScript({ light , dark  } );

    // noinspection HtmlRequiredTitleElement
    return (
    <html
        className                = { classNames  }
        lang                     = { initialLang }
        suppressHydrationWarning = { true }
    >
        <head>
            <meta name="theme-color" content="#ffffff" />

            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </head>

        <body
            className="flex flex-col min-h-screen w-full overflow-x-hidden bg-base-100"
            suppressHydrationWarning
        >
            <Application initialLang={ initialLang }>
                <ServiceWorker />
                { children }
            </Application>
        </body>
    </html>
    );
}

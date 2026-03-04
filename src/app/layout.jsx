import { cookies } from 'next/headers' ;

import "./global.css" ;

import courierPrime  from '@/themes/fonts/courrierPrime' ;
import bitter        from '@/themes/fonts/bitter' ;
import lato          from '@/themes/fonts/lato' ;
import merriweather  from '@/themes/fonts/merriweather' ;
import redHatMono    from '@/themes/fonts/redHatMono' ;

import config from '@/@configs' ;

import getThemeScript from '@/contexts/themes/getThemeScript' ;

import Application   from '@/display/Application' ;
import ServiceWorker   from '@/display/ServiceWorker';

import getFontClassNames from '@/themes/helpers/getFontClassNames';

export const metadata =
{
    title           : "Oihana Next UI"       ,
    description     : "Oihana Next UI based on TailwindCSS and DaisyUI"  ,
    appleWebApp     :
    {
        capable        : true              ,
        statusBarStyle : 'default'         ,
        title          : 'Oihana Next UI'  ,
    } ,
    formatDetection :
    {
        telephone : false ,
    } ,
    icons :
    {
        icon :
        [
            { url : "/assets/icons/ios/32.png"  , sizes : "32x32"   , type : "image/png" } ,
            { url : "/assets/icons/ios/192.png" , sizes : "192x192" , type : "image/png" } ,
            { url : "/assets/icons/ios/512.png" , sizes : "512x512" , type : "image/png" } ,
        ] ,
        apple :
        [
            { url : "/assets/icons/ios/180.png" , sizes : "180x180" , type : "image/png" } ,
            { url : "/assets/icons/ios/152.png" , sizes : "152x152" , type : "image/png" } ,
            { url : "/assets/icons/ios/120.png" , sizes : "120x120" , type : "image/png" } ,
        ] ,
    } ,
};

export const viewport =
{
    width        : 'device-width' ,
    initialScale : 1 ,
    maximumScale : 1 ,
    userScalable : false ,
    viewportFit  : 'cover' ,
};

export default async function RootLayout ( { children } )
{
    const cookieStore = await cookies() ;
    const initialLang = cookieStore.get( 'lang' )?.value ?? config.defaultLang ;

    const classNames  = getFontClassNames([
        bitter ,
        courierPrime ,
        lato ,
        merriweather ,
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
            className="flex flex-col min-h-screen w-full overflow-x-hidden bg-base-100 *:text-base-content"
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

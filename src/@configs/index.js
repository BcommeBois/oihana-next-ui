import debug      from './debug'
import env        from './env'
import html       from './html'
import languages  from './languages'
import navigation from './navigation'
import ui         from './ui'

import version from '@/version'

const config =
{
    // ---- Main

    name       : process.env.NEXT_PUBLIC_APP_NAME ,
    homepage   : process.env.NEXT_PUBLIC_APP_HOMEPAGE ,
    fullscreen : process.env.NEXT_PUBLIC_APP_FULLSCREEN === 'true' ,
    verbose    : process.env.NEXT_PUBLIC_APP_VERBOSE    === 'true' ,

    debug ,
    env  ,
    version ,

    // ---- Theme

    light : process.env.NEXT_PUBLIC_APP_THEME_LIGHT ,
    dark  : process.env.NEXT_PUBLIC_APP_THEME_DARK ,

    // ---- Settings

    defaultLang  : process.env.NEXT_PUBLIC_APP_DEFAULT_LANG ,
    home         : '/' ,
    lang         : process.env.NEXT_PUBLIC_APP_LANG ,
    languages ,

    // ---- Dependencies

    html       , // Html sanitize settings
    navigation , // Navigation
    ui         , // UI settings : sidebar, splashScreen, etc.

    // ---- Version check

    versionCheck :
    {
        storageKey  : process.env.NEXT_PUBLIC_APP_NAME + '-version' ,
        keepLocal   : [ 'lang' , 'theme' ] ,
        keepSession : [] ,
    } ,

    // ---- Static metadata — shared across all pages

    metadatas :
    {
        appleWebApp :
        {
            capable        : true      ,
            statusBarStyle : 'default' ,
        } ,

        formatDetection :
        {
            telephone : false ,
        } ,

        icons :
        {
            icon :
            [
                { url : '/assets/icons/ios/32.png'  , sizes : '32x32'   , type : 'image/png' } ,
                { url : '/assets/icons/ios/192.png' , sizes : '192x192' , type : 'image/png' } ,
                { url : '/assets/icons/ios/512.png' , sizes : '512x512' , type : 'image/png' } ,
            ] ,
            apple :
            [
                { url : '/assets/icons/ios/180.png' , sizes : '180x180' , type : 'image/png' } ,
                { url : '/assets/icons/ios/152.png' , sizes : '152x152' , type : 'image/png' } ,
                { url : '/assets/icons/ios/120.png' , sizes : '120x120' , type : 'image/png' } ,
            ] ,
        } ,

        openGraph :
        {
            type     : 'website' ,
            locale   : process.env.NEXT_PUBLIC_APP_DEFAULT_LANG ,
            url      : process.env.NEXT_PUBLIC_APP_HOMEPAGE ,
            siteName : process.env.NEXT_PUBLIC_APP_NAME ,
        } ,

        twitter :
        {
            card : 'summary_large_image' ,
        } ,

        robots :
        {
            index  : true ,
            follow : true ,
        } ,

        manifest : '/manifest.json' ,
    },
}

export const getConfig = options =>
{
    return { ...config , ...options } ;
};

export default config ;
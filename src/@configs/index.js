import debug      from './debug'
import env        from './env'
import html       from './html'
import languages  from './languages'
import navigation from './navigation'
import ui         from './ui'

import version from '@/version'

const config =
{
    // Main

    name     : process.env.NEXT_PUBLIC_APP_NAME ,
    homepage : process.env.NEXT_PUBLIC_APP_HOMEPAGE ,

    debug ,
    env  ,
    fullscreen : process.env.NEXT_PUBLIC_APP_FULLSCREEN === 'true' ,
    verbose    : process.env.NEXT_PUBLIC_APP_VERBOSE    === 'true' ,
    version ,

    // Theme

    light : process.env.NEXT_PUBLIC_APP_THEME_LIGHT ,
    dark  : process.env.NEXT_PUBLIC_APP_THEME_DARK ,

    // Settings

    defaultLang  : process.env.NEXT_PUBLIC_APP_DEFAULT_LANG ,
    home         : '/' ,
    lang         : process.env.NEXT_PUBLIC_APP_LANG ,
    languages ,

    // Dependencies

    html       , // Html sanitize settings
    navigation , // Navigation
    ui         , // UI settings : sidebar, splashScreen, etc.

    // Version check

    versionCheck :
    {
        storageKey  : process.env.NEXT_PUBLIC_APP_NAME + '-version' ,
        keepLocal   : [ 'lang' , 'theme' ] ,
        keepSession : [] ,
    } ,

    metadatas :
    {
        defaultTitle  : process.env.NEXT_PUBLIC_APP_TITLE,
        titleTemplate : process.env.NEXT_PUBLIC_APP_TITLE + ' | %s' ,
        base          : { href : process.env.NEXT_PUBLIC_APP_HOMEPAGE } ,
        meta          :
        [
            { charSet : 'utf-8'} ,

            { name : 'description' , content : process.env.NEXT_PUBLIC_APP_DESCRIPTION } ,
            { name : 'keywords'    , content : process.env.NEXT_PUBLIC_APP_KEYWORDS    } ,

            { property : "og:type" , content : 'website' }
        ]
    },
}

export const getConfig = options =>
{
    return { ...config , ...options } ;
};

export default config ;
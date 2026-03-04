import getLocaleFromI18n from '@/contexts/locale/helpers/getLocaleFromI18n' ;

import 'dayjs/locale/fr' ;
import 'dayjs/locale/en' ;

import languages from '@/@configs/languages' ;

import app        from './app' ;
import components from './components' ;
import error      from './error' ;
import navigation from './navigation' ;
import notFound   from './notFound' ;

const i18n =
{
    // ---- dependencies

    app ,
    components ,
    error ,
    navigation,
    notFound ,

    // ---- settings

    fr :
    {
        ampm   : false ,
        title  : process.env.NEXT_PUBLIC_APP_SHORT_TITLE
    },
    en :
    {
        ampm   : false ,
        title  : process.env.NEXT_PUBLIC_APP_SHORT_TITLE
    },
};

export default getLocaleFromI18n( i18n , languages ) ;

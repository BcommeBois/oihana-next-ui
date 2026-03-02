'use client' ;

import { useEffect , useState } from 'react' ;


import { AnimatePresence , motion } from 'motion/react' ;

import ApplicationProvider from '../contexts/application/provider' ;
import ConfigProvider      from '../contexts/config/provider' ;
import FullScreenProvider  from '../contexts/fullscreen/provider' ;
import LangProvider        from '../contexts/lang/provider' ;
import LoadingProvider     from '../contexts/loading/provider' ;
import LocaleProvider      from '../contexts/locale/provider' ;
import NavigationProvider  from '../contexts/navigation/provider' ;
import SelectProvider      from '../contexts/select/provider' ;
import ThemeProvider       from '../contexts/themes/provider' ;
import ToastProvider       from '../contexts/toasts/provider';

import Dashboard    from './ui/Dashboard';
import SplashScreen from './SplashScreen';

import useVersionCheck from '../hooks/useVersionCheck'

import config       from '@/@configs'
import languages    from '@/@configs/languages'
import locale       from '@/@locale'
import navigation   from '@/@configs/navigation'
import splashScreen from '@/@configs/ui/splashScreen' ;

const { defaultLang , version , versionCheck } = config ;

const Application = ( { children , initialLang } ) =>
{
    const [ ready , setReady ] = useState( false ) ;

    useVersionCheck( version , versionCheck ) ;

    useEffect( () =>
    {
        setReady( true ) ;
    }
    , [] ) ;

    return (
    <>
        <AnimatePresence>
            { !ready && (
                <motion.div
                    key        = "splash"
                    className  = "fixed inset-0 z-50 bg-base-100"
                    initial    = { { opacity : 0 } }
                    animate    = { { opacity : 1 } }
                    exit       = { { opacity : 0 } }
                    transition = { { duration : 0.4 , delay : 0.3 } }
                >
                    <SplashScreen { ...splashScreen } />
                </motion.div>
            ) }
        </AnimatePresence>

        <ConfigProvider init={ config } >
            <LangProvider defaultLang={ defaultLang } initialLang={ initialLang } languages={ languages }>
                <LocaleProvider i18n={ locale } defaultLang={ initialLang }>
                    <ThemeProvider>
                        <ApplicationProvider>
                            <FullScreenProvider>
                                <NavigationProvider defaultNavigation={ navigation } >
                                    <LoadingProvider>
                                        <ToastProvider>
                                            <SelectProvider>
                                                <Dashboard>
                                                    { children }
                                                </Dashboard>
                                            </SelectProvider>
                                        </ToastProvider>
                                    </LoadingProvider>
                                </NavigationProvider>
                            </FullScreenProvider>
                        </ApplicationProvider>
                    </ThemeProvider>
                </LocaleProvider>
            </LangProvider>
        </ConfigProvider>
    </>
    );
}

export default Application ;
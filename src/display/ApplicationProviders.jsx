'use client' ;

/**
 * ApplicationProviders — the context stack every route of an application needs,
 * and nothing else : no chrome, no sidebar, no navbar.
 *
 * It exists apart from {@link module:display/Application} because a layout
 * often needs the contracts without the chrome : public pages — a login, an
 * invitation, an activation screen — read the same configuration, locale and
 * theme as the rest, but must not mount a dashboard, and must not pay for the
 * contexts an authenticated layout adds above this one.
 *
 * 🚨 **Nothing here is guessed.** Every setting arrives as a prop : a missing
 * one leaves its provider on its own defaults rather than falling back on this
 * package's own lab configuration, which would silently give a host the wrong
 * navigation and the wrong labels.
 *
 * **The order of the providers is load-bearing** and matches the one
 * `Application` has always used : the configuration is read by everything, the
 * language decides which locale is resolved, the theme paints before anything
 * is measured, and the leaf providers (loading, toasts, select) are the ones a
 * page interacts with.
 *
 * The splash overlay covers the first paint and fades once mounted. It is
 * `pointer-events-none` : a veil on its way out must not swallow the click of
 * someone who is already reading the page underneath. Leave `splashScreen` out
 * and no overlay is rendered at all.
 *
 * @module display/ApplicationProviders
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children                      - The application tree.
 * @param {Object}          [props.config]                      - Application configuration, handed to the `ConfigProvider` ; its `defaultLang`, `version` and `versionCheck` are read here.
 * @param {string}          [props.initialLang]                 - Language resolved on the server (a cookie, a header), so the first render agrees with the client.
 * @param {Array}           [props.languages]                   - Available languages.
 * @param {Object}          [props.locale]                      - The i18n dictionary, handed to the `LocaleProvider`.
 * @param {Array}           [props.navigation]                  - Navigation tree, handed to the `NavigationProvider`.
 * @param {string}          [props.navigationMode='auto']       - Navigation display mode.
 * @param {string}          [props.navigationStorageKey]        - Where the navigation state is persisted. Name it per application : two applications served from one origin would otherwise share it.
 * @param {Object}          [props.splashScreen]                - Props of {@link module:display/SplashScreen}. Omitted, no splash overlay is rendered.
 *
 * @returns {React.ReactElement}
 *
 * @example
 * ```jsx
 * <ApplicationProviders
 *     config               = { config }
 *     initialLang          = { initialLang }
 *     languages            = { languages }
 *     locale               = { locale }
 *     navigation           = { navigation }
 *     navigationStorageKey = "my-app:nav:v1"
 *     splashScreen         = { splashScreen }
 * >
 *     { children }
 * </ApplicationProviders>
 * ```
 */

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
import ToastProvider       from '../contexts/toasts/provider' ;

import SplashScreen from './SplashScreen' ;

import useVersionCheck from '../hooks/useVersionCheck' ;

const ApplicationProviders = (
{
    children ,
    config ,
    initialLang ,
    languages ,
    locale ,
    navigation ,
    navigationMode = 'auto' ,
    navigationStorageKey ,
    splashScreen ,
} ) =>
{
    const { defaultLang , version , versionCheck } = config ?? {} ;

    const [ ready , setReady ] = useState( false ) ;

    useVersionCheck( version , versionCheck ) ;

    useEffect( () =>
    {
        setReady( true ) ;
    }
    , [] ) ;

    return (
    <>
        { splashScreen && (
            <AnimatePresence>
                { !ready && (
                    <motion.div
                        key        = "splash"
                        className  = "fixed inset-0 z-50 bg-base-100 pointer-events-none"
                        initial    = { { opacity : 0 } }
                        animate    = { { opacity : 1 } }
                        exit       = { { opacity : 0 } }
                        transition = { { duration : 0.4 , delay : 0.3 } }
                    >
                        <SplashScreen { ...splashScreen } />
                    </motion.div>
                ) }
            </AnimatePresence>
        ) }

        <ConfigProvider init={ config } >
            <LangProvider defaultLang={ defaultLang } initialLang={ initialLang } languages={ languages }>
                <LocaleProvider i18n={ locale } defaultLang={ initialLang }>
                    <ThemeProvider>
                        <ApplicationProvider>
                            <FullScreenProvider>
                                <NavigationProvider
                                    defaultNavigation = { navigation }
                                    defaultMode       = { navigationMode }
                                    storageKey        = { navigationStorageKey }
                                >
                                    <LoadingProvider>
                                        <ToastProvider>
                                            <SelectProvider>
                                                { children }
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
    ) ;
} ;

ApplicationProviders.displayName = 'ApplicationProviders' ;

export default ApplicationProviders ;

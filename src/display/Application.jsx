'use client' ;

/**
 * Application — this package's own root : the context stack of
 * {@link module:display/ApplicationProviders}, fed with the configuration,
 * languages, locale, navigation and splash screen shipped here, wrapped in the
 * {@link module:display/ui/Dashboard} chrome.
 *
 * A host application rarely wants this one : its settings are the ones of this
 * package. Reach for `ApplicationProviders` instead, hand it your own, and
 * mount the chrome where it belongs — often below the root, so public pages
 * get the contracts without a sidebar.
 *
 * @module display/Application
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children      - The application tree.
 * @param {string}          [props.initialLang] - Language resolved on the server, so the first render agrees with the client.
 *
 * @returns {React.ReactElement}
 */

import ApplicationProviders from './ApplicationProviders' ;

import Dashboard from './ui/Dashboard' ;

import config       from '../@configs' ;
import languages    from '../@configs/languages' ;
import locale       from '../@locale' ;
import navigation   from '../@configs/navigation' ;
import splashScreen from '../@configs/ui/splashScreen' ;

const NAVIGATION_STORAGE_KEY = 'oihana-next-ui:lab:nav' ;

const Application = ( { children , initialLang } ) => (
    <ApplicationProviders
        config               = { config }
        initialLang          = { initialLang }
        languages            = { languages }
        locale               = { locale }
        navigation           = { navigation }
        navigationStorageKey = { NAVIGATION_STORAGE_KEY }
        splashScreen         = { splashScreen }
    >
        <Dashboard>
            { children }
        </Dashboard>
    </ApplicationProviders>
) ;

Application.displayName = 'Application' ;

export default Application ;

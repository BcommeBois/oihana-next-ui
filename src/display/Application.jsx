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

const FEEDBACK_STORAGE_KEY = 'oihana-next-ui:lab:feedback' ;

/**
 * The lab's navbar shows the sound switch, off by default elsewhere : the
 * signals, scanner and scan field pages all make sounds.
 * @type {Object}
 */
const NAVBAR_PROPS = { controls : { sound : true } } ;

/**
 * The lab's sidebar shows the pending spinner on the link just clicked
 * (`LinkPending`) : in development nothing is prefetched, so it is the one
 * place the option can be seen at leisure. Off by default elsewhere.
 * @type {boolean}
 */
const NAVIGATION_PENDING_INDICATOR = true ;

const Application = ( { children , initialLang } ) => (
    <ApplicationProviders
        config                     = { config }
        feedbackStorageKey         = { FEEDBACK_STORAGE_KEY }
        initialLang                = { initialLang }
        languages                  = { languages }
        locale                     = { locale }
        navigation                 = { navigation }
        navigationPendingIndicator = { NAVIGATION_PENDING_INDICATOR }
        navigationStorageKey       = { NAVIGATION_STORAGE_KEY }
        splashScreen               = { splashScreen }
    >
        <Dashboard navbarProps={ NAVBAR_PROPS }>
            { children }
        </Dashboard>
    </ApplicationProviders>
) ;

Application.displayName = 'Application' ;

export default Application ;

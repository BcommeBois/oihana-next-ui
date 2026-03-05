'use client' ;

import { useState } from 'react' ;

import useI18n from '../locale/useI18n' ;

import mapI18nItem from './helpers/mapI18nItem' ;

import NavigationContext from './context' ;

/**
 * Provides navigation context with i18n support.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components.
 * @param {Object[]} props.defaultNavigation - Default navigation items.
 * @param {string} [props.i18nPath='navigation'] - Locale path for navigation labels.
 *
 * @returns {React.ReactElement} The provider component.
 *
 * @example
 * ```jsx
 * const navigation =
 * [
 *     { id: 'home' , path: '/' , Icon: HomeIcon } ,
 *     { id: 'about' , path: '/about' , Icon: InfoIcon } ,
 * ] ;
 *
 * <NavigationProvider defaultNavigation={ navigation }>
 *     { children }
 * </NavigationProvider>
 * ```
 */
const NavigationProvider =
({
    children ,
    defaultNavigation ,
    i18nPath = 'navigation' ,
} ) =>
{
    const locale = useI18n( i18nPath ) ;

    const [ _navigation , setNavigation ] = useState( defaultNavigation ) ;

    const navigation = Array.isArray( _navigation ) && _navigation.length > 0
                     ? _navigation.map( ( item ) => mapI18nItem( item , locale ) )
                     : null ;

    return (
        <NavigationContext value={ { navigation , setNavigation } }>
            { children }
        </NavigationContext>
    ) ;
} ;

export default NavigationProvider ;
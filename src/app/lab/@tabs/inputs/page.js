'use client' ;

import { useState } from 'react' ;

import format from 'vegas-js-core/src/strings/fastformat' ;

import Badge    from '@/components/Badge' ;
import Divider  from '@/components/Divider' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import I18nMetas from '@/components/i18n/I18nMetas' ;
import useI18n   from '@/contexts/locale/useI18n' ;

import I18nInputDemo       from '@/demo/inputs/I18nInputDemo' ;
import InputActionDemo     from '@/demo/inputs/InputActionDemo' ;
import InputCardDemo       from '@/demo/inputs/InputCardDemo' ;
import InputClearDemo      from '@/demo/inputs/InputClearDemo' ;
import InputCounterDemo    from '@/demo/inputs/InputCounterDemo' ;
import InputCurrencyDemo   from '@/demo/inputs/InputCurrencyDemo' ;
import InputDateDemo       from '@/demo/inputs/InputDateDemo' ;
import InputDateRangeDemo  from '@/demo/inputs/InputDateRangeDemo' ;
import InputHexColorDemo   from '@/demo/inputs/InputHexColorDemo' ;
import InputPercentageDemo from '@/demo/inputs/InputPercentageDemo' ;
import InputSearchDemo     from '@/demo/inputs/InputSearchDemo' ;
import InputSizesDemo      from '@/demo/inputs/InputSizesDemo' ;
import InputTagsDemo       from '@/demo/inputs/InputTagsDemo' ;
import InputPasswordDemo   from '@/demo/inputs/InputPasswordDemo' ;
import InputPinDemo        from '@/demo/inputs/InputPinDemo' ;
import PasswordStrengthDemo from '@/demo/passwords/PasswordStrengthDemo' ;
import InputTimeDemo       from '@/demo/inputs/InputTimeDemo' ;
import InputTransformDemo  from '@/demo/inputs/InputTransformDemo' ;
import InputUrlEmailDemo   from '@/demo/inputs/InputUrlEmailDemo' ;
import InputValidatorDemo  from '@/demo/inputs/InputValidatorDemo' ;

import {
    MdAttachMoney ,
    MdCalendarToday ,
    MdClear ,
    MdColorLens ,
    MdCreditCard ,
    MdDateRange ,
    MdEmail ,
    MdLabel ,
    MdLock ,
    MdPercent ,
    MdPin ,
    MdPassword ,
    MdPlaylistAdd ,
    MdPlusOne ,
    MdSearch ,
    MdTextFields ,
    MdSchedule ,
    MdStraighten ,
    MdTranslate ,
    MdVerified ,
    MdViewModule ,
} from 'react-icons/md' ;

/**
 * The categories, in the order the page lays them out.
 *
 * 🔑 Identifiers, not labels : the heading is read from the bundle, and a
 * grouping key cannot be a translated string — the grouping would break in the
 * other language.
 *
 * @type {string[]}
 */
const CATEGORIES = [ 'text' , 'numbers' , 'dates' , 'security' , 'specialized' ] ;

/**
 * The page's rows : what each one shows, and where it belongs.
 *
 * Their copy lives in the bundle under the same key, so a row and its sentence
 * are read by one name and cannot drift apart. The `all` row shows no
 * component : it is the filter that groups every other one.
 *
 * @type {Array<{ key : string , icon : React.ElementType , category : ?string , component : ?React.ReactNode }>}
 */
const ROWS =
[
    { key : 'all'               , icon : MdViewModule    , category : null          , component : null } ,

    { key : 'transform'         , icon : MdTextFields    , category : 'text'        , component : <InputTransformDemo /> } ,
    { key : 'clear'             , icon : MdClear         , category : 'text'        , component : <InputClearDemo /> } ,
    { key : 'search'            , icon : MdSearch        , category : 'text'        , component : <InputSearchDemo /> } ,
    { key : 'sizes'             , icon : MdStraighten    , category : 'text'        , component : <InputSizesDemo /> } ,
    { key : 'action'            , icon : MdPlaylistAdd   , category : 'text'        , component : <InputActionDemo /> } ,
    { key : 'tags'              , icon : MdLabel         , category : 'text'        , component : <InputTagsDemo /> } ,
    { key : 'i18n-input'        , icon : MdTranslate     , category : 'text'        , component : <I18nInputDemo /> } ,

    { key : 'counter'           , icon : MdPlusOne       , category : 'numbers'     , component : <InputCounterDemo /> } ,
    { key : 'currency'          , icon : MdAttachMoney   , category : 'numbers'     , component : <InputCurrencyDemo /> } ,
    { key : 'percentage'        , icon : MdPercent       , category : 'numbers'     , component : <InputPercentageDemo /> } ,

    { key : 'date'              , icon : MdCalendarToday , category : 'dates'       , component : <InputDateDemo /> } ,
    { key : 'date-range'        , icon : MdDateRange     , category : 'dates'       , component : <InputDateRangeDemo /> } ,
    { key : 'time'              , icon : MdSchedule      , category : 'dates'       , component : <InputTimeDemo /> } ,

    { key : 'password'          , icon : MdLock          , category : 'security'    , component : <InputPasswordDemo /> } ,
    { key : 'password-strength' , icon : MdPassword      , category : 'security'    , component : <PasswordStrengthDemo /> } ,
    { key : 'pin'               , icon : MdPin           , category : 'security'    , component : <InputPinDemo /> } ,
    { key : 'validator'         , icon : MdVerified      , category : 'security'    , component : <InputValidatorDemo /> } ,

    { key : 'card'              , icon : MdCreditCard    , category : 'specialized' , component : <InputCardDemo /> } ,
    { key : 'hex-color'         , icon : MdColorLens     , category : 'specialized' , component : <InputHexColorDemo /> } ,
    { key : 'url-email'         , icon : MdEmail         , category : 'specialized' , component : <InputUrlEmailDemo /> } ,
] ;

/**
 * Input showcase page : a filter bar, then every field grouped by category.
 *
 * @param {Object} props
 * @param {string} [props.path='app.lab.inputs'] - Dot notation path to the page locale.
 */
const Inputs = ( { path = 'app.lab.inputs' } = {} ) =>
{
    const { categories , count , description , items , tip , title } = useI18n( path ) ;

    const [ filter , setFilter ] = useState( 'all' ) ;

    const filterConfig = ROWS.map( row => (
    {
        ...row ,
        description : items?.[ row.key ]?.description ,
        label       : items?.[ row.key ]?.label ,
    } ) ) ;

    const componentsToShow = filter === 'all'
        ? filterConfig.filter( item => item.component !== null )
        : filterConfig.filter( item => item.key === filter ) ;

    const activeFilter = filterConfig.find( item => item.key === filter ) ;

    const handleFilterChange = ( key ) =>
    {
        setFilter( key ) ;
    } ;

    return (
        <Page className="gap-8" maxWidth="max-w-7xl">

            <I18nMetas path={ path } />

            <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                        { title }
                    </h1>
                    <Badge color="primary" size="lg">
                        { componentsToShow.length }
                    </Badge>
                </div>

                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    { description }
                </p>
            </Container>

            <Divider />

            <Container maxWidth="max-w-full">
                <div className="flex flex-col gap-4">
                    <div className="overflow-x-auto">
                        <div role="tablist" className="tabs tabs-boxed bg-base-200 p-2 rounded-box shadow-inner inline-flex min-w-full">
                            { filterConfig.map( ({ key , label , icon: Icon }) => (
                                <button
                                    key       = { key }
                                    role      = "tab"
                                    className = { `tab gap-2 whitespace-nowrap ${ filter === key ? 'tab-active' : '' }` }
                                    onClick   = { () => handleFilterChange( key ) }
                                >
                                    <Icon size={ 18 } />
                                    <span className="hidden sm:inline">{ label }</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    { activeFilter && (
                        <div className="alert bg-base-100 shadow-md">
                            <activeFilter.icon className="text-primary" size={ 24 } />
                            <div className="flex-1">
                                <h3 className="font-semibold">{ activeFilter.label }</h3>
                                <p className="text-xs opacity-70">{ activeFilter.description }</p>
                                { activeFilter.category && (
                                    <Badge color="ghost" size="xs" className="mt-1">
                                        { categories?.[ activeFilter.category ] }
                                    </Badge>
                                )}
                            </div>
                            <Badge color="ghost" size="sm">
                                { format( count ?? '{0}' , filter === 'all' ? componentsToShow.length : 1 ) }
                            </Badge>
                        </div>
                    )}
                </div>
            </Container>

            <Divider />

            <Container className="flex flex-col gap-8" maxWidth="max-w-7xl">
                { filter === 'all' ? (
                    CATEGORIES.map( category =>
                    {
                        const categoryComponents = componentsToShow.filter( item => item.category === category ) ;

                        if ( categoryComponents.length === 0 ) { return null ; }

                        return (
                            <div key={ category } className="flex flex-col gap-6">

                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl font-bold text-primary">
                                        { categories?.[ category ] }
                                    </h2>
                                    <Badge color="primary" size="lg">
                                        { categoryComponents.length }
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 gap-8">
                                    { categoryComponents.map( ({ component , description : rowDescription , icon : Icon , key , label }) => (
                                        <div key={ key } className="animate-fadeIn">
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold flex items-center gap-2">
                                                    <span className="text-secondary">
                                                        <Icon size={ 24 } />
                                                    </span>
                                                    { label }
                                                </h3>
                                                <p className="text-sm opacity-70 mt-1">
                                                    { rowDescription }
                                                </p>
                                                <Divider className="my-3" />
                                            </div>

                                            { component }
                                        </div>
                                    ))}
                                </div>

                                { category !== CATEGORIES[ CATEGORIES.length - 1 ] && (
                                    <Divider className="my-4" />
                                )}

                            </div>
                        ) ;
                    })
                ) : (
                    componentsToShow.map( ({ key , component }) => (
                        <div key={ key } className="animate-fadeIn">
                            { component }
                        </div>
                    ))
                )}
            </Container>

            <Container className="text-center opacity-60" maxWidth="max-w-4xl">
                <p className="text-sm">
                    { tip }
                </p>
            </Container>

        </Page>
    ) ;
} ;

export default Inputs ;

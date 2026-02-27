'use client' ;

import { useState } from 'react' ;

import Badge    from '@/components/Badge' ;
import Divider  from '@/components/Divider' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import InputCardDemo       from '@/demo/inputs/InputCardDemo' ;
import InputClearDemo      from '@/demo/inputs/InputClearDemo' ;
import InputCounterDemo    from '@/demo/inputs/InputCounterDemo' ;
import InputCurrencyDemo   from '@/demo/inputs/InputCurrencyDemo' ;
import InputDateDemo       from '@/demo/inputs/InputDateDemo' ;
import InputDateRangeDemo  from '@/demo/inputs/InputDateRangeDemo' ;
import InputHexColorDemo   from '@/demo/inputs/InputHexColorDemo' ;
import InputPercentageDemo from '@/demo/inputs/InputPercentageDemo' ;
import InputSearchDemo     from '@/demo/inputs/InputSearchDemo' ;
import InputPasswordDemo   from '@/demo/inputs/InputPasswordDemo' ;
import InputPinDemo        from '@/demo/inputs/InputPinDemo' ;
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
    MdLock ,
    MdPercent ,
    MdPin ,
    MdPlusOne ,
    MdSearch ,
    MdTextFields ,
    MdSchedule ,
    MdVerified ,
    MdViewModule ,
} from 'react-icons/md' ;

/**
 * Input showcase page with improved filter UI.
 */
const Inputs = ({ path = 'app.test' }) =>
{
    const [ filter , setFilter ] = useState( 'all' ) ;

    const filterConfig =
    [
        {
            key         : 'all' ,
            label       : 'All' ,
            icon        : MdViewModule ,
            description : 'View all Input components' ,
            category    : null ,
            component   : null ,
        } ,
        // Text & Transform
        {
            key         : 'transform' ,
            label       : 'Transform' ,
            icon        : MdTextFields ,
            description : 'Text transformation (uppercase, lowercase, capitalize)' ,
            category    : 'Text' ,
            component   : <InputTransformDemo /> ,
        } ,
        {
            key         : 'clear' ,
            label       : 'Clear' ,
            icon        : MdClear ,
            description : 'Input with clear button' ,
            category    : 'Text' ,
            component   : <InputClearDemo /> ,
        } ,
        {
            key         : 'search' ,
            label       : 'Search' ,
            icon        : MdSearch ,
            description : 'Search input with icon' ,
            category    : 'Text' ,
            component   : <InputSearchDemo /> ,
        } ,
        // Numbers & Values
        {
            key         : 'counter' ,
            label       : 'Counter' ,
            icon        : MdPlusOne ,
            description : 'Number input with increment/decrement buttons' ,
            category    : 'Numbers' ,
            component   : <InputCounterDemo /> ,
        } ,
        {
            key         : 'currency' ,
            label       : 'Currency' ,
            icon        : MdAttachMoney ,
            description : 'Currency input with formatting' ,
            category    : 'Numbers' ,
            component   : <InputCurrencyDemo /> ,
        } ,
        {
            key         : 'percentage' ,
            label       : 'Percentage' ,
            icon        : MdPercent ,
            description : 'Percentage input (0-100%)' ,
            category    : 'Numbers' ,
            component   : <InputPercentageDemo /> ,
        } ,
        // Date & Time
        {
            key         : 'date' ,
            label       : 'Date' ,
            icon        : MdCalendarToday ,
            description : 'Date picker input' ,
            category    : 'Date & Time' ,
            component   : <InputDateDemo /> ,
        } ,
        {
            key         : 'date-range' ,
            label       : 'Date Range' ,
            icon        : MdDateRange ,
            description : 'Date range picker (start/end dates)' ,
            category    : 'Date & Time' ,
            component   : <InputDateRangeDemo /> ,
        } ,
        {
            key         : 'time' ,
            label       : 'Time' ,
            icon        : MdSchedule ,
            description : 'Time picker input' ,
            category    : 'Date & Time' ,
            component   : <InputTimeDemo /> ,
        } ,
        // Security & Validation
        {
            key         : 'password' ,
            label       : 'Password' ,
            icon        : MdLock ,
            description : 'Password input with show/hide toggle' ,
            category    : 'Security' ,
            component   : <InputPasswordDemo /> ,
        } ,
        {
            key         : 'pin' ,
            label       : 'PIN' ,
            icon        : MdPin ,
            description : 'PIN code input with multiple digits' ,
            category    : 'Security' ,
            component   : <InputPinDemo /> ,
        } ,
        {
            key         : 'validator' ,
            label       : 'Validator' ,
            icon        : MdVerified ,
            description : 'Input with validation rules' ,
            category    : 'Security' ,
            component   : <InputValidatorDemo /> ,
        } ,
        // Specialized
        {
            key         : 'card' ,
            label       : 'Card' ,
            icon        : MdCreditCard ,
            description : 'Credit card number input with formatting' ,
            category    : 'Specialized' ,
            component   : <InputCardDemo /> ,
        } ,
        {
            key         : 'hex-color' ,
            label       : 'Hex Color' ,
            icon        : MdColorLens ,
            description : 'Hexadecimal color input (#RRGGBB)' ,
            category    : 'Specialized' ,
            component   : <InputHexColorDemo /> ,
        } ,
        {
            key         : 'url-email' ,
            label       : 'URL & Email' ,
            icon        : MdEmail ,
            description : 'URL and Email input validation' ,
            category    : 'Specialized' ,
            component   : <InputUrlEmailDemo /> ,
        } ,
    ] ;

    const componentsToShow = filter === 'all'
        ? filterConfig.filter( item => item.component !== null )
        : filterConfig.filter( item => item.key === filter ) ;

    const activeFilter = filterConfig.find( item => item.key === filter ) ;

    // Group by category for better display
    const categories = [ 'Text' , 'Numbers' , 'Date & Time' , 'Security' , 'Specialized' ] ;

    const handleFilterChange = ( key ) =>
    {
        setFilter( key ) ;
    } ;

    return (
        <Page className="gap-8" maxWidth="max-w-7xl">

            {/* Header Section */}
            <Container className="flex flex-col gap-4 text-center" maxWidth="max-w-4xl">
                <div className="flex items-center justify-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                        Input Components
                    </h1>
                    <Badge color="primary" size="lg">
                        { componentsToShow.length }
                    </Badge>
                </div>

                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    Explore our comprehensive collection of specialized input components:
                    text inputs, number inputs, date/time pickers, password fields, validators, and more.
                </p>
            </Container>

            <Divider />

            {/* Filter Tabs - Scrollable on mobile */}
            <Container maxWidth="max-w-full">
                <div className="flex flex-col gap-4">
                    {/* Tab Buttons - Scrollable */}
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

                    {/* Active Filter Description */}
                    { activeFilter && (
                        <div className="alert bg-base-100 shadow-md">
                            <activeFilter.icon className="text-primary" size={ 24 } />
                            <div className="flex-1">
                                <h3 className="font-semibold">{ activeFilter.label }</h3>
                                <p className="text-xs opacity-70">{ activeFilter.description }</p>
                                { activeFilter.category && (
                                    <Badge color="ghost" size="xs" className="mt-1">
                                        { activeFilter.category }
                                    </Badge>
                                )}
                            </div>
                            <Badge color="ghost" size="sm">
                                { filter === 'all' ? `${ componentsToShow.length } components` : '1 component' }
                            </Badge>
                        </div>
                    )}
                </div>
            </Container>

            <Divider />

            {/* Components Display */}
            <Container className="flex flex-col gap-8" maxWidth="max-w-7xl">
                { filter === 'all' ? (
                    // Group by category when showing all
                    categories.map( category => {
                        const categoryComponents = componentsToShow.filter(
                            item => filterConfig.find( config => config.key === item.key )?.category === category
                        ) ;

                        if ( categoryComponents.length === 0 ) return null ;

                        return (
                            <div key={ category } className="flex flex-col gap-6">
                                {/* Category Header */}
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl font-bold text-primary">{ category }</h2>
                                    <Badge color="primary" size="lg">
                                        { categoryComponents.length }
                                    </Badge>
                                </div>

                                {/* Components in this category */}
                                <div className="grid grid-cols-1 gap-8">
                                    { categoryComponents.map( ({ key , component }) => {
                                        const config = filterConfig.find( item => item.key === key ) ;

                                        return (
                                            <div key={ key } className="animate-fadeIn">
                                                <div className="mb-4">
                                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                                        { config?.icon && (
                                                            <span className="text-secondary">
                                                                <config.icon size={ 24 } />
                                                            </span>
                                                        )}
                                                        { config?.label }
                                                    </h3>
                                                    <p className="text-sm opacity-70 mt-1">
                                                        { config?.description }
                                                    </p>
                                                    <Divider className="my-3" />
                                                </div>

                                                { component }
                                            </div>
                                        ) ;
                                    })}
                                </div>

                                { category !== categories[ categories.length - 1 ] && (
                                    <Divider className="my-4" />
                                )}
                            </div>
                        ) ;
                    })
                ) : (
                    // Single component view
                    componentsToShow.map( ({ key , component }) => (
                        <div key={ key } className="animate-fadeIn">
                            { component }
                        </div>
                    ))
                )}
            </Container>

            {/* Footer Info */}
            <Container className="text-center opacity-60" maxWidth="max-w-4xl">
                <p className="text-sm">
                    💡 Tip: Use the tabs above to filter inputs by category or view specific components
                </p>
            </Container>

        </Page>
    ) ;
} ;

export default Inputs ;
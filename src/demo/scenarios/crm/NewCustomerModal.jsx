'use client' ;

import { useState } from 'react' ;

import { MdPersonAdd } from 'react-icons/md' ;

import FormModal          from '@/components/modals/FormModal' ;
import Input              from '@/components/inputs/Input' ;
import InputAddressSearch from '@/components/inputs/InputAddressSearch' ;
import InputTags          from '@/components/inputs/InputTags' ;
import Select             from '@/components/selects/Select' ;

import ban from '@/helpers/geo/adapters/ban' ;

import { useCrm } from './CrmProvider' ;
import { SECTORS } from './data' ;

/**
 * The form of a new customer, in a dialog that opens on mount.
 *
 * The address comes from the French national address base : the place chosen
 * gives the street, the town and the position the map will use. The customer
 * joins the base as a lead.
 *
 * @param {Object} props
 * @param {Object} props.common - The CRM's shared copy.
 * @param {Function} props.onClose - Called once the dialog has closed.
 * @param {Function} props.onCreated - `( id , name ) => void`, after the save.
 * @param {Object} props.t - The form's copy.
 */
const NewCustomerModal = ( { common , onClose , onCreated , t } ) =>
{
    const { addCustomer , reps } = useCrm() ;

    const [ name    , setName    ] = useState( '' ) ;
    const [ sector  , setSector  ] = useState( SECTORS[ 0 ] ) ;
    const [ contact , setContact ] = useState( '' ) ;
    const [ email   , setEmail   ] = useState( '' ) ;
    const [ phone   , setPhone   ] = useState( '' ) ;
    const [ query   , setQuery   ] = useState( '' ) ;
    const [ place   , setPlace   ] = useState( null ) ;
    const [ repId   , setRepId   ] = useState( reps[ 0 ]?.id ) ;
    const [ tags    , setTags    ] = useState( [] ) ;

    const dirty = Boolean( name || contact || email || phone || place || tags.length ) ;

    const onSave = () =>
    {
        const address = place?.address ?? {} ;

        const id = addCustomer(
        {
            address   :
            {
                locality      : address.addressLocality ?? '' ,
                postalCode    : address.postalCode ?? '' ,
                streetAddress : address.streetAddress ?? query ,
            } ,
            contact   : { email , name : contact , phone } ,
            documents : [] ,
            geo       : place?.geo ? { latitude : place.geo.latitude , longitude : place.geo.longitude } : null ,
            name      : name.trim() ,
            notes     : '' ,
            repId ,
            revenue   : 0 ,
            sector ,
            status    : 'lead' ,
            tags ,
        } ) ;

        onCreated?.( id , name.trim() ) ;

        return true ;
    } ;

    return (
        <FormModal
            dirty        = { dirty }
            icon         = { <MdPersonAdd size={ 20 } /> }
            onClose      = { onClose }
            onSave       = { onSave }
            saveDisabled = { !name.trim() }
            saveLabel    = { t.save }
            title        = { t.title }
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label={ t.name } onChange={ setName } required value={ name } />
                <Select label={ t.sector } onChange={ event => setSector( event.target.value ) } value={ sector }>
                    { SECTORS.map( key => <option key={ key } value={ key }>{ common.sectors?.[ key ] }</option> ) }
                </Select>
                <Input label={ t.contact } onChange={ setContact } value={ contact } />
                <Select label={ t.rep } onChange={ event => setRepId( event.target.value ) } value={ repId }>
                    { reps.map( rep => <option key={ rep.id } value={ rep.id }>{ rep.name }</option> ) }
                </Select>
                <Input label={ t.email } onChange={ setEmail } type="email" value={ email } />
                <Input label={ t.phone } onChange={ setPhone } type="tel" value={ phone } />
                <div className="sm:col-span-2">
                    <InputAddressSearch
                        geocode  = { ban }
                        helper   = { t.addressHelp }
                        label    = { t.address }
                        onChange = { setQuery }
                        onSelect = { setPlace }
                        value    = { query }
                    />
                </div>
                <div className="sm:col-span-2">
                    <InputTags label={ t.tags } onChange={ setTags } value={ tags } />
                </div>
            </div>
        </FormModal>
    ) ;
} ;

export default NewCustomerModal ;

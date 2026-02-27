import fastFormat from 'vegas-js-core/src/strings/fastformat'

const format = ( { expression , count , plural , singular } = {} ) => fastFormat( expression , count > 1 ? plural : singular ) ;

const getPluralizeOptions = ( options = null ) => ({ format , ...options }) ;

export default getPluralizeOptions ;

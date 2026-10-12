'use client' ;

import CrmProvider from '@/demo/scenarios/crm/CrmProvider' ;

/**
 * The CRM's shell : its base sits above its pages, so what one page changes
 * the others see.
 */
const Layout = ( { children } ) => <CrmProvider>{ children }</CrmProvider> ;

export default Layout ;

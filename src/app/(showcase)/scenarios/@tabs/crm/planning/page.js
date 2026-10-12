'use client' ;

import I18nMetas from '@/components/i18n/I18nMetas' ;
import useI18n   from '@/contexts/locale/useI18n' ;

import Container from '@/display/Container' ;
import Page      from '@/display/Page' ;

import PlanningDemo from '@/demo/scenarios/crm/PlanningDemo' ;

/**
 * CRM planning page — the sales reps' appointments, and booking one.
 *
 * @param {Object} props
 * @param {string} [props.path='app.scenarios.crm.planning'] - Dot notation path to the page locale.
 */
const CrmPlanning = ( { path = 'app.scenarios.crm.planning' } = {} ) =>
{
    const { description , title } = useI18n( path ) ?? {} ;

    return (
        <Page full className='gap-8'>

            <I18nMetas path={ path } />

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    { title }
                </h1>
                <p className="text-base-content/60 mt-2 italic">
                    { description }
                </p>
            </Container>

            <PlanningDemo />

        </Page>
    ) ;
} ;

export default CrmPlanning ;

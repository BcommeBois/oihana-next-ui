'use client' ;

/**
 * Accordion demo component.
 *
 * Single-column, stacked sections so each accordion has room to breathe.
 *
 * @module demo/layouts/AccordionDemo
 */

import Accordion from '@/components/layouts/Accordion' ;

const items =
[
    { id: 'account'  , title: 'How do I create an account?'            , content: 'Click the "Sign Up" button in the top right corner and follow the registration process.' , defaultOpen: true } ,
    { id: 'password' , title: 'I forgot my password. What should I do?' , content: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.' } ,
    { id: 'profile'  , title: 'How do I update my profile information?' , content: 'Go to "My Account" settings and select "Edit Profile" to make changes.' } ,
] ;

/**
 * A titled example block.
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.hint]
 * @param {import('react').ReactNode} props.children
 */
const Section = ({ title , hint , children }) => (
    <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">{ title }</h2>
            { hint && <p className="text-sm opacity-60">{ hint }</p> }
        </div>
        { children }
    </section>
) ;

export default function AccordionDemo()
{
    return (
        <div className="flex flex-col gap-10">

            <Section
                title = "Arrow icon (exclusif)"
                hint  = "Un seul item ouvert à la fois."
            >
                <Accordion icon="arrow" items={ items } />
            </Section>

            <Section title="Plus / minus icon">
                <Accordion icon="plus" items={ items } />
            </Section>

            <Section
                title = "allowMultiple"
                hint  = "Plusieurs items peuvent rester ouverts en même temps."
            >
                <Accordion allowMultiple icon="arrow" items={ items } />
            </Section>

            <Section
                title = "join"
                hint  = "Items collés, bordures et arrondis gérés automatiquement."
            >
                <Accordion join icon="arrow" items={ items } />
            </Section>

            <Section
                title = "Item désactivé"
                hint  = "Le troisième item n'est pas cliquable."
            >
                <Accordion
                    icon="arrow"
                    items={[
                        ...items.slice( 0 , 2 ) ,
                        { id: 'disabled' , title: 'Élément désactivé' , content: 'Inaccessible.' , disabled: true } ,
                    ]}
                />
            </Section>

        </div>
    ) ;
}

'use client' ;

import CheckBoxDemo from '@/demo/checkboxes/CheckBoxDemo';
import Container from '@/display/Container';
import Page      from '@/display/Page' ;

/**
 * CheckBoxes showcase page.
 *
 * Displays all checkBoxes components with variations.
 *
 * @param {Object} props
 */
const CheckBoxesShowcase = ({ path = 'app.test' }) =>
{
    return (
        <Page full className='gap-8'>

            <Container className="text-center" maxWidth="max-w-4xl">
                <h1 className="text-4xl font-bold bg-linear-to-r from-secondary to-primary inline-block text-transparent bg-clip-text">
                    Checkbox Components
                </h1>
            </Container>

            <CheckBoxDemo />

        </Page>
    ) ;
} ;

export default CheckBoxesShowcase ;
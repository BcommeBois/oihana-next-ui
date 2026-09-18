'use client' ;

import Container from '@/display/Container' ;

import InputCounter  from '@/components/inputs/InputCounter' ;
import InputCurrency from '@/components/inputs/InputCurrency' ;
import InputPassword from '@/components/inputs/InputPassword' ;
import InputSearch   from '@/components/inputs/InputSearch' ;

// Smallest to largest — each row sets every field at one size.
const SIZES = [ 'xs' , 'sm' , 'md' , 'lg' ] ;

/**
 * Input sizes demo.
 *
 * The action buttons of a field — the clear and search buttons, the stepper,
 * the visibility toggle — take the field's `size`, so they share its height
 * at every size, as the date and time pickers already did.
 */
const InputSizesDemo = () => (
    <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

        <h3 className="text-2xl font-bold">Tailles</h3>

        <p className="text-sm text-base-content/70">
            Les boutons collés à un champ prennent sa taille : à chaque ligne, ils ont exactement la hauteur du champ.
        </p>

        { SIZES.map( size => (
            <div key={ size } className="flex flex-col gap-2">
                <span className="text-xs font-mono text-base-content/60">size="{ size }"</span>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <InputSearch
                        defaultValue    = "chêne"
                        showClearButton
                        size            = { size }
                    />
                    <InputCounter
                        defaultValue = { 12 }
                        showIcon     = { false }
                        size         = { size }
                    />
                    <InputPassword
                        defaultValue = "secret"
                        size         = { size }
                    />
                    <InputCurrency
                        defaultValue = { 1234.5 }
                        size         = { size }
                    />
                </div>
            </div>
        ) ) }

    </Container>
) ;

export default InputSizesDemo ;

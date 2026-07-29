'use client' ;

import Select    from '@/components/selects/Select' ;
import Container from '@/display/Container' ;

/**
 * Palette selector shared by the charts demo pages.
 *
 * The palette choice is still provisional, so every charts page carries this
 * so the three can be compared on real data, in both light and dark.
 *
 * @param {Object} props
 * @param {string} props.value - The selected palette.
 * @param {Function} props.onChange - Called with the new palette name.
 */
const PalettePicker = ( { value , onChange } ) => (
    <Container className="flex flex-wrap items-end gap-4" maxWidth="max-w-full">
        <Select
            label    = "Palette"
            size     = "sm"
            value    = { value }
            onChange = { ( event ) => onChange( event.target.value ) }
        >
            <option value="nivo">nivo — palette par défaut</option>
            <option value="brand">brand — dérivée du thème</option>
            <option value="theme">theme — sémantiques DaisyUI</option>
        </Select>

        <p className="text-sm text-base-content/60">
            Basculez aussi le thème clair/sombre : les textes, axes et grilles suivent DaisyUI.
        </p>
    </Container>
) ;

export default PalettePicker ;

'use client' ;

import Select    from '@/components/selects/Select' ;
import Container from '@/display/Container' ;

/**
 * Palette selector, shared by every demo page that colours a set of categories.
 *
 * It started on the charts pages and now serves the scheduler too : both resolve
 * the same palettes through the same hook, so both are worth comparing on real
 * data, in light and in dark.
 *
 * @param {Object} props
 * @param {string} props.value - The selected palette.
 * @param {Function} props.onChange - Called with the new palette name.
 * @param {string} [props.hint] - The line under the selector. Defaults to the charts wording.
 */
const PalettePicker = ( { value , onChange , hint } ) => (
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
            { hint ?? 'Basculez aussi le thème clair/sombre : les textes, axes et grilles suivent DaisyUI.' }
        </p>
    </Container>
) ;

export default PalettePicker ;

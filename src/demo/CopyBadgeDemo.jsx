'use client' ;

/**
 * The two badges that act on their value : one copies it, the other reaches
 * whoever is behind it.
 *
 * The feedback is wired here, in the demo, because that is exactly where it
 * belongs in a real screen — the badges call back, they do not toast.
 *
 * @module demo/CopyBadgeDemo
 */

import { MdSms } from 'react-icons/md' ;

import ContactBadge from '@/components/ContactBadge' ;
import CopyBadge    from '@/components/CopyBadge' ;
import Divider      from '@/components/Divider' ;

import useToast , { ERROR , SUCCESS } from '@/contexts/toasts/useToast' ;

import Container from '@/display/Container' ;

const CopyBadgeDemo = () =>
{
    const { toast } = useToast() ;

    const onCopy      = value => toast( `« ${ value } » copied to the clipboard.` , SUCCESS ) ;
    const onCopyError = ()    => toast( 'Unable to copy.' , ERROR ) ;

    const feedback = { onCopy , onCopyError } ;

    return (
        <Container className="flex flex-col gap-6 bg-base-200/60 p-8 rounded-box" maxWidth="max-w-7xl">

            <h2 className="text-3xl font-bold">Copy badge</h2>

            <p className="text-sm text-base-content/70 max-w-2xl">
                Click a badge to copy its value. The glyph turns into a check and the badge borrows the
                success colour for a moment, then goes back. A failed write turns it red instead.
            </p>

            <Divider>Sizes</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <CopyBadge size="xs" value="AB-1042" { ...feedback } />
                <CopyBadge size="sm" value="AB-1042" { ...feedback } />
                <CopyBadge size="md" value="AB-1042" { ...feedback } />
                <CopyBadge size="lg" value="AB-1042" { ...feedback } />
                <CopyBadge size="xl" value="AB-1042" { ...feedback } />
            </div>

            <Divider>Colours and variants</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <CopyBadge color="primary" value="AB-1042" { ...feedback } />
                <CopyBadge color="accent"  value="AB-1042" { ...feedback } />
                <CopyBadge color="neutral" value="AB-1042" { ...feedback } />
                <CopyBadge color="info" style="soft"    value="AB-1042" { ...feedback } />
                <CopyBadge color="info" style="outline" value="AB-1042" { ...feedback } />
                <CopyBadge color="info" style="dash"    value="AB-1042" { ...feedback } />
            </div>

            <Divider>Nothing to copy</Divider>

            <p className="text-sm text-base-content/70">
                An empty value renders nothing at all — there is no badge below this line.
            </p>
            <div className="flex flex-wrap items-center gap-3">
                <CopyBadge value="" />
                <CopyBadge value={ null } />
            </div>

            <h2 className="text-3xl font-bold mt-4">Contact badge</h2>

            <p className="text-sm text-base-content/70 max-w-2xl">
                The pill acts — it dials, faxes or opens a message — and the button beside it copies.
                What is shown keeps its separators ; the link keeps only the digits.
            </p>

            <Divider>Channels</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <ContactBadge type="phone"  value="01 23 45 67 89"     { ...feedback } />
                <ContactBadge type="mobile" value="+33 6 12 34 56 78"  { ...feedback } />
                <ContactBadge type="fax"    value="01 23 45 67 90"     { ...feedback } />
                <ContactBadge type="email"  value="hello@example.org"  { ...feedback } />
            </div>

            <Divider>Shown, but not actionable</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <ContactBadge disabled type="phone" value="01 23 45 67 89" { ...feedback } />
                <ContactBadge copyable={ false } type="email" value="hello@example.org" />
            </div>

            <Divider>Another channel</Divider>

            <div className="flex flex-wrap items-center gap-3">
                <ContactBadge
                    icon   = { MdSms }
                    scheme = "sms:"
                    type   = "mobile"
                    value  = "+33 6 12 34 56 78"
                    { ...feedback }
                />
            </div>

        </Container>
    ) ;
} ;

CopyBadgeDemo.displayName = 'CopyBadgeDemo' ;

export default CopyBadgeDemo ;

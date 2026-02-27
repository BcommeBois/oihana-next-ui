import Jump from '@/motions/Jump';

import LetterReveal from '@/motions/LetterReveal';
import LinkButton from '@/components/links/LinkButton';

export default function NotFound()
{
    return (
        <div className="flex grow flex-col items-center justify-center gap-8 p-8 text-base-300/20 pattern-topography">

            <hgroup className='text-center text-base-content' >

                <Jump delay={ 0.5 } bounce={ 0.5 }>
                    <h1 className="text-6xl font-bold text-secondary">404</h1>
                </Jump>

                <LetterReveal as='div' text="Page introuvable" delay={ 0.8 } className='text-lg' />

            </hgroup>

            <LinkButton
                color = "primary"
                href  = "/"
            >
                Retour à l'accueil
            </LinkButton>

        </div>
    )
}
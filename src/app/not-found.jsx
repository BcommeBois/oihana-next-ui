import ErrorScreen from '@/components/ErrorScreen' ;

/**
 * The lab's own 404 — and the demonstration of
 * {@link module:components/ErrorScreen}, which is better shown by a page that
 * really is one than by a card pretending.
 *
 * Reach it by typing any address this application does not serve.
 */
export default function NotFound()
{
    return (
        <ErrorScreen
            code      = "404"
            href      = "/"
            hrefLabel = "Retour à l'accueil"
            title     = "Page introuvable"
        />
    ) ;
}

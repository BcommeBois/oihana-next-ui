import cn from '@/themes/helpers/cn';
import useConfig from '@/contexts/config';
import version from '@/version';

/**
 * @typedef {Object} VersionConfig
 * @property {boolean} [show] - Whether to display the version footer.
 * @property {string} [className] - CSS classes for version footer.
 */

/**
 * Version footer component.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names.
 * @param {string} [props.configPath='ui.sidebar.version'] - Config context path.
 *
 * @example
 * ```jsx
 * <Version />
 * ```
 *
 * @example
 * ```jsx
 * <Version configPath="ui.footer.version" />
 * ```
 */
const Version = ({
    className,
    configPath = 'ui.version',
}) =>
{
    const {
        show = true,
        className : configClassName,
    }
    = useConfig( configPath ) ?? {} ;

    if ( show === false || !version )
    {
        return null ;
    }

    const versionClassName = cn
    (
        'flex flex-none justify-center w-full p-3 text-xs text-center text-base-content font-serif',
        configClassName ,
        className
    );

    return (
        <div className={ versionClassName }>
            version { version }
        </div>
    );
};

export default Version;
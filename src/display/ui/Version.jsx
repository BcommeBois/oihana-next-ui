import cn        from '../../themes/helpers/cn';
import useConfig from '../../contexts/config/useConfig';

/**
 * @typedef {Object} VersionConfig
 * @property {boolean} [show] - Whether to display the version component.
 * @property {string} [className] - CSS classes for version component.
 * @property {string}  [version]   - The version label.
 */

/**
 * Version component.
 *
 * @param {Object} props
 * @param {string}  [props.className]                        - Additional class names.
 * @param {string}  [props.configPath='ui.version']          - Config context path.
 * @param {string}  [props.version]                          - Version label. Overrides config value.
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
const Version =
({
    className,
    configPath = 'ui.version',
    version : versionProp ,
}) =>
{
    const {
        className : configClassName ,
        show      = true ,
        version   = versionProp ,
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
/**
 * FlagMenu demo component.
 *
 * @module demo/FlagMenuDemo
 */

import { useState } from 'react' ;

import FlagMenu from '@/components/menus/FlagMenu' ;

export default function FlagMenuDemo()
{
    const [ currentLang , setCurrentLang ] = useState( 'fr' ) ;

    return (
        <>

            {/* Default FlagMenu */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">FlagMenu - Default</h2>
                    <FlagMenu
                        lang={ currentLang }
                        onChange={ setCurrentLang }
                        showLabel
                        showTooltip
                    />
                </div>
            </div>

            {/* Without Label */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">FlagMenu - Sans label</h2>
                    <FlagMenu
                        lang={ currentLang }
                        onChange={ setCurrentLang }
                        showLabel={ false }
                        showTooltip
                    />
                </div>
            </div>

            {/* Without Tooltip */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">FlagMenu - Sans tooltip</h2>
                    <FlagMenu
                        lang={ currentLang }
                        onChange={ setCurrentLang }
                        showLabel
                        showTooltip={ false }
                    />
                </div>
            </div>

            {/* Vertical */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">FlagMenu - Vertical</h2>
                    <FlagMenu
                        lang={ currentLang }
                        onChange={ setCurrentLang }
                        orientation="vertical"
                        showLabel
                        showTooltip
                    />
                </div>
            </div>

            {/* With Indicators */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">FlagMenu - Avec indicateurs</h2>
                    <FlagMenu
                        lang={ currentLang }
                        onChange={ setCurrentLang }
                        showLabel
                        showTooltip
                        indicators={{ en: true , fr: false }}
                    />
                </div>
            </div>

            {/* Disabled */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-sm">FlagMenu - Désactivé</h2>
                    <FlagMenu
                        lang={ currentLang }
                        onChange={ setCurrentLang }
                        showLabel
                        showTooltip
                        disabled
                    />
                </div>
            </div>

        </>
    ) ;
}
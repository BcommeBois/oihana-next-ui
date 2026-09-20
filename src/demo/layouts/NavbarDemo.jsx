'use client' ;

/**
 * NavbarDemo — the end section of a `Navbar`, composed.
 *
 * The three built-in controls are shown as they come, then dropped one by one
 * through `controls`, then kept for a wide screen only — the case an
 * application reaches for when the top-right corner is out of thumb's reach on
 * a hand-held device. The last card puts the bar in a narrow box, where the
 * title is cut rather than pushing the controls off the end — with two controls
 * dropped, since a bar keeps only half its width for the title and five icons
 * would not fit whatever the title did.
 *
 * @module demo/layouts/NavbarDemo
 */

import Button from '@/components/Button' ;
import Navbar from '@/display/ui/Navbar' ;

import { MdShoppingCart as CartIcon , MdPerson as ProfileIcon } from 'react-icons/md' ;

/**
 * The controls an application adds of its own, which `right` always shows.
 *
 * @returns {React.ReactElement}
 */
const AppControls = () => (
    <>
        <Button icon={ CartIcon } shape="circle" size="sm" style="ghost" title="Cart" />
        <Button icon={ ProfileIcon } shape="circle" size="sm" style="ghost" title="Profile" />
    </>
) ;

/**
 * One demonstrated bar, with the line of code that produces it.
 *
 * @param {Object}          props
 * @param {React.ReactNode} props.children - The `Navbar`.
 * @param {string}          props.code     - The props under discussion.
 * @param {string}          props.title
 * @returns {React.ReactElement}
 */
const Case = ( { children , code , title } ) => (
    <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold opacity-70 uppercase">{ title }</h3>
        { children }
        <code className="text-xs text-base-content/50">{ code }</code>
    </div>
) ;

const NavbarDemo = () => (
    <div className="card bg-base-200 shadow-xl">
        <div className="card-body">

            <h2 className="card-title text-2xl mb-4">Navbar — end section</h2>

            <div className="flex flex-col gap-6">

                <Case title="Default" code="<Navbar right={ … } />">
                    <Navbar className="rounded-box border border-base-300" right={ <AppControls /> } />
                </Case>

                <Case title="Theme control dropped" code="controls={ { theme : false } }">
                    <Navbar
                        className = "rounded-box border border-base-300"
                        controls  = { { theme : false } }
                        right     = { <AppControls /> }
                    />
                </Case>

                <Case
                    title = "Preferences kept for a wide screen"
                    code  = "controls={ { lang : 'hidden lg:inline-flex' , theme : 'hidden lg:inline-flex' } }"
                >
                    <Navbar
                        className = "rounded-box border border-base-300"
                        controls  = { {
                            lang  : 'hidden lg:inline-flex' ,
                            theme : 'hidden lg:inline-flex' ,
                        } }
                        right     = { <AppControls /> }
                    />
                </Case>

                <Case
                    title = "Narrow bar — the title is cut, the controls stay"
                    code  = "min-w-0 + truncate — a bar only has half its width for the title"
                >
                    <div className="w-80 max-w-full">
                        <Navbar
                            className = "rounded-box border border-base-300"
                            controls  = { { lang : false , theme : false } }
                            right     = { <AppControls /> }
                        />
                    </div>
                </Case>

            </div>

            <p className="text-xs text-base-content/40">
                Each key of <code>controls</code> takes <code>true</code>, <code>false</code> or a class name
                applied to a wrapper — the breakpoint stays the application&apos;s.
            </p>

        </div>
    </div>
) ;

NavbarDemo.displayName = 'NavbarDemo' ;

export default NavbarDemo ;

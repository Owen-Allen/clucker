import Link from 'next/link'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react';

const NavDropdown = ({ id }: {id: string}) => {

    {/* asChild necessary to solve this bug https://github.com/radix-ui/primitives/issues/1105 */}
    
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-8 w-8 mt-2 space-y-2 cursor-pointer"> 
            <span className="block h-0.5 w-8 bg-black"></span>
            <span className="block h-0.5 w-8 bg-black"></span>
            <span className="block h-0.5 w-8 bg-black"></span>
           </div>
            </DropdownMenuTrigger>
          <DropdownMenuContent className="round-xl p-4 ml-2 border-black border-2">
          <DropdownMenuItem asChild>
                <Link
                    href={`/search`}
                    className="text-xl font-mono tracking-wide"
                >
                    Search
             </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-500 dark:bg-slate-500"/>
            <DropdownMenuItem asChild>
                <Link
                    href={`/user/${id}`}
                    className="text-xl font-mono tracking-wide"
                >
                    My Profile
             </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-500 dark:bg-slate-500"/>

            <DropdownMenuItem asChild>
                <Link
                    href={`/feed`}
                    className="text-xl font-mono tracking-wide"
                    // BUG: for some reason text-3xl is not applying
                    
                >
                                Feed

                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-500 dark:bg-slate-500"/>
            <DropdownMenuItem>
            <button
                    className="text-xl font-mono tracking-wide"
                    onClick={() => signOut()}
              >
                    Logout
                </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    );
}


export default NavDropdown;
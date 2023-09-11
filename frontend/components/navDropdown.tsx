import Link from 'next/link'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react';

const NavDropdown = ({ user }: any) => {

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
                    className="text-3xl font-mono tracking-wide                    "
                    href={`/user/${user.id}`}
                >
                    Profile
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-500 dark:bg-slate-500"/>

            <DropdownMenuItem asChild>
                <Link
                    className="text-3xl font-mono tracking-wide                    "
                    href={`/feed`}
                >
                    Feed
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-500 dark:bg-slate-500"/>
            <DropdownMenuItem>
            <button
                    className="text-3xl font-mono tracking-wide"
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
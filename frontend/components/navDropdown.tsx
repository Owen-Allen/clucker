import Link from 'next/link'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'

import { signOut } from 'next-auth/react';

const NavDropdown = ({ id }: { id: string }) => {

  {/* asChild necessary to solve this bug https://github.com/radix-ui/primitives/issues/1105 */ }

  return (
    <Menu>
      <MenuButton>
        <div className="h-8 w-8 mt-2 space-y-2 cursor-pointer">
          <span className="block h-0.5 w-8 bg-black"></span>
          <span className="block h-0.5 w-8 bg-black"></span>
          <span className="block h-0.5 w-8 bg-black"></span>
        </div>
      </MenuButton>
      <MenuList className="-ml-6 sm:-ml-14 space-y-2 py-6 bg-white rounded-lg p-4 border-black border-2">
        <MenuItem as='a' href="/search" className="px-2 text-2xl font-mono tracking-wide">
          Search
        </MenuItem>
        <MenuDivider className="border-black"/>
        <MenuItem as='a' href={`/user/${id}`}className="px-2 text-2xl font-mono tracking-wide">
            Profile
        </MenuItem>
        <MenuDivider className="border-black"/>
        <MenuItem as='a' href='/feed' className="px-2 text-2xl font-mono tracking-wide">
          Feed
        </MenuItem>
        <MenuDivider className="border-black"/>
            <button
                    className="px-2 text-2xl font-mono tracking-wide"
                    onClick={() => signOut()}
              >
                    Logout
              </button>
            {/* <button
                    className="text-2xl font-mono tracking-wide"
                    onClick={() => signOut()}
              >
                    Logout
              </button> */}
      </MenuList>
    </Menu>
  );
}


{/*
        This dropdown is very slow on mobile. https://github.com/Owen-Allen/clucker/issues/1
        <DropdownMenu>
          <DropdownMenuTrigger className="" asChild>
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
*/}

export default NavDropdown;
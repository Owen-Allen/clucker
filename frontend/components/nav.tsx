"use client"

import Link from 'next/link'
import { Inter } from 'next/font/google'

import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })
const Nav = ({ user }: any) => {

    const pathname = usePathname()

    if (pathname === '/'){ return (<></>) }

    return (
        <nav
            className={`font-mono relative flex w-full items-center bg-sky-400 p-4 flex-wrap justify-start`}>
            <div className="flex w-full items-center justify-between ">
                {/* Navigation links */}
                <div
                    className="mx-4 sm:mx-16 grow items-center flex basis-auto"
                >
                    <Link
                        className={"block "}
                        href={`/user/${user.id}`}
                    >
                        Profile
                    </Link>
                    <Link
                        className="ml-auto"
                        href="/feed"
                    >
                        Feed
                    </Link>

                    <Link href={pathname + '/?cluckModal=true'} className='ml-auto button w-24 h-10 bg-white cursor-pointer select-none hover:none
                            active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                            active:border-b-0
                            transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                            rounded-full  border-2 border-black
                        '>
                        <span className='flex font-mono flex-col justify-center items-center h-full text-black text-lg '>Cluck</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}


export default Nav;
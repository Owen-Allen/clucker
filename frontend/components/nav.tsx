"use client"

import Link from 'next/link'

import { usePathname } from 'next/navigation';
import NavDropdown from './navDropdown';

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';

const Nav = ({ user_id }: { user_id: string }) => {
    const pathname = usePathname()
    const [top, setTop] = useState(0); // is always between -80 and 0
    const prevScrollPos = useRef(0);

    const handleScroll = (e: any) => {
        const currentScrollPos = window.scrollY;
        if (currentScrollPos > prevScrollPos.current) { // user scrolled down
            let change = currentScrollPos - prevScrollPos.current
            let newMarginTop = top - change
            if (newMarginTop < -80) {
                newMarginTop = -80
            }
            setTop(newMarginTop)
        } else { // user scrolled up
            let change = prevScrollPos.current - currentScrollPos
            let newMarginTop = top + change
            if (newMarginTop > 0) {
                newMarginTop = 0
            }
            setTop(newMarginTop)
        }
        prevScrollPos.current = currentScrollPos
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    },); // removed [top, handleScroll]

    return (
        <nav
            className={`h-20 px-4 sticky z-50 bg-sky-400 font-mono relative flex w-full items-center bg-sky-400 flex-wrap justify-start`}
            style={{ top: `${top}px` }}
        >
            <div className="flex w-full items-center justify-between ">
                {/* Navigation links */}
                <div
                    className="mx-4 sm:mx-16 grow items-center flex basis-auto"
                >
                    <NavDropdown id={user_id} />
                    <a href="/feed" className="w-12 ml-auto -mr-12 cursor-pointer">
                        <Image
                            priority
                            src={"/chicken_bg_white.png"}
                            width={500}
                            height={500}
                            alt="Click here to go to feed"
                        />
                    </a>

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
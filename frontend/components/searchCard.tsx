"use client"
import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import BackButton from './backButton';
import { Input } from "@/components/ui/input"


import { usePathname, useRouter } from 'next/navigation';

import { Button } from './ui/button';

// user's input their search query,
// feed them mini profiles based on that query
export default function SearchCard() {
    // When they click the search button, add in a query to the url params
    const pathname = usePathname()
    const router = useRouter()
    const query = useRef("")

    const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        console.log('triggered inputHandler')
        console.log(e.currentTarget.value)
        const newQuery = e.currentTarget.value;
        query.current = newQuery
      }

    const searchHandler = (e: any) => {
        e.preventDefault()
        console.log('triggered searchHandler')
        console.log(query)
        router.replace(`${pathname}/?q=${query.current}`)
    }

    useEffect(() => {
        const listener = (e:any) => {
          if (e.code === "Enter" || e.code === "NumpadEnter") {
            console.log("Enter key was pressed. Run your function.");
            e.preventDefault();
            searchHandler(e);
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, []);

    return (
        <Card className="border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl w-full">
            <CardHeader>
                <div className="-mt-2 -ml-2 flex items-center flex-row">
                    <BackButton />
                    <CardTitle className="mt-[2px] p-2 text-xl">Search</CardTitle>
                </div>
                <CardDescription>Find other users</CardDescription>

            </CardHeader>
            <CardContent>
                <form className='flex items-center space-x-2' onSubmit={searchHandler}>
                    <Input className="border-slate-500" onChange={(e: React.FormEvent<HTMLInputElement>) => inputHandler(e)}/>
                    <Button type="submit"> Search </Button>
                </form>
            </CardContent>
        </Card>)
}

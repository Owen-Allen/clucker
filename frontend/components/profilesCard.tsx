"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import BackButton from './backButton';
import MiniProfile from './miniProfile';


interface Profile {
    id: string,
    name: string
}

// could refactor into useReducer. Could also fetch from backend onChange.
export default function ProfilesCard({ user_id, id_token, query }: { user_id: string, id_token: string, query: string }) {
    const [allProfiles, setAllProfiles] = useState<Profile[]>([])
    const [displayProfiles, setDisplayProfiles] = useState<Profile[]>(allProfiles)
    

    const filterProfiles = (profiles:Profile[]) => {
        return profiles.filter((profile: Profile) => {
            // check if the username, or the name contains any of the key words
            const username = profile.id.toLocaleLowerCase()
            const name = profile.name.toLocaleLowerCase()
            const lowerQ = query.toLocaleLowerCase()
            if(username.includes(lowerQ) || name.includes(lowerQ)){
                return true
            }
            return false
        })
    }
    useEffect(() => {

        const fetchProfiles = async (): Promise<Profile[]> => {
            const headers = { Authorization: `Bearer ${id_token}` }
            const res = await fetch(`${process.env.DB_HOST}/api/user/`,
                {
                    method: "GET",
                    headers: headers,
                });
            if (res.status == 200) {
                const data = await res.json()
                const profiles = data.map((d: any) => {return {id: d['id'], name: d['name']}})
                return profiles
            }
            return []
        }
        const profilesPromise = fetchProfiles()
        profilesPromise.then((profiles:Profile[]) => {
            setAllProfiles(profiles)
            setDisplayProfiles(filterProfiles(profiles))
        })

    }, [id_token])

    useEffect(() => {
        setDisplayProfiles(filterProfiles(allProfiles))
    }, [query, allProfiles])

    return (
        <Card className="border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl">
            <CardHeader>
                <CardTitle className="p-2 text-xl">Results</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                {displayProfiles.map((p: Profile) => {
                    return (
                        <MiniProfile
                            key={p.id}
                            user_id={user_id}
                            profile_id={p.id}
                            profile_name={p.name}
                        />
                    );
                })}
            </CardContent>
        </Card>)
}

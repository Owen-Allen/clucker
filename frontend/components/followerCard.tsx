"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import MiniProfile from "./miniProfile";
import BackButton from "./backButton";
import Link from "next/link";

interface Props {
  profile_id: string;
  session: any;
}

interface Profile {
  id: string;
  name: string;
}


export default function FollowerCard({ profile_id, session }: Props) {
  const [followerIds, setFollowerIds] = useState<string[]>([]);
  const [followers, setFollower] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchFollowingIds = async () => {
      const res = await fetch(
        `${process.env.DB_HOST}/api/follow_detail/?following=${profile_id}`
      );
      console.log(res.status);
      if (res.status == 200) {
        const data = await res.json();
        const ids = data.map((d: any) => d["user_id"]);
        setFollowerIds(ids);
        return ids;
      }
      return [];
    };
    fetchFollowingIds();
  }, [profile_id]);

  useEffect(() => {
    // fetch each of the user's by id
    const fetchFollowingNames = async (ids: string[]) => {
      const responses = await Promise.all(
        ids.map(async (id) => {
          const headers = { Authorization: `Bearer ${session.id_token}` };
          const res = await fetch(`${process.env.DB_HOST}/api/user/${id}/`, {
            method: "GET",
            headers: headers,
          });
          return res;
        })
      );

      // wait for the data
      const data = await Promise.all(
        responses.map(async (response) => {
          if (response.status == 200) {
            return await response.json();
          }
          return null;
        })
      );

      const filteredData = data.filter((item) => item !== null);

      // get just the id and name
      const following = filteredData.map((d) => {
        return { id: d["id"], name: d["name"] };
      });
      setFollower(following);
    };
    fetchFollowingNames(followerIds);
  }, [session.id_token, followerIds]);

  return (
    <Card className="border-black rounded-2xl border-2 border-b-4 border-r-4 shadow-xl">
      <CardHeader>
        <div className="-mt-2 -ml-2 flex items-center flex-row">
          <Link href={`/user/${profile_id}`}>
            <svg id="svgContent" version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <defs></defs>
              <g id="svgPath">
                <path d="M 239.104 175.610 C 195.597 219.395, 160 255.563, 160 255.983 C 160 257.245, 318.105 416, 319.361 416 C 320.767 416, 352 384.891, 352 383.492 C 352 382.949, 323.539 354.042, 288.753 319.253 L 225.506 256 288.753 192.747 C 323.539 157.958, 352 129.040, 352 128.485 C 352 127.089, 320.746 96, 319.342 96 C 318.718 96, 282.611 131.824, 239.104 175.610" stroke="none" fill="#040404" fillRule="evenodd"></path>
              </g>
            </svg>
          </Link>
          <CardTitle className="mt-[2px] p-2 text-xl">Followers</CardTitle>
        </div>
        <CardDescription>See who follows {profile_id}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {followers.map((p: Profile) => {
          return (
            <MiniProfile
              key={p.id}
              user_id={session.user.id}
              profile_id={p.id}
              profile_name={p.name}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}

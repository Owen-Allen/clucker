import React from "react";
import { redirect, notFound } from "next/navigation";

import ProfileContent from "@/components/profileContent";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Modal } from "@/components/modal";
import CluckForm from "@/components/cluckForm";
import Nav from "@/components/nav";
import EditProfileForm from "@/components/editProfileForm";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session?.user?.id) {
    redirect("/signin");
  }
  const headers = {
    Authorization: `Bearer ${session.id_token}`,
  }
  
  const res = await fetch(`${process.env.DB_HOST}/api/user/${params.id}`, {method: "GET", headers: headers, cache: 'no-cache'});
  if(res.status !== 200){
    console.log('sending to not found')
    return notFound()
  }
  const profile = await res.json();
  console.log(profile)

  return (
    <>
    {session?.user?.id && <Nav user_id={session.user.id}/>}
    <main id="top" className="flex min-h-screen flex-col items-center justify-between px-8 py-4 bg-sky-400">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="w-full flex flex-col">
          {!!searchParams?.cluckModal && (
            <Modal>
              <CluckForm user={session.user} />
            </Modal>
          )}
          {!!searchParams?.editProfile && profile.id === session.user.id && (
            <Modal>
              <EditProfileForm id_token={session.id_token} profile={profile} />
            </Modal>
          )}
          <ProfileContent user={session.user} profile={profile} />
        </div>
      </div>
    </main>
  </>
  );
}

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";


import Nav from "@/components/nav";
import FollowingCard from "@/components/followingCard";
import CluckForm from "@/components/cluckForm";
import { Modal } from "@/components/modal";

export default async function Following({
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
  
  console.log('params.id')
  console.log(params.id)
  return (
    <>
      <Nav user_id={session.user.id}/>
      <main className="flex min-h-screen flex-col items-center justify-between px-8 py-4 bg-sky-400">
        <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div className="w-full flex flex-col">          
          {!!searchParams?.cluckModal && (
            <Modal>
              <CluckForm user={session.user} />
            </Modal>
          )}
              <FollowingCard profile_id={params.id} session={session}/>
          </div>
        </div>
      </main>
    </>
  );
}

import React from "react";
import { redirect } from "next/navigation";

import ProfileContent from "@/components/profileContent";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Modal } from "@/components/modal";
import CluckForm from "@/components/cluckForm";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const res = await fetch(`${process.env.DB_HOST}/api/user/${params.id}`, {
    next: { revalidate: 100 },
  });
  const profile = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-12 py-4 bg-sky-400">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {" "}
        {/* removed w-full */}
        <div className="w-full flex flex-col">
          {!!searchParams?.cluckModal && (
            <Modal>
              {" "}
              <CluckForm user={session.user} />{" "}
            </Modal>
          )}
          <ProfileContent user={session.user} profile={profile} />
        </div>
      </div>
    </main>
  );
}

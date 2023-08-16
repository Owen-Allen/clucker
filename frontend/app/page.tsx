import Image from 'next/image'
import GoogleSignInButton from '@/components/googleSignInButton'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-4 px-16 bg-sky-400">
       <div className="w-full flex flex-col max-w-5xl items-center justify-between font-mono text-sm lg:flex"> {/* removed w-full */}
        <h1 className="block text-3xl">Welcome to Clucker</h1>
        <GoogleSignInButton />
      </div>
    </main>  )
}

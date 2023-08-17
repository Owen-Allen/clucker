import Link from "next/link";

{/*
Using the router parameters to open and close the modal was an idea taken from https://itnext.io/how-to-do-a-basic-modal-in-next-js-13-7cf3b72ce919
this allows the nav to remain a server component
*/}
export function Modal({ children }: { children: React.ReactNode; }) {
    return (
        <div className="relative z-10" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75"/>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center items-center">  {/* controls where it is positioned on */}
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all overflow-auto sm:my-8 w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
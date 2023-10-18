import React, { useState, useEffect } from "react";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
  


export default function EditCluckDropdown({ cluck_id, setIsDeleted }: { cluck_id: number, setIsDeleted: Function }) {

    const handleDelete = async () => {
        // oh baby this is some bad code
        if(confirm("You sure you wanna delete dawg?")){
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
                }           
            const res = await fetch(`${process.env.DB_HOST}/api/cluck/${cluck_id}/`, requestOptions)
            setIsDeleted(true)
        }
    }

    return (
        <Menu placement="bottom" strategy="fixed">
            <MenuButton className="">
                <div className="cursor-pointer">
                    <svg width="40" height="40" viewBox="-1 -1 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0175 19C10.6601 19 10.3552 18.7347 10.297 18.373C10.2434 18.0804 10.038 17.8413 9.76171 17.75C9.53658 17.6707 9.31645 17.5772 9.10261 17.47C8.84815 17.3365 8.54289 17.3565 8.30701 17.522C8.02156 17.7325 7.62943 17.6999 7.38076 17.445L6.41356 16.453C6.15326 16.186 6.11944 15.7651 6.33361 15.458C6.49878 15.2105 6.52257 14.8914 6.39601 14.621C6.31262 14.4332 6.23906 14.2409 6.17566 14.045C6.08485 13.7363 5.8342 13.5051 5.52533 13.445C5.15287 13.384 4.8779 13.0559 4.87501 12.669V11.428C4.87303 10.9821 5.18705 10.6007 5.61601 10.528C5.94143 10.4645 6.21316 10.2359 6.33751 9.921C6.37456 9.83233 6.41356 9.74433 6.45451 9.657C6.61989 9.33044 6.59705 8.93711 6.39503 8.633C6.1424 8.27288 6.18119 7.77809 6.48668 7.464L7.19746 6.735C7.54802 6.37532 8.1009 6.32877 8.50396 6.625L8.52638 6.641C8.82735 6.84876 9.21033 6.88639 9.54428 6.741C9.90155 6.60911 10.1649 6.29424 10.2375 5.912L10.2473 5.878C10.3275 5.37197 10.7536 5.00021 11.2535 5H12.1115C12.6248 4.99976 13.0629 5.38057 13.1469 5.9L13.1625 5.97C13.2314 6.33617 13.4811 6.63922 13.8216 6.77C14.1498 6.91447 14.5272 6.87674 14.822 6.67L14.8707 6.634C15.2842 6.32834 15.8528 6.37535 16.2133 6.745L16.8675 7.417C17.1954 7.75516 17.2366 8.28693 16.965 8.674C16.7522 8.99752 16.7251 9.41325 16.8938 9.763L16.9358 9.863C17.0724 10.2045 17.3681 10.452 17.7216 10.521C18.1837 10.5983 18.5235 11.0069 18.525 11.487V12.6C18.5249 13.0234 18.2263 13.3846 17.8191 13.454C17.4842 13.5199 17.2114 13.7686 17.1083 14.102C17.0628 14.2353 17.0121 14.3687 16.9562 14.502C16.8261 14.795 16.855 15.1364 17.0323 15.402C17.2662 15.7358 17.2299 16.1943 16.9465 16.485L16.0388 17.417C15.7792 17.6832 15.3698 17.7175 15.0716 17.498C14.8226 17.3235 14.5001 17.3043 14.2331 17.448C14.0428 17.5447 13.8475 17.6305 13.6481 17.705C13.3692 17.8037 13.1636 18.0485 13.1099 18.346C13.053 18.7203 12.7401 18.9972 12.3708 19H11.0175Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.9747 12C13.9747 13.2885 12.9563 14.333 11.7 14.333C10.4437 14.333 9.42533 13.2885 9.42533 12C9.42533 10.7115 10.4437 9.66699 11.7 9.66699C12.9563 9.66699 13.9747 10.7115 13.9747 12Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></path>
                    </svg>
                </div>
            </MenuButton>
            <MenuList className="bg-white font-normal font-sans rounded-xl p-4 ml-2 border-black border-2">
                <MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
            </MenuList>
        </Menu>
    );
} 



//   return (
//     <Menu placement="bottom" strategy="fixed">
//       <MenuButton>
//         <div className="cursor-pointer">
//           <svg
//             width="24px"
//             height="24px"
//             viewBox="0 -0.5 21 21"
//             version="1.1"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <title>stats [#1371]</title>
//             <desc>Created with Sketch.</desc>
//             <defs></defs>
//             <g
//               id="Page-1"
//               stroke="none"
//               strokeWidth="1"
//               fill="none"
//               fillRule="evenodd"
//             >
//               <g
//                 id="Dribbble-Light-Preview"
//                 transform="translate(-419.000000, -800.000000)"
//                 fill="#000000"
//               >
//                 <g id="icons" transform="translate(56.000000, 160.000000)">
//                   <path
//                     d="M374.55,657 C374.55,657.552 374.0796,658 373.5,658 C372.9204,658 372.45,657.552 372.45,657 L372.45,643 C372.45,642.448 372.9204,642 373.5,642 C374.0796,642 374.55,642.448 374.55,643 L374.55,657 Z M374.55,640 L372.45,640 C371.28975,640 370.35,640.895 370.35,642 L370.35,658 C370.35,659.105 371.28975,660 372.45,660 L374.55,660 C375.71025,660 376.65,659.105 376.65,658 L376.65,642 C376.65,640.895 375.71025,640 374.55,640 L374.55,640 Z M367.2,657 C367.2,657.552 366.7296,658 366.15,658 C365.5704,658 365.1,657.552 365.1,657 L365.1,647 C365.1,646.448 365.5704,646 366.15,646 C366.7296,646 367.2,646.448 367.2,647 L367.2,657 Z M367.2,644 L365.1,644 C363.93975,644 363,644.895 363,646 L363,658 C363,659.105 363.93975,660 365.1,660 L367.2,660 C368.36025,660 369.3,659.105 369.3,658 L369.3,646 C369.3,644.895 368.36025,644 367.2,644 L367.2,644 Z M381.9,657 C381.9,657.552 381.4296,658 380.85,658 C380.2704,658 379.8,657.552 379.8,657 L379.8,653 C379.8,652.448 380.2704,652 380.85,652 C381.4296,652 381.9,652.448 381.9,653 L381.9,657 Z M381.9,650 L379.8,650 C378.63975,650 377.7,650.895 377.7,652 L377.7,658 C377.7,659.105 378.63975,660 379.8,660 L381.9,660 C383.06025,660 384,659.105 384,658 L384,652 C384,650.895 383.06025,650 381.9,650 L381.9,650 Z"
//                     id="stats-[#1371]"
//                   ></path>
//                 </g>
//               </g>
//             </g>
//           </svg>
//         </div>
//       </MenuButton>
//       <MenuList className="bg-white font-normal font-sans rounded-xl p-4 ml-2 border-black border-2">
//         <MenuItem className="p-2">{likeData.length} like{likeData.length > 1 || likeData.length == 0 ? 's' : ''}</MenuItem>
//         {likeData.length > 0 && <MenuDivider className="border-black" />}

//         {/* list of each user who has liked the cluck */}
//         {likeData.map((like) => (
//           <MenuItem className="p-2" key={like.user}>
//             <Link className="w-full" href={`/user/${like.user}#top`}>
//               {like.user}
//             </Link>
//           </MenuItem>
//         ))}
//       </MenuList>
//     </Menu>
//   );
// }

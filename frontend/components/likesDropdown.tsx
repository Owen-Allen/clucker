import React, { useState, useEffect } from "react";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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


interface Like {
  id: number;
  user: string;
  cluck: number;
}

export default function LikesDropdown({ liked, cluck_id }: { liked: boolean, cluck_id: number }) {
  const [likeData, setLikeData] = useState<Like[]>([]);

  useEffect(() => {
    const getLikeData = async () => {
      const response = await fetch(
        `${process.env.DB_HOST}/api/like_detail/?cluck=${cluck_id}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setLikeData(data);
      }
    };

    getLikeData();
  }, [cluck_id, liked]);

  return (
    <Menu placement="bottom" strategy="fixed">
      <MenuButton>
        <div className="cursor-pointer">
          <svg
            width="24px"
            height="24px"
            viewBox="0 -0.5 21 21"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>stats [#1371]</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-419.000000, -800.000000)"
                fill="#000000"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M374.55,657 C374.55,657.552 374.0796,658 373.5,658 C372.9204,658 372.45,657.552 372.45,657 L372.45,643 C372.45,642.448 372.9204,642 373.5,642 C374.0796,642 374.55,642.448 374.55,643 L374.55,657 Z M374.55,640 L372.45,640 C371.28975,640 370.35,640.895 370.35,642 L370.35,658 C370.35,659.105 371.28975,660 372.45,660 L374.55,660 C375.71025,660 376.65,659.105 376.65,658 L376.65,642 C376.65,640.895 375.71025,640 374.55,640 L374.55,640 Z M367.2,657 C367.2,657.552 366.7296,658 366.15,658 C365.5704,658 365.1,657.552 365.1,657 L365.1,647 C365.1,646.448 365.5704,646 366.15,646 C366.7296,646 367.2,646.448 367.2,647 L367.2,657 Z M367.2,644 L365.1,644 C363.93975,644 363,644.895 363,646 L363,658 C363,659.105 363.93975,660 365.1,660 L367.2,660 C368.36025,660 369.3,659.105 369.3,658 L369.3,646 C369.3,644.895 368.36025,644 367.2,644 L367.2,644 Z M381.9,657 C381.9,657.552 381.4296,658 380.85,658 C380.2704,658 379.8,657.552 379.8,657 L379.8,653 C379.8,652.448 380.2704,652 380.85,652 C381.4296,652 381.9,652.448 381.9,653 L381.9,657 Z M381.9,650 L379.8,650 C378.63975,650 377.7,650.895 377.7,652 L377.7,658 C377.7,659.105 378.63975,660 379.8,660 L381.9,660 C383.06025,660 384,659.105 384,658 L384,652 C384,650.895 383.06025,650 381.9,650 L381.9,650 Z"
                    id="stats-[#1371]"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </MenuButton>
      <MenuList className="bg-white font-normal font-sans rounded-xl p-4 ml-2 border-black border-2">
        <MenuItem className="p-2">{likeData.length} like{likeData.length > 1 || likeData.length == 0 ? 's' : ''}</MenuItem>
        {likeData.length > 0 && <MenuDivider className="border-black" />}

        {/* list of each user who has liked the cluck */}
        {likeData.map((like) => (
          <MenuItem className="p-2" key={like.user}>
            <Link className="w-full" href={`/user/${like.user}#top`}>
              {like.user}
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}


{/* <DropdownMenu>
<DropdownMenuTrigger asChild>
  <div className="cursor-pointer">
    <svg
      width="24px"
      height="24px"
      viewBox="0 -0.5 21 21"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>stats [#1371]</title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Dribbble-Light-Preview"
          transform="translate(-419.000000, -800.000000)"
          fill="#000000"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
              d="M374.55,657 C374.55,657.552 374.0796,658 373.5,658 C372.9204,658 372.45,657.552 372.45,657 L372.45,643 C372.45,642.448 372.9204,642 373.5,642 C374.0796,642 374.55,642.448 374.55,643 L374.55,657 Z M374.55,640 L372.45,640 C371.28975,640 370.35,640.895 370.35,642 L370.35,658 C370.35,659.105 371.28975,660 372.45,660 L374.55,660 C375.71025,660 376.65,659.105 376.65,658 L376.65,642 C376.65,640.895 375.71025,640 374.55,640 L374.55,640 Z M367.2,657 C367.2,657.552 366.7296,658 366.15,658 C365.5704,658 365.1,657.552 365.1,657 L365.1,647 C365.1,646.448 365.5704,646 366.15,646 C366.7296,646 367.2,646.448 367.2,647 L367.2,657 Z M367.2,644 L365.1,644 C363.93975,644 363,644.895 363,646 L363,658 C363,659.105 363.93975,660 365.1,660 L367.2,660 C368.36025,660 369.3,659.105 369.3,658 L369.3,646 C369.3,644.895 368.36025,644 367.2,644 L367.2,644 Z M381.9,657 C381.9,657.552 381.4296,658 380.85,658 C380.2704,658 379.8,657.552 379.8,657 L379.8,653 C379.8,652.448 380.2704,652 380.85,652 C381.4296,652 381.9,652.448 381.9,653 L381.9,657 Z M381.9,650 L379.8,650 C378.63975,650 377.7,650.895 377.7,652 L377.7,658 C377.7,659.105 378.63975,660 379.8,660 L381.9,660 C383.06025,660 384,659.105 384,658 L384,652 C384,650.895 383.06025,650 381.9,650 L381.9,650 Z"
              id="stats-[#1371]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </div>
</DropdownMenuTrigger>
<DropdownMenuContent className="round-xl p-4 ml-2 border-black border-2">
  <DropdownMenuItem>{likeData.length} like{likeData.length > 1 || likeData.length == 0 ? 's' : ''}</DropdownMenuItem>
  {likeData.length > 0 && <DropdownMenuSeparator className="bg-slate-500 dark:bg-slate-500" />} */}

  {/* list of each user who has liked the cluck */}
  {/* {likeData.map((like) => (
    <DropdownMenuItem key={like.user}>
      <Link className="w-full" href={`/user/${like.user}`}>
        {like.user}
      </Link>
    </DropdownMenuItem>
  ))}
</DropdownMenuContent>
</DropdownMenu> */}
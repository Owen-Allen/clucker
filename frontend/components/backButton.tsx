"use client"
import React from "react";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <svg id="svgContent" version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <defs></defs>
        <g id="svgPath">
          <path d="M 239.104 175.610 C 195.597 219.395, 160 255.563, 160 255.983 C 160 257.245, 318.105 416, 319.361 416 C 320.767 416, 352 384.891, 352 383.492 C 352 382.949, 323.539 354.042, 288.753 319.253 L 225.506 256 288.753 192.747 C 323.539 157.958, 352 129.040, 352 128.485 C 352 127.089, 320.746 96, 319.342 96 C 318.718 96, 282.611 131.824, 239.104 175.610" stroke="none" fill="#040404" fillRule="evenodd"></path>
        </g>
      </svg>
    </button>
  );
}

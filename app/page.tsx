"use client";

import ModeBar from "@/components/modebar";
import ResponseText from "@/components/response-text";
import Textbox from "@/components/textbox";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isDarkmode, setIsDarkMode] = useState(false);

  return (
    <main className="w-full h-full">
      <div className="flex items-center justify-between px-8 py-6 fixed w-full  bg-white/10 backdrop-blur-sm border border-white/10 shadow z-10">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold">WriteAI</h2>
          <Image
            className="animate-bounce"
            src="/logo.svg"
            alt="pen-icon"
            width={22}
            height={22}
          />
        </div>
        <div
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="border p-1.5 rounded-lg  border-gray-300 cursor-pointer"
        >
          <Image
            src={isDarkmode ? "/bedtime.svg" : "/darkmode.svg"}
            alt="darkmode-icon"
            width={22}
            height={22}
          />
        </div>
      </div>
      <div className="flex  w-full h-full items-center justify-center p-6">
        <div className="w-6xl py-16 flex lg:flex-row flex-col gap-6 lg:mt-16 md:mt-12 mt-8">
          <ModeBar />
          <div className="lg:flex-1 flex flex-col w-full gap-6 ">
            <Textbox />
            <ResponseText />
          </div>
        </div>
      </div>
    </main>
  );
}

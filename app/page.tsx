"use client";

import ModeBar from "@/components/modebar";
import ResponseText from "@/components/response-text";
import Textbox from "@/components/textbox";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isDarkmode, setIsDarkMode] = useState(false);
  const [currentMode, setCurrentMode] = useState("Rephrase");
  const [responseText, setResponseText] = useState("");

  return (
    <main className="w-full h-full">
      <div className="flex items-center justify-between px-8 py-6 border fixed w-full border-gray-300 bg-white z-10">
        <h2>Writing assistant</h2>
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
          <ModeBar currentMode={currentMode} setCurrentMode={setCurrentMode} />
          <div className="lg:flex-1 flex flex-col w-full gap-6 ">
            <Textbox
              setResponseText={setResponseText}
              currentMode={currentMode}
            />
            <ResponseText responseText={responseText} />
          </div>
        </div>
      </div>
    </main>
  );
}

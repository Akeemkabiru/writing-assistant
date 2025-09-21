import useAssistantStore from "@/store";
import { GoogleGenAI } from "@google/genai";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Textbox() {
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const { currentMode, setResponseText } = useAssistantStore();

  const handleReset = () => {
    setSpinning(true);
    setInput("");
    setResponseText("");

    setTimeout(() => {
      setSpinning(false);
    }, 500);
  };

  const modeText =
    currentMode === "Rephrase"
      ? "Rephrase this:"
      : currentMode === "Expand"
      ? "Expand this text:"
      : "Summarize this text:";

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${modeText} ${input}`,
      }),
    onSuccess: (data) =>
      setResponseText(data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ""),
    onError: (error) => toast.error(error.message),
  });

  return (
    <div className="rounded-2xl border shadow p-4 border-gray-300  space-y-2 flex-1">
      <div className="flex justify-between items-center my-4">
        <div className="flex items-center gap-2 font-semibold">
          <Image
            src={
              currentMode === "Rephrase"
                ? "/pen.svg"
                : currentMode === "Summarize"
                ? "/note.svg"
                : "/expand.svg"
            }
            alt="darkmode-icon"
            width={22}
            height={22}
          />
          <p>{currentMode}</p>
          <p>Mode</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-gray-300 py-1 px-2">
          <Image
            onClick={() => handleReset()}
            src="/reset.svg"
            alt="reset-icon"
            width={22}
            height={22}
            className={`${spinning ? "animate-spin" : ""} cursor-pointer`}
          />

          <p className="">Reset</p>
        </div>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text to rephrase"
        rows={7}
        className="w-full border border-gray-300 rounded-2xl p-3 focus:outline-black"
      />
      <button
        onClick={() => mutate()}
        className="w-full hover:scale-102 flex items-center justify-center transition-all duration-300 bg-black text-center text-white py-2 rounded-lg font-medium cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <Image
            src="/loading.svg"
            alt="loading-icon"
            width={22}
            height={22}
            className={`cursor-pointer transition-all duration-500 ${
              isPending ? "animate-spin" : ""
            }`}
          />
        ) : (
          `${currentMode} Text`
        )}
      </button>
    </div>
  );
}

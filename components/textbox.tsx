import { GoogleGenAI } from "@google/genai";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toast";

export default function Textbox({
  currentMode,
  setResponseText,
}: {
  currentMode: string;
  setResponseText: (text: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);

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

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${modeText} ${input}`,
      });
      const text = response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      setResponseText(text);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  }

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
        className="w-full border border-gray-300 rounded-2xl p-3"
      />
      <button
        onClick={() => handleSubmit()}
        className="w-full hover:scale-102 flex items-center justify-center transition-all duration-300 bg-black text-center text-white py-2 rounded-lg font-medium cursor-pointer"
        disabled={loading}
      >
        {loading ? (
          <Image
            src="/loading.svg"
            alt="loading-icon"
            width={22}
            height={22}
            className={`cursor-pointer transition-all duration-500 ${
              loading ? "animate-spin" : ""
            }`}
          />
        ) : (
          `${currentMode} Text`
        )}
      </button>
    </div>
  );
}

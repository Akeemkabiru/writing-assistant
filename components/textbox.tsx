import useGenerateResponse from "@/hooks/useGenerateResponse";
import useAssistantStore from "@/store";
import Image from "next/image";
import { useState } from "react";

export default function Textbox() {
  const [input, setInput] = useState("");
  const [spinning, setSpinning] = useState(false);
  const { currentMode, setResponseText } = useAssistantStore();
  const { mutate, isPending } = useGenerateResponse(input);

  const handleReset = () => {
    setSpinning(true);
    setInput("");
    setResponseText("");

    setTimeout(() => {
      setSpinning(false);
    }, 500);
  };

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
        className="w-full flex items-center justify-center transition-all duration-300 py-2 rounded-lg font-medium cursor-pointer bg-button-bg text-button-text"
        disabled={isPending || !input}
        style={{
          backgroundColor: "var(--button-bg)",
          color: "var(--button-text)",
        }}
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

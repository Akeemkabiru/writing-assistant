import useAssistantStore from "@/store";
import { MODE } from "@/types/enums";
import { handleClipboard } from "@/utils/helpers";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

export default function ResponseText() {
  const { responseText, currentMode } = useAssistantStore();

  if (!responseText) return null;

  const modeResult =
    currentMode === MODE.Rephrase
      ? "Rephrased"
      : currentMode === MODE.Summarized
      ? "Summarized"
      : currentMode === MODE.Expand
      ? "Expanded"
      : "";

  return (
    <div className="rounded-2xl border shadow p-4 border-gray-300  space-y-2">
      <div>
        <div className="flex items-center justify-between my-4">
          <p className="font-semibold">{modeResult} Contents</p>
          <div
            onClick={() => handleClipboard(responseText)}
            className="flex items-center gap-2 rounded-xl border border-gray-300 py-1 px-2 cursor-pointer"
          >
            <Image src="/copy.svg" alt="copy-icon" width={22} height={22} />
            <p className="text-sm">Copy</p>
          </div>
        </div>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{responseText}</ReactMarkdown>{" "}
        </div>
      </div>
    </div>
  );
}

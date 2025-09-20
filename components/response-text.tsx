import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

export default function ResponseText({
  responseText,
  currentMode,
}: {
  responseText: string;
  currentMode: string;
}) {
  if (!responseText) return null;

  async function handleClipboard() {
    try {
      await navigator.clipboard.writeText(responseText);
      toast.success("Response copied");
    } catch (error) {
      toast.error("Failed to copy: " + error);
    }
  }

  const modeResult =
    currentMode === "Rephrase"
      ? "Rephrased"
      : currentMode === "Summarize"
      ? "Summarized"
      : currentMode === "Expand"
      ? "Expanded"
      : "";

  return (
    <div className="rounded-2xl border shadow p-4 border-gray-300  space-y-2">
      <div>
        <div className="flex items-center justify-between my-4">
          <p className="font-semibold">{modeResult} Contents</p>
          <div
            onClick={() => handleClipboard()}
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

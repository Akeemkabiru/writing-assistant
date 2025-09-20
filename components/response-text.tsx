import Image from "next/image";
import React from "react";
import { toast } from "react-toast";

export default function ResponseText({
  responseText,
}: {
  responseText: string;
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

  return (
    <div className="rounded-2xl border shadow p-4 border-gray-300  space-y-2">
      <div>
        <div className="flex items-center justify-between my-4">
          <p className="font-semibold">Contents</p>
          <div
            onClick={() => handleClipboard()}
            className="flex items-center gap-2 rounded-xl border border-gray-300 py-1 px-2 cursor-pointer"
          >
            <Image src="/copy.svg" alt="copy-icon" width={22} height={22} />
            <p className="text-sm">Copy</p>
          </div>
        </div>
        <div className="hyphens-auto text-justify">{responseText}</div>
      </div>
    </div>
  );
}

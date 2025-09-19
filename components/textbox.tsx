import React from "react";

export default function Textbox() {
  return (
    <div className="rounded-2xl border-2 p-4 border-gray-300 opacity-50 space-y-2 flex-1">
      <div className="flex justify-between items-center my-4">
        <p>Mode</p>
        <button>Reset</button>
      </div>
      <textarea
        rows={7}
        className="w-full border-2 border-gray-300 rounded-2xl p-2"
      />
      <button className="w-full bg-black text-center text-white py-2 rounded-lg font-medium">
        Rephrase Text
      </button>
    </div>
  );
}

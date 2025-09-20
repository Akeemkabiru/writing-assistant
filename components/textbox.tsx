import Image from "next/image";

export default function Textbox() {
  return (
    <div className="rounded-2xl border-2 p-4 border-gray-300  space-y-2 flex-1">
      <div className="flex justify-between items-center my-4">
        <p>Mode</p>
        <div className="flex items-center gap-2 rounded-xl border border-gray-300 py-1 px-2">
          <Image src="/reset.svg" alt="darkmode-icon" width={22} height={22} />
          <p>Reset</p>
        </div>
      </div>
      <textarea
        placeholder="Enter your text to rephrase"
        rows={7}
        className="w-full border-2 border-gray-300 rounded-2xl p-3"
      />
      <button className="w-full bg-black text-center text-white py-2 rounded-lg font-medium">
        Rephrase Text
      </button>
    </div>
  );
}

import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Textbox({ currentMode }: { currentMode: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");

  console.log(process.env.NEXT_HF_API_KEY);

  const query = async (model, input) => {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: input }), // ✅ use "inputs"
      }
    );
    return response.data;
  };

  const handleSummarize = async () => {
    setLoading(true);
    setResult("");
    try {
      const data = await query("Falconsai/text_summarization", input);
      setResult(data[0]?.summary_text || "No summary generated.");
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRephrase = async () => {
    setLoading(true);
    setResult("");
    try {
      const data = await query(
        "Vamsi/T5_Paraphrase_Paws",
        `Rephrase this: ${input}`
      );
      setResult(data[0]?.generated_text || "No rephrase generated.");
    } catch (err: any) {
      setResult(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = async () => {
    setLoading(true);
    setResult("");
    try {
      const data = await query(
        "google/flan-t5-small",
        `Expand this text: ${input}`
      );
      setResult(data[0]?.generated_text || "No expansion generated.");
    } catch (err: any) {
      setResult("⚠️ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(result);

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
          <Image src="/reset.svg" alt="darkmode-icon" width={22} height={22} />
          <p>Reset</p>
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
        onClick={() => handleSummarize()}
        className="w-full hover:scale-102 transition-all duration-300 bg-black text-center text-white py-2 rounded-lg font-medium cursor-pointer"
      >
        {`${currentMode} Text`}
      </button>
    </div>
  );
}

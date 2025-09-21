import useAssistantStore from "@/store";
import { MODE } from "@/types/enums";
import { GoogleGenAI } from "@google/genai";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useGenerateResponse(input: string) {
  const { setResponseText, currentMode } = useAssistantStore();

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });

  const modeText =
    currentMode === MODE.Rephrase
      ? "Rephrase this:"
      : currentMode === MODE.Expand
      ? "Expand this text:"
      : "Summarize this text:";

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${modeText} ${input}`,
      }),
    onSuccess: (data) =>
      setResponseText(
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
          "No response generated"
      ),
    onError: (error) => toast.error(error.message),
  });

  return { mutate, isPending };
}

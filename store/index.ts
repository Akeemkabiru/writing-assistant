import { MODE } from "@/types/enums";
import { create } from "zustand";

interface IStore {
  currentMode: string;
  responseText: string;
  setCurrentMode: (mode: string) => void;
  setResponseText: (response: string) => void;
}

const useAssistantStore = create<IStore>((set) => ({
  currentMode: MODE.Rephrase,
  responseText: "",
  setCurrentMode: (mode: string) =>
    set(() => ({
      currentMode: mode,
    })),
  setResponseText: (response: string) =>
    set(() => ({ responseText: response })),
}));

export default useAssistantStore;

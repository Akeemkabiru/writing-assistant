import { MODE_ITEMS } from "@/constants";
import useAssistantStore from "@/store";
import Image from "next/image";

export default function ModeBar() {
  const { currentMode, setCurrentMode } = useAssistantStore();

  return (
    <div>
      <div className="h-full over lg:w-xs w-full  space-y-3">
        {MODE_ITEMS.map(({ title, text, icon }, index: number) => {
          const isActive = currentMode === title;

          return (
            <div
              key={index}
              className={`rounded-2xl shadow px-2 py-4  transition-all duration-300  space-y-2 cursor-pointer hover:scale-105 ${
                isActive ? "border-black border-2" : "border-gray-300 border"
              }`}
              onClick={() => setCurrentMode(title)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={icon} alt="" width={24} height={24} />
                  <p className="font-semibold">{title}</p>
                </div>

                {isActive && (
                  <p className="text-xs bg-black rounded-2xl text-white px-1 font-semibold">
                    Active
                  </p>
                )}
              </div>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

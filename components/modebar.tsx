import { MODE_ITEMS } from "@/constants";
import Image from "next/image";

export default function ModeBar({
  currentMode,
  setCurrentMode,
}: {
  currentMode: string;
  setCurrentMode: (title: string) => void;
}) {
  return (
    <div>
      <div className="h-full over lg:w-xs w-full  space-y-3">
        {MODE_ITEMS.map(({ title, text, icon }, index: number) => {
          const isActive = currentMode === title;

          return (
            <div
              key={index}
              className={`rounded-2xl border shadow px-2 py-4 border-gray-300 transition-all duration-300  space-y-2 cursor-pointer hover:scale-105 ${
                isActive ? "" : ""
              }`}
              onClick={() => setCurrentMode(title)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={icon} alt="" width={24} height={24} />
                  <p className="font-medium">{title}</p>
                </div>

                {isActive && <p>Active</p>}
              </div>
              <p className="text-sm">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { MODE_ITEMS } from "@/constants";
import Image from "next/image";

export default function ModeBar() {
  return (
    <div>
      <div className="h-full over lg:w-xs w-full  space-y-3">
        {MODE_ITEMS.map(({ title, text, icon }, index: number) => {
          return (
            <div
              key={index}
              className="rounded-2xl border-2 px-2 py-4 border-gray-300  space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image src={icon} alt="" width={24} height={24} />
                  <p className="font-medium">{title}</p>
                </div>
                <div>
                  <p>Active</p>
                </div>
              </div>
              <p className="text-sm">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

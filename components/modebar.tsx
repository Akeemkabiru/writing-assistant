import { MODE_ITEMS } from "@/constants";

export default function ModeBar() {
  return (
    <div>
      <div className="h-full over lg:w-xs w-full  space-y-3">
        {MODE_ITEMS.map(({ title, text, icon }, index: number) => {
          return (
            <div
              key={index}
              className="rounded-2xl border-2 px-2 py-4 border-gray-300 opacity-50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <p>{title}</p>
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

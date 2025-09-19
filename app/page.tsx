import ModeBar from "@/components/modebar";
import ResponseText from "@/components/response-text";
import Textbox from "@/components/textbox";

export default function Home() {
  return (
    <main className="w-full h-full">
      <div className="flex items-center justify-between p-8 border-2 fixed w-full bg-white z-10">
        <h2>AI writing assistant</h2>
        <div>toggle</div>
      </div>
      <div className="flex  w-full h-full items-center justify-center p-6">
        <div className="w-6xl py-16 flex lg:flex-row flex-col gap-6 lg:mt-16 md:mt-12 mt-8">
          <ModeBar />
          <div className="lg:flex-1 flex flex-col w-full ">
            <Textbox />
            <ResponseText />
          </div>
        </div>
      </div>
    </main>
  );
}

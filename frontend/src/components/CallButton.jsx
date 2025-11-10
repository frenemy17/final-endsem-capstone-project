import { VideoIcon } from "lucide-react";
import { Button } from "./ui/button";

function CallButton({ handleVideoCall }) {
  return (
    <div className="p-3 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-end max-w-7xl mx-auto w-full absolute top-0 z-10">
      <Button onClick={handleVideoCall} size="sm" className="bg-green-600 hover:bg-green-700">
        <VideoIcon className="size-4 mr-2" />
        Start Call
      </Button>
    </div>
  );
}

export default CallButton;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useState } from "react";
import HelpDefault from "./HelpDefault";
import { Button } from "@/components/ui/button";
import HelpHome from "./HelpHome";
import { Label } from "@/components/ui/label";

function HelpDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const helpItems = [
    {
      title: "마롱 서비스 소개",
      content: <HelpDefault />,
    },

    {
      title: "홈 화면 소개",
      content: <HelpHome />,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col h-full sm:max-w-sm max-h-2/3">
        <DialogHeader className="w-full">
          <DialogTitle>마롱 도움말</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 p-4 w-full rounded-lg border">
          <Label className="text-lg font-bold text-brown-900">
            {helpItems[currentIndex].title}
          </Label>
          {helpItems[currentIndex].content}
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="flex-1"
            disabled={currentIndex === 0}
          >
            이전
          </Button>
          <Button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="flex-1"
            disabled={currentIndex === helpItems.length - 1}
          >
            다음
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default HelpDialog;

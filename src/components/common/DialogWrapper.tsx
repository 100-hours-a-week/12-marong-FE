import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface DialogWrapperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function DialogWrapper({
  open,
  setOpen,
  title,
  description,
  children,
}: DialogWrapperProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="w-full">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

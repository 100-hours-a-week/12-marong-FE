import { cn } from "@/lib/utils";

function FloatingButton({
  onClick,
  children,
  className,
}: {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed bottom-0 z-30 mb-16 w-full max-w-sm">
      <div className="flex justify-end p-6">
        <button
          className={cn(
            "flex justify-center items-center w-12 h-12 text-2xl text-white rounded-full shadow-lg cursor-pointer bg-brown",
            className
          )}
          onClick={() => onClick()}
        >
          {children}
        </button>
      </div>
    </div>
  );
}

export default FloatingButton;

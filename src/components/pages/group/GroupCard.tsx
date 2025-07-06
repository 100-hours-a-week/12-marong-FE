import { Label } from "@/components/ui/label";
import defaultGroupImage from "@/assets/default_group.png";
import { Crown, Ellipsis, Info, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function GroupCard({
  imageUrl,
  description,
  name,
  isOwner = false,
  onInfo,
  onUpdate,
  onLeave,
}: {
  title?: string;
  imageUrl?: string;
  description: string;
  name: string;
  isOwner: boolean;
  onInfo: () => void;
  onUpdate: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-4 w-full rounded-lg border-b">
      <div className="flex flex-row gap-2 justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <img
            src={imageUrl || defaultGroupImage}
            alt="group"
            className="object-cover rounded-full size-16"
          />
          <div className="flex flex-col gap-2">
            <Label className="font-bold">{description}</Label>
            <Label className="font-bold text-brown-dark">{name}</Label>
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center me-4">
          {isOwner && <Crown className="text-yellow-500 size-5" />}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="p-1 rounded-full cursor-pointer pointer-events-auto hover:bg-gray-200 hover:text-brown-dark">
                <Ellipsis className="size-6" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onInfo}>
                <Info className="size-4" />
                <span>정보</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onUpdate}>
                <Pencil className="size-4" />
                <span>프로필 수정</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLeave}>
                <Trash className="text-red-500 size-4" />
                <span className="text-red-500">탈퇴</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;

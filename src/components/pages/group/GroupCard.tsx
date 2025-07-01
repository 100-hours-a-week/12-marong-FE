import { Label } from "@/components/ui/label";
import defaultGroupImage from "@/assets/default_group.png";
import { Crown } from "lucide-react";

function GroupCard({
  imageUrl,
  description,
  name,
  isOwner = false,
  onClick,
}: {
  title?: string;
  imageUrl?: string;
  description: string;
  name: string;
  isOwner: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="flex flex-col gap-4 py-4 w-full rounded-lg border-b hover:bg-brown-light/10"
      onClick={onClick}
    >
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

        {isOwner && <Crown className="text-yellow-500 size-5 me-4" />}
      </div>
    </div>
  );
}

export default GroupCard;

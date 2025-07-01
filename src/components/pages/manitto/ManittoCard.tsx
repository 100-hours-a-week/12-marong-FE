import { Label } from "@/components/ui/label";
import defaultManittoImage from "@/assets/default_profile.png";

function ManittoCard({
  title,
  imageUrl,
  description,
  name,
}: {
  title?: string;
  imageUrl?: string;
  description: string;
  name: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-4 w-full border-b">
      {title && (
        <Label className="text-lg font-bold text-brown-dark">{title}</Label>
      )}

      <div className="flex flex-row gap-4 items-center">
        <img
          src={imageUrl || defaultManittoImage}
          alt="manitto"
          className="object-cover rounded-full size-16"
        />
        <div className="flex flex-col gap-2">
          <Label className="font-bold">{description}</Label>
          <Label className="font-bold text-brown-dark">{name}</Label>
        </div>
      </div>
    </div>
  );
}

export default ManittoCard;

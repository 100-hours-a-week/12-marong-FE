import type { IFeedDto } from "@/api/feed/type";
import defaultProfile from "@/assets/default_profile.png";
import { Label } from "@/components/ui/label";
import { Ellipsis } from "lucide-react";
import ElapsedTimeText from "@/components/common/ElapsedTimeText";
import Marong from "@/assets/Marong";

function FeedCard({
  feed,
  toggleLike,
}: {
  feed: IFeedDto;
  toggleLike: ({
    feedId,
    isLiked,
  }: {
    feedId: number;
    isLiked: boolean;
  }) => void;
}) {
  return (
    <div className="flex flex-col py-2 border-b">
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-3 items-center py-2">
          <img
            src={defaultProfile}
            alt="프로필 이미지"
            className="rounded-full size-10"
          />

          <div className="flex flex-col items-start">
            <Label className="justify-center items-center text-sm font-bold">
              {feed.author} → {feed.manitteeName}
            </Label>
            <Label className="text-sm text-gray-500">{feed.missionTitle}</Label>
          </div>
        </div>

        <Ellipsis />
      </div>

      <div className="flex justify-start">
        {feed.imageUrl !== null && (
          <img
            src={feed.imageUrl}
            alt="Feed"
            className="w-full h-auto rounded-lg"
          />
        )}
      </div>

      <div className="flex justify-between pt-4 pb-2 ps-2">
        <div className="flex flex-col gap-1 pe-4">
          {/* <Label className="text-sm font-bold text-start">{feed.author}</Label> */}
          <Label className="text-sm text-gray-700 text-start break-keep">
            {feed.content}
          </Label>
        </div>

        <div className="justify-center items-center ps-4 pe-2">
          {/* <Heart
            size={24}
            fill={feed.isLiked ? "#FF8FA3" : "none"}
            stroke={feed.isLiked ? "#FF8FA3" : "#D3D3D3"}
            onClick={() => {
              toggleLike({ feedId: feed.feedId, isLiked: feed.isLiked });
            }}
            className="cursor-pointer"
          /> */}
          <Marong
            className="cursor-pointer size-6"
            fill={feed.isLiked ? "#915118" : "#D3D3D3"}
            onClick={() => {
              toggleLike({ feedId: feed.feedId, isLiked: feed.isLiked });
            }}
          />

          <div className="text-xs text-center">{feed.likes}</div>
        </div>
      </div>

      <ElapsedTimeText
        className="px-2 pb-2 text-xs text-gray-500 text-start"
        createdDate={feed.createdAt}
      />
    </div>
  );
}

export default FeedCard;

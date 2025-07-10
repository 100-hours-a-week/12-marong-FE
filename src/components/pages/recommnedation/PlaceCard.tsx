import type { IPlace } from "@/api/place/type";
import Marong from "@/assets/Marong";

function PlaceCard({
  place,
  onClick,
  togglePlaceLike,
}: {
  place: IPlace;
  onClick: () => void;
  togglePlaceLike: ({
    placeId,
    isLiked,
  }: {
    placeId: number;
    isLiked: boolean;
  }) => void;
}) {
  return (
    <div
      className="flex flex-col gap-2 p-2 m-2 w-full rounded-xl border-2"
      onClick={onClick}
    >
      <div className="font-bold text-start">{place.name}</div>
      <div className="text-start text-[0.8rem]">{place.category}</div>
      <div className="text-xs text-gray-500 text-start">{place.hours}</div>
      <div className="text-xs text-gray-500 text-start">{place.address}</div>
      <div className="flex justify-end">
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
          fill={place.isLiked ? "#915118" : "#F0F0F0"}
          onClick={() => {
            togglePlaceLike({
              placeId: place.placeId,
              isLiked: place.isLiked,
            });
          }}
        />
      </div>
    </div>
  );
}

export default PlaceCard;

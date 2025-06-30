import type { IPlace } from "@/api/place/type";

function PlaceCard({ place, onClick }: { place: IPlace; onClick: () => void }) {
  return (
    <div
      className="flex flex-col gap-2 p-2 m-2 w-full rounded-xl border-2"
      onClick={onClick}
    >
      <div className="font-bold text-start">{place.name}</div>
      <div className="text-start text-[0.8rem]">{place.category}</div>
      <div className="text-xs text-gray-500 text-start">{place.hours}</div>
      <div className="text-xs text-gray-500 text-start">{place.address}</div>
    </div>
  );
}

export default PlaceCard;

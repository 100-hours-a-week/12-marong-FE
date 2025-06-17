function PlaceCard({ place, onClick }) {
  return (
    <div
      className="flex flex-col w-full gap-2 p-2 m-2 border rounded-lg"
      onClick={onClick}
    >
      <div className="font-bold text-start">{place.name}</div>
      <div className="text-start text-[0.8rem]">{place.category}</div>
      <div className="text-xs text-gray-500 text-start">
        {place.operation_hour}
      </div>
      <div className="text-xs text-gray-500 text-start">{place.address}</div>
    </div>
  );
}

export default PlaceCard;

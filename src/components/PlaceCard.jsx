"use client"

function PlaceCard({place, onClick}) {

  return (
    <div className="flex flex-col w-full border p-2 gap-2 rounded-lg m-2" onClick={onClick}>
      <div className="font-bold text-start">{place.name}</div>
      <div className="text-start text-[0.8rem]">{place.category}</div>
      <div className="text-start text-xs text-gray-500">{place.operation_hour}</div>
      <div className="text-start text-xs text-gray-500">{place.address}</div>
    </div>
  )
}

export default PlaceCard
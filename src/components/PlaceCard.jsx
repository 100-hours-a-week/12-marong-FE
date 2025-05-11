"use client"

function PlaceCard({place, onClick}) {

  return (
    <div className="flex flex-col w-full border p-2 gap-2 rounded-lg m-2" onClick={onClick}>
      <div className="font-bold text-start">{place.name}</div>
      <div className="text-start text-xs">{place.category}</div>
      <div className="text-start text-xs">{place.hours}</div>
      <div className="text-start text-xs">{place.address}</div>
    </div>
  )
}

export default PlaceCard
import { useEffect, useRef } from "react";
import { TbLocation } from "react-icons/tb";
import useLocation from "@/context/UseLocation.jsx";
import PlaceCard from "@/components/recommendation/PlaceCard.jsx";

const { kakao } = window;

function KakaoMap({ places }) {
  const mapRef = useRef(null);
  const { location, getCurrentLocation } = useLocation();

  const setCenter = (place) => {
    const map = mapRef.current;
    const latLng = new kakao.maps.LatLng(place.latitude, place.longitude);
    map.panTo(latLng);
  };

  const infoWindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const displayInfowindow = (map, place, title) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.latitude, place.longitude),
    });

    kakao.maps.event.addListener(marker, "click", function () {
      infoWindow.setContent(
        '<div style="padding:5px;font-size:12px;">' + title + "</div>"
      );
      infoWindow.open(map, marker);
    });
  };

  useEffect(() => {
    if (!location) return;

    kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(location.latitude, location.longitude), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      mapRef.current = map;

      // 현 위치 마커 생성
      displayInfowindow(map, location, "현재 위치");

      places.forEach((place) => {
        displayInfowindow(map, place, place.name);
      });
    });
  }, [location, places]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row flex-0">
        {places.length !== 0 && (
          <PlaceCard place={places[0]} onClick={() => setCenter(places[0])} />
        )}

        {places.length !== 0 && (
          <PlaceCard place={places[1]} onClick={() => setCenter(places[1])} />
        )}
      </div>

      <div className="flex flex-grow w-full">
        <div id="map" className="w-full h-full"></div>
      </div>

      <div className="fixed bottom-0 z-30 flex justify-end w-full max-w-sm p-4 mb-16">
        <div className="justify-end p-3 bg-white border-2 rounded-full shadow-lg">
          <TbLocation size="24" onClick={getCurrentLocation} />
        </div>
      </div>
    </div>
  );
}

export default KakaoMap;

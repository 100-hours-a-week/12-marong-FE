import { useLocation } from "@/hooks/useLocation";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import type { IPlace } from "@/api/place/type";
import myLocationMarker from "@/assets/my.svg";
import cafeMarker from "@/assets/cafeMarker.svg";
import restaurantMarker from "@/assets/restaurantMarker.svg";
import PlaceCard from "@/components/pages/recommnedation/PlaceCard";
import FloatingButton from "./FloatingAddButton";
import { Locate } from "lucide-react";

const KakaoMap = ({ places }: { places: IPlace[] }) => {
  const { location, getCurrentLocation } = useLocation();
  const [state, setState] = useState({
    center: {
      lat: location.latitude,
      lng: location.longitude,
    },
    isPanto: true,
    level: 4,
  });

  const onSelectPlace = (place: IPlace) => {
    setState({
      ...state,
      center: {
        lat: place.latitude,
        lng: place.longitude,
      },
    });
  };

  useEffect(() => {
    setState({
      ...state,
      center: {
        lat: location.latitude,
        lng: location.longitude,
      },
    });
  }, [location]);

  return (
    <>
      <div className="flex flex-row flex-0">
        {places.length !== 0 && (
          <PlaceCard
            place={places[0]}
            onClick={() => onSelectPlace(places[0])}
          />
        )}

        {places.length !== 0 && (
          <PlaceCard
            place={places[1]}
            onClick={() => onSelectPlace(places[1])}
          />
        )}
      </div>

      <Map
        center={state.center}
        level={state.level}
        isPanto={state.isPanto}
        style={{ width: "100%", height: "100%", flex: 1 }}
      >
        <MapMarker
          position={state.center}
          image={{
            src: myLocationMarker,
            size: { width: 48, height: 48 },
          }}
          title="내 위치"
        />

        {places.map((place) => (
          <MapMarker
            key={place.name}
            position={{ lat: place.latitude, lng: place.longitude }}
            title={place.name}
            image={{
              src: place.category.includes("카페")
                ? cafeMarker
                : restaurantMarker,
              size: { width: 48, height: 48 },
            }}
          >
            <div
              style={{
                padding: "5px",
                color: "#000",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {place.name} <br />
              <a
                href={`https://map.kakao.com/link/to/${place.name},${place.latitude},${place.longitude}`}
                style={{ color: "blue" }}
                target="_blank"
                rel="noreferrer"
              >
                길찾기
              </a>
            </div>
          </MapMarker>
        ))}
      </Map>

      <FloatingButton
        onClick={() => {
          getCurrentLocation();
        }}
        className="bg-white text-brown-dark"
      >
        <Locate />
      </FloatingButton>
    </>
  );
};

export default KakaoMap;

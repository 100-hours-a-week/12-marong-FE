import {useEffect, useRef} from "react";
import useLocation from "../context/UseLocation.jsx";

const {kakao} = window;

function KakaoMap() {
  const mapRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if (!location) return

    kakao.maps.load(() => {
      const container = document.getElementById('map')
      const options = { //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(location.latitude, location.longitude), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      }

      const map = new kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
      mapRef.current = map

      // 현 위치 마커 생성
      new kakao.maps.Marker({
        position: new kakao.maps.LatLng(location.latitude, location.longitude),
      }).setMap(map)
    })
  }, [location])

  return (
    <div id="map" className="flex flex-grow w-full"></div>
  )
}

export default KakaoMap
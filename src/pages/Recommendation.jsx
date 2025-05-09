import {useEffect} from 'react';
import api from '../api/axios.js';
import KakaoMap from "../components/KakaoMap.jsx";

function Recommendation() {
  useEffect(() => {
    api.get('/recommendations/places')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col flex-grow px-4">
      {/*<div id="map" className="w-full h-96"></div>*/}
      <div className="w-full flex flex-grow">
        <KakaoMap />
      </div>

      {/* 장소 정보 */}
      <div className="flex flex-row">

      </div>

    </div>
  )
}

export default Recommendation;
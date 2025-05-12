import {useEffect, useState} from 'react';
import api from '../api/place.jsx';
import backend from '../api/backend.jsx';
import KakaoMap from "../components/KakaoMap.jsx";
import {useLocation} from "react-router-dom";

function Recommendation() {
  const [places, setPlaces] = useState([])
  const {location} = useLocation()

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    api.post('/recommendations/places', {
      "me_id": userId,
      "me_lat": location.latitude,
      "me_lng": location.longitude,
      "manitto_lat": location.latitude,
      "manitto_lng": location.longitude,
    })
      .then((res) => {
        const data = res.data.data
        setPlaces([...data.restaurants, ...data.cafes])
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    console.log("Places: ", places)
  }, [places])

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-grow">
        {places.length !== 0 &&
          <KakaoMap places={places}/>
        }
      </div>
    </div>
  )
}

export default Recommendation;
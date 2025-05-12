import {useEffect, useState} from 'react';
import api from '../api/place.jsx';
import KakaoMap from "../components/KakaoMap.jsx";
import useLocation from "../context/UseLocation.jsx";

function Recommendation() {
  const [places, setPlaces] = useState([])
  const {location} = useLocation()

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    console.log(location)

    if (location) {
      console.log("Location: ", location)
      api.post('/recommend/place', {
        "me_id": userId,
        "me_lat": location.latitude,
        "me_lng": location.longitude,
        "manitto_lat": location.latitude,
        "manitto_lng": location.longitude,
      })
        .then((res) => {
          const data = res.data
          console.log("data: ", data.food_data[0], data.cafe_data[0])
          setPlaces([data.food_data[0], data.cafe_data[0]])
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [location])

  useEffect(() => {
    console.log("Places: ", places)
  }, [places])

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-grow">
        <KakaoMap places={places}/>
      </div>
    </div>
  )
}

export default Recommendation;
import {useEffect, useState} from 'react';
import api from '../api/axios.js';
import KakaoMap from "../components/KakaoMap.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

function Recommendation() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    api.get('/recommendations/places')
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
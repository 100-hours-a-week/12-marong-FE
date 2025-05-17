import {useEffect, useState} from 'react';
import api from '../api/instance/backend.jsx';
import KakaoMap from "../components/KakaoMap.jsx";
import useLocation from "../context/UseLocation.jsx";

function Recommendation() {
  const [places, setPlaces] = useState([])
  const {location} = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    console.log(location)

    if (location) {
      console.log("Location: ", location)
      api.get('recommendations/places')
        .then((res) => {
          const data = res.data.data
          console.log("data: ", data.restaurants[0], data.cafes[0])
          setPlaces([data.restaurants[0], data.cafes[0]])
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
        })
    }
  }, [location])

  useEffect(() => {
    console.log("Places: ", places)
  }, [places])

  return (
    <div className="flex flex-1">
      <KakaoMap places={places} isLoading={isLoading}/>
    </div>
  )
}

export default Recommendation;
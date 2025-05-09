"use client"

import {useEffect, useState} from "react";

function  useLocation() {
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }

    function success(position) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    }

    function error() {
      setLocation({
        latitude: 37.400160,
        longitude: 127.107058,
      })
    }

  }, [])

  return location;
}

export default useLocation;
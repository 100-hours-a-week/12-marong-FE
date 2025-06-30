import { useEffect, useState } from "react";

const DEFAULT_LOCATION = {
  latitude: 37.40016,
  longitude: 127.107058,
};

export function useLocation() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>(DEFAULT_LOCATION);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position: GeolocationPosition) {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      setLocation(DEFAULT_LOCATION);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, getCurrentLocation };
}

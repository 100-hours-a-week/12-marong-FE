import { useEffect } from 'react';
import api from '../api/axios.js';

function Recommendation() {

  useEffect(() => {
    api.get('/recommendations')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col px-4">

    </div>
  )
}

export default Recommendation;
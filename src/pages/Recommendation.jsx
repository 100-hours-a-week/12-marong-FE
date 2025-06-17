import { useEffect } from "react";
import KakaoMap from "@/components/recommendation/KakaoMap.jsx";
import { useQuery } from "@tanstack/react-query";
import { recommendationQueries } from "@/api/query/RecommendationQueries.js";
import { useGroup } from "@/context/GroupContext.jsx";

function Recommendation() {
  const { selectedGroup } = useGroup();

  const { data: placeRecommendations } = useQuery({
    ...recommendationQueries.getPlaceRecommendations(selectedGroup?.groupId),
    enabled: !!selectedGroup?.groupId,
    // retry: false,
  });

  useEffect(() => {
    console.log("Place Recommendations: ", placeRecommendations);
  }, [placeRecommendations]);

  return (
    <div className="flex flex-1">
      {placeRecommendations ? (
        <KakaoMap
          places={[
            placeRecommendations.data.restaurants[0],
            placeRecommendations.data.cafes[0],
          ]}
        />
      ) : (
        <KakaoMap places={[]} />
      )}
    </div>
  );
}

export default Recommendation;

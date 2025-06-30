import KakaoMap from "@/components/common/KakaoMap";
import { useQuery } from "@tanstack/react-query";
import { useGroupStore } from "@/hooks/useGroupContext";
import { placeQueries } from "@/api/place/queries";

function RecommendPage() {
  const { selectedGroup } = useGroupStore();

  if (!selectedGroup) {
    return <div>그룹을 선택해주세요.</div>;
  }

  const { data } = useQuery({
    ...placeQueries.getPlaceRecommendations(selectedGroup.groupId),
    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className="flex flex-col flex-1">
      <KakaoMap
        places={[data?.cafes[0] ?? null, data?.restaurants[0] ?? null].filter(
          (place) => place !== null
        )}
      />
    </div>
  );
}

export default RecommendPage;

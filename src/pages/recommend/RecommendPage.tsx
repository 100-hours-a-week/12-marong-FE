import KakaoMap from "@/components/common/KakaoMap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGroupStore } from "@/hooks/useGroupContext";
import { placeQueries } from "@/api/place/queries";

function RecommendPage() {
  const { selectedGroup } = useGroupStore();
  const queryClient = useQueryClient();

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

  const { mutate: togglePlaceLike } = useMutation({
    ...placeQueries.togglePlaceLike(),
    onSuccess: (data, { placeId, isLiked }) => {
      queryClient.setQueryData(
        placeQueries.getPlaceRecommendations(selectedGroup.groupId).queryKey,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            cafes: oldData.cafes.map((place) =>
              place.placeId === placeId
                ? { ...place, isLiked: !isLiked }
                : place
            ),
            restaurants: oldData.restaurants.map((place) =>
              place.placeId === placeId
                ? { ...place, isLiked: !isLiked }
                : place
            ),
          };
        }
      );
    },
  });

  return (
    <div className="flex flex-col flex-1">
      <KakaoMap
        togglePlaceLike={togglePlaceLike}
        places={[data?.cafes[0] ?? null, data?.restaurants[0] ?? null].filter(
          (place) => place !== null
        )}
      />
    </div>
  );
}

export default RecommendPage;

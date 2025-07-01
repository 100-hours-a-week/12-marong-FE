import { useMutation, useQuery } from "@tanstack/react-query";
import { authQueries } from "@/api/auth/queries";
import ProfileCard from "@/components/pages/profile/ProfileCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { surveyQueries } from "@/api/survey/queries";
import { Heart, UtensilsCrossed, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { groupQueries } from "@/api/group/queries";
import GroupCard from "@/components/pages/group/GroupCard";
import { useState } from "react";
import type { IGroupResponseDto } from "@/api/group/type";
import GroupInfoDialog from "@/components/pages/group/GroupInfoDialog";

function ProfilePage() {
  const [selectedGroupToInfo, setSelectedGroupToInfo] =
    useState<IGroupResponseDto | null>(null);
  const [isGroupInfoDialogOpen, setIsGroupInfoDialogOpen] = useState(false);

  const { data: userInfo } = useQuery({
    ...authQueries.getUserInfo(),
  });

  const { data: surveyData } = useQuery({
    ...surveyQueries.getSurvey(),
  });

  const { data: allGroupProfiles } = useQuery({
    ...groupQueries.getAllGroupProfiles(),
  });

  console.log(allGroupProfiles);

  const mbtiKeys = [
    { key: "eiScore", pair: ["I", "E"] },
    { key: "snScore", pair: ["S", "N"] },
    { key: "tfScore", pair: ["T", "F"] },
    { key: "jpScore", pair: ["J", "P"] },
  ] as const;

  const mbti = mbtiKeys
    .map(({ key, pair }) => {
      if (!surveyData) return "?";
      return surveyData[key] >= 50 ? pair[1] : pair[0];
    })
    .join("");

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      {userInfo && <ProfileCard profile={userInfo} />}

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center text-lg">
            설문 조사 결과
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-bold text-gray-700">MBTI</Label>
            <Badge
              variant="outline"
              className="text-sm font-bold text-brown-700 bg-brown-100 hover:bg-brown-100"
            >
              {mbti}
            </Badge>
          </div>

          <Separator />

          {surveyData?.hobbies && (
            <>
              <div className="flex gap-2 items-center">
                <Heart className="text-pink-500 size-4" />
                <Label className="font-bold text-gray-700">취미</Label>
              </div>
              <div className="flex flex-wrap gap-4">
                {surveyData.hobbies.map((hobby) => (
                  <Badge
                    key={hobby}
                    variant="outline"
                    className="px-3 text-sm font-bold text-pink-700 bg-pink-50 rounded-full hover:bg-pink-50"
                  >
                    {hobby}
                  </Badge>
                ))}
              </div>
            </>
          )}

          {surveyData?.likedFoods && (
            <>
              <div className="flex gap-2 items-center">
                <UtensilsCrossed className="text-green-500 size-4" />
                <Label className="font-bold text-gray-700">좋아하는 음식</Label>
              </div>
              <div className="flex flex-wrap gap-4">
                {surveyData.likedFoods.map((food) => (
                  <Badge
                    key={food}
                    variant="outline"
                    className="px-3 text-sm font-bold text-green-700 bg-green-50 rounded-full hover:bg-green-50"
                  >
                    {food}
                  </Badge>
                ))}
              </div>
            </>
          )}

          {surveyData?.dislikedFoods && (
            <>
              <div className="flex gap-2 items-center">
                <X className="text-red-500 size-4" />
                <Label className="font-bold text-gray-700">싫어하는 음식</Label>
              </div>
              <div className="flex flex-wrap gap-4">
                {surveyData.dislikedFoods.map((food) => (
                  <Badge
                    key={food}
                    variant="outline"
                    className="px-3 text-sm font-bold text-red-700 bg-red-50 rounded-full hover:bg-red-50"
                  >
                    {food}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label className="text-lg font-bold">내 그룹</Label>
            {allGroupProfiles?.profiles.map((group) => (
              <GroupCard
                key={group.groupId}
                imageUrl={group.groupImageUrl}
                description={group.groupName}
                name={group.myNickname}
                isOwner={group.isOwner}
                onClick={() => {}}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedGroupToInfo && (
        <GroupInfoDialog
          open={isGroupInfoDialogOpen}
          setOpen={setIsGroupInfoDialogOpen}
          group={selectedGroupToInfo}
        />
      )}
    </div>
  );
}

export default ProfilePage;

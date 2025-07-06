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
import type { IGroupProfileResponseDto } from "@/api/group/type";
import GroupInfoDialog from "@/components/pages/group/GroupInfoDialog";
import { useNavigate } from "react-router-dom";
import GroupUpdateDialog from "@/components/pages/group/GroupUpdateDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMyGroup } from "@/hooks/useGroup";
import { useGroupStore } from "@/hooks/useGroupContext";

function ProfilePage() {
  const navigate = useNavigate();

  const [selectedGroupToInfo, setSelectedGroupToInfo] =
    useState<IGroupProfileResponseDto | null>(null);
  const [isGroupInfoDialogOpen, setIsGroupInfoDialogOpen] = useState(false);
  const [selectedGroupToUpdate, setSelectedGroupToUpdate] =
    useState<IGroupProfileResponseDto | null>(null);
  const [isGroupUpdateDialogOpen, setIsGroupUpdateDialogOpen] = useState(false);
  const [selectedGroupToLeave, setSelectedGroupToLeave] =
    useState<IGroupProfileResponseDto | null>(null);
  const [isGroupLeaveDialogOpen, setIsGroupLeaveDialogOpen] = useState(false);

  const { refetch: refetchMyGroup } = useMyGroup();
  const { selectedGroup, setSelectedGroup } = useGroupStore();

  const { data: userInfo } = useQuery({
    ...authQueries.getUserInfo(),
    gcTime: Infinity,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: surveyData } = useQuery({
    ...surveyQueries.getSurvey(),
  });

  const { data: allGroupProfiles, refetch: refetchAllGroupProfiles } = useQuery(
    {
      ...groupQueries.getAllGroupProfiles(),
      gcTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const { mutate: leaveGroup } = useMutation({
    ...groupQueries.leaveGroup(),
    onSuccess: () => {
      refetchAllGroupProfiles();
      refetchMyGroup();
      if (selectedGroup?.groupId === selectedGroupToLeave?.groupId) {
        setSelectedGroup(null);
      }
    },
  });

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
            <div className="flex justify-between items-center w-full">
              설문 조사 결과
              <Label
                className="text-sm text-gray-500 cursor-pointer"
                onClick={() => {
                  navigate("/survey", {
                    state: { fromProfile: true, surveyData },
                  });
                }}
              >
                수정하기 {">"}{" "}
              </Label>
            </div>
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
                onInfo={() => {
                  setSelectedGroupToInfo(group);
                  setIsGroupInfoDialogOpen(true);
                }}
                onUpdate={() => {
                  setSelectedGroupToUpdate(group);
                  setIsGroupUpdateDialogOpen(true);
                }}
                onLeave={() => {
                  setSelectedGroupToLeave(group);
                  setIsGroupLeaveDialogOpen(true);
                }}
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

      {selectedGroupToUpdate && (
        <GroupUpdateDialog
          open={isGroupUpdateDialogOpen}
          setOpen={setIsGroupUpdateDialogOpen}
          group={selectedGroupToUpdate}
        />
      )}

      {selectedGroupToLeave && (
        <AlertDialog
          open={isGroupLeaveDialogOpen}
          onOpenChange={setIsGroupLeaveDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                그룹 {selectedGroupToLeave.groupName} 탈퇴
              </AlertDialogTitle>
              <AlertDialogDescription>
                정말 그룹을 탈퇴하시겠습니까?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  leaveGroup(selectedGroupToLeave.groupId);
                  setIsGroupLeaveDialogOpen(false);
                }}
              >
                탈퇴
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default ProfilePage;

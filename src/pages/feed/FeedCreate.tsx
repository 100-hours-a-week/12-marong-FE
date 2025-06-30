import MissionCard from "@/components/pages/manitto/MissionCard";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { feedQueries } from "@/api/feed/queries";
import LoadingScreen from "@/components/common/LoadingScreen";

function FeedCreatePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [content, setContent] = useState("");
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const { mutate: uploadFeed, isPending } = useMutation({
    ...feedQueries.uploadFeed(),
    onSuccess: () => {
      navigate("/home");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadImg(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col flex-1 gap-4 p-4">
      {isPending && <LoadingScreen message="피드 업로드 중..." />}

      <Label className="text-lg font-bold">마니또 약올리기 🤪</Label>
      <MissionCard mission={state.mission} className="border-brown-dark/50" />

      <>
        <Label className="text-lg font-bold">피드 작성</Label>

        <label className="w-full h-auto cursor-pointer">
          <div className="flex justify-center items-center w-full min-h-24 text-gray-500 rounded-xl border-[3px] border-dashed transition hover:border-brown-dark/50 overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="업로드 미리보기"
                className="object-cover size-full"
              />
            ) : (
              "이미지를 업로드하세요"
            )}
          </div>
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>

        <textarea
          className="p-3 w-full h-32 text-sm rounded-xl border resize-none focus:outline-none focus:ring-[3px] focus:ring-brown-dark/50"
          placeholder="오늘 마니띠를 어떻게 놀려줬나요?"
          value={content}
          maxLength={300}
          onChange={(e) => setContent(e.target.value)}
        />
      </>

      <Button
        className="mt-auto w-full bg-brown"
        disabled={!content}
        onClick={() => {
          uploadFeed({
            groupId: state.groupId,
            missionId: state.mission.missionId,
            content: content,
            image: uploadImg ?? null,
          });
        }}
      >
        피드 등록하기
      </Button>
    </div>
  );
}

export default FeedCreatePage;

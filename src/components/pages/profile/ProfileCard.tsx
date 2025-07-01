import { Label } from "@/components/ui/label";
import type { IUserInfo } from "@/api/auth/type";

function ProfileCard({ profile }: { profile: IUserInfo }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4 text-center border-b">
      <img
        src={profile.profileImage}
        alt="profile"
        className="object-cover rounded-full ring-4 size-24 ring-brown-dark"
      />
      <Label className="text-xl font-bold">{profile.kakaoName}</Label>
    </div>
  );
}

export default ProfileCard;

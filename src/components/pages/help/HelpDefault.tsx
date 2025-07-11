import { Label } from "@/components/ui/label";

function HelpDefault() {
  return (
    <div className="flex flex-col">
      <Label className="my-4 font-bold text-brown-900">
        👋🏻 마니또는 마롱으로!
      </Label>
      <div className="text-sm leading-relaxed">
        같은 모임에서 이름은 알지만…😅 아직은 조금 낯가리는 사이인 동료가
        있으신가요?
        <br />
        마롱(marong) 은 집단 내 네트워크 형성을 위한
        <br />
        ˗ˋˏ 마니또 SNS 서비스 ˎˊ˗ 입니다.
      </div>

      <Label className="my-4 font-bold text-brown-900">🙋🏻‍♂️마롱이란?</Label>
      <div className="text-sm leading-relaxed">
        • 매주 새로운 마니또와의 매칭
        <br />
        • 마니또 몰래 수행하는 미션 선택과 수행
        <br />• 미션 성공시 피드로 인증
      </div>

      <Label className="my-4 font-bold text-brown-900">
        ⏰ 매칭 및 운영 시간
      </Label>
      <div className="text-sm leading-relaxed">
        • 월요일 12:00 마니또 매칭
        <br />• 금요일 17:00 마니또 정체 공개
      </div>

      <Label className="my-4 font-bold text-brown-900">💥 주요 기능</Label>
      <div className="text-sm leading-relaxed">
        • 마니또와 나의 프로필 기반 장소 추천
        <br />
        • 피드 기반 AI 성향 분석
        <br />• 마니또 랜덤 미션 수행
        <br />• 나의 그룹 만들기
      </div>
    </div>
  );
}

export default HelpDefault;

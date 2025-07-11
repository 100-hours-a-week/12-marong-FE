import { Label } from "@/components/ui/label";

function HelpHome() {
  return (
    <div className="flex flex-col">
      <Label className="my-4 font-bold text-brown-900">
        🗂 미션을 수행하고 피드를 올려보세요!
      </Label>
      <div className="text-sm leading-relaxed">
        • 매일 새로운 미션을 수행하고 피드를 올려보세요!
        <br />• 미션 성공 시 피드로 인증하고 마니또와 소통해보세요!
      </div>

      <Label className="my-4 font-bold text-brown-900">
        🕵️‍♂️ 나의 마니또는 누구일까?
      </Label>
      <div className="text-sm leading-relaxed">
        • 마니또는 매주 새로운 마니또와의 매칭이 진행됩니다.
        <br />
        • 피드를 보고 나의 마니또를 찾아보세요!
        <br />
      </div>

      <Label className="my-4 font-bold text-brown-900">
        🌍 마음이 통하는 마니또, 어디로 갈까?
      </Label>
      <div className="text-sm leading-relaxed">
        • 우리만의 분위기에 딱 맞는 장소를 추천해드려요
        <br />• 맛집부터 카페까지, 마니또와 나의 취향에 맞춰 함께 갈 곳을
        찾아드려요!
      </div>

      <Label className="my-4 font-bold text-brown-900">
        🧠 나도 몰랐던 내 진짜 MBTI, 찾아볼래요?
      </Label>
      <div className="text-sm leading-relaxed">
        • 게시글과 피드를 분석해서 진짜 나의 성향을 추적해드려요
        <br />• 언제, 왜, 어떻게 바뀌었는지도 함께 분석해드릴게요!
      </div>
    </div>
  );
}

export default HelpHome;

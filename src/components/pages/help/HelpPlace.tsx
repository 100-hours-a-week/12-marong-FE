import { Label } from "@/components/ui/label";

function HelpHome() {
  return (
    <div className="flex flex-col">
      <Label className="my-4 font-bold text-brown-900">
        미션을 수행하고 피드를 올려보세요!
      </Label>
      <div className="text-sm leading-relaxed">
        • 매일 새로운 미션을 수행하고 피드를 올려보세요!
        <br />• 미션 성공 시 피드로 인증하고 마니또와 소통해보세요!
      </div>

      <Label className="my-4 font-bold text-brown-900">
        나의 마니또는 누구일까?
      </Label>
      <div className="text-sm leading-relaxed">
        • 마니또는 매주 새로운 마니또와의 매칭이 진행됩니다.
        <br />
        • 피드를 보고 나의 마니또를 찾아보세요!
        <br />
      </div>
    </div>
  );
}

export default HelpHome;

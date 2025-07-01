import HorizontalProgressBar from "@/components/pages/survey/HorizontalProgressBar";
import SurveyHeader from "@/components/pages/survey/SurveyHeader";
import MBTISlider from "@/components/pages/survey/MBTISlider";
import type { ISurveyRequest } from "@/api/survey/type";

function SurveyMBTI({
  data,
  onUpdate,
  onNext,
}: {
  data: ISurveyRequest;
  onUpdate: (data: any) => void;
  onNext: () => void;
}) {
  const handleChange = (name: string, value: number) => {
    onUpdate({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-start p-4 space-y-4 w-full min-h-dvh">
      {/* 헤더 */}
      <SurveyHeader
        title="Q1. 나를 표현하는 MBTI 선택하기"
        description="자신의 성격에 더 잘 맞는 쪽을 선택해 주세요."
      />

      {/* 진행 상태 바 */}
      <HorizontalProgressBar progress={(1 / 3) * 100} />

      {/* 슬라이더 */}
      <div className="space-y-4 w-full items">
        <MBTISlider
          title="주의초점"
          name="ie"
          leftLabel="I(내향)"
          rightLabel="E(외향)"
          value={data.eiScore}
          onChange={(value) => handleChange("eiScore", value)}
        />

        <MBTISlider
          title="인식기능"
          name="sn"
          leftLabel="S(감각)"
          rightLabel="N(직관)"
          value={data.snScore}
          onChange={(value) => handleChange("snScore", value)}
        />

        <MBTISlider
          title="판단기능"
          name="tf"
          leftLabel="T(사고)"
          rightLabel="F(감정)"
          value={data.tfScore}
          onChange={(value) => handleChange("tfScore", value)}
        />

        <MBTISlider
          title="생활양식"
          name="jp"
          leftLabel="J(판단)"
          rightLabel="P(인식)"
          value={data.jpScore}
          onChange={(value) => handleChange("jpScore", value)}
        />
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* 네비게이션 버튼 */}
      <div className="mt-auto w-full">
        <div className="flex gap-4">
          <button
            onClick={() => onNext()}
            className="flex-1 py-3 text-xl font-medium text-black rounded-full bg-brown-light"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyMBTI;

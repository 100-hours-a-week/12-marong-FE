import HorizontalProgressBar from "../../components/HorizontalProgressBar.jsx";
import SurveyHeader from "../../components/SurveyHeader.jsx";
import MBTISlider from "../../components/MBTISlider.jsx";

function SurveyMBTI({data, onUpdate, onNext}) {
  const handleChange = (name, value) => {
    onUpdate({
      ...data,
      [name]: value,
    })
  }

  return (
    <div className="w-full min-h-dvh flex flex-col items-start space-y-4 p-4">
      {/* 헤더 */}
      <SurveyHeader title="Q1. 나를 표현하는 MBTI 선택하기" description="자신의 성격에 더 잘 맞는 쪽을 선택해 주세요."/>

      {/* 진행 상태 바 */}
      <HorizontalProgressBar progress={(1 / 3) * 100}/>

      {/* 슬라이더 */}
      <div className="w-full space-y-4 items">
        <MBTISlider
          title="주의초점"
          name="ie"
          leftLabel="I(내향)"
          rightLabel="E(외향)"
          value={data.ie}
          onChange={(value) => handleChange("ie", value)}
        />

        <MBTISlider
          title="인식기능"
          name="sn"
          leftLabel="S(감각)"
          rightLabel="N(직관)"
          value={data.sn}
          onChange={(value) => handleChange("sn", value)}
        />

        <MBTISlider
          title="판단기능"
          name="tf"
          leftLabel="T(사고)"
          rightLabel="F(감정)"
          value={data.tf}
          onChange={(value) => handleChange("tf", value)}
        />

        <MBTISlider
          title="생활양식"
          name="jp"
          leftLabel="J(판단)"
          rightLabel="P(인식)"
          value={data.jp}
          onChange={(value) => handleChange("jp", value)}
        />
      </div>

      {/* Spacer */}
      <div className="flex-grow"/>

      {/* 네비게이션 버튼 */}
      <div className="mt-auto w-full">
        <div className="flex gap-4">
          <button
            onClick={() => onNext()}
            className="flex-1 py-3 bg-brand-brown_dark text-black font-medium rounded-full text-xl"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyMBTI;
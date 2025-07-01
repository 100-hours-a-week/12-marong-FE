import { useEffect, useState } from "react";
import { useNavigateBlocker } from "@/hooks/navigateBlocker";
import SurveyMBTI from "./SurveyMBTI";
import SurveyHobby from "./SurveyHobby";
import SurveyFood from "./SurveyFood";
import { useMutation } from "@tanstack/react-query";
import { surveyQueries } from "@/api/survey/queries";
import { useLocation, useNavigate } from "react-router-dom";
import type { ISurveyRequest } from "@/api/survey/type";

function SurveyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  useNavigateBlocker();

  const fromAuth = location.state?.fromAuth;
  const fromProfile = location.state?.fromProfile;
  const surveyData = location.state?.surveyData;

  useEffect(() => {
    if (fromAuth !== true && fromProfile !== true) {
      navigate("/home");
    }
  }, [fromAuth, fromProfile]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ISurveyRequest>({
    eiScore: surveyData?.eiScore || 50,
    snScore: surveyData?.snScore || 50,
    tfScore: surveyData?.tfScore || 50,
    jpScore: surveyData?.jpScore || 50,
    hobbies: surveyData?.hobbies || [],
    likedFoods: surveyData?.likedFoods || [],
    dislikedFoods: surveyData?.dislikedFoods || [],
  });

  const { mutate: saveSurvey } = useMutation({
    ...surveyQueries.saveSurvey({ navigate }),
  });
  const { mutate: updateSurvey } = useMutation({
    ...surveyQueries.updateSurvey({ navigate }),
  });

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const handleSubmit = (finalFormData: any) => {
    const dataToSend = finalFormData || formData;

    if (fromProfile) {
      updateSurvey(dataToSend);
    } else {
      saveSurvey(dataToSend);
    }
  };

  useEffect(() => {
    if (step === 4) {
      handleSubmit(formData);
    }
  }, [step]);

  return (
    <>
      {step === 1 && (
        <SurveyMBTI
          data={formData}
          onUpdate={(d) => setFormData(d)}
          onNext={next}
        />
      )}

      {step === 2 && (
        <SurveyHobby
          data={formData}
          onUpdate={(d) => setFormData(d)}
          onPrev={prev}
          onNext={next}
        />
      )}

      {step === 3 && (
        <SurveyFood
          data={formData}
          onUpdate={(d) => setFormData(d)}
          onPrev={prev}
          onNext={next}
        />
      )}

      {step === 4 && (
        <div className="flex absolute inset-0 z-50 flex-col justify-center items-center backdrop-blur-sm bg-white/70">
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 animate-spin border-t-transparent"></div>
          <p className="mt-2 text-gray-600">설문 결과 제출 중...</p>
        </div>
      )}
    </>
  );
}

export default SurveyPage;

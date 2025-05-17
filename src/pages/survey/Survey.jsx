"use client"

import {useEffect, useState} from "react"
import SurveyMBTI from "./SurveyMBTI.jsx";
import SurveyHobby from "./SurveyHobby.jsx";
import SurveyFood from "./SurveyFood.jsx";
import api from "../../api/instance/backend.jsx";

export default function Survey() {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    mbti: {ie: 50, sn: 50, tf: 50, jp: 50},
    hobbies: [],
    food: {likedFoods: [], dislikedFoods: []},
  })

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    console.log("Access Token:", accessToken)
    if (!accessToken) {
      window.location.href = "/auth"
    } else {
      api.get("/survey")
        .then(res => {
          window.location.href = "/main/home"
        })
    }
  }, []);

  // DEBUG: Log formData changes
  useEffect(() => {
    console.log("formData", formData)
  }, [formData])

  const updateFormData = (key, data) => {
    setFormData((prev) => ({
      ...prev,
      [key]: data,
    }))
  }

  const next = () => setStep((s) => s + 1)
  const prev = () => setStep((s) => s - 1)

  const handleSubmit = (finalFormData) => {
    const dataToSend = finalFormData || formData

    api.post("/survey", {
      eiScore: dataToSend.mbti.ie,
      snScore: dataToSend.mbti.sn,
      tfScore: dataToSend.mbti.tf,
      jpScore: dataToSend.mbti.jp,
      hobbies: dataToSend.hobbies,
      likedFoods: dataToSend.food.likedFoods,
      dislikedFoods: dataToSend.food.dislikedFoods,
    })
      .then(res => {
        console.log(res)
        window.location.href = "/main/home"
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (step === 4) {
      handleSubmit()
    }
  }, [step]);

  return (
    <>
      {step === 1 && (
        <SurveyMBTI data={formData.mbti} onUpdate={(d) => updateFormData("mbti", d)} onNext={next}/>
      )}

      {step === 2 && (
        <SurveyHobby data={formData.hobbies} onUpdate={(d) => updateFormData("hobbies", d)} onPrev={prev}
                     onNext={next}/>
      )}

      {step === 3 && (
        <SurveyFood data={formData.food} onUpdate={(d) => updateFormData("food", d)} onPrev={prev} onNext={next}/>
      )}

      {step === 4 && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-2">설문 결과 제출 중...</p>
        </div>
      )}
    </>
  )
}

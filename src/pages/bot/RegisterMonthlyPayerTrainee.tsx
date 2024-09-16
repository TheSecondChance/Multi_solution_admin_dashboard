/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import RegisterFormStepOne from "@/components/bot/forms/registerMonthlyUser/RegisterFormStepOne"
import RegisterFormStepTwo from "@/components/bot/forms/registerMonthlyUser/RegisterFormStepTwo"
import BotLayout from "@/layout/BotLayout"
import { useState } from "react"
import { useTranslation } from "react-i18next"
export interface FormDataOneState {
  firstName: string
  lastName: string
  middleName?: string
  phoneNumber: string
  email?: string
  gender: string
}
export interface FormDataTwoState {
  country: string
  city?: string
  training: string
  transactionNumber: string
  bankOption: string
}

export default function RegisterMonthlyPayerTrainee() {
  const { t } = useTranslation()
  const [steps, setStep] = useState({
    stpesCount: [1, 2],
    currentStep: 1,
  })
  const [stepOneFormData, setStepOneFormData] = useState<FormDataOneState>({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    email: "",
    gender: "M",
  })
  const [stepTwoFormData, setStepTwoFormData] = useState<FormDataTwoState>({
    country: "Ethiopia",
    city: "",
    bankOption: "",
    transactionNumber: "",
    training: "",
  })

  return (
    <BotLayout>
      <h1 className='text-center font-bold  text-base leading-5'>
        {t("register")}
      </h1>
      <ul aria-label='Steps' className='flex items-center w-full'>
        {steps.stpesCount.map((_, idx) => (
          <li
            key={idx}
            aria-current={steps.currentStep == idx + 1 ? "step" : false}
            className='flex-1 last:flex-none flex items-center'>
            <div
              className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${
                steps.currentStep > idx + 1
                  ? "bg-[#1E477B] border-[#1E477B]"
                  : "" || steps.currentStep == idx + 1
                  ? "border-[#1E477B]"
                  : ""
              }`}>
              <span
                className={`w-2.5 h-2.5 rounded-full bg-[#1E477B] ${
                  steps.currentStep != idx + 1 ? "hidden" : ""
                }`}></span>
              {steps.currentStep > idx + 1 ? (
                <button
                  className=' '
                  onClick={() => {
                    setStep({
                      stpesCount: [1, 2],
                      currentStep: 1,
                    })
                  }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 text-white'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M4.5 12.75l6 6 9-13.5'
                    />
                  </svg>
                </button>
              ) : (
                ""
              )}
            </div>
            <hr
              className={`w-full border ${
                idx + 1 == steps.stpesCount.length
                  ? "hidden"
                  : "" || steps.currentStep > idx + 1
                  ? "border-[#1E477B]"
                  : ""
              }`}
            />
          </li>
        ))}
      </ul>

      <div className=' flex items-center justify-center w-full  my-10'>
        {steps.currentStep == 1 && (
          <RegisterFormStepOne
            setStep={setStep}
            setStepOneFormData={setStepOneFormData}
            stepOneFormData={stepOneFormData}
          />
        )}
        {steps.currentStep == 2 && (
          <RegisterFormStepTwo
            stepOneFormData={stepOneFormData}
            stepTwoFormData={stepTwoFormData}
            setStepTwoFormData={setStepTwoFormData}
          />
        )}
      </div>
    </BotLayout>
  )
}

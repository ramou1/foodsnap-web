"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { PageFrame } from "@/components/PageFrame";

const avatars = [
  "/avatars/avatar01.png",
  "/avatars/avatar02.png",
  "/avatars/avatar03.png",
  "/avatars/avatar04.png",
  "/avatars/avatar05.png",
  "/avatars/avatar06.png",
];

const initialFoods = [
  "Italiano",
  "Japonês",
  "Mexicano",
  "Vegano",
  "Fast Food",
  "Churrasco",
  "Doces",
  "Saudável",
].map((name, index) => ({ id: String(index + 1), name, selected: false }));

const stepTitles = [
  "Escolha um avatar",
  "Como devemos te chamar?",
  "O que você gosta de comer?",
  "Finalize seu cadastro",
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [foods, setFoods] = useState(initialFoods);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const canProceed = [
    avatar !== null,
    name.trim().length > 0,
    foods.some((food) => food.selected),
    email.includes("@") && password.length >= 6 && password === confirmPassword,
  ][step];

  function nextStep() {
    if (!canProceed) return;
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    router.replace("/feed");
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
    else router.back();
  }

  return (
    <PageFrame>
      <div className="flex min-h-screen flex-col px-6 py-6">
        <div className="mb-4 flex items-center justify-between">
          <button type="button" onClick={prevStep} aria-label="Voltar" className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-center text-2xl font-bold text-blue-600">{stepTitles[step]}</h1>
          <span className="w-10" />
        </div>

        <div className="mb-8 mt-4 flex justify-center">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className={`mx-1 h-2 w-12 rounded-full ${
                index === step ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex-1">
          {step === 0 && (
            <>
              <p className="mb-4 text-lg text-gray-700">
                Escolha uma imagem que te represente melhor:
              </p>
              <div className="grid grid-cols-3 justify-items-center gap-2">
                {avatars.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setAvatar(String(index + 1))}
                    className={`rounded-lg p-2 ${
                      avatar === String(index + 1)
                        ? "border-2 border-blue-500 bg-blue-100"
                        : ""
                    }`}
                  >
                    <img src={src} alt="" className="h-20 w-20 rounded-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="mb-4 text-lg text-gray-700">Qual é o seu nome?</p>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4"
              />
            </>
          )}

          {step === 2 && (
            <>
              <p className="mb-4 text-lg text-gray-700">
                Selecione suas preferências culinárias:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {foods.map((food) => (
                  <button
                    key={food.id}
                    type="button"
                    onClick={() =>
                      setFoods((current) =>
                        current.map((item) =>
                          item.id === food.id ? { ...item, selected: !item.selected } : item
                        )
                      )
                    }
                    className={`flex items-center rounded-lg border p-3 ${
                      food.selected ? "border-blue-500 bg-blue-100" : "border-gray-300"
                    }`}
                  >
                    <span
                      className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-blue-500 ${
                        food.selected ? "bg-blue-500 text-white" : "bg-white"
                      }`}
                    >
                      {food.selected && <Check size={14} />}
                    </span>
                    {food.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="mb-4 text-lg text-gray-700">
                Complete seu cadastro com e-mail e senha:
              </p>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-mail"
                type="email"
                className="mb-4 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4"
              />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Senha"
                type="password"
                className="mb-4 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4"
              />
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirme sua senha"
                type="password"
                className="mb-4 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4"
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="mb-2 text-red-500">As senhas não coincidem</p>
              )}
            </>
          )}
        </div>

        <button
          type="button"
          onClick={nextStep}
          disabled={!canProceed}
          className={`mb-4 mt-6 h-12 w-full rounded-lg text-lg font-bold text-white ${
            canProceed ? "bg-blue-500" : "bg-gray-300"
          }`}
        >
          {step === 3 ? "Finalizar Cadastro" : "Continuar"}
        </button>

      </div>
    </PageFrame>
  );
}

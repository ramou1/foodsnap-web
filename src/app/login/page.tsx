"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    router.push("/feed");
  }

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <aside className="hidden w-1/2 flex-col justify-between bg-[#6e11b0] p-12 text-white lg:flex">
        <p className="text-3xl font-bold">FoodSnap</p>
        <div>
          <h2 className="text-4xl font-bold leading-tight">Fotos de comida, novos sabores.</h2>
          <p className="mt-4 max-w-md text-lg text-violet-100">
            Explore pratos, siga tendências e compartilhe o que você comeu.
          </p>
        </div>
        <p className="text-sm text-violet-200">Novos pratos, todos os dias.</p>
      </aside>
      <div className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold text-blue-600 lg:text-left">Bem-vindo</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail"
            className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 outline-none focus:border-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Senha"
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 pr-12 outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="mt-4 h-12 w-full rounded-lg bg-blue-500 text-lg font-bold text-white hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-600">
          Não tem uma conta?{" "}
          <Link href="/register" className="font-bold text-blue-500">
            Cadastre-se
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}

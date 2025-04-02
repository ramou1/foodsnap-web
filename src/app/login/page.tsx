"use client";

import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/feed`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg border-2 border-gray-200 p-8">
        <div className="mb-2 flex justify-center">
          {/* <Image
            src="/images/logo.png"
            alt="Logo"
            width={180}
            height={116}
            priority
          /> */}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              className="mt-1 block w-full rounded-md border-2 border-gray-200 px-3 py-2 focus:border-red-500 focus:outline-none text-gray-900"
              placeholder="seu@email.com"
              readOnly
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                className="block w-full rounded-md border-2 border-gray-200 px-3 py-2 focus:border-red-500 focus:outline-none text-gray-900"
                placeholder="••••••"
                readOnly
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-red-600 mt-4 py-2 px-4 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Não tem uma conta? </span>
          <Link
            href="/register"
            className="font-medium text-red-600 hover:text-red-400"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}

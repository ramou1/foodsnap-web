"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera } from "lucide-react";
import { CURRENT_USER } from "@/data/users";
import { PageFrame } from "@/components/PageFrame";

export default function SettingsPage() {
  const router = useRouter();
  const [avatar, setAvatar] = useState(CURRENT_USER.avatar || "/images/default-avatar.png");
  const [name, setName] = useState(CURRENT_USER.name || "");
  const [username, setUsername] = useState(CURRENT_USER.username);
  const [bio, setBio] = useState(CURRENT_USER.bio || "");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("(55) 98123-4567");

  function handleSave(event: FormEvent) {
    event.preventDefault();
    window.alert("Informações salvas com sucesso!");
  }

  function handleLogout() {
    const confirmed = window.confirm("Tem certeza que deseja sair?");
    if (confirmed) router.push("/login");
  }

  return (
    <PageFrame className="bg-gray-100">
      <div className="flex items-center border-b border-gray-200 bg-white px-4 py-3">
        <button type="button" onClick={() => router.back()} className="mr-4" aria-label="Voltar">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">edit profile</h1>
      </div>

      <form onSubmit={handleSave}>
        <div className="mb-4 flex items-center justify-center bg-white py-8">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="h-[150px] w-[150px] rounded-full border-2 border-gray-200 object-cover"
            />
            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-gray-800 p-2 text-white">
              <Camera size={16} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setAvatar(String(reader.result));
                  reader.readAsDataURL(file);
                }}
              />
            </label>
          </div>
        </div>

        <div className="mx-4 rounded-lg bg-white p-4">
          <Field label="Nome" value={name} onChange={setName} placeholder="Seu nome completo" />
          <Field
            label="Usuário"
            value={username}
            onChange={setUsername}
            placeholder="Seu nome de usuário"
          />
          <label className="mb-1 block text-gray-500">Bio</label>
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="Conte algo sobre você"
            rows={3}
            className="mb-4 w-full rounded-md bg-gray-50 p-4 font-medium"
          />
          <Field label="Email" value={email} onChange={setEmail} placeholder="Seu email" type="email" />
          <Field label="Telefone" value={phone} onChange={setPhone} placeholder="Seu telefone" type="tel" />
        </div>

        <div className="mx-4 mb-8 mt-4">
          <button type="submit" className="mb-3 w-full rounded-lg bg-violet-500 py-3 text-lg font-medium text-white">
            update
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg bg-red-500 py-3 text-lg font-medium text-white"
          >
            logout
          </button>
        </div>
      </form>
    </PageFrame>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <>
      <label className="mb-1 block text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mb-4 w-full rounded-md bg-gray-50 p-4 font-medium"
      />
    </>
  );
}

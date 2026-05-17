import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Lock, User } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro">("erro");

  async function handleCadastro() {
    console.log("Clique no botão Criar cadastro");

    try {
      if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
        setTipoMensagem("erro");
        setMensagem("Preencha todos os campos.");
        return;
      }

      if (senha !== confirmarSenha) {
        setTipoMensagem("erro");
        setMensagem("As senhas não conferem.");
        return;
      }

      if (senha.length < 6) {
        setTipoMensagem("erro");
        setMensagem("A senha deve ter pelo menos 6 caracteres.");
        return;
      }

      setLoading(true);
      setMensagem("");

      console.log("Enviando cadastro para o Supabase:", email);

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
        options: {
          data: {
            nome: nome.trim(),
          },
          emailRedirectTo: window.location.origin,
        },
      });

      console.log("Resposta Supabase:", { data, error });

      if (error) {
        setTipoMensagem("erro");
        setMensagem(error.message);
        return;
      }

      setTipoMensagem("sucesso");
      setMensagem("Cadastro criado! Verifique seu e-mail para confirmar o acesso.");
    } catch (error) {
      console.error("Erro inesperado no cadastro:", error);
      setTipoMensagem("erro");
      setMensagem("Ocorreu um erro inesperado ao criar o cadastro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-[460px] bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-5">
          <GraduationCap size={28} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Criar cadastro
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Cadastre-se para acessar o ambiente AVA.
        </p>

        <div className="mt-6 space-y-4">
          <Campo
            label="Nome"
            icon={<User size={18} />}
            value={nome}
            onChange={setNome}
            placeholder="Seu nome completo"
          />

          <Campo
            label="E-mail"
            icon={<Mail size={18} />}
            value={email}
            onChange={setEmail}
            placeholder="seuemail@exemplo.com"
            type="email"
          />

          <Campo
            label="Senha"
            icon={<Lock size={18} />}
            value={senha}
            onChange={setSenha}
            placeholder="Crie uma senha"
            type="password"
          />

          <Campo
            label="Confirmar senha"
            icon={<Lock size={18} />}
            value={confirmarSenha}
            onChange={setConfirmarSenha}
            placeholder="Repita sua senha"
            type="password"
          />
        </div>

        {mensagem && (
          <div
            className={`mt-4 rounded-xl p-3 text-sm ${
              tipoMensagem === "sucesso"
                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
            }`}
          >
            {mensagem}
          </div>
        )}

        <button
          type="button"
          onClick={handleCadastro}
          disabled={loading}
          className="mt-5 w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? "Criando cadastro..." : "Criar conta"}
        </button>

        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-5">
          Já possui conta?{" "}
          <Link
            to="/login"
            className="text-blue-700 dark:text-blue-400 font-semibold"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

function Campo({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <div className="mt-2 relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          placeholder={placeholder}
          className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
        />
      </div>
    </div>
  );
}
import { useState } from "react";
import { Mail, GraduationCap } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin() {
    if (!email.trim()) {
      setMessage("Informe seu e-mail.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage("Não foi possível enviar o link. Tente novamente.");
      return;
    }

    setMessage("Link enviado! Verifique seu e-mail para acessar o AVA.");
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-slate-100 dark:border-slate-700">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-5">
          <GraduationCap size={28} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Acessar AVA
        </h1>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          Informe seu e-mail acadêmico para receber o link de acesso.
        </p>

        <div className="mt-6">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            E-mail
          </label>

          <div className="mt-2 relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="seuemail@exemplo.com"
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40"
            />
          </div>
        </div>

        {message && (
          <div className="mt-4 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 p-3 text-sm">
            {message}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-5 w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 active:scale-[0.98] transition disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar link de acesso"}
        </button>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Compass, KeyRound, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface SignInData {
  username: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInData) => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Invalid username or password. Please try again.");
        setIsSubmitting(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb orb-teal w-96 h-96 -top-48 -right-24 opacity-5" />
      <div className="orb orb-cyan w-80 h-80 bottom-12 -left-36 opacity-5" />

      {/* Login Card */}
      <div className="w-full max-w-md card bg-navy-900 border border-white/5 p-8 rounded-2xl shadow-2xl relative z-10 space-y-8">
        {/* Branding header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-white font-heading text-2xl justify-center">
            <Compass className="w-8 h-8 text-teal-500 animate-pulse" />
            <span>RankNex AI</span>
          </Link>
          <h2 className="text-xl font-bold font-heading text-white">Admin Authentication</h2>
          <p className="text-slate-500 text-xs">Enter your credentials to access the agency control dashboard.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Username is required" })}
              className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                errors.username ? "border-red-500/60 focus:border-red-500" : "border-white/15 focus:border-teal-500"
              }`}
              placeholder="admin"
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full bg-navy-950 border rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
                errors.password ? "border-red-500/60 focus:border-red-500" : "border-white/15 focus:border-teal-500"
              }`}
              placeholder="••••••••"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* General Error Alert */}
          {errorMsg && (
            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>Sign In to Admin</span>
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link href="/" className="text-slate-500 hover:text-teal-400 text-xs transition-colors">
            ← Return to public website
          </Link>
        </div>
      </div>
    </main>
  );
}

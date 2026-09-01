"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/components/providers";
import { Button, Input, Logo } from "@/components/ui";
import { authService } from "@/services/auth.service";

/* ─── Schemas ─── */
const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  firstname: z.string().min(2, "Enter your first name"),
  lastname: z.string().min(2, "Enter your last name"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Use at least 8 characters"),
  confirm: z.string(),
}).refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Passwords do not match" });

/* ─── Auth Page Layout (matches reference design) ─── */
function Frame({
  children,
  title,
  description,
  mode,
  footerText,
  footerLinkText,
  footerLinkTo,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  mode?: "signin" | "signup";
  footerText?: string;
  footerLinkText?: string;
  footerLinkTo?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white">
      {/* Side gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[900px] h-[900px] rounded-full overflow-hidden opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative flex items-center justify-center w-full h-full px-4 py-4">
        {/* Single card container */}
        <div
          className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10 lg:p-12 w-full max-w-4xl lg:max-w-5xl relative overflow-hidden transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Card inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
          {/* Card border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none" />

          {/* Content container */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            {/* Form section */}
            <div className="flex-1 flex flex-col items-center lg:items-start max-w-md lg:max-w-lg w-full">
              {/* Header */}
              <div className="text-center lg:text-left mb-6 w-full">
                <h1
                  className="text-2xl md:text-3xl font-black text-black mb-2 leading-[1.1] tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {title}
                </h1>
                <p className="text-sm text-black/70 max-w-md leading-relaxed">{description}</p>
              </div>

              {/* Form content */}
              <div className="w-full">{children}</div>

              {/* Footer */}
              <div className="mt-6 w-full pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-4 w-full text-sm">
                  {footerText && (
                    <span className="text-sm text-black/70 whitespace-nowrap">
                      {footerText}{" "}
                      <Link
                        href={footerLinkTo || "/"}
                        className="text-black font-bold hover:text-black/80 transition-colors underline"
                      >
                        {footerLinkText}
                      </Link>
                    </span>
                  )}

                  {/* Back to Home */}
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-gray-600 hover:text-black transition-colors whitespace-nowrap text-sm font-medium ml-auto"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <span>Back to Home</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Aside — GIF illustration */}
            <div className="hidden lg:flex flex-1 flex-col items-center justify-center">
              <Image
                src="/justicedesk-hero.gif"
                alt="JusticeDesk illustration"
                width={400}
                height={400}
                className="w-full max-w-sm rounded-2xl object-contain shadow-sm border border-gray-100"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Login Form ─── */
export function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [show, setShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [server, setServer] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const submit = async (data: z.infer<typeof loginSchema>) => {
    setServer("");
    try {
      const response = await authService.login(data.email, data.password);
      await signIn(response.access_token);
      router.push("/dashboard");
    } catch (e) {
      setServer(e instanceof Error ? e.message : "Unable to sign in.");
    }
  };

  return (
    <Frame
      mode="signin"
      title="Welcome Back"
      description="Sign in to your JusticeDesk account to manage your judicial workspace."
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkTo="/register"
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        {/* Email */}
        <div
          className={`transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
              {...register("email")}
            />
          </div>
          {errors.email && <span className="mt-1 block text-xs text-red-700">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <span className="mt-1 block text-xs text-red-700">{errors.password.message}</span>}
        </div>

        {/* Remember & Forgot */}
        <div
          className={`flex items-center justify-between transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded focus:ring-black/50 accent-black" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-sm text-black hover:text-black/80 transition-colors">
            Forgot password?
          </Link>
        </div>

        {/* Server error */}
        {server && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{server}</p>}

        {/* Submit */}
        <div
          className={`transition-all duration-700 delay-[400ms] ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </button>
        </div>
      </form>
    </Frame>
  );
}

/* ─── Register Form ─── */
export function RegisterForm() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [server, setServer] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) });

  const password = watch("password", "");

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const submit = async ({ confirm, ...data }: z.infer<typeof registerSchema>) => {
    setServer("");
    try {
      await authService.register(data);
      router.push("/login?registered=1");
    } catch (e) {
      setServer(e instanceof Error ? e.message : "Unable to create account.");
    }
  };

  return (
    <Frame
      mode="signup"
      title="Create Account"
      description="Join JusticeDesk to access a modern, unified judicial management workspace."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className={`space-y-3 transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Name fields */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div
            className={`transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              autoComplete="given-name"
              placeholder="Enter first name"
              className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
              {...register("firstname")}
            />
            {errors.firstname && <span className="mt-1 block text-xs text-red-700">{errors.firstname.message}</span>}
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              autoComplete="family-name"
              placeholder="Enter last name"
              className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
              {...register("lastname")}
            />
            {errors.lastname && <span className="mt-1 block text-xs text-red-700">{errors.lastname.message}</span>}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
              {...register("email")}
            />
          </div>
          {errors.email && <span className="mt-1 block text-xs text-red-700">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
              {...register("password")}
            />
          </div>
          {errors.password && <span className="mt-1 block text-xs text-red-700">{errors.password.message}</span>}
          {password && (
            <p className="mt-1 text-xs text-gray-500">
              Password strength:{" "}
              <span className={password.length >= 12 ? "font-semibold text-green-800" : "font-semibold text-amber-800"}>
                {password.length >= 12 ? "strong" : "add more characters"}
              </span>
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black transition-all border-gray-300"
              {...register("confirm")}
            />
          </div>
          {errors.confirm && <span className="mt-1 block text-xs text-red-700">{errors.confirm.message}</span>}
        </div>

        {/* Server error */}
        {server && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{server}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account…" : "Create Account"}
        </button>
      </form>
    </Frame>
  );
}

/* ─── Info Auth (fallback pages) ─── */
export function InfoAuth({ title, description }: { title: string; description: string }) {
  return (
    <Frame title={title} description={description}>
      <p className="rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        This account workflow is not currently available from the IJMS API. Please contact your system administrator for assistance.
      </p>
      <Link href="/login" className="mt-5 block text-center text-sm font-semibold text-black hover:underline">
        Return to sign in
      </Link>
    </Frame>
  );
}

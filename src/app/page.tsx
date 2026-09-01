"use client";
import { useState } from "react";
import { Menu, X, Gavel, FileText, UsersRound, Scale, ShieldCheck, LockKeyhole, Check, ChevronDown, Mail, Phone, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/ui";

const features = [
  { icon: Gavel, title: "Case Management", desc: "A structured, authoritative record from filing through resolution." },
  { icon: FileText, title: "Connected Records", desc: "Keep case information and supporting documents always in context." },
  { icon: UsersRound, title: "Role-Aware Access", desc: "Give judges, lawyers, clerks and citizens a focused, permission-based view." },
  { icon: Scale, title: "Clear Status Tracking", desc: "Understand the current case state at a glance with visual status indicators." },
  { icon: ShieldCheck, title: "Secure Workflows", desc: "Built around authenticated, permission-aware judicial workflows." },
  { icon: LockKeyhole, title: "Institutional Clarity", desc: "A calm, professional interface for serious justice administration." },
];

const plans = [
  { name: "Starter", price: "$0", period: "per month", description: "Perfect for small courts and legal offices just getting started", features: ["Up to 10 users", "Basic case management", "Mobile app access"], notIncluded: ["Advanced analytics", "Document automation"], highlighted: false },
  { name: "Professional", price: "$49", period: "per month", description: "Ideal for growing courts and multi-department judicial systems", features: ["Up to 100 users", "Advanced case management", "Automated workflows", "Priority support"], notIncluded: [], highlighted: true },
  { name: "Enterprise", price: "Custom", period: "pricing", description: "Tailored solutions for national judicial systems and large institutions", features: ["Unlimited users", "Custom workflows", "Dedicated account manager", "Advanced security features"], notIncluded: [], highlighted: false },
];

const faqData = [
  { question: "What is JusticeDesk?", answer: "JusticeDesk is a comprehensive judicial management platform that connects case work, authorized people and judicial records in one focused, secure environment. It streamlines everything from case filing to resolution." },
  { question: "Can I create a case now?", answer: "Yes. Account registration, sign-in, case creation and case access are fully connected to the IJMS backend API. Start your free trial to begin managing cases immediately." },
  { question: "Who can access cases?", answer: "The system controls access according to the authenticated user's role — judges, lawyers, clerks, and citizens each have permission-appropriate views of relevant case information." },
  { question: "Is my data secure?", answer: "Yes, we use enterprise-grade security including JWT authentication, role-based access control, and compliance with international data protection standards." },
  { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription at any time with no cancellation fees. We offer a 30-day money-back guarantee on all paid plans." },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeQ, setActiveQ] = useState(0);

  return (
    <div className="bg-white">
      {/* ─── NAVBAR ─── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full flex justify-center z-50 px-4">
        <div className="w-full max-w-5xl backdrop-blur-xl bg-gradient-to-r from-black via-black/40 to-black border border-gray-800 shadow-2xl rounded-2xl px-6 py-3 flex items-center justify-between">
          <a href="#home">
            <div className="text-white font-semibold text-lg tracking-wide flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image src="/justicedesk-logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
              <span style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", letterSpacing: "0.05em" }}>JusticeDesk</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 text-white/80">
            <a href="#home" className="hover:text-white transition">Home</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>
          <div className="hidden md:block">
            <Link href="/register" className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition inline-block">Get Started</Link>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="absolute top-20 w-[90%] max-w-md backdrop-blur-xl bg-black/90 border border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col gap-4 text-white md:hidden">
            <a href="#home" onClick={() => setMobileOpen(false)}>Home</a>
            <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setMobileOpen(false)}>FAQ</a>
            <Link href="/register" className="mt-2 bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition inline-block" onClick={() => setMobileOpen(false)}>Get Started</Link>
          </div>
        )}
      </div>

      {/* ─── HERO ─── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[900px] h-[900px] rounded-full overflow-hidden opacity-15" style={{ backgroundImage: "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        <div className="relative z-10 text-center max-w-5xl mx-auto animate-fade-in">
          <h2 className="text-6xl md:text-9xl font-black text-black mt-30 leading-[1.1] tracking-tight animate-slide-down" style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: "0 0 60px rgba(255,255,255,0.8), 6px 6px 12px rgba(0,0,0,0.9)" }}>
            <span className="inline-block text-black" style={{ filter: "brightness(0.8) contrast(1.5)", textShadow: "2px 2px 4px rgba(0,0,0,0.9), 4px 4px 8px rgba(0,0,0,0.7)" }}>JusticeDesk</span>
            <br />
            <span className="text-black/80 font-semibold text-2xl md:text-4xl animate-slide-up inline-block" style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: "0 0 30px rgba(255,255,255,0.4), 3px 3px 6px rgba(0,0,0,0.9)" }}>
              Modern Judicial Management, Simplified
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-black/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-slide-up">
            Connect case work, authorized people, and judicial records in one focused, secure platform designed for modern justice administration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register" className="px-10 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-2" style={{ background: "linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%)" }}>
              Start Your Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login" className="px-10 py-4 border border-black/20 bg-white text-black rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 inline-block">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 px-6 relative overflow-hidden bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 text-center mt-12 mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Powerful Features</h2>
            <p className="mt-4 text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">Everything you need to manage, track, and resolve judicial cases — in one unified platform.</p>
          </div>
          <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="group relative p-6 rounded-3xl border border-black/10 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:border-black/20 transition-all duration-500 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-black to-black/80 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-black text-black mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h3>
                    <p className="text-black/60 leading-relaxed mb-4">{f.desc}</p>
                    <div className="flex items-center gap-2 text-black font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Learn more</span>
                      <CheckCircle2 size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-16 px-6 bg-gradient-to-r from-black/5 via-transparent to-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 mt-15">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Simple and transparent pricing</h2>
            <p className="text-xl text-black max-w-2xl mx-auto">Choose the perfect plan for your institution. No hidden fees, upgrade or downgrade anytime.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div key={index} className={`relative rounded-2xl p-6 ${plan.highlighted ? "border-2 border-black bg-black text-white shadow-xl" : "border border-black bg-white"}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-black"}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{plan.name}</h3>
                <p className={plan.highlighted ? "text-white mb-4" : "text-black mb-4"}>{plan.description}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-black"}`}>{plan.price}</span>
                  <span className={plan.highlighted ? "text-white ml-2" : "text-black ml-2"}>{plan.period}</span>
                </div>
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3"><Check className="w-5 h-5" /><span className={plan.highlighted ? "text-white" : "text-black"}>{feature}</span></div>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={`not-${i}`} className="flex items-center gap-3"><X className="w-5 h-5 text-gray-400" /><span className="text-gray-400">{feature}</span></div>
                  ))}
                </div>
                <Link href="/register" className={`block w-full py-2 rounded-lg font-semibold transition-all text-center ${plan.highlighted ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-black/90"}`}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 mt-10">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Everything you need to know about JusticeDesk. Have more questions? We&apos;re here to help.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
            <div className="space-y-1">
              {faqData.map((item, index) => (
                <button key={index} onClick={() => setActiveQ(index)} className={`w-full text-left p-4 rounded-lg transition-all duration-200 border ${activeQ === index ? "bg-black text-white border-black" : "hover:bg-gray-50 text-gray-700 border-transparent"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-mono ${activeQ === index ? "text-white" : "text-gray-400"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-medium">{item.question}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-6 lg:p-8">
              <div className="mb-4"><span className="text-sm font-mono text-gray-500">{String(activeQ + 1).padStart(2, "0")}</span></div>
              <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{faqData[activeQ].question}</h3>
              <p className="text-gray-600 leading-relaxed">{faqData[activeQ].answer}</p>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Still need help?</span>
                  <a href="#" className="text-black font-medium hover:underline">Contact our support team</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-black text-white relative">
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-12 sm:h-14 md:h-16" preserveAspectRatio="none">
            <path d="M0,30 C240,60 360,10 600,30 C840,50 960,5 1200,30 C1320,40 1380,20 1440,30 L1440,0 L0,0 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", letterSpacing: "0.05em" }}>JusticeDesk</h3>
                <p className="text-white/60 leading-relaxed">The modern platform for judicial management. Streamline case work, enhance collaboration, and bring clarity to justice administration.</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-white/60"><Mail size={18} /><span>support@justicedesk.rw</span></div>
                <div className="flex items-center gap-3 text-white/60"><Phone size={18} /><span>+250 783 120 891</span></div>
                <div className="flex items-center gap-3 text-white/60"><MapPin size={18} /><span>Kigali, Rwanda</span></div>
              </div>
            </div>
            {[
              { title: "Product", links: [["Features", "#features"], ["Pricing", "#pricing"], ["Security", "#"], ["Roadmap", "#"]] },
              { title: "Company", links: [["About", "#"], ["Blog", "#"], ["Careers", "#"], ["Press", "#"]] },
              { title: "Resources", links: [["Documentation", "#"], ["API Reference", "#"], ["Support", "#"], ["Status", "#"]] },
              { title: "Legal", links: [["Privacy Policy", "#"], ["Terms of Service", "#"], ["Cookie Policy", "#"], ["Licenses", "#"]] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map(([name, href]) => (
                    <li key={name}><a href={href} className="text-white/60 hover:text-white transition-colors">{name}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">© 2026 JusticeDesk. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Twitter</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">LinkedIn</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Eye,
  Fingerprint,
  Server,
  FileCheck,
  ChevronRight,
  Sparkles,
  Users,
  Code2,
  ArrowRight,
  Activity,
  Zap,
  Check,
  X,
} from "lucide-react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(0);

  // Partner form state
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [partnerData, setPartnerData] = useState({
    name: "",
    email: "",
    company: "",
    useCase: "",
  });
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count || 0))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "waitlist" }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setWaitlistCount(data.count || waitlistCount + 1);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerData.email || !partnerData.name) return;

    setPartnerLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...partnerData, type: "partner" }),
      });
      const data = await res.json();
      if (data.success) {
        setPartnerSubmitted(true);
      }
    } catch {
      // Fail silently
    } finally {
      setPartnerLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">TrustScope</span>
          </div>
          <button
            onClick={() => setPartnerOpen(true)}
            className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition"
          >
            Become a Partner
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              359 Patent Claims | Private Beta
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            Safe Mode for AI Agents
          </h1>

          {/* Subhead */}
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto">
            See what your AI agents are really doing. Then prove it.
          </p>

          {/* Waitlist form */}
          <div className="max-w-md mx-auto mb-6">
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center">
                <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-emerald-400 font-medium">You&apos;re on the list!</p>
                <p className="text-slate-400 text-sm mt-1">We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {loading ? "..." : "Request Access"}
                </button>
              </form>
            )}
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          {/* Social proof */}
          {waitlistCount > 0 && (
            <p className="text-slate-500 text-sm">
              Join {waitlistCount.toLocaleString()}+ teams on the waitlist
            </p>
          )}

          {/* Partner CTA */}
          <button
            onClick={() => setPartnerOpen(true)}
            className="mt-8 text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1"
          >
            Become a Design Partner
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your AI agents are taking thousands of actions.
            <br />
            <span className="text-slate-500">Can you prove what governance ran?</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Auditors and regulators are starting to ask. The companies that can answer will win.
          </p>
        </div>
      </section>

      {/* Data Hook */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              73%
            </p>
            <p className="text-slate-400 text-lg">
              of agents in our beta exceeded their declared scope
            </p>
          </div>
        </div>
      </section>

      {/* Solution: 4 Tiers */}
      <section className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Four Tiers of Governance
          </h2>
          <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">
            Start free. Scale to cryptographic proof.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Monitor",
                price: "$0",
                desc: "See everything",
                icon: Eye,
                color: "text-slate-400",
              },
              {
                name: "Protect",
                price: "$49",
                desc: "Block threats",
                icon: Shield,
                color: "text-blue-400",
              },
              {
                name: "Enforce",
                price: "$149",
                desc: "Policies + MCP",
                icon: Lock,
                color: "text-purple-400",
              },
              {
                name: "Govern",
                price: "$699",
                desc: "Cryptographic proof",
                icon: FileCheck,
                color: "text-emerald-400",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/[0.07] transition"
              >
                <tier.icon className={`w-8 h-8 ${tier.color} mx-auto mb-4`} />
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-white/80 mb-2">
                  {tier.price}
                  {tier.price !== "$0" && <span className="text-sm text-slate-500">/mo</span>}
                </p>
                <p className="text-slate-500 text-sm">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              One Integration. Every Framework.
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Unified Ingestion Engine for SDK, Gateway, MCP, and OpenTelemetry
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["LangChain", "LangGraph", "CrewAI", "AutoGen", "OpenAI Agents", "Claude", "Gemini"].map(
              (fw) => (
                <div
                  key={fw}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-400"
                >
                  {fw}
                </div>
              )
            )}
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Code2, label: "Python SDK" },
              { icon: Code2, label: "Node SDK" },
              { icon: Server, label: "Zero-Code Gateway" },
              { icon: Zap, label: "MCP Native" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center"
              >
                <item.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <span className="text-sm text-slate-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Built for Serious AI Governance
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Fingerprint,
                title: "Agent DNA Fingerprinting",
                desc: "Behavioral identity for every agent. Detect drift, freeze rogues.",
              },
              {
                icon: Shield,
                title: "21 Detection Engines",
                desc: "From prompt injection to hallucination. Block before damage.",
              },
              {
                icon: Lock,
                title: "26 Policy Types",
                desc: "Rate limits to human approval workflows. Full control.",
              },
              {
                icon: Server,
                title: "MCP Security",
                desc: "6-Factor Trust Scoring. Jaccard tampering detection.",
              },
              {
                icon: Activity,
                title: "Blockchain Audit Trail",
                desc: "Tamper-proof, legally admissible, independently verifiable.",
              },
              {
                icon: FileCheck,
                title: "Governance Certificates",
                desc: "Signed proof for auditors. Answer the hard questions.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition"
              >
                <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Become a Design Partner</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Shape the future of AI governance. Get early access and influence the roadmap.
              Limited to 50 companies.
            </p>
            <button
              onClick={() => setPartnerOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-8 py-4 rounded-lg text-lg font-medium transition inline-flex items-center gap-2"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-24 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Request Early Access
          </h2>
          <p className="text-slate-500 mb-8">
            Limited spots in our private beta. Join the waitlist.
          </p>
          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center max-w-md mx-auto">
              <Check className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-emerald-400 font-medium">You&apos;re on the list!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
              >
                {loading ? "..." : "Join"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-500">
            <Shield className="w-5 h-5" />
            <span className="text-sm">© 2026 TrustScope</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="mailto:hello@trustscope.ai" className="hover:text-slate-300 transition">
              hello@trustscope.ai
            </a>
          </div>
        </div>
      </footer>

      {/* Partner Form Modal */}
      {partnerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setPartnerOpen(false)}
          />
          <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full">
            <button
              onClick={() => setPartnerOpen(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {partnerSubmitted ? (
              <div className="text-center py-8">
                <Check className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Application Received!</h3>
                <p className="text-slate-400">
                  We&apos;ll be in touch about the Design Partner program.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Design Partner Program</h3>
                <p className="text-slate-400 mb-6">
                  Shape the future of AI governance. Limited to 50 companies.
                </p>

                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Name *</label>
                    <input
                      type="text"
                      value={partnerData.name}
                      onChange={(e) =>
                        setPartnerData({ ...partnerData, name: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Work Email *</label>
                    <input
                      type="email"
                      value={partnerData.email}
                      onChange={(e) =>
                        setPartnerData({ ...partnerData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Company</label>
                    <input
                      type="text"
                      value={partnerData.company}
                      onChange={(e) =>
                        setPartnerData({ ...partnerData, company: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">
                      What are you building?
                    </label>
                    <textarea
                      value={partnerData.useCase}
                      onChange={(e) =>
                        setPartnerData({ ...partnerData, useCase: e.target.value })
                      }
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={partnerLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {partnerLoading ? "Submitting..." : "Apply for Partner Program"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

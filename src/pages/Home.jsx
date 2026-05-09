import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../components/ui/Button";
import supabase from "../lib/supabase";

const highlights = [
  { label: "Member Overview", value: "Live group status" },
  { label: "Collection mode", value: "Digital + branch" },
  { label: "Auction records", value: "Tracked" },
  { label: "Receipts", value: "Instant records" },
  { label: "Member onboarding", value: "KYC assisted" },
  { label: "Auction flow", value: "Transparent" },
];

const features = [
  {
    icon: "🏦",
    title: "Chit savings plans",
    description:
      "Members can choose suitable chit groups, understand installments, and track their participation.",
  },
  {
    icon: "📑",
    title: "KYC and verification",
    description:
      "Document collection and verification workflows help keep group participation responsible.",
  },
  {
    icon: "🔔",
    title: "Updates and reminders",
    description:
      "Payment reminders, auction notifications, and support updates keep members informed.",
  },
  {
    icon: "⚖️",
    title: "Auction management",
    description:
      "Auction participation, bid records, winner updates, and dividend visibility are handled with clear logs.",
  },
  {
    icon: "🤝",
    title: "Agent collections",
    description:
      "Field agents can assist customers, collect payments, issue receipts, and coordinate local support.",
  },
  {
    icon: "📊",
    title: "Admin reporting",
    description:
      "Management teams get operational views for groups, dues, collections, auctions, and customer activity.",
  },
];

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <div className="space-y-20 pb-10">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white shadow-xl md:p-16">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-6xl text-white">
          Build disciplined savings with a digital-first chit partner.
        </h1>

        <p className="mt-5 max-w-2xl text-base text-blue-100 md:text-lg">
          MjChits helps members join structured chit groups, follow payment schedules, receive auction updates, and access branch or agent support with clear records.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/services">
            <Button className="bg-white !text-blue-900 hover:bg-blue-50 shadow-lg transition-all duration-200">
              Explore Services →
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="secondary"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
            >
              Talk to Support
            </Button>
          </Link>
        </div>
      </section>
      
      {/* ── HIGHLIGHTS ── */}
      <section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="rounded-xl bg-white p-4 text-center shadow-sm border border-slate-100">
              <div className="text-sm text-slate-500 mb-1">{item.label}</div>
              <div className="font-semibold text-slate-800">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            A practical chit fund experience for members, agents, and admins.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl group-hover:bg-blue-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden rounded-2xl bg-blue-50 border border-blue-100 p-10 text-center shadow-sm md:p-16">
        <h2 className="relative text-3xl font-bold text-slate-900 md:text-4xl">
          Digital chit services
        </h2>
        <p className="relative mt-3 mx-auto max-w-2xl text-slate-600">
          MjChits provides structured chit groups, transparent auctions, digital receipts, branch support, and customer-first servicing for community savings.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/signup">
                <Button className="bg-blue-600 !text-white hover:bg-blue-700 shadow-md px-8 transition-all duration-200">
                  Join Now
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary">Member Login</Button>
              </Link>
            </>
          ) : (
            <Link to="/profile">
              <Button className="bg-blue-600 !text-white hover:bg-blue-700 shadow-md px-8">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>
      </section>

    </div>
  );
}

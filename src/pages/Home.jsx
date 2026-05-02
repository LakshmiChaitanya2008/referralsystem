import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../components/ui/Button";
import supabase from "../lib/supabase";

const stats = [
  { value: "2.4K+", label: "Local Sellers", icon: "🏪" },
  { value: "12K+", label: "Products Listed", icon: "📦" },
  { value: "₹4.2Cr", label: "GMV Facilitated", icon: "💰" },
  { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
];

const features = [
  {
    icon: "🔗",
    title: "Binary Referral Network",
    description:
      "Every user can invite exactly two people, creating a tight, verifiable chain of trust. No spam—every connection is intentional.",
  },
  {
    icon: "🗺️",
    title: "Hyperlocal Discovery",
    description:
      "Find sellers in your neighborhood. Our proximity engine surfaces vendors who are actually near you, not just in your city.",
  },
  {
    icon: "🏆",
    title: "Trust Scores",
    description:
      "Every seller earns a trust score based on community reviews, transaction history, and referral quality. Shop with confidence.",
  },
  {
    icon: "📊",
    title: "Network Analytics",
    description:
      "Visualize your entire referral tree in real time. See how your network grows and track the impact of each invitation.",
  },
  {
    icon: "🔐",
    title: "Invite-Only Growth",
    description:
      "Referral codes are personal and non-transferable. This keeps the marketplace curated, safe, and high-quality for everyone.",
  },
  {
    icon: "⚡",
    title: "Instant Onboarding",
    description:
      "Sign up in under a minute. Your profile, referral code, and network dashboard are ready the moment you verify your email.",
  },
];

const steps = [
  {
    number: "01",
    title: "Get Invited",
    description:
      "Receive a unique referral code from someone you trust who is already part of LocalBazaar.",
  },
  {
    number: "02",
    title: "Create Your Profile",
    description:
      "Sign up with your referral code. Instantly get your own unique referral code to share with others.",
  },
  {
    number: "03",
    title: "Build Your Network",
    description:
      "Invite two trusted people. Watch your network tree grow with every referral they make downstream.",
  },
  {
    number: "04",
    title: "Trade & Prosper",
    description:
      "Buy from verified local sellers, list your own products, and earn trust within your community.",
  },
];

const testimonials = [
  {
    name: "Priya Menon",
    role: "Homemade Pickle Seller, Bangalore",
    quote:
      "LocalBazaar connected me with 40+ regular buyers in my area within a month. The referral system makes sure every customer is vouched for.",
    initials: "PM",
    color: "from-rose-400 to-pink-500",
  },
  {
    name: "Rahul Hegde",
    role: "Organic Farmer, Mysore",
    quote:
      "I sell directly to consumers without any middlemen. My network tree has 11 people now and growing—all from a single invite.",
    initials: "RH",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Anita Shetty",
    role: "Handloom Weaver, Hubli",
    quote:
      "Being invite-only means buyers here are genuine. No time-wasters. My conversion rate is almost 80% which is unbelievable.",
    initials: "AS",
    color: "from-emerald-400 to-teal-500",
  },
];

const faqs = [
  {
    q: "Who can join LocalBazaar?",
    a: "Anyone with a referral code from an existing member can join. This keeps the community trusted and spam-free.",
  },
  {
    q: "What does the binary referral limit mean?",
    a: "Each person can directly refer a maximum of two people. This creates a balanced and manageable network structure.",
  },
  {
    q: "Can I change my referral code?",
    a: "Yes! You can update your referral code at any time from your profile page, as long as the new code isn't already taken.",
  },
  {
    q: "Is there a fee to list products?",
    a: "Currently listing is free. We plan to introduce premium tiers with advanced analytics and priority placement in the future.",
  },
];

function FaqItem({ q, a }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 hover:border-blue-200 dark:hover:border-blue-900 transition-colors duration-200">
      <p className="font-semibold text-slate-900 dark:text-white">{q}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-neutral-400">{a}</p>
    </div>
  );
}

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
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-10 text-white shadow-xl dark:from-neutral-900 dark:to-neutral-950 dark:border dark:border-neutral-800 md:p-16">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl dark:bg-white/5" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-400/20 blur-2xl dark:bg-indigo-900/30" />



        <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight dark:text-white md:text-6xl">
          Discover sellers and grow your network.
        </h1>

        <p className="mt-5 max-w-xl text-base text-blue-100 dark:text-neutral-300 md:text-lg">
          Connect with nearby vendors, invite others to join, and build a
          community-driven marketplace powered by trust—one referral at a time.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {!isLoggedIn && (
            <Link to="/signup">
              <Button className="bg-white !text-white hover:bg-blue-50 dark:bg-white dark:!text-white dark:hover:bg-neutral-200 shadow-lg transition-all duration-200">
                Sign Up →
              </Button>
            </Link>
          )}
          <Link to="/profile">
            <Button
              variant="secondary"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-all duration-200"
            >
              View My Network
            </Button>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap gap-6">
          {["No ads, ever", "Binary tree model", "Hyperlocal first"].map((badge) => (
            <span key={badge} className="flex items-center gap-2 text-sm text-blue-100 dark:text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      
      {/* ── FEATURES ── */}
      <section>
        <div className="mb-10 text-center">
          <span className="rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            Everything you need to trade locally.
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-slate-500 dark:text-neutral-400">
            Built for trust. Designed for communities. LocalBazaar gives you the
            tools to grow sustainably.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 dark:shadow-none"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-neutral-800 text-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-10 shadow-md dark:shadow-none">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            From invite to income in four steps.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-start">
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-12 hidden h-px w-full bg-gradient-to-r from-slate-200 to-transparent dark:from-neutral-700 lg:block" />
              )}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white shadow-md">
                {step.number}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-neutral-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
    

      {/* ── FAQ ── */}
      <section>
        <div className="mb-8 text-center">
          <span className="rounded-full border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            FAQs
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            Frequently asked questions.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-neutral-900 dark:to-neutral-950 dark:border dark:border-neutral-800 p-10 text-center text-white shadow-xl md:p-16">
        <div className="absolute -bottom-16 -right-16 h-60 w-60 rounded-full bg-white/10 blur-3xl dark:bg-white/5" />
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-2xl dark:bg-indigo-900/20" />

        <h2 className="relative text-3xl font-bold dark:text-white md:text-4xl">
          Ready to join the network?
        </h2>
        <p className="relative mt-3 mx-auto max-w-md text-blue-100 dark:text-neutral-400">
          You will need an invite code from an existing member. Get yours today and start building your local marketplace presence.
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/signup">
            <Button className="bg-white !text-white hover:bg-blue-50 dark:bg-white dark:!text-neutral-900 dark:hover:bg-neutral-200 shadow-lg px-8 transition-all duration-200">
              Create an Account
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="secondary"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition-all duration-200"
            >
              Login
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 pb-16">

      <section>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Contact Us</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-neutral-400">
          Tell us about your referral goals. We usually reply within one business day.
        </p>
      </section>

      <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-8 shadow-sm dark:shadow-none dark:backdrop-blur-sm">
        <form className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input id="firstName" label="First Name" placeholder="Laksh" />
            <Input id="lastName" label="Last Name" placeholder="Sharma" />
          </div>
          <Input id="contact-email" type="email" label="Work Email" placeholder="you@company.com" />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-medium text-slate-700 dark:text-neutral-300">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="How can we help?"
              className="w-full resize-none rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950/60 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-neutral-600 transition-all focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>

          <Button type="submit" className="w-full sm:w-auto">
            Send Message →
          </Button>
        </form>
      </div>

    </div>
  );
}

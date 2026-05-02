import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Contact Us</h1>
        <p className="mt-3 text-slate-600 dark:text-neutral-400">
          Tell us about your referral goals. We usually reply within one business day.
        </p>
      </section>

      <Card>
        <form className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Input id="firstName" label="First Name" placeholder="Laksh" />
            <Input id="lastName" label="Last Name" placeholder="Sharma" />
          </div>
          <Input id="email" type="email" label="Work Email" placeholder="you@company.com" />
          <Input id="message" label="Message" placeholder="How can we help?" />
          <Button type="submit" className="w-full md:w-auto">
            Send Message
          </Button>
        </form>
      </Card>
    </div>
  );
}

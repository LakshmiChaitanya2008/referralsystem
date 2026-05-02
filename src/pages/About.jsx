import Card from "../components/ui/Card";

export default function About() {
  return (
    <div className="space-y-8">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          About LocalBazaar
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          LocalBazaar is a community-driven marketplace that connects local
          sellers and buyers through trusted networks. Our platform helps users
          discover nearby businesses, build meaningful connections, and grow
          their local ecosystem organically.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <Card
          title="Community First"
          description="Empowering local sellers and buyers to connect through trusted networks."
        />
        <Card
          title="Smart Connections"
          description="Grow your network by inviting others and expanding your local reach."
        />
        <Card
          title="Sustainable Growth"
          description="Support local businesses while building a strong and reliable marketplace."
        />
      </section>
    </div>
  );
}

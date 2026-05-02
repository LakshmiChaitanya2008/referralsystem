import Card from "../components/ui/Card";

export default function Profile() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-4xl font-bold tracking-tight text-slate-900">Profile</h1>
      <Card
        title="You are logged in"
        description="This is your profile area. You can now continue building authenticated user features."
      />
    </div>
  );
}

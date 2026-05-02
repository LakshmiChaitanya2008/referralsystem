import { Link } from "react-router";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  return (
    <div className="mx-auto max-w-md">
      <Card title="Welcome Back" description="Login to manage your referral campaigns.">
        <form className="space-y-4">
          <Input id="login-email" type="email" label="Email" placeholder="you@company.com" />
          <Input id="login-password" type="password" label="Password" placeholder="••••••••" />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-blue-700 hover:text-blue-800">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}

import { Link } from "react-router";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function SignUp() {
  return (
    <div className="mx-auto max-w-md">
      <Card
        title="Create Account"
        description="Start building your referral engine in minutes."
      >
        <form className="space-y-4">
          <Input id="name" label="Full Name" placeholder="Laksh Sharma" />
          <Input
            id="signup-email"
            type="email"
            label="Email"
            placeholder="you@company.com"
          />
          <Input
            id="signup-phone"
            type="phone"
            label="Phone"
            placeholder="+91 1234567890"
          />
          <Input
            id="signup-password"
            type="password"
            label="Password"
            placeholder="••••••••"
          />
          <Input
            id="referral-code"
            type="text"
            label="Referral Code"
            placeholder="Enter your referral code (optional)"
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}

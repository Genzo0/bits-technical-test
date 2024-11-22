import BackgroundGradient from "@/components/BackgroundGradient";
import GradientWrapper from "@/components/GradientWrapper";
import Link from "next/link";
import LoginForm from "./LoginForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <GradientWrapper className="w-full py-16">
        <BackgroundGradient />
        <div className="mx-auto max-w-xl space-y-14">
          <LoginForm />
          <p className="text-center text-sm">
            No account?{" "}
            <Link href={"/register"} className="underline">
              Register here
            </Link>
          </p>
        </div>
      </GradientWrapper>
    </MaxWidthWrapper>
  );
}

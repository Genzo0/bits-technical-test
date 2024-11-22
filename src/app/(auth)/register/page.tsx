import BackgroundGradient from "@/components/BackgroundGradient";
import GradientWrapper from "@/components/GradientWrapper";
import Link from "next/link";
import RegisterForm from "./RegisterForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <GradientWrapper className="w-full py-16">
        <BackgroundGradient />
        <div className="mx-auto max-w-xl space-y-14">
          <RegisterForm />
          <p className="text-center text-sm">
            Have an account?{" "}
            <Link href={"/login"} className="underline">
              Login here
            </Link>
          </p>
        </div>
      </GradientWrapper>
    </MaxWidthWrapper>
  );
}

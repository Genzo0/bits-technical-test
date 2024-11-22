"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    username: z.string().nonempty("Username is required"),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .nonempty("Password is required"),
    confirmPassword: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // Send only email, username, and password (not confirmPassword)
      const { confirmPassword, ...submitData } = data;

      // Make your API call here
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      console.log(submitData);

      const res = await response.json();

      if (!response.ok) {
        toast({
          title: res.message,
          description: res.errorMessage,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Account created",
        description: "You have been registered, please login",
      });

      router.push("/login");
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="px-5 text-2xl font-bold">Register</h1>

        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
                    placeholder="Enter Email"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
                    placeholder="Create Username"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
                    placeholder="Create Password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
                    placeholder="Confirm Password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="relative">
          <div className="absolute -inset-1 top-2 -z-[1] rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] opacity-75 blur"></div>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="relative h-12 w-full rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] font-semibold text-white"
          >
            {form.formState.isSubmitting ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

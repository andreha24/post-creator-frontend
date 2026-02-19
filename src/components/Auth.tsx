"use client";

import { TextField } from "@/ui/TextField";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@/ui/Button";
import { GoogleButton } from "./GoogleButton";
import { usePathname, useRouter } from "next/navigation";
import { loginUser, registerUser } from "@/api/auth/auth";
import useUserStore from "@/store/useUserStore";
import { notify } from "@/utils/alert";

interface CreateUserSchema {
  email: string;
  name: string;
  password: string;
}

export const Auth = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";
  const setUser = useUserStore.use.setUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUserSchema>();

  const onSubmit: SubmitHandler<CreateUserSchema> = async (data) => {
    try {
      const res = isLoginPage ? await loginUser(data) : await registerUser(data);
      setUser(res);
      reset();
      notify({ text: isLoginPage ? "Welcome back 👋" : "Registration successful 🎉", type: "success" });

      router.push("/");
    } catch (error: any) {
      console.log("error", error);
      notify({ text: error.response?.data.error, type: "error" });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-10">
        <h2 className="!text-4xl">
          {isLoginPage ? "Create Amazing Social Media Content" : "Start Creating Amazing Content Today"}
        </h2>
        <p className="text-secondary">
          {isLoginPage
            ? "Generate engaging posts with AI-powered text and images for all your social platforms"
            : "Join thousands of creators using AI to generate engaging social media posts"}
        </p>
      </div>

      <div className="flex justify-between gap-10">
        <div className="flex flex-col">
          <Image src="/futuristic.jpg" width={500} height={500} alt="futuristic" />
          <div></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="min-w-[500px]">
          <div className="flex flex-col gap-2 !mb-4">
            <h1 className="!text-2xl">{isLoginPage ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-secondary">
              {isLoginPage ? "Sign in to your account to continue" : "Start generating amazing content today"}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <TextField
              label="Email Address"
              icon={<MailOutlineIcon />}
              placeholder="you@example.com"
              registerName="email"
              register={register}
            />

            {!isLoginPage && (
              <TextField
                label="Name"
                icon={<PersonIcon />}
                placeholder="Enter your name"
                registerName="name"
                register={register}
              />
            )}

            <TextField
              label="Password"
              icon={<LockIcon />}
              placeholder={isLoginPage ? "Enter your password" : "Create a password"}
              registerName="password"
              register={register}
            />

            {!isLoginPage && (
              <TextField label="Repeat Password" icon={<LockIcon />} placeholder="Confirm your password" />
            )}

            <Button label={isLoginPage ? "Sign In" : "Sign Up"} className="bg-blue-400 text-white" />
            <GoogleButton />
          </div>
        </form>
      </div>
    </>
  );
};

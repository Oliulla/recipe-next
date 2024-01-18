"use client";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";

const socialLoginProviders = {
  GOOGLE: "google",
};

export default function AuthForm({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [checkAuth, setCheckAuth] = useState("Authentication Checking...");
  const router = useRouter();

  useEffect(() => {
    console.log("user from authform-->", user);
    if (user?.email || user?.name) {
      router.push("/");
    }
    setCheckAuth("");
  }, []);

  // this is callback url after login
  const callbackUrl = "http://localhost:3000";

  const login = async (provider) => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl });
    setIsLoading(false);
  };

  return (
    <>
      {checkAuth ? (
        <p className="flex justify-center items-center text-xl text-red-600 min-h-screen">
          {checkAuth}
        </p>
      ) : (
        <>
          {" "}
          <div className="min-h-screen flex items-center justify-center">
            {isLoading ? (
              <Button>
                <Spinner aria-label="Spinner button example w-full" />
                <span className="pl-3">Loading...</span>
              </Button>
            ) : (
              <button
                className="flex flex-row gap-2 bg-gray-800 hover:bg-gray-900 transition delay-75 py-3 px-2 rounded-md text-white"
                onClick={() => login(socialLoginProviders.GITHUB)}
              >
                <BsGoogle className="w-6 h-6" />
                Sign in with Google
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import NavBar from "@/components/NavBar";
import EmailField from "@/components/EmailField";
import PasswordField from "@/components/PasswordField";
import ErrorPopup from "@/components/ErrorPopup";
import Loader from "@/components/Loader";

import { validateEmail, validatePassword } from "@/hooks/useValidate";

import rootStore from "@/stores";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPasword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const handleChangeEmail = (e) => {
    setEmailError(validateEmail(e.target.value));
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPasswordError(validatePassword(e.target.value));
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPasword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    if (!emailError && !passwordError) {
      setLoading(true);
      let resp = await rootStore.userStore.login({
        email: email,
        password: password,
      });

      if (resp === true) {
        router.push("/");
        rootStore.orderStore.getOrders(rootStore.userStore._id);
        setLoading(false);
      } else {
        console.log("Error logging in", resp);
        setLoginError(resp.message);
        setLoading(false);
      }
    }
  };
  return (
    <>
      <NavBar />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-4/5">
          <div className="absolute flex-shrink-0 p-8 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow w-80 top-1/2 left-1/2 dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-center ">Login</h2>
            <form onSubmit={handleSubmit}>
              <EmailField
                email={email}
                handleChangeEmail={handleChangeEmail}
                emailError={emailError}
              />
              <PasswordField
                password={password}
                handleChangePassword={handleChangePassword}
                passwordError={passwordError}
                showPassword={showPassword}
                handleTogglePassword={handleTogglePassword}
              />
              <button
                type="submit"
                className="w-full px-4 py-2 mb-4 text-white rounded bg-sky-500 hover:bg-sky-600"
              >
                Login
              </button>
              <div className="mb-2 text-center">
                New user?
                <Link
                  href="/signup"
                  className="pl-1 underline hover:text-sky-600"
                >
                  signup here
                </Link>
              </div>
              {loginError && (
                <ErrorPopup
                  message={loginError}
                  onClose={() => {
                    setLoginError("");
                  }}
                />
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

"use client";
import EmailField from "@/components/EmailField";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateEmail, validatePassword } from "@/hooks/useValidate";
import PasswordField from "@/components/PasswordField";

import rootStore from "@/stores";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPasword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
      // Perform login or submit form
      let resp = await rootStore.userStore.login({
        email: email,
        password: password,
      });
      if (resp.status === 200) {
        let data = resp.data;
        rootStore.userStore._id = data._id;
        rootStore.userStore.name = data.name;
        rootStore.userStore.email = data.email;
        rootStore.userStore.cart = data.cart;
        rootStore.userStore.orders = data.orders;
        rootStore.userStore.jwtToken = data.access_token;
        rootStore.userStore.isLoggedIn = true;
        router.push("/");
      } else {
        console.log("Error logging in", resp);
      }
    }
  };
  return (
    <>
      <NavBar />
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
            <div className="text-center">
              New user?
              <Link
                href="/signup"
                className="pl-1 underline hover:text-sky-600"
              >
                signup here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

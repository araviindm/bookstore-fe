"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import NavBar from "@/components/NavBar";
import EmailField from "@/components/EmailField";
import PasswordField from "@/components/PasswordField";
import ErrorPopup from "@/components/ErrorPopup";
import Loader from "@/components/Loader";

import {
  validateName,
  validateEmail,
  validatePassword,
} from "@/hooks/useValidate";

import rootStore from "@/stores";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPasword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const handleChangeName = (e) => {
    setNameError(validateName(e.target.value));
    setName(e.target.value);
  };

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
    setNameError(validateName(name));
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    if (!nameError && !emailError && !passwordError) {
      setLoading(true);
      let resp = await rootStore.userStore.signup({
        name: name,
        email: email,
        password: password,
        cart: [],
        orders: [],
      });

      if (resp === true) {
        router.push("/");
        setLoading(false);
      } else {
        console.log("Error in Signup", resp);
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
          <div
            className={`absolute flex-shrink-0 px-8 transform -translate-x-1/2 bg-white rounded-lg shadow -translate-y-[43%] w-80 top-1/2 left-1/2 dark:bg-gray-800 ${
              !nameError && !emailError && !passwordError ? "py-8" : "py-4"
            }`}
          >
            <h2 className="mb-4 text-2xl font-bold text-center ">Signup</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium dark:border-gray-400 dark:text-slate-200"
                >
                  Name
                </label>
                <input
                  type="name"
                  value={name}
                  onChange={handleChangeName}
                  className={`w-full px-3 py-2 border border-gray-300 rounded dark:border-gray-400 focus:outline-none dark:bg-gray-800 ${
                    nameError ? "border-red-400 dark:border-red-400" : ""
                  }`}
                  placeholder="Enter your name"
                />
                <span className="text-red-400">{nameError}</span>
              </div>
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
                Signup
              </button>
              <div className="mb-1 text-center">
                Already an user?
                <Link
                  href="/login"
                  className="pl-1 underline hover:text-sky-600"
                >
                  login here
                </Link>
              </div>
              {signupError && (
                <ErrorPopup
                  message={signupError}
                  onClose={() => {
                    setSignupError("");
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

export default Signup;

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
// Icons
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import { ApiConstants } from "../../api/ApiConstants";
import custom_axios from "../../axios/AxiosSetup";

import { toast } from "react-toastify";

const Login = () => {
  let navigate = useNavigate();
  let email: any = useRef();
  let password: any = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const loginApp = async () => {
    if (email.current.value == "" || password.current.value == "") {
      toast.info("Please fill the information");
      return;
    }
    try {
      const response = await custom_axios.post(ApiConstants.LOGIN, {
        email: email.current.value,
        password: password.current.value,
      });
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error: any) {
      if (error.response.status == 401) toast.warn(error.response.data.message);
    }

    // navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Page <span className="text-primary">Authentication:</span>
        </h1>
        <div className="mb-8">
          <button className="flex items-center justify-center py-3 px-4 gap-4 bg-secondary-900 w-full rounded-full mb-8 text-gray-100">
            <img src="/bois.jpg" className="w-10 h-10 rounded-xl" />
            Groupe Sarl Bois
          </button>
          <div className="relative mb-4">
            <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <input
              ref={email}
              type="email"
              className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
              placeholder="Email:"
            />
          </div>
          <div className="relative mb-8">
            <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg"
              placeholder="Password:"
            />
            {showPassword ? (
              <RiEyeOffLine
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
              />
            ) : (
              <RiEyeLine
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
              />
            )}
          </div>
          <div>
            <button
              onClick={loginApp}
              className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

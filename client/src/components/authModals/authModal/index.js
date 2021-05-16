import React, { useEffect, useState } from "react";
import "./authmodal.scss";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AuthModal({ setAuth, setLogged }) {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState(null);
  useEffect(() => {
    closeLoginError();
  }, [loginError]);

  function closeLoginError() {
    setTimeout(() => setLoginError(null), 5000);
  }

  async function onSubmit(d, event) {
    try {
      event.preventDefault();
      const { name, password } = d;
      const { data } = await axios.post("http://localhost:5000/auth/login", {
        name,
        password,
      });
      localStorage.setItem("jwt", data.jwt);
      setAuth(false);
      setLogged(true);
    } catch (err) {
      setLoginError(err.response.data.message);
    }
  }

  const loginInputs = [
    { type: "text", placeholder: "Name", register: "name" },
    { type: "password", placeholder: "Password", register: "password" },
  ];

  return (
    <div className="auth-modal" onClick={() => setAuth(false)}>
      <div className="auth-modal__window" onClick={(e) => e.stopPropagation()}>
        <h1 className="auth-modal__title">Authorization</h1>

        <form className="auth-modal__form" onSubmit={handleSubmit(onSubmit)}>
          {loginInputs.map((item) => (
            <input
              key={item.type}
              type={item.type}
              className="auth-modal__input"
              placeholder={item.placeholder}
              {...register(`${item.register}`)}
            />
          ))}
          {loginError ? (
            <p className="auth-modal__error">{loginError}</p>
          ) : null}

          <button type="submit" className="auth-modal__submit-btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

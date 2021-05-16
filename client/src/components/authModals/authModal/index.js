import React from "react";
import "./authmodal.scss";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AuthModal({ setAuth }) {
  const { register, handleSubmit } = useForm();
  async function onSubmit(d, event) {
    try {
      event.preventDefault();
      const { name, password } = d;
      const { data } = await axios.post("http://localhost:5000/auth/login", {
        name,
        password,
      });
      console.log(data.jwt);
      setAuth(false);
    } catch (err) {
      console.log(err.response.data.message);
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
          <button type="submit" className="auth-modal__submit-btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

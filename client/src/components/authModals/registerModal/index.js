import React, { useEffect, useState } from "react";
import "./registermodal.scss";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function RegisterModal({ setRegister, setRegisterSuccess }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  useEffect(() => {
    closeErr();
  }, [error]);

  function closeErr() {
    if (error) {
      setTimeout(() => setError(null), 5000);
    }
  }

  async function onSubmit(d = {}, event) {
    try {
      event.preventDefault();
      const { name, email, password } = d;
      const { data } = await axios.post("http://localhost:5000/auth/register", {
        name,
        password,
        email,
      });
      setRegister(false);
      setRegisterSuccess(data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  const inputs = [
    { type: "text", placeholder: "Name", register: "name" },
    { type: "email", placeholder: "Email", register: "email" },
    { type: "password", placeholder: "Password", register: "password" },
  ];

  return (
    <div className="register-modal" onClick={() => setRegister(false)}>
      <div
        className="register-modal__window"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="register-modal__title">Registration</h1>

        <form
          className="register-modal__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {inputs.map((item) => (
            <input
              key={item.type}
              className="register-modal__input"
              type={item.type}
              placeholder={item.placeholder}
              {...register(`${item.register}`)}
            />
          ))}
          {error ? <p className="register-modal__error">{error}</p> : null}
          <button type="submit" className="register-modal__submit-btn">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./auth.scss";
import AuthModal from "../authModals/authModal";
import RegisterModal from "../authModals/registerModal";

export default function Authorization() {
  const [auth, setAuth] = useState(false);
  const [register, setRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(null);
  useEffect(() => {
    closeSuccess();
  }, [registerSuccess]);

  function closeSuccess() {
    setTimeout(() => setRegisterSuccess(null), 5000);
  }

  return (
    <>
      <div className="auth">
        <div className="auth_btns">
          <button className="auth_sign-in" onClick={() => setAuth(true)}>
            Sign in
          </button>
          <button className="auth_sign-up" onClick={() => setRegister(true)}>
            Sign up
          </button>
        </div>

        {registerSuccess ? (
          <p className="register-success">{registerSuccess}</p>
        ) : null}
      </div>

      {auth && <AuthModal setAuth={setAuth} />}
      {register && (
        <RegisterModal
          setRegister={setRegister}
          setRegisterSuccess={setRegisterSuccess}
        />
      )}
    </>
  );
}

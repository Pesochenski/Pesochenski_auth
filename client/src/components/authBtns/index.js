import React, { useEffect, useState } from "react";
import "./auth.scss";
import AuthModal from "../authModals/authModal";
import RegisterModal from "../authModals/registerModal";

export default function Authorization() {
  const [auth, setAuth] = useState(false);
  const [register, setRegister] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    closeSuccess();
  }, [registerSuccess]);

  function closeSuccess() {
    if (registerSuccess) {
      setTimeout(() => setRegisterSuccess(null), 5000);
    }
  }

  return (
    <>
      <div className="auth">
        {!logged ? (
          <>
            <div className="auth_btns">
              <button className="auth_sign-in" onClick={() => setAuth(true)}>
                Sign in
              </button>
              <button
                className="auth_sign-up"
                onClick={() => setRegister(true)}
              >
                Sign up
              </button>
            </div>

            {registerSuccess ? (
              <p className="auth__register-success">{registerSuccess}</p>
            ) : null}
          </>
        ) : (
          <button onClick={() => setLogged(false)} className="auth__logout">
            Logout
          </button>
        )}
      </div>

      {auth && <AuthModal setAuth={setAuth} setLogged={setLogged} />}
      {register && (
        <RegisterModal
          setRegister={setRegister}
          setRegisterSuccess={setRegisterSuccess}
        />
      )}
    </>
  );
}

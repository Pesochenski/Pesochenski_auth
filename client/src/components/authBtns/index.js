import React, { useState } from "react";
import "./auth.scss";
import AuthModal from "../authModals/authModal";
import RegisterModal from "../authModals/registerModal";

export default function Authorization() {
  const [auth, setAuth] = useState(false);
  const [register, setRegister] = useState(false);

  return (
    <>
      <div className="btns">
        <button className="btns_sign-in" onClick={() => setAuth(true)}>
          Sign in
        </button>
        <button className="btns_sign-up" onClick={() => setRegister(true)}>
          Sign up
        </button>
      </div>

      {auth && <AuthModal auth={setAuth} />}
      {register && <RegisterModal register={setRegister} />}
    </>
  );
}

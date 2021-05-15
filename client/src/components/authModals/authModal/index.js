import React from "react";
import "./authmodal.scss";

export default function AuthModal({ auth }) {
  return (
    <div className="auth-modal" onClick={() => auth(false)}>
      <div className="auth-modal__window" onChange={(e) => e.stopPropagation()}>
        <h1 className="auth-modal__title">Sign in</h1>
      </div>
    </div>
  );
}

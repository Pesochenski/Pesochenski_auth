import React from "react";
import "./registermodal.scss";

export default function RegisterModal({ register }) {
  return (
    <div className="register-modal" onClick={() => register(false)}>
      <div className="register-modal__window">
        <h1 className="register-modal__title">Sign up</h1>
      </div>
    </div>
  );
}

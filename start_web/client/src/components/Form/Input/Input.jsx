import React from "react";
export default function Input({ objValue, onChange, index }) {
  const { label, type, value } = objValue;
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}</label>
      <div className="input">
        <input
          type={type || "text"}
          id={label}
          value={value || ""}
        //   className={classname || ""}
          onChange={(e) => onChange(e, index)}
        />
      </div>
    </div>
  );
}

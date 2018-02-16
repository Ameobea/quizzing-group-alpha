import React from "react";
import "./App.css";
import "./answerField.css";

export const AnswerField = ({ value, label, onChange, name, placeholder }) => (
  <div style={{ display: "flex", flexDirection: "row", paddingBottom: 5 }}>
    <span style={{ display: "flex", alignSelf: "center", paddingRight: 4 }}>{label}</span>
    <span style={{ paddingRight: 4 }}>
      <input id="checkBox" type="checkbox" style={{width: 20}} />
    </span>
    <input type='text' value={value} onChange={onChange} placeholder={placeholder} name={name} />
  </div>
);

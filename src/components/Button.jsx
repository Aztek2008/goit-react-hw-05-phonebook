import React from "react";
import "../index.css";

export default function Button({ buttonName, onRemove, id }) {
  return (
    <button className="Button" type="submit" onClick={onRemove} id={id}>
      {buttonName}
    </button>
  );
}

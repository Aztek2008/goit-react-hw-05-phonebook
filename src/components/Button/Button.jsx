import React from "react";
// import "../index.css";
import styles from "./Button.module.css";

export default function Button({ buttonName, onRemove, id }) {
  return (
    <button className={styles.Button} type="submit" onClick={onRemove} id={id}>
      {buttonName}
    </button>
  );
}

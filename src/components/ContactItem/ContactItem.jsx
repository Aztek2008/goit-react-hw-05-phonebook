import React from "react";
import styles from "./ContactItem.module.css";

export default function ContactItem({ contact, children, onRemoveContact }) {
  return (
    <li className={styles.ContactItem}>
      {contact.name}: {contact.number}
      <button
        id={contact.id}
        className="Button"
        type="submit"
        onClick={onRemoveContact}
      >
        Remove Contact
      </button>
    </li>
  );
}

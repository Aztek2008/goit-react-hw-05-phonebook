import React from "react";
import s from "./ContactItem.module.css";

export default function ContactItem({ contact, onRemoveContact }) {
  return (
    <li className={s.ContactItem}>
      {contact.name}: {contact.number}
      <button
        type="submit"
        id={contact.id}
        className={s.Button}
        onClick={onRemoveContact}
      >
        Remove Contact
      </button>
    </li>
  );
}

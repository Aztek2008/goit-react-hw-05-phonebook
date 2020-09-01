import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ContactItem from "../ContactItem/ContactItem";
import AppearStyles from "./AppearStyles.module.css";
import s from "./ContactList.module.css";

export default function ContactList({ contacts, onRemoveContact }) {
  return (
    <>
      <TransitionGroup component="ul" className={s.ContactList}>
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <CSSTransition
              timeout={200}
              key={contact.id}
              classNames={AppearStyles}
            >
              <ContactItem
                onRemoveContact={onRemoveContact}
                contact={contact}
                id={contact.id}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </>
  );
}

import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ContactItem from "../ContactItem/ContactItem";
import styles from "./ContactList.module.css";
import AppearStyles from "./AppearStyles.module.css";

export default function ContactList({ contacts, onRemoveContact }) {
  return (
    <>
      <TransitionGroup component="ul" className={styles.ContactList}>
        {contacts.length > 0 &&
          contacts.map((contact) => (
            <CSSTransition
              key={contact.id}
              classNames={AppearStyles}
              timeout={200}
            >
              <ContactItem
                id={contact.id}
                contact={contact}
                onRemoveContact={onRemoveContact}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </>
  );
}

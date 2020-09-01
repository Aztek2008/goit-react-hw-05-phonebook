import React, { Component } from "react";

import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    persistedContacts &&
      this.setState({ contacts: JSON.parse(persistedContacts) });
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.contacts !== this.state.contacts && this.setLocalStorage();
  }

  addContact = (contact) => {
    this.setState((prevState) => {
      const existedContacts = prevState.contacts.map((cont) => cont.name);
      const newName = contact.name;
      const newNumber = contact.number;
      // ===============================
      // PREVENT SAVING SAME CONTACT
      // ===============================
      return {
        contacts:
          existedContacts.includes(newName) ||
          newName === "" ||
          newNumber === ""
            ? prevState.contacts
            : [...prevState.contacts, contact],
      };
    });
  };

  setLocalStorage = () => {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  };

  removeContact = (e) => {
    this.setState({
      contacts: this.state.contacts.filter(
        (contact) => contact.id !== e.target.id
      ),
    });
  };

  changeFilter = (e) => {
    const { name, value } = e;
    this.setState({
      [name]: value,
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return (
      contacts.length > 0 &&
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase()) ||
          contact.number.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  // =================================================
  //           V V V -RENDER HERE- V V V
  // =================================================
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} appState={this.state} />
        </Section>

        <Section title="Contacts">
          {this.state.contacts.length > 1 && (
            // ============================================
            // RENDER FILTER IF HAVE MORE THN 1 CONTACT IN LIST
            // ============================================
            <Filter onChangeFilter={this.changeFilter} value={filter} />
          )}
          {visibleContacts.length > 0 ? (
            // =========================================
            // RENDER CONTACTS IF HAVE CONTACTS IN LIST
            // =========================================
            <ContactList
              contacts={visibleContacts}
              onRemoveContact={this.removeContact}
            />
          ) : (
            // =======================================
            // RENDER "NO MATCH" IF NO CONTACTS FOUND
            // =======================================
            <p
              style={{
                margin: 20,
                marginRight: "auto",
                marginLeft: "auto",
                fontSize: 14,
                color: "grey",
              }}
            >
              No match...
            </p>
          )}
        </Section>
      </div>
    );
  }
}

export default App;

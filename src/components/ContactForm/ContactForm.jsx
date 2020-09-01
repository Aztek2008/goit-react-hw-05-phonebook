import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import NumberFormat from "react-number-format";
import { v4 as uuidv4 } from "uuid";

import Notification from "../Notification/Notification";

import styles from "./ContactForm.module.css";
import AppearStyles from "./AppearStyles.module.css";
import "../../index.css";

export default class ContactForm extends Component {
  state = {
    name: "",
    number: "",
    contactInListEntered: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;

    const existedContacts = this.props.appState.contacts.map(
      (cont) => cont.name
    );

    const newName = this.state.name;
    // ====================================
    // SHOW ERR MSG IF SAVING SAME CONTACT
    // ====================================
    existedContacts.includes(newName) && this.showNotification();
    // ===============================
    //       CREATE CONTACT
    // ===============================
    this.props.onSubmit({
      id: uuidv4(),
      name: name,
      number: number,
    });

    // ===============================
    //         CLEAR INPUT
    // ===============================
    this.setState({
      name: "",
      number: "",
    });
  };

  showNotification = () => {
    this.setState({ contactInListEntered: true });
    setTimeout(() => this.setState({ contactInListEntered: false }), 5000);
  };

  render() {
    const { name, number, contactInListEntered } = this.state;

    return (
      <>
        <CSSTransition
          in={contactInListEntered}
          unmountOnExit
          classNames={AppearStyles}
          timeout={2000}
        >
          <Notification />
        </CSSTransition>
        <form className={styles.ContactForm} onSubmit={this.handleSubmit}>
          <label>
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={this.handleChange}
              name="name"
              placeholder="Name..."
              autoFocus
            />
          </label>

          <label>
            <p>Number</p>
            <NumberFormat
              format="(###) ###-####"
              mask=""
              name="number"
              placeholder="Phone Number..."
              onChange={this.handleChange}
              value={number}
            />
          </label>

          <button className="Button" type="submit">
            Add Contact
          </button>
        </form>
      </>
    );
  }
}

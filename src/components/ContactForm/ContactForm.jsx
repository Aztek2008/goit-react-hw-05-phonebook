import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import NumberFormat from "react-number-format";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import Notification from "../Notification/Notification";

import s from "./ContactForm.module.css";
import AppearStyles from "./AppearStyles.module.css";

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
          classNames={AppearStyles}
          unmountOnExit
          timeout={2000}
        >
          <Notification />
        </CSSTransition>
        <form className={s.ContactForm} onSubmit={this.handleSubmit}>
          <label>
            <p>Name</p>
            <input
              onChange={this.handleChange}
              placeholder="Name..."
              value={name}
              type="text"
              name="name"
              autoFocus
            />
          </label>

          <label>
            <p>Number</p>
            <NumberFormat
              format="(###) ###-####"
              onChange={this.handleChange}
              placeholder="Phone Number..."
              value={number}
              name="number"
              mask=""
            />
          </label>

          <button className={s.Button} type="submit">
            Add Contact
          </button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  contactInListEntered: PropTypes.bool,
};

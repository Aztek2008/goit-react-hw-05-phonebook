import React from "react";
import { CSSTransition } from "react-transition-group";

import s from "./Section.module.css";
import AppearStyles from "./AppearStyles.module.css";

export default function Section({ title, children }) {
  // const wrapper = React.createRef();

  return (
    <div className={s.Section}>
      <CSSTransition
        in={true}
        appear
        unmountOnExit
        classNames={AppearStyles}
        timeout={200}
      >
        <h2 ref={React.createRef()}>{title}</h2>
      </CSSTransition>
      {children}
    </div>
  );
}

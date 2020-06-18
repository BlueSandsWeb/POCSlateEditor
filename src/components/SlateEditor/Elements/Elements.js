import React, { useCallback } from "react";
import styles from "./Elements.module.scss";

export const CodeElement = (props) => {
  return (
    <pre {...props.attributes} style={{ background: "#ccc" }}>
      <code>{props.children}</code>
    </pre>
  );
};
export const H1Element = (props) => {
  return (
    <h1 {...props.attributes} className={styles.h1}>
      {props.children}
    </h1>
  );
};
export const H2Element = (props) => {
  return (
    <h2 {...props.attributes} className={styles.h2}>
      {props.children}
    </h2>
  );
};
export const H3Element = (props) => {
  return (
    <h3 {...props.attributes} className={styles.h3}>
      {props.children}
    </h3>
  );
};
export const UlElement = (props) => {
  return (
    <ul {...props.attributes} className={styles.ul}>
      {props.children}
    </ul>
  );
};
export const OlElement = (props) => {
  return (
    <ol {...props.attributes} className={styles.ul}>
      {props.children}
    </ol>
  );
};
export const LiElement = (props) => {
  return (
    <li {...props.attributes} className={styles.li}>
      {props.children}
    </li>
  );
};
export const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

import React from "react";
import styles from "./header.module.scss";

interface HeaderProps {
  children: any;
}

export default function Header({ children = <></> }: HeaderProps) {
  return (
    <div className={styles.background}>
      <div className={styles.foreground}>{children}</div>
    </div>
  );
}

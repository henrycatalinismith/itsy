import React from "react";
import Svg from "@highvalley.systems/logotype/svg";
import Wordmark from "@highvalley.systems/logotype/wordmark";
import styles from "./ident.module.scss";

export default function Ident() {
  const [height, setHeight] = React.useState(undefined);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const ratio = window.innerWidth / 256;
    setHeight(window.innerHeight / ratio);
  }, []);

  return (
    <Svg width={256} height={height || 256} className={styles.svg}>
      {height && <Wordmark x={49} y={height / 2 - 24} animation="splash" />}
    </Svg>
  );
}

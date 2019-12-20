import React from "react";
import { connect } from "react-redux";
import { Controlled as CodeMirror } from "react-codemirror2";

import "./codemirror.scss";
import styles from "./editor.module.scss";
import { changeText, textSelector } from "@itsy.studio/editor/store/text";

interface EditorProps {
  changeText: (text: string) => void;
  text: string;
}

const mapStateToProps = state => ({
  text: textSelector(state)
});

const mapDispatchToProps = {
  changeText
};

export function Editor({ changeText, text }: EditorProps) {
  const options = {
    autocapitalize: false,
    autocorrect: false,
    cursorBlinkRate: 500,
    indentUnit: 1,
    indentWithTabs: false,
    lineNumbers: true,
    mode: "lua",
    spellcheck: false,
    tabSize: 1,
    theme: "itsy"
  };

  return (
    <CodeMirror
      className={styles.editor}
      value={text}
      options={options}
      onBeforeChange={(...[, , value]) => changeText(value)}
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

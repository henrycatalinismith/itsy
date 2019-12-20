import React from "react";
import { connect } from "react-redux";
import { Controlled as CodeMirror } from "react-codemirror2";

import "./codemirror.scss";
import styles from "./editor.module.scss";
import actions from "../../actions";

export const Editor = ({ change, loading, lua }) => {
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
    <>
      {loading ? (
        <div className={styles.loading}>loading</div>
      ) : (
        <CodeMirror
          className={styles.editor}
          value={lua}
          options={options}
          onBeforeChange={(...[, , value]) => change(value)}
        />
      )}
    </>
  );
};

export default connect(
  ({ loading, lua }) => ({
    loading,
    lua
  }),
  actions
)(Editor);

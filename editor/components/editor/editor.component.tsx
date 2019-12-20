import React from "react";
import { connect } from "react-redux";
import { Controlled as CodeMirror } from "react-codemirror2";

import "./codemirror.scss";
import styles from "./editor.module.scss";
import { moveCursor, cursorSelector } from "@itsy.studio/editor/store/cursor";
import { changeText, textSelector } from "@itsy.studio/editor/store/text";

interface EditorProps {
  changeText: (text: string) => void;
  moveCursor: (x: number, y: number) => void;
  text: string;
}

const mapStateToProps = state => ({
  text: textSelector(state)
});

const mapDispatchToProps = {
  changeText,
  moveCursor
};

export function Editor({ changeText, moveCursor, text }: EditorProps) {
  const codemirror = React.useRef<CodeMirror.Editor>();

  const editorDidMount = React.useCallback(c => {
    codemirror.current = c;
  }, []);

  const onBeforeChange = React.useCallback((...[, , value]) => {
    changeText(value);
  }, []);

  const onCursor = React.useCallback(() => {
    const { line, ch } = codemirror.current.getCursor();
    moveCursor(ch, line);
  }, []);

  const options = {
    autocapitalize: false,
    autocorrect: false,
    cursorBlinkRate: 500,
    indentUnit: 1,
    indentWithTabs: false,
    lineNumbers: true,
    mode: "lua",
    onCursor,
    spellcheck: false,
    tabSize: 1,
    theme: "itsy"
  };

  const props = {
    className: styles.editor,
    value: text,
    editorDidMount,
    onBeforeChange,
    onCursor,
    options
  };

  return <CodeMirror {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

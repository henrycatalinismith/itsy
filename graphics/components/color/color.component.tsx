import React from "react";
import { connect } from "react-redux";
import {
  PaletteIndex,
  PaletteColor,
  selectPalette
} from "@itsy.studio/graphics/store/palette";
import styles from "./color.module.scss";

interface ColorProps {
  id: PaletteIndex;
  color: PaletteColor;
}

const mapStateToProps = (state, ownProps) => ({
  color: selectPalette(state)[ownProps.id]
});

const mapDispatchToProps = {};

export function Color({ color }: ColorProps): React.ReactElement {
  return (
    <button className={styles.color}>
      <span className={styles.square} style={{ backgroundColor: color.hex }} />
    </button>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Color);

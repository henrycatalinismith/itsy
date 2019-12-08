import React from "react"
import { View } from "react-native"

import styles from "./center.module.scss"

const Center = ({ children }) => <View style={styles.center}>{children}</View>

export default Center

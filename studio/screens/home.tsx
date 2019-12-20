import _ from "lodash"
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { FlatGrid } from "react-native-super-grid"
import { connect } from "react-redux"

import colors from "@itsy.studio/palettes/pico8/original.es6"

import Button from "@itsy.studio/studio/components/button"
import Frame from "@itsy.studio/studio/components/frame"
import Header from "@itsy.studio/studio/components/header"
import Loading from "@itsy.studio/studio/components/loading"
import Tile from "@itsy.studio/studio/components/tile"
import disks, {
  allDisks,
  createDisk,
  loadDisks,
  openDisk,
} from "@itsy.studio/studio/store/disks"

const mapStateToProps = (state) => ({
  disks: allDisks(state),
})

const mapDispatchToProps = {
  createDisk,
  openDisk,
  loadDisks,
}

export function HomeScreen({
  disks,
  navigation,
  createDisk,
  openDisk,
  loadDisks,
}) {
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    loadDisks()
  }, [])

  const onPress = (disk) => () => {
    openDisk(disk.id)
    navigation.navigate("Code", { disk })
  }

  return (
    <Frame>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.controls}>
            <Button onPress={() => createDisk()}>new</Button>
          </View>

          <ScrollView style={styles.container}>
            <FlatGrid
              itemDimension={128}
              items={disks}
              renderItem={({ item: disk }) => (
                <Tile
                  key={disk.id}
                  id={disk.id}
                  onPress={onPress(disk)}
                  size={120}
                />
              )}
            />
          </ScrollView>
        </>
      )}
    </Frame>
  )
}

HomeScreen.navigationOptions = {
  header: Header,
}

const styles = StyleSheet.create({
  controls: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    backgroundColor: colors[15],
    borderBottomColor: colors[13],
    borderBottomWidth: 2,
    paddingLeft: 2,
  },

  container: {
    flex: 1,
    backgroundColor: colors[7],
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
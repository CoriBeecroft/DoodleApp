import React from "react"
import { StyleSheet, View } from "react-native"
import DrawingArea from "../components/DrawingArea"

export default function Index() {
    return (
        <View style={styles.container}>
            <DrawingArea />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
})

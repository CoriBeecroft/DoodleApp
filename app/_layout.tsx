import React, { useState } from "react"
import { StyleSheet, SafeAreaView, ColorValue } from "react-native"
import DrawingArea from "../components/DrawingArea"
import ColorPicker from "../components/ColorPicker"

export default function App() {
    const [color, setColor] = useState<ColorValue>("blue")

    return (
        <SafeAreaView style={styles.container}>
            <DrawingArea {...{ color }} />
            <ColorPicker {...{ color, setColor }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333",
    },
})

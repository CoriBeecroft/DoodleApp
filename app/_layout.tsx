import React, { useState } from "react"
import { StyleSheet, View, ColorValue } from "react-native"
import DrawingArea from "../components/DrawingArea"
import ColorPicker from "../components/ColorPicker"

export default function App() {
    const [color, setColor] = useState<ColorValue>("blue")

    return (
        <View style={styles.container}>
            <DrawingArea {...{ color }} />
            <ColorPicker {...{ color, setColor }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
})

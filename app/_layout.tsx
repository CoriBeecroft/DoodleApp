import React, { useState } from "react"
import { StyleSheet, SafeAreaView, ColorValue } from "react-native"
import DrawingArea from "../components/DrawingArea"
import DrawingOptions, { BLUE } from "../components/DrawingOptions"

export default function App() {
    const [color, setColor] = useState<ColorValue>(BLUE)
    const [strokeWidth, setStrokeWidth] = useState<number>(1)
    const [opacity, setOpacity] = useState<number>(1)

    return (
        <SafeAreaView style={styles.container}>
            <DrawingArea {...{ color, strokeWidth, opacity }} />
            <DrawingOptions
                {...{
                    color,
                    setColor,
                    strokeWidth,
                    setStrokeWidth,
                    opacity,
                    setOpacity,
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#555",
    },
})

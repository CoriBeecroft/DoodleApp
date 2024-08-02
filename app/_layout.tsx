import React, { useState } from "react"
import { StyleSheet, SafeAreaView, ColorValue, View } from "react-native"
import DrawingArea from "../components/DrawingArea"
import ColorPicker, { BLUE } from "../components/ColorPicker"
import StrokeWidthPicker from "../components/StrokeWidthPicker"
import OpacityPicker from "../components/OpacityPicker"

export default function App() {
    const [color, setColor] = useState<ColorValue>(BLUE)
    const [strokeWidth, setStrokeWidth] = useState<number>(1)
    const [opacity, setOpacity] = useState<number>(1)

    return (
        <SafeAreaView style={styles.container}>
            <DrawingArea {...{ color, strokeWidth, opacity }} />
            <View style={styles.optionContainer}>
                <ColorPicker {...{ color, setColor }} />
                <StrokeWidthPicker {...{ strokeWidth, setStrokeWidth }} />
                <OpacityPicker {...{ opacity, setOpacity }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#333",
    },
    optionContainer: {
        padding: 8,
    },
})

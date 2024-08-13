import React, { useState } from "react"
import {
    StyleSheet,
    SafeAreaView,
    ColorValue,
    useWindowDimensions,
} from "react-native"
import DrawingArea from "../components/DrawingArea"
import DrawingOptions, { BLUE } from "../components/DrawingOptions"

export default function App() {
    const { height } = useWindowDimensions()
    const [color, setColor] = useState<ColorValue>(BLUE)
    const [strokeWidth, setStrokeWidth] = useState<number>(1)
    const [opacity, setOpacity] = useState<number>(1)
    const [effect, setEffect] = useState<string>("basic")

    return (
        <>
            <SafeAreaView style={styles.container}>
                <DrawingArea
                    {...{ color, strokeWidth, opacity, pathEffect: effect }}
                />
                <DrawingOptions
                    {...{
                        color,
                        setColor,
                        strokeWidth,
                        setStrokeWidth,
                        opacity,
                        setOpacity,
                        effect,
                        setEffect,
                        windowHeight: height,
                    }}
                />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#555",
    },
})

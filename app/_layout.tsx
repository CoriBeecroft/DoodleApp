import React from "react"
import { Text, View } from "react-native"
import { Canvas, Circle, Group } from "@shopify/react-native-skia"

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Test />
        </View>
    )
}

const Test = () => {
    const width = 256
    const height = 256
    const backgroundColor = "#555"
    const r = width * 0.33
    return (
        <Canvas style={{ width, height, backgroundColor }}>
            <Group blendMode="multiply">
                <Circle cx={r} cy={r} r={r} color="cyan" />
                <Circle cx={width - r} cy={r} r={r} color="magenta" />
                <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
            </Group>
        </Canvas>
    )
}

import React, { useState, useRef } from "react"
import {
    StyleSheet,
    View,
    PanResponder,
    PanResponderGestureState,
} from "react-native"
import { Canvas, Path, SkPath, Skia } from "@shopify/react-native-skia"

export default function DrawingArea() {
    const [paths, setPaths] = useState<SkPath[]>([])
    const pathRef = useRef<SkPath | null>(null)

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // touch start
                const path = Skia.Path.Make()
                pathRef.current = path
                setPaths(prevPaths => {
                    return [...prevPaths, path]
                })
            },
            onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
                if (pathRef.current) {
                    const { moveX, moveY } = gestureState
                    if (pathRef.current.isEmpty()) {
                        pathRef.current.moveTo(moveX, moveY)
                    } else {
                        pathRef.current.lineTo(moveX, moveY)
                    }
                    setPaths(prevPaths => [
                        ...prevPaths.slice(0, -1),
                        pathRef.current!,
                    ])
                }
            },
            onPanResponderRelease: () => {
                // touch end
                pathRef.current = null
            },
        })
    ).current

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            <Canvas style={styles.canvas}>
                {paths.map((path, index) => (
                    <Path
                        key={index}
                        path={path}
                        strokeWidth={1}
                        style="stroke"
                        color="black"
                    />
                ))}
            </Canvas>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    canvas: {
        flex: 1,
    },
})

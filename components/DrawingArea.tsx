import React, { useState, useRef, useEffect } from "react"
import {
    StyleSheet,
    View,
    PanResponder,
    PanResponderGestureState,
    ColorValue,
} from "react-native"
import { Canvas, Path, SkPath, Skia } from "@shopify/react-native-skia"
import { colorValueToSkiaColor } from "../utils/util"

interface DrawingAreaProps {
    color: ColorValue
}

interface StyledPath {
    path: SkPath
    color: ColorValue
}

export default function DrawingArea({ color }: DrawingAreaProps) {
    const [paths, setPaths] = useState<StyledPath[]>([])
    const pathRef = useRef<StyledPath | null>(null)
    const colorRef = useRef(color)

    useEffect(() => {
        colorRef.current = color
    }, [color])

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // touch start
                const path = { path: Skia.Path.Make(), color: colorRef.current }
                pathRef.current = path
                setPaths(prevPaths => {
                    return [...prevPaths, path]
                })
            },
            onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
                if (pathRef.current) {
                    const { moveX, moveY } = gestureState
                    if (pathRef.current.path.isEmpty()) {
                        pathRef.current.path.moveTo(moveX, moveY)
                    } else {
                        pathRef.current.path.lineTo(moveX, moveY)
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
                {paths.map((styledPath, index) => (
                    <Path
                        key={index}
                        path={styledPath.path}
                        strokeWidth={5}
                        style="stroke"
                        color={colorValueToSkiaColor(styledPath.color)}
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
        backgroundColor: "white",
    },
})

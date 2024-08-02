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
    strokeWidth: number
    opacity: number
}

interface StyledPath {
    path: SkPath
    color: ColorValue
    strokeWidth: number
    opacity: number
}

export default function DrawingArea({
    color,
    strokeWidth,
    opacity,
}: DrawingAreaProps) {
    const [paths, setPaths] = useState<StyledPath[]>([])
    const pathRef = useRef<StyledPath | null>(null)
    const drawingOptionsRef = useRef({ color, strokeWidth, opacity })

    useEffect(() => {
        drawingOptionsRef.current = {
            color,
            strokeWidth,
            opacity,
        }
    }, [color, strokeWidth, opacity])

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // touch start
                const path = {
                    path: Skia.Path.Make(),
                    ...drawingOptionsRef.current,
                }
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
                        strokeWidth={10 * styledPath.strokeWidth}
                        style="stroke"
                        color={colorValueToSkiaColor(styledPath.color)}
                        opacity={Math.max(Math.min(styledPath.opacity, 1), 0)} // Opacity value needs to be between 0 and 1 (inclusive)
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

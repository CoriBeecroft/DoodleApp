import React, { useState, useRef, useEffect, useMemo } from "react"
import {
    StyleSheet,
    View,
    PanResponder,
    PanResponderGestureState,
    ColorValue,
    TouchableOpacity,
    Text,
} from "react-native"
import { Canvas, Skia } from "@shopify/react-native-skia"
import StyledPath, { StyledPathProps } from "./StyledPath"

interface DrawingAreaProps {
    color: ColorValue
    strokeWidth: number
    opacity: number
    pathEffect: string
}

export default function DrawingArea({
    color,
    strokeWidth,
    opacity,
    pathEffect,
}: DrawingAreaProps) {
    const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 })
    const [paths, setPaths] = useState<StyledPathProps[]>([])
    const [redoPaths, setRedoPaths] = useState<StyledPathProps[]>([])
    const [isDrawing, setIsDrawing] = useState<boolean>(false)
    const pathRef = useRef<StyledPathProps | null>(null)
    const drawingOptionsRef = useRef({
        color,
        strokeWidth,
        opacity,
        pathEffect,
    })

    useEffect(() => {
        drawingOptionsRef.current = {
            color,
            strokeWidth,
            opacity,
            pathEffect,
        }
    }, [color, strokeWidth, opacity, pathEffect])

    const panResponder = useMemo(() => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                const path = {
                    path: Skia.Path.Make(),
                    ...drawingOptionsRef.current,
                }
                pathRef.current = path
                setPaths(prevPaths => [...prevPaths, path])
                setRedoPaths([]) // Clear redo stack when a new path is started
                setIsDrawing(true)
            },
            onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
                if (pathRef.current) {
                    const { moveX, moveY } = gestureState
                    // canvasOffset is used to translate moveX and moveY to
                    // canvas coordinates instead of screen coordinates
                    const x = moveX - canvasOffset.x,
                        y = moveY - canvasOffset.y

                    if (pathRef.current.path.isEmpty()) {
                        pathRef.current.path.moveTo(x, y)
                    } else {
                        const lastPoint = pathRef.current.path.getLastPt()
                        if (lastPoint.x !== x || lastPoint.y !== y) {
                            pathRef.current.path.lineTo(x, y)
                        }
                    }
                    setPaths(prevPaths => [
                        ...prevPaths.slice(0, -1),
                        pathRef.current!,
                    ])
                }
            },
            onPanResponderRelease: () => {
                // filter out paths that only have one point and therefore
                // won't end up being rendered
                setPaths(prevPaths =>
                    prevPaths.filter(p => p.path.countPoints() > 1)
                )
                setIsDrawing(false)
                pathRef.current = null
            },
        })
    }, [canvasOffset])

    const undo = () => {
        if (paths.length > 0) {
            const lastPath = paths[paths.length - 1]
            setPaths(prevPaths => prevPaths.slice(0, -1))
            setRedoPaths(prevRedoPaths => [...prevRedoPaths, lastPath])
        }
    }

    const redo = () => {
        if (redoPaths.length > 0) {
            const pathToRedo = redoPaths[redoPaths.length - 1]
            setRedoPaths(prevRedoPaths => prevRedoPaths.slice(0, -1))
            setPaths(prevPaths => [...prevPaths, pathToRedo])
        }
    }

    const clear = () => {
        setPaths([])
        setRedoPaths([])
    }

    // isDrawing is used here to avoid flashing of the undo and
    // clear buttons in cases where the drawing area is touched but
    // there is no movement so no path ends up being drawn.
    const canUndoOrClear = isDrawing ? paths.length > 1 : paths.length > 0
    const canRedo = redoPaths.length > 0

    return (
        <>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={undo}
                    disabled={!canUndoOrClear}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !canUndoOrClear && styles.disabledButtonText,
                        ]}
                    >
                        Undo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={clear}
                    disabled={!canUndoOrClear}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !canUndoOrClear && styles.disabledButtonText,
                        ]}
                    >
                        Clear
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={redo}
                    disabled={!canRedo}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !canRedo && styles.disabledButtonText,
                        ]}
                    >
                        Redo
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                onLayout={event => {
                    const { x, y } = event.nativeEvent.layout
                    setCanvasOffset({ x, y })
                }}
                style={styles.container}
                {...panResponder.panHandlers}
            >
                <Canvas style={styles.canvas}>
                    {paths.map((styledPath, index) => (
                        <StyledPath key={index} {...styledPath} />
                    ))}
                </Canvas>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        flex: 1,
        borderColor: "#333",
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#444",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    disabledButtonText: {
        color: "#999",
    },
    canvas: {
        flex: 1,
        backgroundColor: "white",
    },
})

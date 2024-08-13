import React, { useState, useEffect, useRef } from "react"
import { StyleSheet, View, Animated, ColorValue } from "react-native"
import SelectableButton from "./SelectableButton"
import {
    Canvas,
    LinearGradient,
    Rect,
    vec,
    Skia,
} from "@shopify/react-native-skia"
import StyledPath from "./StyledPath"
import { colorToRGBArray, colorValueToSkiaColor } from "@/utils/util"

export const BLUE = "#3498db",
    GREEN = "#2ecc71",
    YELLOW = "#f1c40f",
    ORANGE = "#e67e22",
    RED = "#e74c3c",
    PURPLE = "#9b59b6",
    BLACK = "#2c3e50",
    GREY = "#95a5a6"

interface DrawingOptionsProps {
    color: ColorValue
    setColor: (color: ColorValue) => void
    strokeWidth: number
    setStrokeWidth: (width: number) => void
    opacity: number
    setOpacity: (opacity: number) => void
    effect: string
    setEffect: (effect: string) => void
    windowHeight: number
}

const path = Skia.Path.Make()
path.moveTo(2, 2)
path.cubicTo(10, 10, 10, 2, 16, 16)
path.cubicTo(22, 30, 22, 22, 30, 30)

export default function DrawingOptions({
    color,
    setColor,
    strokeWidth,
    setStrokeWidth,
    opacity,
    setOpacity,
    effect,
    setEffect,
    windowHeight,
}: DrawingOptionsProps) {
    const [mainButtonContainerHeight, setOptionsOffset] = useState(0)
    const [activeOption, setActiveOption] = useState("")
    const [newActiveOption, setNewActiveOption] = useState("")
    const animatedOpacity = useRef(new Animated.Value(0)).current
    const options = {
        color: {
            currentValue: color,
            values: [BLUE, GREEN, YELLOW, ORANGE, RED, PURPLE, BLACK, GREY],
            opacity: animatedOpacity,
        },
        strokeWidth: {
            currentValue: color,
            values: [0.25, 0.5, 0.75, 1, 1.5, 1.75, 2],
            opacity: animatedOpacity,
        },
        opacity: {
            currentValue: color,
            values: [0.25, 0.5, 0.75, 1],
            opacity: animatedOpacity,
        },
        effect: {
            currentValue: useEffect,
            values: ["basic", "glow", "dash"],
            opacity: animatedOpacity,
        },
    }

    useEffect(() => {
        if (activeOption === "" && newActiveOption !== "") {
            changeActiveOption(newActiveOption)
            setNewActiveOption("")
        }
    }, [activeOption, newActiveOption])
    const changeActiveOption = (newActiveOption: string) => {
        const duration = 250

        if (activeOption === "") {
            // If no options are expanded, expand newActiveOption
            setActiveOption(newActiveOption)
            Animated.timing(animatedOpacity, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
            }).start()
        } else if (newActiveOption == "") {
            // If an option is expanded and newActiveOption == ""
            // then close active option
            Animated.timing(animatedOpacity, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
            }).start(() => {
                setActiveOption(newActiveOption)
            })
        } else {
            // if there is an option expanded and newActive option
            // is another option, close the current option then open
            // the new one
            changeActiveOption("")
            setNewActiveOption(newActiveOption)
        }
    }

    return (
        <>
            <Animated.View
                style={[
                    styles.options,
                    { bottom: mainButtonContainerHeight },
                    { opacity: animatedOpacity },
                ]}
            >
                {activeOption === "color" &&
                    options.color.values.map(c => (
                        <SelectableButton
                            {...{
                                key: c,
                                isActive: c === color,
                                onPress: () => setColor(c),
                                style: {
                                    backgroundColor: c,
                                    width: 32,
                                    height: 32,
                                },
                            }}
                        />
                    ))}
                {activeOption === "strokeWidth" &&
                    options.strokeWidth.values.map(w => (
                        <SelectableButton
                            {...{
                                key: w,
                                isActive: w === strokeWidth,
                                onPress: () => setStrokeWidth(w),
                            }}
                        >
                            <View
                                style={{
                                    height: "100%",
                                    width: 10 * w,
                                    backgroundColor: color,
                                }}
                            />
                        </SelectableButton>
                    ))}
                {activeOption === "opacity" &&
                    options.opacity.values.map(o => (
                        <SelectableButton
                            {...{
                                key: o,
                                isActive: o === opacity,
                                onPress: () => setOpacity(o),
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: `rgba(${colorToRGBArray(
                                        color
                                    ).join(", ")}, ${o})`,
                                }}
                            />
                        </SelectableButton>
                    ))}
                {activeOption === "effect" &&
                    options.effect.values.map(e => (
                        <SelectableButton
                            {...{
                                key: e,
                                isActive: e === effect,
                                onPress: () => setEffect(e),
                            }}
                        >
                            <Canvas style={styles.canvas}>
                                <StyledPath
                                    {...{
                                        path,
                                        color,
                                        strokeWidth: 0.5,
                                        opacity: 1,
                                        pathEffect: e,
                                    }}
                                />
                            </Canvas>
                        </SelectableButton>
                    ))}
            </Animated.View>
            <View
                onLayout={event => {
                    const { height, y } = event.nativeEvent.layout
                    setOptionsOffset(height + windowHeight - (y + height))
                }}
                style={styles.mainButtonContainer}
            >
                <SelectableButton
                    {...{
                        isActive: activeOption === "color",
                        onPress: () => {
                            if (activeOption === "color") {
                                changeActiveOption("")
                            } else {
                                changeActiveOption("color")
                            }
                        },
                        style: {
                            height: 32,
                            width: 32,
                            backgroundColor: color,
                        },
                    }}
                />
                <SelectableButton
                    {...{
                        isActive: activeOption === "strokeWidth",
                        onPress: () => {
                            if (activeOption === "strokeWidth") {
                                changeActiveOption("")
                            } else {
                                changeActiveOption("strokeWidth")
                            }
                        },
                        style: {
                            height: 32,
                            width: 32,
                            backgroundColor: "white",
                        },
                    }}
                >
                    <View
                        style={{
                            height: "100%",
                            width: 10 * strokeWidth,
                            backgroundColor: color,
                        }}
                    />
                </SelectableButton>
                <SelectableButton
                    {...{
                        isActive: activeOption === "opacity",
                        onPress: () => {
                            if (activeOption === "opacity") {
                                changeActiveOption("")
                            } else {
                                changeActiveOption("opacity")
                            }
                        },
                        style: {
                            height: 32,
                            width: 32,
                            backgroundColor: "white",
                        },
                    }}
                >
                    <Canvas style={styles.canvas}>
                        <Rect x={0} y={0} width={32} height={32}>
                            <LinearGradient
                                start={vec(0, 32)}
                                end={vec(32, 0)}
                                colors={[
                                    colorValueToSkiaColor(color),
                                    `rgba(${colorToRGBArray(color).join(
                                        ", "
                                    )}, 0)`,
                                ]}
                            />
                        </Rect>
                    </Canvas>
                </SelectableButton>
                <SelectableButton
                    {...{
                        isActive: activeOption === "effect",
                        onPress: () => {
                            if (activeOption === "effect") {
                                changeActiveOption("")
                            } else {
                                changeActiveOption("effect")
                            }
                        },
                        style: {
                            height: 32,
                            width: 32,
                            backgroundColor: "white",
                        },
                    }}
                >
                    <Canvas style={styles.canvas}>
                        <StyledPath
                            {...{
                                path,
                                color,
                                strokeWidth: 0.5,
                                opacity: 1,
                                pathEffect: effect,
                            }}
                        />
                    </Canvas>
                </SelectableButton>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainButtonContainer: {
        padding: 8,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    options: {
        position: "absolute",
        width: "100%",
        padding: 8,
        flexDirection: "row",
        justifyContent: "center",
    },
    option: {},
    canvas: {
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        height: "100%",
    },
})

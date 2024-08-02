import React, { useState, useEffect, useRef } from "react"
import { StyleSheet, View, Animated, ColorValue } from "react-native"
import SelectableButton from "./SelectableButton"
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia"

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
}

export default function DrawingOptions({
    color,
    setColor,
    strokeWidth,
    setStrokeWidth,
    opacity,
    setOpacity,
}: DrawingOptionsProps) {
    const [activeOption, setActiveOption] = useState("")
    const [newActiveOption, setNewActiveOption] = useState("")
    const colorAnimatedOpacity = useRef(new Animated.Value(0)).current
    const options = {
        color: {
            currentValue: color,
            values: [BLUE, GREEN, YELLOW, ORANGE, RED, PURPLE, BLACK, GREY],
            opacity: colorAnimatedOpacity,
        },
        strokeWidth: {
            currentValue: color,
            values: [0.25, 0.5, 0.75, 1, 1.5, 1.75, 2],
            opacity: colorAnimatedOpacity,
        },
        opacity: {
            currentValue: color,
            values: [0.25, 0.5, 0.75, 1],
            opacity: colorAnimatedOpacity,
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
            Animated.timing(colorAnimatedOpacity, {
                toValue: 1,
                duration: duration,
                useNativeDriver: true,
            }).start()
        } else if (newActiveOption == "") {
            // If an option is expanded and newActiveOption == ""
            // then close active option
            Animated.timing(colorAnimatedOpacity, {
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
                style={[styles.options, { opacity: colorAnimatedOpacity }]}
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
                                style: { backgroundColor: "#999" },
                            }}
                        >
                            <View
                                style={{
                                    height: "100%",
                                    width: 10 * w,
                                    backgroundColor: "black",
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
                                style: { backgroundColor: "#999" },
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: `rgba(0, 0, 0, ${o})`,
                                }}
                            />
                        </SelectableButton>
                    ))}
            </Animated.View>
            <View style={styles.mainButtonContainer}>
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
                            backgroundColor: "#999",
                        },
                    }}
                >
                    <View
                        style={{
                            height: "100%",
                            width: 10 * strokeWidth,
                            backgroundColor: "black",
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
                                colors={["black", "#00000000"]}
                            />
                        </Rect>
                    </Canvas>
                </SelectableButton>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainButtonContainer: {
        position: "relative",
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    options: {
        position: "absolute",
        bottom: 48,
        width: "100%",
        padding: 8,
        flexDirection: "row",
        justifyContent: "center",
    },
    option: {},
    canvas: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
})

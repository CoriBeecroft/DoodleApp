import React, { useState, useRef } from "react"
import {
    TouchableOpacity,
    View,
    StyleSheet,
    ViewStyle,
    ColorValue,
    Animated,
    Easing,
} from "react-native"

interface ColorPickerProps {
    color: ColorValue
    setColor: (color: ColorValue) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
    const colors = [
        "blue",
        "green",
        "yellow",
        "orange",
        "red",
        "purple",
        "black",
        "grey",
    ]
    const [isExpanded, setIsExpanded] = useState(false)
    const animatedWidth = useRef(new Animated.Value(56)).current
    const animatedOpacity = useRef(new Animated.Value(0)).current

    const toggleExpand = () => {
        const newIsExpanded = !isExpanded
        const toValue = newIsExpanded ? colors.length * 36 + 56 + 4 : 56
        const duration = 300 // Keeping this long for easier tweaking

        if (newIsExpanded) {
            // Expanding: First expand the container, then fade in the options
            Animated.sequence([
                Animated.timing(animatedWidth, {
                    toValue,
                    duration: duration * 0.6,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    useNativeDriver: false,
                }),
                Animated.timing(animatedOpacity, {
                    toValue: 1,
                    duration: duration * 0.4,
                    useNativeDriver: true,
                }),
            ]).start()
        } else {
            // Collapsing: First fade out the options, then contract the container
            Animated.sequence([
                Animated.timing(animatedOpacity, {
                    toValue: 0,
                    duration: duration * 0.4,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedWidth, {
                    toValue,
                    duration: duration * 0.6,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    useNativeDriver: false,
                }),
            ]).start()
        }

        setIsExpanded(newIsExpanded)
    }

    return (
        <Animated.View style={[styles.colorPicker, { width: animatedWidth }]}>
            <ColorButton
                color={color}
                isActive={true}
                onPress={toggleExpand}
                style={styles.selectedColor}
            />
            <Animated.View
                style={{ opacity: animatedOpacity, flexDirection: "row" }}
            >
                {colors.map((c, index) => (
                    <ColorButton
                        key={c}
                        color={c}
                        isActive={c === color}
                        onPress={() => setColor(c)}
                        style={
                            index === 0 ? styles.firstOptionColor : undefined
                        }
                    />
                ))}
            </Animated.View>
        </Animated.View>
    )
}

interface ColorButtonProps {
    color: ColorValue
    isActive: boolean
    onPress: () => void
    style?: ViewStyle
}

const ColorButton: React.FC<ColorButtonProps> = ({
    color,
    isActive,
    onPress,
    style,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: color },
                isActive && styles.activeButton,
                style,
            ]}
            onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        height: 32,
        width: 32,
        borderRadius: 4,
        margin: 2,
    },
    activeButton: {
        borderWidth: 2,
        borderColor: "#888",
    },
    selectedColor: {
        zIndex: 1,
        height: 32,
        width: 32,
        borderRadius: 4,
    },
    firstOptionColor: {
        marginLeft: 12,
    },
    colorPicker: {
        margin: 8,
        flexDirection: "row",
        height: 56,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        borderRadius: 10,
        shadowColor: "#888",
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 4,
        backgroundColor: "white",
    },
})

export default ColorPicker

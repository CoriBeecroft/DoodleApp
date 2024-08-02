import React from "react"
import {
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    ColorValue,
} from "react-native"

interface SelectableButtonProps {
    isActive: boolean
    onPress: () => void
    style?: ViewStyle
    children?: React.ReactNode
    activeColor?: ColorValue
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
    isActive,
    onPress,
    style,
    children,
    activeColor = "#888",
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                isActive && styles.activeButton,
                isActive && { borderColor: activeColor },
                style,
            ]}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 32,
        width: 32,
        borderRadius: 4,
        margin: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    activeButton: {
        borderWidth: 2,
    },
})

export default SelectableButton

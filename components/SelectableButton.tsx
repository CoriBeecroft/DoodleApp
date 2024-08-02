import React from "react"
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native"

interface SelectableButtonProps {
    isActive: boolean
    onPress: () => void
    style?: ViewStyle
    children?: React.ReactNode
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
    isActive,
    onPress,
    style,
    children,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, isActive && styles.activeButton, style]}
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
        marginHorizontal: 4,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#555",
    },
    activeButton: {
        borderWidth: 3,
        borderColor: "#3480eb",
    },
})

export default SelectableButton

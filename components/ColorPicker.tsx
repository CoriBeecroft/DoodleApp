import React from "react"
import { StyleSheet, ColorValue } from "react-native"
import ExpandableSelector from "./ExpandableSelector"
import SelectableButton from "./SelectableButton"

interface ColorPickerProps {
    color: ColorValue
    setColor: (color: ColorValue) => void
}

export const BLUE = "#3498db",
    GREEN = "#2ecc71",
    YELLOW = "#f1c40f",
    ORANGE = "#e67e22",
    RED = "#e74c3c",
    PURPLE = "#9b59b6",
    BLACK = "#2c3e50",
    GREY = "#95a5a6"

const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
    const colors: ColorValue[] = [
        BLUE,
        GREEN,
        YELLOW,
        ORANGE,
        RED,
        PURPLE,
        BLACK,
        GREY,
    ]

    const renderColorButton = (
        c: ColorValue,
        index: number,
        isActive: boolean,
        onPress: () => void
    ) => (
        <SelectableButton
            isActive={isActive}
            onPress={onPress}
            style={{ ...styles.colorButton, backgroundColor: c }}
            activeColor="#888"
        />
    )

    return (
        <ExpandableSelector
            items={colors}
            selectedItem={color}
            renderItem={renderColorButton}
            onSelectItem={setColor}
            itemWidth={32}
        />
    )
}

const styles = StyleSheet.create({
    colorButton: {
        height: 32,
        width: 32,
    },
})

export default ColorPicker

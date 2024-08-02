import React from "react"
import { StyleSheet, Text, View } from "react-native"
import ExpandableSelector from "./ExpandableSelector"
import SelectableButton from "./SelectableButton"

interface StrokeWidthProps {
    strokeWidth: number
    setStrokeWidth: (width: number) => void
}

const StrokeWidthPicker: React.FC<StrokeWidthProps> = ({
    strokeWidth,
    setStrokeWidth,
}) => {
    const sizes = [0.25, 0.5, 0.75, 1, 1.5, 1.75, 2]

    const renderStrokeWidthButton = (
        width: number,
        index: number,
        isActive: boolean,
        onPress: () => void
    ) => (
        <SelectableButton
            isActive={isActive}
            onPress={onPress}
            activeColor="#888"
            style={{ backgroundColor: "#999" }}
        >
            <View
                style={{
                    height: "100%",
                    width: 10 * width,
                    backgroundColor: "black",
                }}
            />
        </SelectableButton>
    )

    return (
        <ExpandableSelector
            items={sizes}
            selectedItem={strokeWidth}
            renderItem={renderStrokeWidthButton}
            onSelectItem={setStrokeWidth}
            itemWidth={32}
        />
    )
}

export default StrokeWidthPicker

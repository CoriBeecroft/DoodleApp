import React from "react"
import { StyleSheet, View } from "react-native"
import ExpandableSelector from "./ExpandableSelector"
import SelectableButton from "./SelectableButton"
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia"

interface OpacityPickerProps {
    opacity: number
    setOpacity: (opacity: number) => void
}

const OpacityPicker: React.FC<OpacityPickerProps> = ({
    opacity,
    setOpacity,
}) => {
    const sizes = [0.25, 0.5, 0.75, 1]

    const renderOpacityButton = (
        opacity: number,
        index: number,
        isActive: boolean,
        onPress: () => void
    ) => (
        <SelectableButton
            isActive={isActive}
            onPress={onPress}
            activeColor="#888"
            style={styles.button}
        >
            {isActive && (
                <Canvas style={styles.canvas}>
                    <Rect x={0} y={0} width={32} height={32}>
                        <LinearGradient
                            start={vec(0, 32)}
                            end={vec(32, 0)}
                            colors={["black", "#00000000"]}
                        />
                    </Rect>
                </Canvas>
            )}
            {!isActive && (
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
                    }}
                />
            )}
        </SelectableButton>
    )

    return (
        <ExpandableSelector
            items={sizes}
            selectedItem={opacity}
            renderItem={renderOpacityButton}
            onSelectItem={setOpacity}
            itemWidth={32}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
    },
    canvas: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default OpacityPicker

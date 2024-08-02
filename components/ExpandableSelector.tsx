import React, { useState, useRef } from "react"
import { StyleSheet, ViewStyle, Animated, Easing, View } from "react-native"

interface ExpandableSelectorProps<T> {
    items: T[]
    selectedItem: T
    renderItem: (
        item: T,
        index: number,
        isSelected: boolean,
        onPress: () => void
    ) => React.ReactNode
    onSelectItem: (item: T) => void
    itemWidth: number
}

function ExpandableSelector<T>({
    items,
    selectedItem,
    renderItem,
    onSelectItem,
    itemWidth,
}: ExpandableSelectorProps<T>) {
    const [isExpanded, setIsExpanded] = useState(false)
    const animatedWidth = useRef(new Animated.Value(itemWidth)).current
    const animatedOpacity = useRef(new Animated.Value(0)).current

    const toggleExpand = () => {
        const newIsExpanded = !isExpanded
        const duration = 300

        if (newIsExpanded) {
            Animated.sequence([
                Animated.timing(animatedWidth, {
                    toValue: items.length * (itemWidth + 2) + 4,
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
            Animated.sequence([
                Animated.timing(animatedOpacity, {
                    toValue: 0,
                    duration: duration * 0.4,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedWidth, {
                    toValue: itemWidth,
                    duration: duration * 0.6,
                    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
                    useNativeDriver: false,
                }),
            ]).start()
        }

        setIsExpanded(newIsExpanded)
    }

    return (
        <Animated.View style={[styles.container, { width: animatedWidth }]}>
            <View style={styles.selectedItemContainer}>
                {renderItem(selectedItem, -1, true, toggleExpand)}
            </View>
            <Animated.View
                style={[styles.itemsContainer, { opacity: animatedOpacity }]}
            >
                {items.map((item, index) => (
                    <View
                        key={index}
                        style={index === 0 ? styles.firstItem : undefined}
                    >
                        {renderItem(item, index, item === selectedItem, () =>
                            onSelectItem(item)
                        )}
                    </View>
                ))}
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 45,
        alignItems: "center",
        borderRadius: 10,
    },
    selectedItemContainer: {
        zIndex: 1,
    },
    itemsContainer: {
        flexDirection: "row",
    },
    firstItem: {
        marginLeft: 12,
    },
})

export default ExpandableSelector

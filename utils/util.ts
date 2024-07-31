import { ColorValue, processColor } from "react-native"
import { Skia, Color } from "@shopify/react-native-skia"

export function colorValueToSkiaColor(color: ColorValue): Color {
    // use React Native's processColor to handle all ColorValue types
    const processedColor = processColor(color)

    if (typeof processedColor === "number") {
        // Convert the number to a hex string
        const hexColor = `#${(processedColor & 0x00ffffff)
            .toString(16)
            .padStart(6, "0")}`
        // Use Skia's parser to convert the hex string to a Skia Color
        return Skia.Color(hexColor)
    }

    // If it's not a number, it's likely already a color string that Skia can parse
    return Skia.Color(color as string)
}

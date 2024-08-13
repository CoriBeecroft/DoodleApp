import React from "react"
import { ColorValue } from "react-native"
import {
    Path,
    SkPath,
    Group,
    Blur,
    DashPathEffect,
} from "@shopify/react-native-skia"
import { colorValueToSkiaColor } from "../utils/util"

export interface StyledPathProps {
    path: SkPath
    color: ColorValue
    strokeWidth: number
    opacity: number
    pathEffect: string
}
interface NonBasicPathProps {
    path: SkPath
    color: ColorValue
    strokeWidth: number
    opacity: number
}

export default function StyledPath({
    path,
    color,
    strokeWidth,
    opacity,
    pathEffect,
}: StyledPathProps) {
    return (
        <>
            {pathEffect === "basic" && (
                <Path
                    path={path}
                    strokeWidth={10 * strokeWidth}
                    style="stroke"
                    color={colorValueToSkiaColor(color)}
                    opacity={Math.max(Math.min(opacity, 1), 0)}
                />
            )}
            {pathEffect === "glow" && (
                <GlowingPath
                    {...{
                        path,
                        color,
                        opacity,
                        strokeWidth: strokeWidth * 10,
                    }}
                />
            )}
            {pathEffect === "dash" && (
                <DashedPath
                    {...{
                        path,
                        color,
                        opacity,
                        strokeWidth: strokeWidth * 10,
                    }}
                />
            )}
        </>
    )
}

function DashedPath({ path, color, strokeWidth, opacity }: NonBasicPathProps) {
    return (
        <Path
            style={"stroke"}
            path={path}
            color={colorValueToSkiaColor(color)}
            strokeWidth={strokeWidth}
            opacity={opacity}
        >
            <DashPathEffect intervals={[strokeWidth, strokeWidth]} />
        </Path>
    )
}

function GlowingPath({ path, color, strokeWidth, opacity }: NonBasicPathProps) {
    return (
        <Group>
            {/* outer glow */}
            <Path
                path={path}
                color={colorValueToSkiaColor(color)}
                style="stroke"
                strokeWidth={strokeWidth * 4}
                opacity={0.3 * opacity}
            >
                <Blur blur={strokeWidth} />
            </Path>
            {/* middle glow */}
            <Path
                path={path}
                color={colorValueToSkiaColor(color)}
                style="stroke"
                strokeWidth={strokeWidth * 2}
                opacity={0.5 * opacity}
            >
                <Blur blur={strokeWidth / 2} />
            </Path>
            {/* solid inner path */}
            <Path
                path={path}
                color={colorValueToSkiaColor(color)}
                style="stroke"
                strokeWidth={strokeWidth}
                opacity={opacity}
            />
        </Group>
    )
}

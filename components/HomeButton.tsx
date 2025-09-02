import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    onPress: () => void;
    displayText: string;
    displayIcon: keyof typeof MaterialIcons.glyphMap;
};

export function HomeButton({ onPress, displayText, displayIcon }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center gap-3 mt-5 px-6 p-4 bg-secondary rounded-full w-full"
        >
            <MaterialIcons name={displayIcon} size={30} color="white" />
            <Text className="text-center text-2xl text-white">{displayText}</Text>
        </TouchableOpacity>
    );
}

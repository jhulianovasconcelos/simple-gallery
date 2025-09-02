import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    onPress: () => void;
};

export function FloatingButton({ onPress }: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="w-20 h-20 absolute bottom-6 right-6 rounded-full bg-primary items-center justify-center"
            activeOpacity={0.85}
        >
            <MaterialIcons name="camera-alt" size={30} color="white" />
        </TouchableOpacity>
    );
}

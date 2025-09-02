import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import React from "react";
import { HomeButton } from "@/components/HomeButton";

export default function Index() {
    return (
        <View className="flex-1 items-center justify-between pt-24 pb-10 px-10">
            <View className="items-center">
                <Image
                    source={require("@/assets/images/logo.webp")}
                    className="w-32 h-32 mb-5"
                />
                <Text className="text-5xl text-primary">Bem vindo!</Text>
            </View>
            <View className="items-center w-full">
                <HomeButton
                    onPress={() => router.navigate("/photo-section")}
                    displayText="Ver fotos"
                    displayIcon="photo"
                ></HomeButton>
                <HomeButton
                    onPress={() => router.navigate("/camera")}
                    displayText="Tirar foto"
                    displayIcon="camera-alt"
                ></HomeButton>
            </View>
        </View>
    );
}

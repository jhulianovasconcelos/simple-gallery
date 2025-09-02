import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="photo-section/index"
                options={{
                    title: "Sessão de Fotos",
                    headerShadowVisible: false,
                    headerBackButtonDisplayMode: "minimal",
                    headerTintColor: "black",
                }}
            />
            <Stack.Screen
                name="camera/index"
                options={{
                    title: "Câmera",
                    headerShown: false,
                    presentation: 'modal',
                    animation: "fade_from_bottom",
                }}
            />
            <Stack.Screen
                name="photo-details/[uri]"
                options={{
                    title: "Detalhes da Foto",
                    headerShadowVisible: false,
                    headerBackButtonDisplayMode: "minimal",
                    headerTintColor: "black",
                }}
            />
        </Stack>
    );
}

import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { readPhotoMeta, PhotoMeta } from "@/util/fileManager";

export default function PhotoDetails() {
  const { uri } = useLocalSearchParams<{ uri?: string }>();
  const photoUri = decodeURIComponent(String(uri ?? ""));

  const [meta, setMeta] = useState<PhotoMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const m = await readPhotoMeta(photoUri);
        if (mounted) setMeta(m);
      } catch (e: any) {
        Alert.alert("Erro", e?.message ?? "Falha ao carregar metadados.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [photoUri]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const taken = meta?.takenAtISO ? new Date(meta.takenAtISO) : null;
  const dataStr = taken ? taken.toLocaleDateString("pt-BR") : "—";
  const horaStr = taken
    ? taken.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false })
    : "—";

  return (
    <View className="flex-1 p-4 gap-4">
      <Image source={{ uri: photoUri }} className="w-full aspect-square rounded-xl" />

      <View className="bg-gray-200 rounded p-4">
        <View className="mb-2 border-b border-gray-400 pb-2 flex-row items-center justify-between">
          <Text className="font-semibold text-base">Informações</Text>
          <TouchableOpacity onPress={() => router.back()} className="px-3 py-1 rounded bg-black/10">
            <Text className="text-black">Voltar</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-3">
          <Text className="font-semibold text-base">Data e Hora</Text>
          <Text>{dataStr} {horaStr}</Text>
        </View>

        <View>
          <Text className="font-semibold text-base">Coordenadas</Text>
          {meta?.latitude != null && meta?.longitude != null ? (
            <View className="mt-0.5">
              <Text>Latitude: {meta.latitude}</Text>
              <Text>Longitude: {meta.longitude}</Text>
            </View>
          ) : (
            <Text className="text-gray-500 mt-0.5">Sem localização</Text>
          )}
        </View>
      </View>
    </View>
  );
}
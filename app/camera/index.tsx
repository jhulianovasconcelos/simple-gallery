import React, { useCallback, useRef, useState } from "react";
import { View, TouchableOpacity, ActivityIndicator, Text, Alert } from "react-native";
import { router } from "expo-router";
import { CameraView } from "expo-camera";
import { captureRaw, persistCapturedPhoto } from "@/util/cameraManager";

export default function CameraScreen() {
  const camRef = useRef<CameraView | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);

  const takePhoto = useCallback(async () => {
    if (!ready || saving) return;
    setSaving(true);
    try {
      const { uri, exif } = await captureRaw(camRef.current);
      await persistCapturedPhoto(uri, exif);
      router.back();
    } catch (e: any) {
      Alert.alert("Erro ao salvar", e?.message ?? "Não foi possível salvar a foto.");
      setSaving(false);
    }
  }, [ready, saving]);

  return (
    <View className="flex-1 bg-black relative">
      <CameraView
        ref={camRef}
        style={{ flex: 1 }}
        onCameraReady={() => setReady(true)}
        facing="back"
        zoom={0}
      />

      <View className="absolute top-10 left-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/50 items-center justify-center"
          activeOpacity={0.8}
          disabled={saving}
        >
          <View className="w-[18px] h-[18px] rotate-45">
            <View className="absolute left-2 top-0 w-[2px] h-[18px] bg-white rounded-[1px]" />
            <View className="absolute top-2 left-0 w-[18px] h-[2px] bg-white rounded-[1px]" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-8 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={takePhoto}
          className={`p-2 border border-white rounded-full ${saving ? "opacity-60" : ""}`}
          activeOpacity={0.8}
          disabled={!ready || saving}
        >
          <View className={`p-9 rounded-full ${saving ? "bg-gray-300" : "bg-white"}`} />
        </TouchableOpacity>
      </View>

      {saving && (
        <View className="absolute top-0 right-0 bottom-0 left-0 z-10 items-center justify-center bg-black/40">
          <View className="px-4 py-3 rounded-xl bg-black/70 items-center">
            <ActivityIndicator size="large" color="#fff" />
            <Text className="text-white mt-2">Salvando…</Text>
          </View>
        </View>
      )}
    </View>
  );
}
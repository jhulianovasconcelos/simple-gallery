import React, { useState, useCallback } from "react";
import { Alert, View, Dimensions } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { listSavedPhotos } from "@/util/fileManager";
import { PhotoGrid } from "@/components/PhotoGrid";
import { FloatingButton } from "@/components/FloatingButton";

export default function PhotoSection() {
  const [saved, setSaved] = useState<string[]>([]);
  const [camPerm, requestCamPerm] = useCameraPermissions();

  const screenW = Dimensions.get("window").width;
  const ITEM = (screenW - 16 * 2 - 12 * (3 - 1)) / 3;

  const loadList = useCallback(async () => {
    try {
      const files = await listSavedPhotos();
      setSaved(files.sort());
    } catch (e: any) {
      Alert.alert("Erro", e?.message ?? "Falha ao carregar as fotos.");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadList();
    }, [loadList])
  );

  const openCamera = useCallback(async () => {
    const { granted } =
      (camPerm?.granted ? camPerm : await requestCamPerm()) ?? { granted: false };
    if (!granted) {
      Alert.alert("Permissão", "Autorize a câmera para continuar.");
      return;
    }
    router.push("/camera");
  }, [camPerm?.granted, requestCamPerm]);

  const openDetails = useCallback((uri: string) => {
    router.push(`/photo-details/${encodeURIComponent(uri)}`);
  }, []);

  return (
    <View className="flex-1">
      <PhotoGrid data={saved} itemSize={ITEM} onPressItem={openDetails} />
      <FloatingButton onPress={openCamera} />
    </View>
  );
}

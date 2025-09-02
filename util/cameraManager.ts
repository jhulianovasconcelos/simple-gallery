// lib/camera-logic.ts
import { Alert, Platform } from "react-native";
import { router } from "expo-router";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { savePhotoAndMeta } from "@/util/fileManager";
import type { CameraView } from "expo-camera";

export function exifToISO(exif?: Record<string, unknown>) {
  const raw =
    (exif?.DateTimeOriginal as string | undefined) ||
    (exif?.DateTime as string | undefined) ||
    (exif?.["{Exif}DateTimeOriginal"] as string | undefined) ||
    (exif?.["{TIFF}DateTime"] as string | undefined);
  if (!raw || typeof raw !== "string") return undefined;
  const [d, t] = raw.split(" ");
  if (!d || !t) return undefined;
  return d.replace(/:/g, "-") + "T" + t;
}

export async function ensurePermissions(): Promise<boolean> {
  const cam = await Camera.requestCameraPermissionsAsync();
  if (!cam.granted) return false;
  try {
    await Location.requestForegroundPermissionsAsync();
  } catch {}
  return true;
}

export async function openCameraScreen() {
  const ok = await ensurePermissions();
  if (!ok) {
    Alert.alert("Permissão", "Autorize a câmera para continuar.");
    return;
  }
  router.push("/camera");
}

export async function captureRaw(camRef: CameraView | null) {
  if (!camRef) throw new Error("Câmera indisponível.");
  const pic = await camRef.takePictureAsync({
    quality: 1,
    exif: true,
    skipProcessing: Platform.OS === "ios",
  });
  if (!pic?.uri) throw new Error("Falha ao capturar a foto.");
  return { uri: pic.uri, exif: pic.exif as Record<string, unknown> | undefined };
}

export async function persistCapturedPhoto(uri: string, exif?: Record<string, unknown>) {
  const takenAtISO = exifToISO(exif) ?? new Date().toISOString();
  let latitude: number | null = null;
  let longitude: number | null = null;
  try {
    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    latitude = loc.coords.latitude;
    longitude = loc.coords.longitude;
  } catch {}
  await savePhotoAndMeta(uri, { takenAtISO, latitude, longitude });
}
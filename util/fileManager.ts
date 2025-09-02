import * as FileSystem from "expo-file-system";

export const PHOTOS_DIR = FileSystem.documentDirectory + "photos/";

export type PhotoMeta = {
  uri: string;
  takenAtISO: string;
  latitude: number | null;
  longitude: number | null;
};

export async function ensurePhotosDir() {
  const info = await FileSystem.getInfoAsync(PHOTOS_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(PHOTOS_DIR, { intermediates: true });
  }
}

export function extFromUri(uri: string) {
  const clean = uri.split("?")[0];
  const m = clean.match(/\.([a-zA-Z0-9]+)$/);
  return (m?.[1] || "jpg").toLowerCase();
}

export async function savePhotoAndMeta(
  tempUri: string,
  meta: Omit<PhotoMeta, "uri">
): Promise<PhotoMeta> {
  await ensurePhotosDir();
  const ext = extFromUri(tempUri);
  const filename = `${Date.now()}.${ext}`;
  const photoUri = PHOTOS_DIR + filename;
  const metaUri = PHOTOS_DIR + filename.replace(/\.[^/.]+$/, ".json");
  await FileSystem.moveAsync({ from: tempUri, to: photoUri });
  const payload: PhotoMeta = { uri: photoUri, ...meta };
  await FileSystem.writeAsStringAsync(metaUri, JSON.stringify(payload));
  return payload;
}

export async function listSavedPhotos(): Promise<string[]> {
  await ensurePhotosDir();
  const names = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
  return names.filter((n) => !n.endsWith(".json")).map((n) => PHOTOS_DIR + n);
}

export async function readPhotoMeta(photoUri: string): Promise<PhotoMeta | null> {
  const metaUri = photoUri.replace(/\.[^/.]+$/, ".json");
  const info = await FileSystem.getInfoAsync(metaUri);
  if (!info.exists) return null;
  const txt = await FileSystem.readAsStringAsync(metaUri);
  return JSON.parse(txt) as PhotoMeta;
}
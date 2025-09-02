import { captureRaw } from "@/util/cameraManager";

describe("cameraManager", () => {
  it("captureRaw retorna uri", async () => {
    const camRef: any = {
      takePictureAsync: jest.fn(async () => ({
        uri: "file://cache/pic.jpg",
        exif: { DateTime: "2024:01:02 03:04:05" }
      }))
    };
    const res = await captureRaw(camRef);
    expect(res.uri).toBe("file://cache/pic.jpg");
  });
});

jest.mock("expo-file-system", () => {
  let exists = false;
  const files: string[] = [];
  const doc = "file://docs/";
  const dir = doc + "photos/";
  return {
    documentDirectory: doc,
    getInfoAsync: jest.fn(async () => ({ exists })),
    makeDirectoryAsync: jest.fn(async () => { exists = true; }),
    moveAsync: jest.fn(async ({ to }: any) => { files.push(to); }),
    writeAsStringAsync: jest.fn(async (p: string) => { files.push(p); }),
    readDirectoryAsync: jest.fn(async () => files.filter(f => f.startsWith(dir)).map(f => f.replace(dir, "")))
  };
});

import { savePhotoAndMeta, PHOTOS_DIR } from "@/util/fileManager";

describe("fileManager", () => {
  beforeEach(() => {
    jest.spyOn(Date, "now").mockReturnValue(1700000000000);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("savePhotoAndMeta retorna uri final", async () => {
    const res = await savePhotoAndMeta("file://cache/tmp.jpg", {
      takenAtISO: "2024-01-01T10:00:00",
      latitude: 1,
      longitude: 2
    });
    expect(res.uri).toBe(`${PHOTOS_DIR}1700000000000.jpg`);
  });
});

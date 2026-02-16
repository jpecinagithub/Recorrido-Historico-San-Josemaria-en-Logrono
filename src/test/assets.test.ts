import { describe, expect, it } from "vitest";
import { getAssetPath } from "@/lib/assets";

describe("getAssetPath", () => {
  it("builds a path using BASE_URL when input starts with slash", () => {
    const path = getAssetPath("/assets/album/foto1.jpg");
    expect(path).toBe(`${import.meta.env.BASE_URL}assets/album/foto1.jpg`);
  });

  it("builds a path using BASE_URL when input does not start with slash", () => {
    const path = getAssetPath("assets/album/foto1.jpg");
    expect(path).toBe(`${import.meta.env.BASE_URL}assets/album/foto1.jpg`);
  });
});

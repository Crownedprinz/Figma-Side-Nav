import { MOCK_PAGES } from "../pages";

describe("pages data", () => {
  it("includes Cover as first page", () => {
    const first = MOCK_PAGES[0];
    expect(first.kind).toBe("page");
    if (first.kind === "page") {
      expect(first.label).toBe("Cover");
      expect(first.id).toBe("cover");
    }
  });

  it("includes dividers", () => {
    const kinds = MOCK_PAGES.map((i) => i.kind);
    expect(kinds).toContain("divider");
  });

  it("has unique ids", () => {
    const ids = MOCK_PAGES.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

import { MOCK_LAYERS_TREE, type LayerNode, type LayerIconType } from "../layers";

const VALID_ICON_TYPES: LayerIconType[] = ["frame", "component", "group", "image", "text"];

function collectIds(nodes: LayerNode[]): string[] {
  const ids: string[] = [];
  function walk(node: LayerNode) {
    ids.push(node.id);
    node.children?.forEach(walk);
  }
  nodes.forEach(walk);
  return ids;
}

describe("layers data", () => {
  it("has expected top-level count", () => {
    expect(MOCK_LAYERS_TREE).toHaveLength(24);
  });

  it("has unique ids across the entire tree", () => {
    const ids = collectIds(MOCK_LAYERS_TREE);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every node has valid iconType", () => {
    function walk(node: LayerNode) {
      expect(VALID_ICON_TYPES).toContain(node.iconType);
      node.children?.forEach(walk);
    }
    MOCK_LAYERS_TREE.forEach(walk);
  });

  it("every node has required fields (id, label, iconType)", () => {
    function walk(node: LayerNode) {
      expect(typeof node.id).toBe("string");
      expect(node.id.length).toBeGreaterThan(0);
      expect(typeof node.label).toBe("string");
      expect(typeof node.iconType).toBe("string");
      node.children?.forEach(walk);
    }
    MOCK_LAYERS_TREE.forEach(walk);
  });
});

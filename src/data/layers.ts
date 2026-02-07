/**
 * Hierarchical layers: first structure perfected, duplicated for all top-level (mock).
 * Icon types: Frame, Component, Group, Image, Text.
 */
export type LayerIconType = "frame" | "component" | "group" | "image" | "text";

export interface LayerNode {
  id: string;
  label: string;
  iconType: LayerIconType;
  children?: LayerNode[];
}

/** Single source of truth: perfected first-layer nested structure (from reference). */
function firstLayerChildren(): LayerNode[] {
  return [
    {
      id: "l1-1",
      label: "Frame 1000002230",
      iconType: "frame",
      children: [
        { id: "l1-1-1", label: "Frame 1000002276", iconType: "frame" },
        { id: "l1-1-2", label: "All rights reserved - Antital ©2025 | Built by GADA Studios", iconType: "text" },
      ],
    },
    { id: "l1-2", label: "Frame 1000002391", iconType: "frame" },
    { id: "l1-3", label: "Frame 2087325565", iconType: "frame" },
    { id: "l1-4", label: "Frame 2087325607", iconType: "frame" },
    { id: "l1-5", label: "Frame 2087325564", iconType: "frame" },
    { id: "l1-6", label: "Frame 2087325554", iconType: "frame" },
    {
      id: "l1-7",
      label: "Frame 1000002237",
      iconType: "frame",
      children: [
        { id: "l1-7-1", label: "Review & Submit", iconType: "text" },
        { id: "l1-7-2", label: "Review your information before submitting", iconType: "text" },
      ],
    },
    { id: "l1-8", label: "Frame 2087325625", iconType: "frame" },
    { id: "l1-9", label: "account 1", iconType: "frame" },
    { id: "l1-10", label: "search 1", iconType: "frame" },
    { id: "l1-11", label: "Personal account Nav", iconType: "component" },
  ];
}

/** Clone tree with new id prefix (for duplicating first structure to other rows). */
function cloneWithPrefix(node: LayerNode, prefix: string): LayerNode {
  return {
    ...node,
    id: `${prefix}-${node.id}`,
    children: node.children?.map((c) => cloneWithPrefix(c, prefix)),
  };
}

const FIRST_CHILDREN = firstLayerChildren();

/** Top-level row definitions; all get the same nested structure (mock). */
const TOP_LEVEL: Omit<LayerNode, "children">[] = [
  { id: "l1", label: "Create Personal Account Registration / Account Activation", iconType: "frame" },
  { id: "l2", label: "Create Bussiness Account Registration / Review Your Application & submission", iconType: "frame" },
  { id: "l3", label: "Create Bussiness Account Registration / Team Details & KYC", iconType: "frame" },
  { id: "l4", label: "Create Bussiness Account Registration / Team Details & KYC", iconType: "frame" },
  { id: "l5", label: "Create Bussiness Account Registration / Team Details & KYC", iconType: "frame" },
  { id: "l6", label: "Create Bussiness Account Registration / Company Documentation", iconType: "frame" },
  { id: "l7", label: "Create Bussiness Account Registration / Team Details & KYC", iconType: "frame" },
  { id: "l8", label: "button", iconType: "frame" },
  { id: "l9", label: "GlobeSimple", iconType: "component" },
  { id: "l10", label: "Knowledge Base Page", iconType: "frame" },
  { id: "l11", label: "Group", iconType: "group" },
  { id: "l12", label: "Frame 2087325464", iconType: "frame" },
  { id: "l13", label: "Group 185", iconType: "group" },
  { id: "l14", label: "Group 237", iconType: "group" },
  { id: "l15", label: "Group 17", iconType: "group" },
  { id: "l16", label: "Jar Savings", iconType: "frame" },
  { id: "l17", label: "Money Plant", iconType: "frame" },
  { id: "l18", label: "Group 104", iconType: "group" },
  { id: "l19", label: "Group 103", iconType: "group" },
  { id: "l20", label: "Group 102", iconType: "group" },
  { id: "l21", label: "Plant", iconType: "group" },
  { id: "l22", label: "Group 172", iconType: "group" },
  { id: "l23", label: "Coin", iconType: "frame" },
  { id: "l24", label: "Money Plant", iconType: "frame" },
];

/** Build tree: first row uses perfected children; all others get same structure with prefixed ids. */
export const MOCK_LAYERS_TREE: LayerNode[] = TOP_LEVEL.map((row, index) => {
  if (index === 0) {
    return { ...row, children: FIRST_CHILDREN };
  }
  const prefix = row.id;
  const clonedChildren = FIRST_CHILDREN.map((c) => cloneWithPrefix(c, prefix));
  return { ...row, children: clonedChildren };
});

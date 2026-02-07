import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LayersSection } from "@/components";

describe("LayersSection", () => {
  it("renders Layers section with tree when expanded", () => {
    render(<LayersSection />);
    expect(screen.getByRole("button", { name: /layers section/i })).toBeInTheDocument();
    expect(screen.getByRole("tree", { name: /layers/i })).toBeInTheDocument();
  });

  it("section is expanded by default", () => {
    render(<LayersSection />);
    const sectionButton = screen.getByRole("button", { name: /layers section/i });
    expect(sectionButton).toHaveAttribute("aria-expanded", "true");
  });

  it("collapsing the section hides the tree", async () => {
    const user = userEvent.setup();
    render(<LayersSection />);
    const sectionButton = screen.getByRole("button", { name: /layers section/i });
    await user.click(sectionButton);
    expect(sectionButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("tree", { name: /layers/i })).not.toBeInTheDocument();
  });

  it("expanding the section shows the tree again", async () => {
    const user = userEvent.setup();
    render(<LayersSection />);
    const sectionButton = screen.getByRole("button", { name: /layers section/i });
    await user.click(sectionButton);
    await user.click(sectionButton);
    expect(sectionButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("tree", { name: /layers/i })).toBeInTheDocument();
  });

  it("default expanded state shows children of expanded rows", () => {
    render(<LayersSection />);
    // l1 and l1-1 are expanded by default; child of l1 is "Frame 1000002230"
    expect(screen.getByText(/frame 1000002230/i)).toBeInTheDocument();
    // Child of l1-1
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
  });

  it("toggling a row collapse hides its children", async () => {
    const user = userEvent.setup();
    render(<LayersSection />);
    // Top-level row "Create Personal Account Registration..." (l1) is expanded; find its Collapse button
    const treeitems = screen.getAllByRole("treeitem");
    const l1Row = treeitems.find((el) => el.textContent?.includes("Create Personal Account Registration"));
    expect(l1Row).toBeDefined();
    const collapseButton = l1Row!.querySelector('button[aria-label^="Collapse "]');
    expect(collapseButton).toBeInTheDocument();
    await user.click(collapseButton!);
    // Child "Frame 1000002230" should no longer be visible
    expect(screen.queryByText(/frame 1000002230/i)).not.toBeInTheDocument();
  });

  it("toggling a row expand shows its children again", async () => {
    const user = userEvent.setup();
    render(<LayersSection />);
    const treeitems = screen.getAllByRole("treeitem");
    const l1Row = treeitems.find((el) => el.textContent?.includes("Create Personal Account Registration"));
    const collapseButton = l1Row!.querySelector('button[aria-label^="Collapse "]');
    await user.click(collapseButton!);
    expect(screen.queryByText(/frame 1000002230/i)).not.toBeInTheDocument();
    const expandButton = l1Row!.querySelector('button[aria-label^="Expand "]');
    await user.click(expandButton!);
    expect(screen.getByText(/frame 1000002230/i)).toBeInTheDocument();
  });
});

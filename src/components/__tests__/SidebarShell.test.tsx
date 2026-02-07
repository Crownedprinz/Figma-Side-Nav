import { render, screen } from "@testing-library/react";
import { SidebarShell } from "@/components";

describe("SidebarShell", () => {
  it("renders sidebar with correct aria label", () => {
    render(<SidebarShell />);
    expect(screen.getByRole("complementary", { name: /sidebar/i })).toBeInTheDocument();
  });

  it("renders header and page list", () => {
    render(<SidebarShell />);
    expect(screen.getByRole("banner", { name: /sidebar header/i })).toBeInTheDocument();
    expect(screen.getByRole("tree", { name: /pages/i })).toBeInTheDocument();
  });
});

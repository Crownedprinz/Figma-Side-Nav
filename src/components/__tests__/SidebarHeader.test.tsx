import { render, screen } from "@testing-library/react";
import { SidebarHeader } from "@/components";

describe("SidebarHeader", () => {
  it("renders project name Antital", () => {
    render(<SidebarHeader />);
    expect(screen.getByRole("button", { name: /antital.*file name/i })).toHaveTextContent("Antital");
  });

  it("renders Main menu and Minimize UI buttons", () => {
    render(<SidebarHeader />);
    expect(screen.getByRole("button", { name: /main menu/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /minimize ui/i })).toBeInTheDocument();
  });
});

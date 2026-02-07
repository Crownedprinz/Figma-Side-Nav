import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";

/**
 * Integration: full page renders sidebar, selection and keyboard work.
 */
describe("Sidebar integration", () => {
  it("renders full layout with sidebar and main canvas", () => {
    render(<Home />);
    expect(screen.getByRole("complementary", { name: /sidebar/i })).toBeInTheDocument();
    expect(screen.getByRole("main", { name: /main canvas/i })).toBeInTheDocument();
  });

  it("sidebar shows Antital header and Pages list", () => {
    render(<Home />);
    expect(screen.getByText("Antital")).toBeInTheDocument();
    expect(screen.getByRole("tree", { name: /pages/i })).toBeInTheDocument();
  });

  it("clicking a page selects it", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const cover = screen.getByRole("button", { name: /cover/i });
    const handover = screen.getByRole("button", { name: /handover flow/i });
    expect(cover).toHaveAttribute("aria-current", "page");
    await user.click(handover);
    expect(handover).toHaveAttribute("aria-current", "page");
  });

  it("keyboard ArrowDown/ArrowUp moves selection", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const cover = screen.getByRole("button", { name: /cover/i });
    const moodboard = screen.getByRole("button", { name: /moodboard/i });
    expect(cover).toHaveAttribute("aria-current", "page");
    await user.keyboard("{ArrowDown}");
    expect(moodboard).toHaveAttribute("aria-current", "page");
    await user.keyboard("{ArrowUp}");
    expect(cover).toHaveAttribute("aria-current", "page");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageList } from "../PageList";

describe("PageList", () => {
  it("renders Pages section with search", () => {
    render(<PageList />);
    expect(screen.getByText("Pages")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /find/i })).toBeInTheDocument();
  });

  it("renders Cover as selected by default", () => {
    render(<PageList />);
    const cover = screen.getByRole("button", { name: /cover/i });
    expect(cover).toHaveAttribute("aria-current", "page");
  });

  it("selects page on click", async () => {
    const user = userEvent.setup();
    render(<PageList />);
    const moodboard = screen.getByRole("button", { name: /moodboard/i });
    await user.click(moodboard);
    expect(moodboard).toHaveAttribute("aria-current", "page");
  });

  it("renders mock page labels from data", () => {
    render(<PageList />);
    expect(screen.getByText(/cover/i)).toBeInTheDocument();
    expect(screen.getByText(/dev ready/i)).toBeInTheDocument();
    expect(screen.getByText(/components and style guides/i)).toBeInTheDocument();
  });
});

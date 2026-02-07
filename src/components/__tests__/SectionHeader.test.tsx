import { render, screen } from "@testing-library/react";
import { SectionHeader, SearchButton } from "@/components";

describe("SectionHeader", () => {
  it("renders section title", () => {
    render(<SectionHeader title="Pages" />);
    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("renders optional action when provided", () => {
    render(<SectionHeader title="Pages" action={<SearchButton />} />);
    expect(screen.getByRole("button", { name: /find/i })).toBeInTheDocument();
  });

  it("does not render action when not provided", () => {
    render(<SectionHeader title="Sections" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

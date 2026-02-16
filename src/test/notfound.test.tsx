import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import NotFound from "@/pages/NotFound";

describe("NotFound page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders 404 content and a link to home", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <MemoryRouter initialEntries={["/ruta-que-no-existe"]}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "Return to Home" });
    expect(homeLink).toHaveAttribute("href", "/");

    expect(consoleSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/ruta-que-no-existe",
    );
  });
});

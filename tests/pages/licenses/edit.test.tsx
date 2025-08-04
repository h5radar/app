import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

import LicensesEditPage from "@/pages/licenses/edit";

vi.mock("@/queries/license", () => ({
  useGetLicense: vi.fn(() => ({
    data: {
      id: "1",
      title: "MIT license",
      description: "MIT license description",
      active: true,
    },
    isLoading: false,
    isError: false,
    error: null,
  })),
  useUpdateLicense: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

describe("LicensesEditPage", () => {
  it("get licenses edit page", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <LicensesEditPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, "Edit License", "/licenses/edit/1");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("id")).toBeDefined();
      expect(screen.getByDisplayValue("1"));
      expect(screen.getByPlaceholderText("title")).toBeDefined();
      expect(screen.getByDisplayValue("MIT license"));
      expect(screen.getByPlaceholderText("description")).toBeDefined();
      expect(screen.getByDisplayValue("MIT license description"));
      expect(screen.getByText("Active")).toBeDefined();
      expect(screen.getByDisplayValue("on"));
    });
  });
});

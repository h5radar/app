import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { DomainsPage } from "@/pages/domain/table";

describe("DomainsPage", () => {
  it("get compliances page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <DomainsPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Columns")).toBeDefined();
  });
});

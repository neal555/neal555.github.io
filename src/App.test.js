import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders App", async () => {
  render(<App />);
  const topBar = screen.getByText(/F Test/i);
  expect(topBar).toBeInTheDocument();
  await waitFor(() => screen.findByTestId("data"), {
    timeout: 10000,
    onTimeout: () => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    },
  });
  expect(screen.getByTestId("data")).toHaveTextContent("Countries");
});

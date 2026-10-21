import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInGate } from "@/components/SignInGate";

describe("SignInGate", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("does not show the board before sign-in", async () => {
    render(<SignInGate />);

    expect(
      await screen.findByRole("heading", { name: "Kanban Studio" })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("column-col-backlog")).not.toBeInTheDocument();
  });

  it("shows an error for invalid credentials", async () => {
    const user = userEvent.setup();
    render(<SignInGate />);

    await user.type(await screen.findByLabelText("Username"), "wrong");
    await user.type(screen.getByLabelText("Password"), "credentials");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Incorrect username or password."
    );
    expect(screen.queryByTestId("column-col-backlog")).not.toBeInTheDocument();
  });

  it("opens the board with the MVP credentials and signs out", async () => {
    const user = userEvent.setup();
    render(<SignInGate />);

    await user.type(await screen.findByLabelText("Username"), "user");
    await user.type(screen.getByLabelText("Password"), "password");
    await user.keyboard("{Enter}");

    expect(await screen.findByTestId("column-col-backlog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Sign out" }));

    expect(
      await screen.findByRole("button", { name: "Sign in" })
    ).toBeInTheDocument();
    expect(screen.queryByTestId("column-col-backlog")).not.toBeInTheDocument();
  });

  it("restores sign-in state after a refresh", async () => {
    window.sessionStorage.setItem("kanban-studio-authenticated", "true");

    render(<SignInGate />);

    expect(await screen.findByTestId("column-col-backlog")).toBeInTheDocument();
  });
});

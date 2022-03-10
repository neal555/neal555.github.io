import { render, screen, fireEvent } from "@testing-library/react";
import Loading from "./Loading";
import Error from "./Error";
import Item from "./Item";
import HistoryItem from "./HistoryItem";
import CardInfo from "./CardInfo";
import Pane from "./Pane";
import TopBar from "./TopBar";

test("renders Loading component", () => {
  render(<Loading />);
  const loadingComponent = screen.getByTestId("loading-component");
  expect(loadingComponent).toBeInTheDocument();
});

test("renders Error component", () => {
  render(<Error />);
  const titleError = screen.getByText(/🙁/i);
  const message = screen.getByText(/Something went wrong/i);
  const button = screen.getByText(/Try again/i);

  expect(titleError).toBeInTheDocument();
  expect(message).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("renders Item component", () => {
  const handleClick = jest.fn();
  render(<Item onClick={handleClick} name="Mexico" flag="🇲🇽" />);
  const itemComponent = screen.getByTestId("country-item");
  const flag = screen.getByText("🇲🇽");
  const name = screen.getByText("Mexico");

  fireEvent.click(itemComponent);

  expect(flag).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders HistoryItem component", () => {
  const handleClick = jest.fn();
  render(
    <HistoryItem onClick={handleClick} name="Mexico" flag="🇲🇽" count="5" />
  );
  const itemComponent = screen.getByTestId("history-item");
  const flag = screen.getByText("🇲🇽");
  const name = screen.getByText("Mexico");
  const count = screen.getByText("5");
  fireEvent.click(itemComponent);

  expect(flag).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(count).toBeInTheDocument();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders CardInfo component", () => {
  render(
    <CardInfo
      item={{
        name: "Mexico",
        flag: "🇲🇽",
        dialCode: "+52",
        continent: "North America",
        currencyCode: "MXN",
      }}
    />
  );
  const flag = screen.getByText("🇲🇽");
  const name = screen.getByText("Mexico");
  const dialCode = screen.getByText("Dial code: +52");
  const continet = screen.getByText("Continent: North America");
  const currencyCode = screen.getByText("Currency code: MXN");

  expect(flag).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(dialCode).toBeInTheDocument();
  expect(continet).toBeInTheDocument();
  expect(currencyCode).toBeInTheDocument();
});

test("renders Pane component", () => {
  render(<Pane title={"anything"} />);
  const pane = screen.getByTestId("pane");
  const title = screen.getByText("anything");
  expect(pane).toBeInTheDocument();
  expect(title).toBeInTheDocument();
});

test("renders TopBar", () => {
  render(<TopBar />);
  const linkElement = screen.getByText(/F Test/i);
  expect(linkElement).toBeInTheDocument();
});

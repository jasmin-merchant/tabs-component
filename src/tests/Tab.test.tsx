import { fireEvent, render, screen } from "@testing-library/react";
import { FC, useState } from "react";
import Tab from "../components/tabs/Tab";

const MockControlledTab: FC = () => {
  const [active, setActive] = useState(0);
  const onActiveChange = (tabKey: number) => {
    setActive(tabKey);
  };
  return (
    <Tab active={active} onActiveChange={onActiveChange}>
      <Tab.Pane title="A">This is Tab 1</Tab.Pane>
      <Tab.Pane title="B">This is Tab 2</Tab.Pane>
      <Tab.Pane title="C">This is Tab 3</Tab.Pane>
    </Tab>
  );
};

const MockUncontrolledTab: FC = () => {
  return (
    <Tab initialActive={0}>
      <Tab.Pane title="A">This is Tab 1</Tab.Pane>
      <Tab.Pane title="B">This is Tab 2</Tab.Pane>
      <Tab.Pane title="C">This is Tab 3</Tab.Pane>
    </Tab>
  );
};

describe("Controlled Tab Testing", () => {
  it("should render Tab Component and initial tab content", async () => {
    render(<MockControlledTab />);

    const firstButtonControlled = screen.getAllByRole("listitem")[0];
    expect(firstButtonControlled.classList.contains("active")).toBeTruthy();
    expect(screen.getByText("This is Tab 1")).toBeInTheDocument();
  });

  it("should change tab", async () => {
    render(<MockControlledTab />);

    fireEvent.click(screen.getByText("C"));
    expect(screen.getByText("This is Tab 3")).toBeInTheDocument();
  });
});

describe("Uncontrolled Tabs testing", () => {
  it("should render Tab Component and initial tab content", async () => {
    render(<MockUncontrolledTab />);

    const firstButtonUncontrolled = screen.getAllByRole("listitem")[0];
    expect(firstButtonUncontrolled.classList.contains("active")).toBeTruthy();

    expect(screen.getByText("This is Tab 1")).toBeInTheDocument();
  });

  it("should change tab", async () => {
    render(<MockUncontrolledTab />);
    
    fireEvent.click(screen.getByText("C"));
    expect(screen.getByText("This is Tab 3")).toBeInTheDocument();
  });
});

describe("Failure test cases", () => {
  it("should throw error if active & initialActive both are passed", async () => {
    expect(() =>
      render(
        <Tab active={0} initialActive={0}>
          <Tab.Pane title="A">This is Tab 1</Tab.Pane>
          <Tab.Pane title="B">This is Tab 2</Tab.Pane>
          <Tab.Pane title="C">This is Tab 3</Tab.Pane>
        </Tab>
      )
    ).toThrow(
      "Invalid props passed - Component cannot be controlled & uncontrolled both!"
    );
  });

  it("Controlled Component - should throw error if key passed exceeds the total TabPane's", async () => {
    // testing controlled component
    expect(() =>
      render(
        <Tab active={15} onActiveChange={() => ""}>
          <Tab.Pane title="A">This is Tab 1</Tab.Pane>
          <Tab.Pane title="B">This is Tab 2</Tab.Pane>
          <Tab.Pane title="C">This is Tab 3</Tab.Pane>
        </Tab>
      )
    ).toThrow(
      'Invalid props passed - out-of-bound values passed to either "acttive" or "initialActive" props'
    );
  });

  it("Uncontrolled component - should throw error if key passed exceeds the total TabPane's", () => {
    // testing uncontrolled component
    expect(() =>
      render(
        <Tab initialActive={15}>
          <Tab.Pane title="A">This is Tab 1</Tab.Pane>
          <Tab.Pane title="B">This is Tab 2</Tab.Pane>
          <Tab.Pane title="C">This is Tab 3</Tab.Pane>
        </Tab>
      )
    ).toThrow(
      'Invalid props passed - out-of-bound values passed to either "acttive" or "initialActive" props'
    );
  });
});

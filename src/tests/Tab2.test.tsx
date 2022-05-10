import { fireEvent, render, screen } from "@testing-library/react";
import { FC, useState } from "react";
import Tab from "../components/tabs/Tab";
import Tab2 from "../components/tabs/Tab2";

const MockControlledTab: FC = () => {
  const [active, setActive] = useState(0);
  const onActiveChange = (tabKey: number) => {
    setActive(tabKey);
  };
  return (
    <Tab2 active={active} onActiveChange={onActiveChange}>
      <Tab.Pane title="A">This is Tab 1</Tab.Pane>
      <Tab.Pane title="B">This is Tab 2</Tab.Pane>
      <Tab.Pane title="C">This is Tab 3</Tab.Pane>
    </Tab2>
  );
};

const MockUncontrolledTab: FC = () => {
  return (
    <Tab2 initialActive={0}>
      <Tab.Pane title="A">This is Tab 1</Tab.Pane>
      <Tab.Pane title="B">This is Tab 2</Tab.Pane>
      <Tab.Pane title="C">This is Tab 3</Tab.Pane>
    </Tab2>
  );
};

describe("Controlled Tab Testing", () => {
  it("should render Tab Component and initial tab displayed", async () => {
    render(<MockControlledTab />);

    const firstTab = screen.getAllByRole("listitem")[0];
    expect(firstTab.classList.contains("active")).toBeTruthy();

    const tabContents = screen.queryAllByText(/This is/);
    // rendering all 3 but displaying just 1
    expect(tabContents.length).toEqual(3);
    expect(tabContents[0].classList.contains("hidden")).toBeFalsy();
  });

  it("should change tab", async () => {
    render(<MockControlledTab />);

    fireEvent.click(screen.getByText("C"));
    expect(
      screen.queryByText("This is Tab 3")?.classList.contains("hidden")
    ).toBeFalsy();
  });
});

describe("Uncontrolled Tabs testing", () => {
  it("should render Tab Component and initial tab content", async () => {
    render(<MockUncontrolledTab />);

    const firstTab = screen.getAllByRole("listitem")[0];
    expect(firstTab.classList.contains("active")).toBeTruthy();

    const tabContents = screen.queryAllByText(/This is/);
    // rendering all 3 but displaying just 1
    expect(tabContents.length).toEqual(3);
    expect(tabContents[0].classList.contains("hidden")).toBeFalsy();
  });

  it("should change tab", async () => {
    render(<MockUncontrolledTab />);

    fireEvent.click(screen.getByText("C"));
    expect(
      screen.queryByText("This is Tab 3")?.classList.contains("hidden")
    ).toBeFalsy();
  });
});

describe("Failure test cases", () => {
  it("should throw error if active & initialActive both are passed", async () => {
    expect(() =>
      render(
        <Tab2 active={0} initialActive={0}>
          <Tab.Pane title="A">This is Tab 1</Tab.Pane>
          <Tab.Pane title="B">This is Tab 2</Tab.Pane>
          <Tab.Pane title="C">This is Tab 3</Tab.Pane>
        </Tab2>
      )
    ).toThrow(
      "Invalid props passed - Component cannot be controlled & uncontrolled both!"
    );
  });

  it("Controlled Component - should throw error if key passed exceeds the total TabPane's", async () => {
    // testing controlled component
    expect(() =>
      render(
        <Tab2 active={15} onActiveChange={() => ""}>
          <Tab.Pane title="A">This is Tab 1</Tab.Pane>
          <Tab.Pane title="B">This is Tab 2</Tab.Pane>
          <Tab.Pane title="C">This is Tab 3</Tab.Pane>
        </Tab2>
      )
    ).toThrow(
      'Invalid props passed - out-of-bound values passed to either "acttive" or "initialActive" props'
    );
  });

  it("Uncontrolled component - should throw error if key passed exceeds the total TabPane's", () => {
    // testing uncontrolled component
    expect(() =>
      render(
        <Tab2 initialActive={15}>
          <Tab.Pane title="A">This is Tab 1</Tab.Pane>
          <Tab.Pane title="B">This is Tab 2</Tab.Pane>
          <Tab.Pane title="C">This is Tab 3</Tab.Pane>
        </Tab2>
      )
    ).toThrow(
      'Invalid props passed - out-of-bound values passed to either "acttive" or "initialActive" props'
    );
  });
});

import { useState } from "react";
import "./App.css";
import Tab from "./components/tabs/Tab";
import Tab2 from "./components/tabs/Tab2";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [active, setActive] = useState(0);
  const onActiveChange = (tabKey: number) => {
    setActive(tabKey);
  };

  const [activeTab2, setActiveTab2] = useState(0);
  const onActiveChangeTab2 = (tabKey: number) => {
    setActiveTab2(tabKey);
  };

  return (
    <div>
      <ErrorBoundary>
        <h2>React Tabs Demo</h2>
        <div className="tabs-section-wrapper">
          <h4>Tabs - Controlled Component</h4>
          <Tab active={active} onActiveChange={onActiveChange}>
            <Tab.Pane title="A">This is Tab 1</Tab.Pane>
            <Tab.Pane title="B">This is Tab 2</Tab.Pane>
            <Tab.Pane title="C">This is Tab 3</Tab.Pane>
          </Tab>
        </div>

        <div className="tabs-section-wrapper">
          <h4>Tabs - Uncontrolled Component</h4>
          <Tab initialActive={1}>
            <Tab.Pane title="A">This is Tab 1</Tab.Pane>
            <Tab.Pane title="B">This is Tab 2</Tab.Pane>
            <Tab.Pane title="C">This is Tab 3</Tab.Pane>
          </Tab>
        </div>

        <div className="tabs-section-wrapper">
          <h4>Tabs 2 - Controlled Component</h4>
          <Tab2 active={activeTab2} onActiveChange={onActiveChangeTab2}>
            <Tab.Pane title="A">This is Tab 1</Tab.Pane>
            <Tab.Pane title="B">This is Tab 2</Tab.Pane>
            <Tab.Pane title="C">This is Tab 3</Tab.Pane>
          </Tab2>
        </div>

        <div className="tabs-section-wrapper">
          <h4>Tabs 2 - Uncontrolled Component</h4>
          <Tab2 initialActive={1}>
            <Tab.Pane title="A">This is Tab 1</Tab.Pane>
            <Tab.Pane title="B">This is Tab 2</Tab.Pane>
            <Tab.Pane title="C">This is Tab 3</Tab.Pane>
          </Tab2>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;

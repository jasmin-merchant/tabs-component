import { FC, ReactElement, useEffect, useState } from "react";
import TabPane, { ITabPane } from "./TabPane";

import "./tab.css";

interface ITab {
  children: ReactElement<ITabPane>[];
  active?: number;
  initialActive?: number;
  onActiveChange?: (tabKey: number) => void;
}

const Tab: FC<ITab> = ({ children, active, initialActive, onActiveChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabKey: number) => {
    if (onActiveChange) {
      onActiveChange(tabKey);
    } else {
      setActiveTab(tabKey);
    }
  };

  if (active !== undefined && initialActive !== undefined) {
    // validating if both "active" and "initialActive" are passed
    throw TypeError(
      "Invalid props passed - Component cannot be controlled & uncontrolled both!"
    );
  } else if (
    (active && active > children.length) ||
    (initialActive && initialActive > children.length)
  ) {
    // validating value of "active" or "initialActive" should not be more than the TabPane's passed
    throw TypeError(
      'Invalid props passed - out-of-bound values passed to either "acttive" or "initialActive" props'
    );
  }

  useEffect(() => {
    if (active !== undefined) {
      setActiveTab(active);
    } else if (initialActive !== undefined) {
      setActiveTab(initialActive);
    }
  }, [active, initialActive]);

  // just render active tab's content
  const activeTabPane = children.find((element, index) => activeTab === index);

  return (
    <div className="tabs-wrapper">
      <ul className="tabs">
        {children.map((element, index) => (
          <li
            key={`tabpane-${index}`}
            className={`tab-item ${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabChange(index)}
          >
            <span>{element.props.title}</span>
          </li>
        ))}
      </ul>

      {activeTabPane && <TabPane isActive {...activeTabPane.props} />}
    </div>
  );
};

export default Object.assign(Tab, {
  Pane: TabPane,
});

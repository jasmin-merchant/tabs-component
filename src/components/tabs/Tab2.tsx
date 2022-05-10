import { FC, ReactElement, useEffect, useState } from "react";
import TabPane, { ITabPane } from "./TabPane";

interface ITab {
  children: ReactElement<ITabPane>[];
  active?: number;
  initialActive?: number;
  onActiveChange?: (val: number) => void;
}

const Tab2: FC<ITab> = ({
  children,
  active,
  initialActive,
  onActiveChange,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabKey: number) => {
    if (onActiveChange) {
      onActiveChange(tabKey);
    } else {
      setActiveTab(tabKey);
    }
  };

  if (active !== undefined && initialActive !== undefined) {
    throw TypeError(
      "Invalid props passed - Component cannot be controlled & uncontrolled both!"
    );
  } else if (
    (active && active > children.length) ||
    (initialActive && initialActive > children.length)
  ) {
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

  return (
    <div className="tabs-wrapper">
      <ul className="tabs">
        {children.map((element, index) => (
          <li
            key={`tabpane-${index}`}
            className={`tab-item ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabChange(index)}
          >
            <span>{element.props.title}</span>
          </li>
        ))}
      </ul>

      {children.map((element, index) => (
        <div
          key={`tabpane-${index}`}
        >
          <TabPane isActive={activeTab === index} {...element.props} />
        </div>
      ))}
    </div>
  );
};

export default Object.assign(Tab2, {
  Pane: TabPane,
});

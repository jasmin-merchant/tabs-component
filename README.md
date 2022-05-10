# React Tabs

## Tabulator Component

### Working Demo: [React Tabs Demo](https://jasmin-react-tabs.netlify.app/)

## Introduction

React Tabs is a tabulator component that can be used to function as both - Controlled & Uncontrolled.
It has 2 components to be used - *Tab* and *Tab2* that has different rendering implementations.

## Available Scripts

### Installation
In the project directory, you can run:

#### `npm start`

### Unit Testing
In the project directory, you can run:

#### `npm test`

## Basic Example

```js
import Tab from "./components/tabs/Tab";

function App() {
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
}

export default App;
```

## Components

The structure to use Tab or Tab2 is similar which is given below that provides 2 components to use - *Tab* and *Tab.Pane*.

For adding multiple Tabs, you can add multiple *TabPane* components with title & content to render them.

### Controlled (Tab)

```js
import Tab from "./components/tabs/Tab";

function App() {
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
}

export default App;
```

### Uncontrolled (Tab)
```js
import Tab from "./components/tabs/Tab";

function App() {
  return (
    <Tab initialActive={2}>
        <Tab.Pane title="A">This is Tab 1</Tab.Pane>
        <Tab.Pane title="B">This is Tab 2</Tab.Pane>
        <Tab.Pane title="C">This is Tab 3</Tab.Pane>
    </Tab>
  );
}

export default App;
```

Note:
- Passing props *active* and *initialActive* both at the same time would throw a TypeError
- Passing tab value more than the Tab Panes in either *active* or *initialActive* would throw a TypeError as it would be out-of-bound value.

### Controlled (Tab2)

```js
import Tab2 from "./components/tabs/Tab2";

function App() {
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
}

export default App;
```

### Uncontrolled (Tab2)
```js
import Tab2 from "./components/tabs/Tab2";

function App() {
  return (
    <Tab2 initialActive={2}>
        <Tab.Pane title="A">This is Tab 1</Tab.Pane>
        <Tab.Pane title="B">This is Tab 2</Tab.Pane>
        <Tab.Pane title="C">This is Tab 3</Tab.Pane>
    </Tab2>
  );
}

export default App;
```

Note:
- The difference of implementation is that *Tab2* renders all the TabPane's each but displays just the active one by passing using *isActive* prop.
- Validations for *Tab2* is similar to that of *Tab*.

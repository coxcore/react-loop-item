# react-loop-item

> A simple component that repeatedly creates components.

[![NPM](https://img.shields.io/npm/v/react-loop-item.svg)](https://www.npmjs.com/package/react-loop-item) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install react-loop-item --save
```

or

```bash
yarn add react-loop-item
```

## Usage

### `<LoopItem>`

```jsx
import { LoopItem } from "react-loop-item";

const Articles = () => {
  // [list]: <Item> props
  const itemProps = [
    { contents: "1. Article sample A" },
    { contents: "2. Article sample B" },
  ];

  return <LoopItem target={Item} list={itemProps} />;
};

// [target]: Item component of list
const Item = ({ contents }) => <p>{contents}</p>;
```

### `<ListWrap>`

> `[version] ^1.1.0`

```jsx
import { ListWrap } from "react-loop-item";

const Articles = () => {
  // [list]: <Item> props
  const itemProps = [
    { contents: "1. Article sample A" },
    { contents: "2. Article sample B" },
  ];

  return (
    <ListWrap
      // List tag
      tag="ul"
      className="ul-class"
      data-description="Add any ul attributes"
      // <LoopItem> props
      target={Item}
      list={itemProps}
    />
  );
};

// [target]: Item component of list
const Item = ({ contents }) => <li>{contents}</li>;
```

### `loop()`

```jsx
import { LoopItem, loop } from "react-loop-item";

loop(Item, list, each, instead, hidden, memo);
// or
<LoopItem
  target={Item}
  list={arr}
  each={fnc}
  instead={element}
  hidden={boolean}
  memo={boolean}
/>;
```

## Props

### target (required)

> `[type] elementType(React.Component, React.FC, React.forwardRef, string)`

Component to be created repeatedly.

```jsx
// Component
<LoopItem target={ItemComponent} />;

// Tag name
<LoopItem target={"img"} />;
```

### list (optional)

> `[type] Array | number`

Item data array or number of items.

```jsx
// Array
<LoopItem target={Item} list={[{ foo: "bar" }, { foo: "bar" }]} />;

// Count
<LoopItem target={Item} list={5} />;
```

### each (optional)

> `[type] Function`

Callback function that converts each element of `list` to props for `target` when rendering `target` component.
If `each` is omitted, `list` element is used as it is.

> `each` has two arguments. (element and index of `list`)

```jsx
// [list]: Raw datas
const model = [{ foo: "bar" }, { foo: "bar" }];

// [each]: Formatter for <Anchor> props
const getProps = (data, index) => ({
  // Properties
  value: data.foo,
  // Callbacks
  onClick: (event) => {
    event.preventDefault();
    console.log(model, data, index);
  },
});

// [target]: <Ancher> has value and onClick
const Anchor = ({ value, onClick }) => (
  <a href="#" onClick={onClick}>
    {value}
  </a>
);

<LoopItem target={Anchor} list={model} each={getProps} />;
```

### tag (optional)

> `[type] string`, `[version] ^1.1.0`, `[for] ListWrap`

Set tag name of parent element to wrap items.

```jsx
<ListWrap tag="div" className="tag-example" target={Child} list={model}> />
// or
<div className="tag-example">
  <LoopItem target={Child} list={model}>
</div>
```

### instead (optional)

> [type] React.ReactNode

Element to return instead of null when `list` is empty. Use strings or element, no component.

> target={Component} instead={strings or element}

```jsx
// [list] : No data
const model = [];

// [instead]: Element to render instead of blank
const noData = <span>no data</span>;

// Do not use component
// const noData = () => <span>no data</span>;

<LoopItem target={Item} list={model} instead={noData} />;
```

### hidden (optional)

> `[type] boolean`

Prevent rendering.

```jsx
<LoopItem target={Item} list={model} hidden />
// or
<LoopItem target={Item} list={model} hidden={true} />
```

### memo (optional)

> `[type] string | boolean`, `[version] ^1.1.2`

Whether to cache `target` using `React.memo`.

To use this feature, enter prop name of `target` you want to use as `key` in list, or `true`.
Use it when absolutely necessary. Frequent use of `React.memo` is not recommended.

```jsx
<LoopItem target={Item} list={model} memo="id" />
// or
<LoopItem target={Item} list={model} memo={true} />
```

## Examples

### AnchorList.jsx

```jsx
import React from "react";
import { ListWrap } from "react-loop-item";

import style from "./AnchorList.module.css";

// <AnchorList> needs raw data array and <Item> props formatter.
const AnchorList = ({ list, each }) => (
  <ListWrap
    tag="ul"
    className={style["ul-style"]}
    target={Item}
    list={list}
    each={each}
    instead={noData}
  />
);

// Check target props
const Item = ({ label, href, onClick }) => (
  <li className={style["li-style"]}>
    <a href={href} onClick={onClick}>
      {label}
    </a>
  </li>
);

// What to display instead of the <ul>
const noData = <div>no data</div>;

export default AnchorList;
```

### Tags.jsx

```jsx
import React from "react";
import { LoopItem } from "react-loop-item";

import style from "./Tags.module.css";

// If you already know about raw datas,
// define <Item> props formatter in this component.
const Tags = ({ list }) => (
  <p className={style["p-style"]}>
    <LoopItem target={Item} list={list} each={getProps} />
  </p>
);

const Item = ({ value }) => (
  <span className={style["span-style"]}>{value}</span>
);

// Convert string to <Item> props
const getProps = (text, index) => ({
  value: text,
});

export default Tags;
```

### ListContainer.jsx

```jsx
import React from "react";
import AnchorList from "./AnchorList";
import Tags from "./Tags";

const ListContainer = () => {
  // <AnchorList> raw datas
  const siteList = [
    { url: "aaa.com", description: "aaa site", visited: 4 },
    { url: "bbb.com", description: "bbb site", visited: 2 },
    { url: "ccc.com", description: "ccc site", visited: 8 },
  ];

  // Formatter for <Item> props of <AnchorList>
  const getProps = (data, index) => {
    // raw datas (element and index of siteList)
    const { url, description, visited } = data;

    // Props
    return {
      key: url, // If key is omitted, index is used
      label: description,
      href: url,
      onClick(event) {
        event.preventDefault();
        console.log(siteList, index, visited);
      },
    };
  };

  // <Tags> raw datas
  const tagList = ["react", "loop", "for", "each", "list"];

  return (
    <div>
      {/* Your components */}
      <AnchorList list={siteList} each={getProps} />
      <Tags list={tagList} />
    </div>
  );
};

export default ListContainer;
```

## Tips

### Injecting Callbacks

If the structure of the raw data is fixed, the component using `LoopItem` defines props a formatter for the list item component.
Then use the parent component's state or props to develop functions to use as callback.

```jsx
import React from "react";
import AnchorList from "./AnchorList";

const ListContainer = () => {
  // Code to manage model
  // ...

  const updateVisited = (url, count) => {
    // Do something for updating model
  };

  // Callbacks injector for <Item> of <AnchorList>
  const getItemCallbacks = (data, index) => {
    const { url, description, visited } = data;

    // Callbacks
    return {
      onClick(event) {
        event.preventDefault();

        // Update visited
        updateVisited(url, visited + 1);
      },
    };
  };

  return (
    <div>
      {/* Your component */}
      <AnchorList list={model} each={getItemCallbacks} />
    </div>
  );
};

export default ListContainer;
```

```jsx
import React from "react";
import { LoopItem } from "react-loop-item";

import style from "./AnchorList.module.css";

// <AnchorList> needs raw datas and <Item> callbacks injector.
const AnchorList = ({ list, each }) => {
  // Formatter for <Item> props
  const getItemProps = (data, index) => {
    const { url, description, visited } = data;

    return {
      // Properties
      key: url,
      href: url,
      label: description,

      // Inject <Item> callbacks
      ...each(data, index),
    };
  };

  return (
    <ul className={style["ul-style"]}>
      <LoopItem target={Item} list={list} each={getItemProps} />
    </ul>
  );
};

// Check target props
const Item = ({ label, href, onClick }) => (
  <li className={style["li-style"]}>
    <a href={href} onClick={onClick}>
      {label}
    </a>
  </li>
);

export default AnchorList;
```

### Rendering Optimization

If rendering optimization is required, set the `memo` option.

For this to work smoothly, you need to manage the elements of the `list` as immutable objects. And make sure the references to the `each` callback don't change.

```jsx
import React, { useReducer, useCallback } from "react";
import { ListWrap } from "react-loop-item";

// Demo data
const siteList = [
  { url: "aaa.com", description: "aaa site", visited: 4 },
  { url: "bbb.com", description: "bbb site", visited: 2 },
  { url: "ccc.com", description: "ccc site", visited: 8 },
];

// List reducer
const reducer = (state, url) =>
  state.map((item) =>
    // Returns new object only if it is a target.
    item.url !== url
      ? item
      : {
          ...item,
          visited: item.visited + 1,
        }
  );

const MemoList = () => {
  // Visit is dispatch
  const [list, visit] = useReducer(reducer, siteList);

  // Cached each
  const each = useCallback(
    (data, index) => ({
      ...data,
      onClick(event) {
        event.preventDefault();
        visit(data.url);
      },
    }),
    [visit] // Visit does not change the reference
  );

  // Try changing memo
  return (
    <ListWrap tag="ul" target={Anchor} list={list} each={each} memo="url" />
  );
};

const Anchor = ({ url, description, visited, onClick }) => {
  // Check rendering
  console.log("rendering!", url);
  return (
    <li>
      <a href={url} onClick={onClick}>
        {description}({visited})
      </a>
    </li>
  );
};

export default MemoList;
```

## License

MIT © [coxcore](https://github.com/coxcore)

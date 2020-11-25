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

### `LoopItem` component

```jsx
import LoopItem from "react-loop-item";

const Articles = () => {
  // [list]: <Item> props list
  const itemProps = [
    { contents: "1. Article sample A" },
    { contents: "2. Article sample B" },
  ];

  return <LoopItem target={Item} list={itemProps} />;
};

// [target]: item component of list
const Item = ({ contents }) => <p>{contents}</p>;
```

### `loop` method

```jsx
import LoopItem, { loop } from "react-loop-item";

<LoopItem target={Item} list={arr} each={fnc} instead={element} />;
// or
loop(Item, arr, fnc, element);
```

## Props

### target (required)

Component to be created repeatedly.

```jsx
// component
<LoopItem target={ItemComponent} />;
// or tag name
<LoopItem target={"img"} />;
```

### list (optional)

Item data array or number of items.

```jsx
// array
<LoopItem target={Item} list={[{ foo: "bar" }, { foo: "bar" }]} />;
// or count
<LoopItem target={Item} list={5} />;
```

### each (optional)

Callback function that converts each element of `list` to `target` props when rendering `target` component.
If `each` is omitted, `list` element is used as it is.

> `each` has two arguments. (element and index of `list`)

```jsx
// [list]: raw datas
const model = [{ foo: "bar" }, { foo: "bar" }];

// [each]: formatter for <Anchor> props
const getProps = (data, index) => ({
  // properties
  value: data.foo,
  // callbacks
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

### instead (optional)

Element to return instead of null when `list` is empty. Use strings or element, no component.

> target={Component} instead={strings or element}

```jsx
// [list] : no data
const model = [];

// [instead]: element to render instead of blank
const noData = <span>no data</span>;

// do not use component
// const noData = () => <span>no data</span>;

<LoopItem target={Item} list={model} instead={noData} />;
```

## Examples

### AnchorList.jsx

```jsx
import React from "react";
import LoopItem from "react-loop-item";

import style from "./AnchorList.module.css";

// <AnchorList> needs raw data array and <Item> props formatter.
const AnchorList = ({ list, each }) => (
  <ul className={style["ul-style"]}>
    <LoopItem target={Item} list={list} each={each} instead={noData} />
  </ul>
);

// check target props
const Item = ({ label, href, onClick }) => (
  <li className={style["li-style"]}>
    <a href={href} onClick={onClick}>
      {label}
    </a>
  </li>
);

const noData = <li>no data</li>;

export default AnchorList;
```

### Tags.jsx

```jsx
import React from "react";
import { loop } from "react-loop-item";

import style from "./Tags.module.css";

// if you already know about raw datas,
// define <Item> props formatter in this component.
const Tags = ({ list }) => (
  <p className={style["p-style"]}>{loop(Item, list, getProps)}</p>
);

const Item = ({ value }) => (
  <span className={style["span-style"]}>{value}</span>
);

// convert string to <Item> props
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

  // formatter for <Item> props of <AnchorList>
  const getProps = (data, index) => {
    // raw datas (element and index of siteList)
    const { url, description, visited } = data;

    // props
    return {
      key: url, // if key is omitted, index is used
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
      {/* your components */}
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
import LoopItem from "react-loop-item";

import style from "./AnchorList.module.css";

// <AnchorList> needs raw datas and <Item> callbacks injector.
const AnchorList = ({ list, each }) => {
  // formatter for <Item> props
  const getItemProps = (data, index) => {
    const { url, description, visited } = data;

    return {
      // properties
      key: url,
      href: url,
      label: description,

      // inject <Item> callbacks
      ...each(data, index),
    };
  };

  return (
    <ul className={style["ul-style"]}>
      <LoopItem target={Item} list={list} each={getItemProps} />
    </ul>
  );
};

// check target props
const Item = ({ label, href, onClick }) => (
  <li className={style["li-style"]}>
    <a href={href} onClick={onClick}>
      {label}
    </a>
  </li>
);

export default AnchorList;
```

```jsx
import React from "react";
import AnchorList from "./AnchorList";

const ListContainer = () => {
  // code to manage model
  // ...

  const updateVisited = (url, count) => {
    // do something for updating model
  };

  // callbacks injector for <Item> of <AnchorList>
  const getItemCallbacks = (data, index) => {
    const { url, description, visited } = data;

    // callbacks
    return {
      onClick(event) {
        event.preventDefault();

        // update visited
        updateVisited(url, visited + 1);
      },
    };
  };

  return (
    <div>
      {/* your component */}
      <AnchorList list={model} each={getItemCallbacks} />
    </div>
  );
};

export default ListContainer;
```

### Rendering Optimization

If you only need to render one of the item components, use `useMemo` to avoid unnecessary rendering.

```jsx
import React, { useMemo } from "react";
import LoopItem from "react-loop-item";

import style from "./AnchorList.module.css";

const AnchorList = ({ list, each }) => (
  <ul className={style["ul-style"]}>
    <LoopItem target={Item} list={list} each={getProps} />
  </ul>
);

// use useMemo to use rendered element
const Item = (props) =>
  useMemo(
    () => {
      const { href, label, onClick } = props;

      return (
        <li className={style["li-style"]}>
          <a href={href} onClick={onClick}>
            {label}
          </a>
        </li>
      );
    },
    [props] // check props object or each property
  );

export default AnchorList;
```

```jsx
import React, { useMemo } from "react";
import AnchorList from "./AnchorList";

const ListContainer = () => {
  // code to manage model
  // ...

  // props formatter
  const getProps = (data, index) =>
    // use useMemo to use cached props object
    useMemo(
      () => {
        const { url, description, visited } = data;

        return {
          key: url,
          href: url,
          label: description,
          onClick: (event) => {},
        };
      },
      [index, data] // check index, data or each property
    );

  return (
    <div>
      {/* your component */}
      <AnchorList list={model} each={getCallbacks} />
    </div>
  );
};

export default ListContainer;
```

## License

MIT © [coxcore](https://github.com/coxcore)

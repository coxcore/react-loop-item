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

### Using `LoopItem`

```jsx
import LoopItem from "react-loop-item";

const Articles = () => {
  // [list]: <Item> props
  const itemProps = [
    { contents: "1. Article sample A" },
    { contents: "2. Article sample B" },
  ];

  return <LoopItem target={Item} list={itemProps} />;
};

// [target]: list item component
const Item = ({ contents }) => <p>{contents}</p>;
```

### Using `each` props

```jsx
import LoopItem from "react-loop-item";

const Articles = () => {
  // [list]: raw datas
  const model = ["sample A", "sample B"];

  // [each]: formatter for <Item> props
  const getProps = (string, index) => ({
    contents: `${index + 1}. Article ${string}`,
  });

  return <LoopItem target={Item} list={model} each={getProps} />;
};

// [target]: list item component
const Item = ({ contents }) => <p>{contents}</p>;
```

### Using `instead` props

```jsx
import LoopItem from "react-loop-item";

const Articles = () => {
  // [list] : no data
  const model = [];

  return <LoopItem target={Item} list={model} instead={noData} />;
};

// [target]: list item component
const Item = ({ contents }) => <p>{contents}</p>;

// [instead]: element to render instead of blank
const noData = <span>no data</span>;
```

### Using `loop` method

```jsx
import LoopItem, { loop } from "react-loop-item";

// using loop method instead of <LoopItem>
<LoopItem target={Item} list={arr} each={fnc} instead={element} />;
// or
loop(Item, arr, fnc, element);
```

## Props

### target (required)

Component to be created repeatedly.

### list (optional)

Array for list.

### each (optional)

Callback function that converts each element of `list` to `target` props when rendering `target` component.
If `each` is omitted, `list` element is used as it is.

> `each` has two arguments. (element and index of `list`)

### instead (optional)

Elements to return instead of null when `list` is empty. Use strings or elements, no Components.

> target={Components} instead={strings or elements}

## Examples

### AnchorList.jsx

```jsx
import React from "react";
import LoopItem from "react-loop-item";

import style from "./AnchorList.module.css";

// <AnchorList> needs raw datas array and <Item> props formatter.
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

## License

MIT © [coxcore](https://github.com/coxcore)

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
    { contents: "1. Sample A" },
    { contents: "2. Sample B" },
  ];

  return <LoopItem target={Item} list={itemProps} />;
};

// [target]: list item
const Item = ({ contents }) => <p>{contents}</p>;
```

### Using `each` props

```jsx
import LoopItem from "react-loop-item";

const Articles = () => {
  // [list]: raw datas
  const model = ["Sample A", "Sample B"];

  // [each]: formatter for <Item> props
  const getProps = (string, index) => ({
    contents: `${index + 1}. ${string}`,
  });

  return <LoopItem target={Item} list={model} each={getProps} />;
};

// [target]: list item
const Item = ({ contents }) => <p>{contents}</p>;
```

### Using `loop` method

```jsx
import LoopItem, { loop } from "react-loop-item";

// using loop method instead of <LoopItem>
const List = () => (
  <ul>
    <LoopItem target={Item} list={model} each={getProps} />
    {/* or */}
    {loop(Item, model, getProps)}
  </ul>
);
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

## Examples

### AnchorList.jsx

```jsx
import React from "react";
import LoopItem from "react-loop-item";

import style from "./AnchorList.module.css";

// <AnchorList> needs raw datas array and <Item> props formatter.
const AnchorList = ({ list, each }) =>
  list && list.length ? (
    <ul className={style["ul-style"]}>
      <LoopItem target={Item} list={list} each={each} />
    </ul>
  ) : (
    <div>no data</div>
  );

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

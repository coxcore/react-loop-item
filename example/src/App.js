import React from 'react';
import LoopItem, { loop } from 'react-loop-item';

const style = {};

// normal
const Articles = () => {
    // [list]: raw datas
    const model = ['Sample A', 'Sample B'];

    // [each]: formatter for <Item> props
    const getProps = (string, index) => ({
        contents: `${index + 1}. ${string}`,
    });

    return <LoopItem target={ArticleItem} list={model} each={getProps} />;
};

// [target]: list item
const ArticleItem = ({ contents }) => <p>{contents}</p>;

// <AnchorList> needs raw datas array and <Item> props formatter.
const AnchorList = ({ list, each }) =>
    list && list.length ? (
        <ul className={style['ul-style']}>
            <LoopItem target={AnchorItem} list={list} each={each} />
        </ul>
    ) : (
        <div>no data</div>
    );

// check target props
const AnchorItem = ({ label, href, onClick }) => (
    <li className={style['li-style']}>
        <a href={href} onClick={onClick}>
            {label}
        </a>
    </li>
);

// if you already know about raw datas,
// define <Item> props formatter in this component.
const Tags = ({ list, instead }) => {
    return (
        <p className={style['p-style']}>
            {loop(TagItem, list, getTagItemProps, instead)}
        </p>
    );
};

const TagItem = ({ value }) => (
    <span className={style['span-style']}>{value}&nbsp;</span>
);

// convert string to <Item> props
const getTagItemProps = (text, index) => ({
    value: text,
});

const ListContainer = () => {
    // <AnchorList> raw datas
    const siteList = [
        { url: 'aaa.com', description: 'aaa site', visited: 4 },
        { url: 'bbb.com', description: 'bbb site', visited: 2 },
        { url: 'ccc.com', description: 'ccc site', visited: 8 },
    ];

    // formatter for <Item> props of <AnchorList>
    // {url, description, visited} => {key, label, href, onClick}
    const getProps = (data, index) => {
        const { url, description, visited } = data;

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
    const tagList = ['react', 'loop', 'for', 'each', 'list'];

    return (
        <div>
            {/* your components */}
            <AnchorList list={siteList} each={getProps} />
            <Tags list={tagList} />
            <Tags list={null} />
            <Tags instead={1} />
            <Tags list={[]} instead={'no data'} />
            <Tags list={[]} instead={<span>no data</span>} />
            <Tags />
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Articles />
            <ListContainer />
        </div>
    );
};

export default App;

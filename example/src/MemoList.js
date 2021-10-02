import React, { useReducer, useCallback } from 'react';
import { ListWrap } from 'react-loop-item';

const style = {
    'ul-style': 'ul-test ul-memo',
};

// <AnchorList> raw datas
const siteList = [
    { url: 'aaa.com', description: 'aaa site', visited: 4 },
    { url: 'bbb.com', description: 'bbb site', visited: 2 },
    { url: 'ccc.com', description: 'ccc site', visited: 8 },
];

const reducer = (state, url) => {
    const newList = state.map((item) => {
        if (item.url !== url) {
            return item;
        }

        return {
            ...item,
            visited: item.visited + 1,
        };
    });

    return newList;
};

const MemoList = ({ memo }) => {
    const [list, visit] = useReducer(reducer, siteList);

    const each = useCallback(
        (data, index) => {
            const { url, description, visited } = data;
            return {
                label: description,
                href: url,
                visited,
                onClick(event) {
                    event.preventDefault();
                    visit(url);
                },
            };
        },
        [visit]
    );

    return (
        <ListWrap
            // list tag
            tag="ul"
            className={style['ul-style']}
            data-list-name="list wrap test"
            // LoopItem props
            target={AnchorItem}
            list={list}
            each={each}
            memo={memo}
        />
    );
};

const AnchorItem = ({ label, href, visited, onClick }) => {
    console.log(href);
    return (
        <li className={style['li-style']}>
            <a href={href} onClick={onClick}>
                {label}({visited})
            </a>
        </li>
    );
};

export default MemoList;

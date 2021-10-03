import React from 'react';
import PropTypes from 'prop-types';

export const loop = (
    Item,
    list = null,
    each = null,
    instead = null,
    hidden = false
) => {
    if (hidden) {
        return null;
    }

    const datas = Item && getArray(list);

    if (!datas) {
        return instead;
    }

    const getProps = typeof each === 'function' ? each : DEFULT_EACH;

    return datas.map((data, index) => {
        const props = getProps(data, index);
        return props ? <Item key={index} {...props} /> : null;
    });
};

export const LoopItem = ({ target, list, each, instead, hidden }) =>
    loop(target, list, each, instead, hidden);

export const ListWrap = ({
    tag = null,
    target,
    list,
    each = null,
    instead = null,
    hidden = false,
    ...wrapProps
}) => {
    const items = loop(target, list, each, null, hidden);

    if (!items) {
        return instead;
    }

    const Wrap = typeof tag === 'string' ? tag.toLowerCase() : null;

    return Wrap ? <Wrap {...wrapProps}>{items}</Wrap> : items;
};

const DEFULT_EACH = (data) => data;

const getArray = (list) => {
    if (Array.isArray(list) && list.length > 0) {
        return list;
    }

    if (typeof list === 'number' && list > 0) {
        const arr = Array(list);
        for (let i = 0; i < list; i++) {
            arr[i] = i + 1;
        }
        return arr;
    }

    return null;
};

const getKey = (key) => {
    const keyType = typeof key;
    return keyType === 'string' || keyType === 'number' ? key : undefined;
};

LoopItem.propTypes = {
    target:
        PropTypes.elementType ||
        PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.string,
            PropTypes.shape({ render: PropTypes.func.isRequired }),
        ]),
    list: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    each: PropTypes.func,
    instead: PropTypes.node,
    hidden: PropTypes.any,
};

ListWrap.propTypes = {
    ...LoopItem.propTypes,
    tag: PropTypes.string,
};

export default LoopItem;

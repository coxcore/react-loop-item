import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

export const loop = (
    Item,
    list = null,
    each = null,
    instead = null,
    hidden = false,
    memo = false
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
        if (!memo) {
            const props = getProps(data, index);
            return props ? <Item key={index} {...props} /> : null;
        }

        return withMemo(data, getProps, memo, index)(Item);
    });
};

const LoopItem = ({ target, list, each, instead, hidden, memo }) =>
    loop(target, list, each, instead, hidden, memo);

const withMemo = (data, each, memo, index) => (Item) => {
    const key = getKey(data[memo]);
    const idx = key === undefined ? index : undefined;

    return useMemo(() => {
        const props = each(data, idx);
        return props && <Item key={key ?? idx} {...props} />;
    }, [Item, data, each, key, idx]);
};

export const List = ({
    tag = null,
    target,
    list,
    each = null,
    instead = null,
    hidden = false,
    memo = false,
    ...wrapProps
}) => {
    const items = loop(target, list, each, null, hidden, memo);

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
    memo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

ListWrap.propTypes = {
    ...LoopItem.propTypes,
    tag: PropTypes.string,
};

export default LoopItem;

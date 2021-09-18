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
        return <Item key={index} {...getProps(data, index)} />;
    });
};

const LoopItem = ({ target, list, each, instead, hidden }) =>
    loop(target, list, each, instead, hidden);

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

export default LoopItem;

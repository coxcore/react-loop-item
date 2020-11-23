import React from 'react';
import PropTypes from 'prop-types';

const getArray = (n) => {
    if (typeof n === 'number' && n > 0) {
        const arr = Array(n);

        for (let i = 0; i < n; i++) {
            arr[i] = i + 1;
        }

        return arr;
    }

    return n;
};

export const loop = (Item, list, each = (data) => data, instead = null) => {
    const datas = getArray(list);

    return Item && datas && datas.length > 0
        ? datas.map((data, index) => {
              const props = each(data, index);
              return <Item key={index} {...props} />;
          })
        : instead;
};

const LoopItem = ({ target, list, each, instead }) =>
    loop(target, list, each, instead);

LoopItem.propTypes = {
    target: PropTypes.elementType || PropTypes.any,
    list: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    each: PropTypes.func,
    instead: PropTypes.element,
};

export default LoopItem;

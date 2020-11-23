import React from 'react';
import PropTypes from 'prop-types';

export const loop = (Item, list, each = (data) => data, instead = null) =>
    Item && list && list.length > 0
        ? list.map((data, index) => {
              const props = each(data, index);
              return <Item key={index} {...props} />;
          })
        : instead;

const LoopItem = ({ target, list, each, instead }) =>
    loop(target, list, each, instead);

LoopItem.propTypes = {
    target: PropTypes.elementType || PropTypes.any,
    list: PropTypes.array,
    each: PropTypes.func,
    instead: PropTypes.element,
};

export default LoopItem;

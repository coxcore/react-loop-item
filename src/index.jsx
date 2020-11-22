import React from 'react';
import PropTypes from 'prop-types';

export const loop = (Item, list = [], each = (data) => data) =>
    Item && list.length
        ? list.map((data, index) => {
              const props = each(data, index);
              return <Item key={index} {...props} />;
          })
        : null;

const LoopItem = ({ target, list, each }) => loop(target, list, each);

LoopItem.propTypes = {
    target: PropTypes.elementType,
    list: PropTypes.array,
    each: PropTypes.func,
};

export default LoopItem;

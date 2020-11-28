import React from 'react';

type Item = Function | string;
type propsList = Array<any> | number | null;

export function loop(
  Item: Item,
  list?: propsList,
  each?: Function,
  instead?: React.ReactNode,
  hidden?: boolean
): React.ReactNode;

export interface LoopItemProps {
  target: Item;
  list?: propsList;
  each?: Function;
  instead?: React.ReactNode;
  hidden?: boolean;
}

declare const LoopItem: React.FC<LoopItemProps>;

export default LoopItem;

import React from 'react';

type forwardRef = { render: Function };

type Component = Function | string | forwardRef;
type eachCallback = (data: any, index?: number) => object | null;

export function loop(
    Item: Component,
    list?: Array<any> | number | null,
    each?: eachCallback | null,
    instead?: React.ReactNode,
    hidden?: boolean | any
): React.ReactNode;

export interface LoopItemProps {
    target: Component;
    list?: Array<any> | number | null;
    each?: eachCallback | null;
    instead?: React.ReactNode;
    hidden?: boolean | any;
}

declare const LoopItem: React.FC<LoopItemProps>;

export default LoopItem;

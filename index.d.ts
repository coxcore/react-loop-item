import React from 'react';

type forwardRef = { render: Function };
type Component = Function | string | forwardRef;
type eachCallback = (data: any, index?: number) => object | null;

export declare function loop(
    Item: Component,
    list?: Array<any> | number | null,
    each?: eachCallback,
    instead?: React.ReactNode,
    hidden?: boolean | any,
    memo?: string | boolean
): React.ReactNode;

export interface LoopItemProps {
    target: Component;
    list?: Array<any> | number | null;
    each?: eachCallback;
    instead?: React.ReactNode;
    hidden?: boolean | any;
    memo?: string | boolean;
}

export interface ListWrapProps extends LoopItemProps {
    tag?: string | null;
    [key: string]: string | any;
}

export declare const LoopItem: React.FC<LoopItemProps>;
export declare const ListWrap: React.FC<ListWrapProps>;

export default LoopItem;

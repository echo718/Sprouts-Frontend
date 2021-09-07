import NumberBox from './NumberBox';
import { INumberItemProps } from './GameBase';
import React from 'react';
interface IDraggableListItems {
  items: INumberItemProps[];
  className: string;
}

const NumberList = (props: IDraggableListItems) =>
  <div className={props.className}> {props.items.map(toNumberBox)} </div>


function toNumberBox(item: INumberItemProps, position: number) {
  return <NumberBox key={item.id}  itemPosition={position} value={item.id} content={item.content} />
}

export default NumberList;
import DroppableWrapper from './DropableWrapper';
import DraggableListItems from './NumberList';
import { IColumnProps, INumberItemProps } from './GameBase';
import React from 'react';

export interface IVerticalColumnProps {
  column: IColumnProps;
  items: INumberItemProps[];
}

const VerticalCol = (props: IVerticalColumnProps) =>
  <DroppableWrapper droppableId={props.column.id} className="source">
    <DraggableListItems items={props.items} className='vertical' />
  </DroppableWrapper>

  
export default VerticalCol;

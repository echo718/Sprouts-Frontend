import DroppableWrapper from './DropableWrapper';
import DraggableListItems from './NumberList';
import { IColumnProps, INumberItemProps } from './GameBase';
import React from 'react';

export interface IVerticalColumnProps {
  column: IColumnProps;
  items: INumberItemProps[];
}
//define which source can be dropped.
const VerticalCol = (props: IVerticalColumnProps) =>
  <DroppableWrapper droppableId={props.column.id} className="source">
    {/* data go to number list */}
    <DraggableListItems items={props.items} className='vertical' />
  </DroppableWrapper>

  
export default VerticalCol;

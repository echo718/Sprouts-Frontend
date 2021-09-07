import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DraggableWrapper = (props: any) =>
  <Draggable draggableId={props.draggableId} index={props.index}>
    {(provided: any) => (
      <div className={props.className} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        {props.children}
      </div>
    )}
  </Draggable>

  

export default DraggableWrapper;

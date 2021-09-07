import { Droppable } from 'react-beautiful-dnd';
import React from 'react';

const DropableWrapper = (props: any) =>
  <Droppable droppableId={props.droppableId} direction={'vertical'}>
    {(provided: any) => (
       <div className={props.className}
            ref={provided.innerRef}
            {...provided.droppableProps}
            {...provided.droppablePlaceholder}>
          {props.children}
          {provided.placeholder}
        </div>
    )}
  </Droppable>

  
export default DropableWrapper;

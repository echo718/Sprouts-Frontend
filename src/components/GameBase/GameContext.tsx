import * as React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

interface IVerticalContextProps {
  onDragEnd: (result: any) => void;
  children: React.ReactNode
}

const GameContext = (props: IVerticalContextProps) =>
  <div className="dnd-game" >
    <DragDropContext onDragEnd={props.onDragEnd}>
      {props.children}
    </DragDropContext>
  </div>
  
export default GameContext;

import DraggableWrapper from './DraggableWrapper';
import React from 'react';
interface IDraggableItem {
  value: string;
  itemPosition: number;
  content: string;
}


const NumberBox = (props: IDraggableItem) => {
  //define each number box animated background color and other styles .
  const fontSize = parseInt(props.content) === 1 ? 15 : parseInt(props.content) * 6
  const width = parseInt(props.content) * 30
  const randomColor = '#' + Math.floor(Math.random() * (2 << 23)).toString(16);

  return (
    //define each draggable element.
    <DraggableWrapper draggableId={props.value} index={props.itemPosition}>
      <div style={{ overflow: "hidden" }}>
        <div style={{ margin: "auto", height: "1.8em", textAlign: "center", width: `${width}px`, fontSize: `${fontSize}px`, backgroundColor: randomColor, border: "0.01em solid black" }}>{props.content}</div>
      </div>
    </DraggableWrapper>
  )
}

export default NumberBox;

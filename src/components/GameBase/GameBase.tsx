import React from 'react';
import VerticalColumn from './VerticalCol';
import NumbersGameContext from './GameContext';
import Restart from './Restart';
import '../../App.css';
export interface IColumnProps {
    id: string;
    numberIds: string[];
}

export interface INumbersProps {
    [key: string]: INumberItemProps;
}

export interface INumberItemProps {
    id: string;
    content: string;
}

export interface INumbersGameState {
    column: IColumnProps;
    numbers: INumbersProps;
    win: boolean;
}

//set the initial data.
const initialData = {
    column: {
        id: 'column-1',
        numberIds: ['ten', 'four', 'eight', 'one', 'nine', 'six', 'five', 'three', 'seven', 'two'],
    },
    numbers: {
        'five': { id: 'five', content: '5' },
        'four': { id: 'four', content: '4' },
        'one': { id: 'one', content: '1' },
        'three': { id: 'three', content: '3' },
        'two': { id: 'two', content: '2' },
        'six': { id: 'six', content: '6' },
        'seven': { id: 'seven', content: '7' },
        'eight': { id: 'eight', content: '8' },
        'nine': { id: 'nine', content: '9' },
        'ten': { id: 'ten', content: '10' },
    }
};

class GameBase extends React.Component<any, INumbersGameState> {

    public constructor(props: any) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
        this.restartGame = this.restartGame.bind(this)

        this.state = { ...initialData, win: false };
    }
    
    //When drag is finished
    public onDragEnd(result: any) {
        const { destination, source, draggableId } = result;

        if (!destination) { return }

        const column = this.state.column;
        const numberIds = Array.from(column.numberIds);
        numberIds.splice(source.index, 1);
        numberIds.splice(destination.index, 0, draggableId);
        console.log(numberIds)
        const numbers = numberIds.map((numberId: string) => parseInt(this.state.numbers[numberId].content, 10));
        //judge whether these numbers are ascending or not. ascending => win=true.
        const win = isSortedAsc(numbers);
        // Each time after drag, update the column data to "newcolumn".
        this.updateState(column, numberIds, win);
    }


    public render() {
        const numbers = this.state.column.numberIds.map((numberId: string) => this.state.numbers[numberId]);
        return (
            <React.Fragment>
                {console.log(numbers)}
                <div className="container" >
                    <h3 className='gametitle' style={{ fontFamily: "ocr-b-std, monospace",color:"#FF0088 ",textAlign:"center",backgroundColor:"	#D28EFF",height:"3em",lineHeight:"3em",borderRadius:"80%" }}>Order them! I know you can!</h3>

                    <Restart win={this.state.win} onRestart={this.restartGame} />
                     {/* DragDropContext defines the drag zone */}
                    <NumbersGameContext onDragEnd={this.onDragEnd}>
                        {/* define the droppable block and draggable elements.  */}
                        <VerticalColumn column={this.state.column} items={numbers} />
                    </NumbersGameContext>
                </div>
            </React.Fragment>

        )
    }
    //go back to the initaldata 
    private restartGame() {
        this.setState({ ...initialData, win: false });
    }

    private updateState(column: IColumnProps, numberIds: string[], win: boolean) {
        const newColumn = {
            ...column,
            numberIds
        };

        this.setState({
            ...this.state,
            column: newColumn,
            win
        });
    }

}
//use an array to judge, if the next number is smaller than the previous one.
export function isSortedAsc(list: number[]): boolean {
    return list.every((val: any, i: number, arr: any) => !i || (parseInt(val, 10) >= arr[i - 1]));
}

export default GameBase;

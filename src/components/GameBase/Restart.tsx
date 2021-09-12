import React from 'react';
import useSound from 'use-sound';
import  cheers from '../../assets/sounds/cheers.wav';

const Restart = (props: any) => {

  const [play] = useSound(cheers, { volume: 1 });

  if (!props.win) { return null }

  return (
    <React.Fragment>
      <div style={{ width: "40%", textAlign: "center", margin: " 0 auto" }}>

        <h4> {play()} Good Job! 🎉 😁</h4>

        <button className="btn btn-warning m-3" onClick={props.onRestart}>Try Again!</button>
       
      </div>     
    </React.Fragment>

  )
}


export default Restart;

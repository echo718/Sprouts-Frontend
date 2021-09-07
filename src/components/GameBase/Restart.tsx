import React from 'react';

const Restart = (props: any) => {
  if (!props.win) { return null }
  return (
    <div style={{ width: "40%", textAlign: "center", margin: " 0 auto" }}>

      <h4> Good Job! 🎉 😁</h4>

      <button className="btn btn-warning m-3" onClick={props.onRestart}>Try Again!</button>
    </div>
  )
}


export default Restart;

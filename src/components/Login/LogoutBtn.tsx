import { useState,useContext } from 'react';
import React from 'react';
import { BgContext } from '../Theme/BgProvider';
import { FontContext } from '../Theme/FontProvider';
import store from "../../redux/Store";
import * as Action from '../../redux/Actions';
import reducerBgIndex from '../../redux/ReducerBgIndex';

export default function LogoutBtn({logout}) {

    const [bgcolor] = useContext(BgContext)
    const [fontcolor] = useContext(FontContext)

    const btnBg = store.getState().reducerBgColor
  //  const [bgIndex,setBgIndex] = useState(true)
    const bgIndex = store.getState().reducerBgIndex


    const personalInfoStyle = { width: "100%", height: "80px", backgroundColor: bgcolor !== 'transparent' ? bgcolor : btnBg, fontSize: "30px", color:fontcolor !== 'transparent' ? fontcolor :'black',fontWeight: "bold", textAlign: "center" } as const;


    const bganimited = () => {
        console.log(bgIndex,btnBg)
        if(bgIndex){
           store.dispatch(Action.CCFF33());
        }else{
          store.dispatch(Action.FF0088());
        }
       // setBgIndex(!bgIndex)
       store.dispatch(Action.BgcolorIndex());
       console.log(bgIndex)
    }

    return (
        <button
            className="btn btn-outline-success"
            style={personalInfoStyle}
            onClick={logout}
            onMouseEnter={() => bganimited()}
            onMouseLeave={() => bganimited()}>
            Log Out and Finish today.
        </button>
    )
}

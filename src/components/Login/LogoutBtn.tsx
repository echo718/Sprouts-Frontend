import React, { useState,useContext } from 'react';
import { BgContext } from '../Theme/BgProvider';
import { FontContext } from '../Theme/FontProvider';

export default function LogoutBtn({logout}) {

    const [bgcolor] = useContext(BgContext)
    const [fontcolor] = useContext(FontContext)

    //const [btnBg,setBtnBg] = useState( store.getState().reducerBgColor )
    const [btnBg,setBtnBg] = useState('')
    const [index,setIndex] = useState(true)


    const personalInfoStyle = { width: "100%", height: "80px", backgroundColor: bgcolor !== 'transparent' ? bgcolor : btnBg, fontSize: "30px", color:fontcolor !== 'transparent' ? fontcolor :'black',fontWeight: "bold", textAlign: "center" } as const;


    const bganimited = () => {
        if(index){
            setBtnBg('#CCFF33')
        }else{
            setBtnBg('#FF0088')
        }
        setIndex(!index)
        // store.getState().reducerBgColor === '#CCFF33' ?
        // store.dispatch(Action.BgcolorIndexT()) :
        // store.dispatch(Action.BgcolorIndexF()) 
       
        // if(store.getState().reducerBgIndex){
        //      store.dispatch(Action.CCFF33())
        // }else{
        //     store.dispatch(Action.FF0088())
        // }
       // setBtnBg(store.getState().reducerBgColor)
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

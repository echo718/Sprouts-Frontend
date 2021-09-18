import React, { useState, createContext } from 'react';

//for background color theme
const BgContext = createContext<[
	bgcolor: any,
	setBgColor: any
]>({} as any)

function BgProvider(props){
	
	const [bgcolor, setBgColor] = useState();
	
	return(
		<BgContext.Provider value={[bgcolor,setBgColor]}>
			{props.children}
		</BgContext.Provider>
	);
}

export { BgContext, BgProvider };
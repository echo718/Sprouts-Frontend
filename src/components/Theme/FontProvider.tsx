import React, { useState, createContext } from 'react';
//for font color theme
const FontContext = createContext<[
	fontcolor: any,
	setFontColor: any
]>({} as any)

function FontProvider(props){
	const [fontcolor, setFontColor] = useState();
	return(
		<FontContext.Provider value={[fontcolor,setFontColor]}>
			{props.children}
		</FontContext.Provider>
	);
}

export { FontContext, FontProvider };
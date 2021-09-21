import React from 'react';
import head from '../../assets/head.jpg';
import { useState, useContext } from 'react';
import EditSelf from './EditSelf';
import { BgContext } from '../Theme/BgProvider';
import { FontContext } from '../Theme/FontProvider';


//show kid information.
const SelfInfo = (data) => {
    const [show, setShow] = useState(true) //uneditable
    const [name, setName] = useState(data.data.self.name)
    const [age, setAge] = useState(data.data.self.age)
    const [imageURI, setImageURI] = useState(data.data.self.imageURI)
    const [index, setIndex] = useState(0)//if use "EditSelf" component, even-go to EditSelf.
    const [bgcolor] = useContext(BgContext);
    const [fontcolor] = useContext(FontContext);


    const imgStyle = { width: "8em", height: "8em", margin: "auto" }

    const tableStyle = { fontSize: "30px", textAlign: "center" } as const

    const editInfo = () => {
        setShow(!show)
        setIndex(index + 1)
    }

    const getNameInfo = (e) => {
        if (e) {
            setName(e)
        }
    }
    const getAgeInfo = (e) => {
        if (e) {
            setAge(e)
        }
    }

    const onFileChange = (e) => {
        e.preventDefault();
        if (e) {
            const file = e.target.files[0];

            const reader = new FileReader();

            if (handleBeforeUpload(file)) {
                reader.onload = function () {
                    // reader.results will used to transfer picture to base64
                    //backend will get  string format
                    const result = this.result;
                    if (result) {
                        alert("Upload picture sucessful.")
                    }

                    setImageURI(result as any)
                    setIndex(index + 2)
                };

                reader.readAsDataURL(file); // get base64 format information for the uploaded picture
            }
        }

    }

    //check size and type of uploaded picture
    const handleBeforeUpload = (file) => {
        if (file) {
            const sizeOk = file.size < (1024 * 1024);
            const typeReg = new RegExp(/^image\/bmp|gif|jpg|jpeg|png$/, 'i');
            const typeOk = typeReg.test(file.type);

            if (!typeOk) {
                alert("wrong picture format")
            } else if (!sizeOk) {
                alert("Picture size over 1M ")
            }
            return sizeOk && typeOk;
        }
    }

    return (
        <div className="row" >
            <div className="col-sm-3 col-12 mt-2" style={{ textAlign: "center" }}>
                {/* for picture section */}
                {data.data.self.imageURI
                    ?
                    (
                        <div >
                            <div style={{ margin: "0 auto" }}>
                                <img src={data.data.self.imageURI} alt="" style={imgStyle} />
                            </div>
                        </div>
                    )
                    :
                    <div>
                        <img src={head} alt="" style={imgStyle} />
                    </div>

                }

                <label htmlFor="file" className="btn btn-primary mt-4" style={{ backgroundColor: bgcolor !== 'transparent' ? bgcolor : '', color: fontcolor !== 'black' ? fontcolor : 'black' }} >
                    <input
                        id="file"
                        type="file"
                        autoFocus={true}
                        style={{ display: "none", }}
                        accept="image/jpeg, image/gif, image/png, image/bmp"
                        onChange={e => {
                            onFileChange(e)
                        }}
                    />Upload new image
                </label>
            </div>

            {name ? window.localStorage.setItem("KidName", name) : ''}

            { window.localStorage.getItem("Token") ? '' : alert("Remote Server Error. Refresh page.") }

            <div className="row col-sm-8 col-11 mt-2 ml-1 ">               

                <div className="col-sm-9 col-11 ">
                    <table className="table" style={tableStyle}>
                        <tbody>
                            <tr
                                // mode changes:background and font color
                                className={(bgcolor !== 'transparent' && bgcolor) ? bgcolor : "table-warning"}
                                style={{
                                    backgroundColor: (bgcolor !== 'transparent' || bgcolor) ? bgcolor : null,
                                    color: (fontcolor !== 'transparent' && fontcolor) ? fontcolor : 'black'
                                }}>
                                <th scope="row" > Account Name</th>
                                <td>{data.data.self.gitHub}
                                </td>
                            </tr>
                            <tr
                                // mode changes:background and font color
                                className={(bgcolor !== 'transparent' && bgcolor) ? bgcolor : "table-success"}
                                style={{
                                    backgroundColor: (bgcolor !== 'transparent' || bgcolor) ? bgcolor : null,
                                    color: (fontcolor !== 'transparent' && fontcolor) ? fontcolor : 'black'
                                }}>
                                <th scope="col" >Kid Name</th>
                                <th scope="col" >
                                    <input type="text" className="editableInput" placeholder={data.data.self.name} style={{ display: show ? "none" : "block" }} onChange={e => getNameInfo(e.target.value)} />
                                    <label htmlFor="" className="editableLabel" style={{ display: show ? "block" : "none" }}> {data.data.self.name}</label>
                                </th>
                            </tr>
                            <tr
                                // mode changes:background and font color
                                className={(bgcolor !== 'transparent' && bgcolor) ? bgcolor : "table-danger"}
                                style={{
                                    backgroundColor: (bgcolor !== 'transparent' || bgcolor) ? bgcolor : null,
                                    color: (fontcolor !== 'transparent' && fontcolor) ? fontcolor : 'black'
                                }}>
                                <th scope="row" >Kid Age</th>
                                <td>
                                    <input type="text" className="editableInput" placeholder={data.data.self.age} style={{ display: show ? "none" : "block" }} onChange={e => getAgeInfo(e.target.value)} />
                                    <label htmlFor="" className="editableLabel" style={{ display: show ? "block" : "none" }}> {data.data.self.age}</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col-sm-2 col-1" style={{ textAlign: "right" }}>
                    <button className="btn btn-warning" onClick={editInfo} style={{ backgroundColor: bgcolor !== 'transparent' ? bgcolor : '', color: fontcolor !== 'black' ? fontcolor : 'black' }}>Edit</button>
                </div>

            </div>
            { //go to EditSelf component to allow edit kid information 
                // if index is even after click. 
                (index % 2 === 0 && index !== 0) ?
                    <EditSelf name={name} age={age} index={index} imageURI={imageURI} /> :
                    ''
            }
        </div>
    )
}
export default SelfInfo

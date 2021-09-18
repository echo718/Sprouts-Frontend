import React, { useState, useContext } from "react";
import { useMutation } from '@apollo/client';
import MaterialTable, { MTableToolbar } from 'material-table';
import 'bootstrap/dist/css/bootstrap.css';
import { Add, Update, Delete } from '../../apis/apis';
import { BgContext } from '../Theme/BgProvider';
import { FontContext } from '../Theme/FontProvider';

//show study information using material table
export default function StudyPlayground(props: any) {

    const [data, setData] = useState(props.data)// used to store backend study table's data
    const Kidname = window.localStorage.getItem("KidName")
    // call APIs
    const [add] = useMutation(Add)
    const [update] = useMutation(Update)
    const [del] = useMutation(Delete)
    // define style for material table
    const pageSize = window.innerWidth > 1024 ? 10 : 5
    //used for the search function in material table 
    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');
    const [showCreatedSearch, setShowCreatedSearch] = useState(false);
    //design different themes
    const [bgcolor] = useContext(BgContext);
    const [fontcolor] = useContext(FontContext);
    // call delete 
    const handelDelete = (oldDataId) => {
        del({ variables: { studyId: oldDataId } }).then(r => {
            if (r.errors) {
                let err = r.errors.join("\n");
                console.log(err)
                return
            }
            if (r) {
                const dataNew = data.filter(item => item.id !== r.data.delStudy.id)
                setData(dataNew)
            }
        }).catch(reason => {
            console.log(reason)
        })

    } 
    //call update useMutation(update)
    const handelUpdate = async (index, newData, oldData) => {

        //if not update image, result(imageURI) is previously one.
        result = result ? result : newData.imageURI
        //if delete, result is null
        result = (deleteRes === 1) ? '' : result

        update({ variables: { studyId: newData.id, content: newData.content, language: newData.language, imageURI: result, } }).then(r => {
            if (r.errors) {
                let err = r.errors.join("\n");
                console.log(err)
                return
            }
            if (r) {
                let index = newData.id
                data.map(item => item.id === index ?
                    ((item.content === r.data.editStudy.content) && (item.language === r.data.editStudy.language) && (item.imageURI === result)) : '')

                //trigger setData
                var dataOthers = data.filter(item => item.id !== index)
                newData.imageURI = result
                var dataChange = newData
                setData(dataOthers.concat({ ...dataChange }))
            }
        }).catch(reason => {
            console.log(reason)
        })
        //if delete image
        deleteRes = 0
    }
    //call add useMutation(add)
    const handelAdd = (newData) => {
        // newData has two situations: one is not upload or input data; the other one is upload data then delete it, which would lead to  null string('').
        if (Object.entries(newData).length !== 3 || newData.language ==='' || newData.content === '' || newData.imageURI === '') {
            alert("Upload Failed. Please upload full information(badge & study content & subject)")
        } else {
            add({ variables: { content: newData.content, language: newData.language, imageURI: result, } }).then(r => {
                if (r.errors) {
                    let err = r.errors.join("\n");
                    console.log(err)
                    return
                }
                if (r) {
                    setData(data.concat({ ...r.data.addStudy }))
                }
            }).catch(reason => {
                console.log(reason)
            })
        }


    }
    //when user input data, will real-time check using Regular Expression
    const handelFocus = (value: any) => {
        let special_regular = new RegExp(
            "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
        )
        var reflow_special = ''
        for (var i = 0; i < value.length; i++) {
            reflow_special = reflow_special + value.substr(i, 1).replace(special_regular, '')
        }
        return reflow_special
    }
    //deal with time range for the date search function
    const handelCreatedTimeRange = () => {
        if (showCreatedSearch) {
            setShowCreatedSearch(false)
        } else {
            setShowCreatedSearch(true)
        }
    }

    const showtimerangeStyle = {
        width: '300px', marginLeft: '20px', display: 'none'
    }
    const noShowtimerangeStyle = {
        width: '300px', margin: '20px', Visibility: "block",
    }

    //setstate to the date search time range
    const searchCreatedFrom = (e) => {
        setSearchFrom(e.target.value)
    }
    const searchCreatedTo = (e) => {
        setSearchTo(e.target.value)
    }

    // for date search function, create oldData to get previously data
    var oldData = []
    const handelCreatedSearch = () => {
        if (oldData.length === 0) {
            oldData = props.data
        }
        if (searchFrom > searchTo) {
            alert("Please select right time range.")
        } else {
            const newCreatedData = oldData.filter(item => item['created'] >= searchFrom && item['created'] <= searchTo)
            setData(newCreatedData)
        }
    }

    //clear the search filter for date search function
    const handelCreatedClear = () => {
        setData(props.data)
        setShowCreatedSearch(false)
    }

    // for upload pictures function
    var result
    const onFileChange = (e) => {
        e.preventDefault();

        if (e) {
            const file = e.target.files[0];

            const reader = new FileReader();

            if (handleBeforeUpload(file)) {
                reader.onload = function () {
                    // reader.results will transfer picture to base64 format
                    result = this.result;
                    //  setImgURI(result as any)
                    alert("Upload Image Successful.")
                };
                reader.readAsDataURL(file)// get uploaded picture's information using base64
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

    //If img exist, allowed to click delete button to delete
    var deleteRes = 0
    const deleteImage = () => {
        alert("Delete Image Successful.")
        deleteRes = 1
    }
    //allowed to download data to CSV format
    const downloadCsv = (data, fileName) => {
        //  for Chinese messy code
        var newData = "\ufeff" + data;

        const finalFileName = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([newData], { type: "text/csv,,charset=UTF-8'" }));
        a.setAttribute("download", finalFileName);
        a.click();
    }

    const badgeStyle = { margin: " 1%", fontfamily: "ocr-b-std, monospace", fontSize: "2em" }
    const limitedStyle = { margin: " 1%" }
    const spanStyle = { fontSize: "45px", color: fontcolor !== 'black' ? fontcolor : "white", padding: "0.5em 1em", borderRadius: "90%", background: bgcolor !== 'transparent' ? bgcolor : "#B5EF8A", backgroundImage: "" }
    //only can select three different subjects for "Subject" field
    const getSelectedValue = (index) => {
        switch(index){
            case 1:
                return 'Chinese';
            case 2:
                return 'English';
            case 3:
                return 'Mathematics';
            default :
                return null
        }
    }

    //get "Subject" field selected values
    const getSelectValue = (e) => {
       let index = e.target.options.selectedIndex
       const value = getSelectedValue(index)
       return value
    }

    return (
        <React.Fragment>
            <div className="container-fluid" style={{ marginBottom: '5px' }}>
                <MaterialTable
                    title=""
                    columns={
                        [   
                            // "badge" field
                            {
                                title: 'Badge', field: 'imageURI',filtering:false,
                                render: rowData => <img src={rowData.imageURI} alt='' style={{ width: "50px",borderRadius:"20%" }} />,
                                editComponent: (editProps) => (
                                    <div style={{ textAlign: "left" }}>
                                        <input
                                            type="file"
                                            autoFocus={true}
                                            style={{ width: "100%" }}
                                            accept="image/jpeg, image/gif, image/png, image/bmp"
                                            onChange={e => {
                                                onFileChange(e);
                                                editProps.onChange(e.target.value)
                                            }}
                                        />
                                        <button style={{ marginTop: "5px", width: "10em", display: editProps.value ? "block" : "none" }} className="btn btn-danger" onClick={deleteImage}>Delete  File</button>
                                    </div>
                                )
                            },
                            //"Study Content" field
                            {
                                title: 'Study Content', field: 'content',
                                editComponent: (editProps) => (
                                    <input
                                        autoFocus={true}
                                        style={{ width: "100px", height: "40px" }}
                                        defaultValue={editProps.value}
                                        onChange={(e) => {
                                            editProps.onChange(e.target.value = handelFocus(e.target.value))
                                        }
                                        }
                                    />
                                )
                            },
                            //"Subject" field
                            {
                                title: 'Subject', field: 'language',
                                editComponent: (editProps) => (
                                    //for subject content, only allowed to select from droplist
                                    <select name="language" id="language" 
                                    onChange={e => {
                                        getSelectValue(e);
                                        editProps.onChange(e.target.value)
                                    }}
                                    >
                                        <option value=''>Select Subject</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="English">English</option>
                                        <option value="Mathematics">Mathematics</option>
                                    </select>
                                )
                            },
                            // "created data" filed, and not allowed to be changed.
                            {
                                title: 'Created Date', field: 'created', type: 'date', editable: "never",
                            },
                        ]
                    }

                    data={data}
                    options={{

                        addRowPosition: 'first',
                        showEmptyDataSourceMessage: false,
                        actionsColumnIndex: -1,
                        rowStyle: {
                            fontSize: "25px"
                        },
                        toolbarButtonAlignment: "right",
                        filtering: true,
                        initialPage: 0,
                        exportButton: {
                            csv: true,
                            pdf: false
                        },
                        //   review img and createAt format
                        exportCsv: (columns, data) => {
                            // Turn headers into array of strings
                            const headerRow = columns.map(col => {
                                return col.title;
                            });

                            const newHeaderRow = headerRow.filter(i => i !== "Study Record")
                            const dataRows = data.map(({ data, ...row }) => Object.values(row));

                            let newData: Array<any> = []

                            //select columns can be exported  
                            newData = dataRows.map(i => ['', i[1], i[2], i[5]])
                            //change "created date" format
                            for (let i = 0; i < newData.length; i++) {
                                const a = newData[i][3].toString()
                                newData[i][3] = a.substring(0, 10)
                                newData[i][0] = 'Badges'
                            }
                            const delimiter = ",";
                            const csvContent = [newHeaderRow, ...newData].map(e => e.join(delimiter)).join("\n");

                            const csvFileName = "Study Record";

                            downloadCsv(csvContent, csvFileName);
                        },

                        search: true,
                        pageSize: pageSize,
                        headerStyle: {
                            position: "sticky",
                            top: 0,
                            fontSize: "30px",
                        }

                    }}

                    components={{
                        Toolbar: props => {
                            const propsCopy = { ...props }
                            return (
                                <div>
                                    <MTableToolbar {...propsCopy} />
                                    <div style={badgeStyle}>
                                        Congratulations! <span style={spanStyle}> {Kidname}</span>.You have already got
                                        <span style={spanStyle}>{data.length}</span>
                                        <span>{data.length === 1 ? 'badge.' : 'badges.'}</span>
                                    </div>
                                    <div style={limitedStyle}>
                                        <button type="button" className="btn btn-info" style={{ backgroundColor: bgcolor !== 'transparent' ? bgcolor : '', color: fontcolor !== 'black' ? fontcolor : 'black' }} onClick={handelCreatedTimeRange}>Limited Created Time </button>
                                        {/* limited created time  */}

                                        <div style={showCreatedSearch ? noShowtimerangeStyle : showtimerangeStyle} id="timeRange">
                                            <h4>Created Time Range</h4>
                                            <label htmlFor="search">From: </label>
                                            <input id="search" onChange={e => searchCreatedFrom(e)} type="date" className="form-control" value={searchFrom} />
                                            <label htmlFor="search">To: </label>
                                            <input id="search" onChange={searchCreatedTo} type="date" className="form-control" value={searchTo} />
                                            <button className="btn btn-info" onClick={handelCreatedSearch}>Search</button>
                                            <button className="btn btn-info" onClick={handelCreatedClear}>Clear</button>
                                        </div>
                                    </div>

                                </div>
                            )
                        },
                    }}


                    editable={{

                        onRowAdd:
                            (newData: any) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        handelAdd(newData)

                                        resolve("");
                                    }, 1000)
                                }
                                ),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {

                                    const dataUpdate: any = [...data];
                                    const index = oldData.tableData.id;

                                    dataUpdate[index] = newData;

                                    handelUpdate(index, newData, oldData)

                                    resolve("");
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    handelDelete(oldData.id)

                                    resolve("")
                                }, 1000)
                            })
                    }}
                />
            </div>
        </React.Fragment>
    );

}


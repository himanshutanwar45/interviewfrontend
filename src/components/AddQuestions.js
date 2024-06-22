import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { addQuestions,getAllUserQuestions } from '../state/action/action';

const AddQuestions = ({ addQuestions, setProgress, getAllUserQuestions, allquestions, showAlert }) => {

    const [selectHTMlTag, setSelectHTMlTag] = useState('')

    const [cursorPosition, setCursorPosition] = useState(0)

    const [data, setData] = useState({ question: "", answer: "", types: "" })

    const { question, answer, types } = data


    useEffect(() => {
        setProgress(40)

        setTimeout(() => {
            getAllUserQuestions('MSSQL')
            setProgress(100)
        }, 500)

        // eslint-disable-next-line
    }, [])

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setData({
            types: selectedValue,
            question: question,
            answer: answer
        })
    }



    const handleHTMLTag = (e) => {
        const selectedValue = e.target.value;
        const startPos = answer.substring(0, cursorPosition);
        const endPos = answer.substring(cursorPosition, answer.length);
        const newValue = startPos + selectedValue + endPos;
        setSelectHTMlTag(selectedValue);
        setData({
            types: types,
            question: question,
            answer: newValue
        });

        setSelectHTMlTag("-1")

    }



    const handleClick = async () => {
        setProgress(40)
        try {
            const result = await addQuestions(types, question, answer)  //Route 2 in actions.js
            let { error: errorName, success } = result

            if (success) {
                setTimeout(() => {
                    showAlert("success",errorName)

                    setData({
                        types: types,
                        question: "",
                        answer: ""
                    })
                }, 500)

            } 
            else {
                showAlert("error",errorName)
            }

        } catch (error) {
            showAlert("error",error.message)
        }

        setProgress(100)
    }


    const OnChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
        setCursorPosition(e.target.selectionStart)
    }

    const handleTextAreaClick = (e) => {
        setCursorPosition(e.target.selectionStart);
    };

    return (
        <>
            <div className='bg-body-tertiary my-2'>
                <div className="row justify-content-md-center">
                    <div className="row">
                        <div className='col-4 text-center'>
                            <div className="row align-items-center">
                                <div className="col">
                                    <h3> Question Types </h3>
                                    <select className="form-select" aria-label="Default select example" role="button" onChange={handleDropdownChange} value={types} id="types" name="types">
                                        <option value="-1">Select ...</option>
                                        <option value="MSSQL">MSSQL</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row align-items-center my-5">
                                <div className="col">
                                    <h3> Add HTML Tag </h3>
                                    <select className="form-select" aria-label="Default select example" role="button" onChange={handleHTMLTag} value={selectHTMlTag} id="htmltag" name="htmltag">
                                        <option value="-1">Select ...</option>
                                        <option value="<var></var>">For Code Blocks</option>
                                        <option value="<ul><li></li></ul>">List</option>
                                        <option value="<li></li>">Child List</option>
                                        <option value="<p></p>">Paragraph</option>
                                        <option value="<h2></h2>">Heading 2</option>
                                        <option value="<table>
                                                            <thead>
                                                            <tr>
                                                                <th><th>
                                                            </tr>
                                                            <thead>
                                                            
                                                        
                                                            <tbody>
                                                            <tr>
                                                                <td></td>
                                                            </tr>
                                                            </tbody>
                                                            
                                                        </table>">Tables</option>
                                        <option value="<span></span>"> Span </option>
                                        <option value="<strong></strong>"> Bold </option>
                                    </select>
                                </div>
                            </div>

                            <div className="row align-items-center my-5">
                                <div className='col'>
                                    <p> Cursor Position :{cursorPosition}</p>
                                </div>
                            </div >
                        </div>


                        <div className='col-8'>
                            <div className='bg-body-tertiary'>
                                <div className="mb-3">
                                    <label htmlFor="question" className="form-label">Question</label>
                                    <input type="email" className="form-control" id="question" placeholder="Add Your Question" name="question" onChange={OnChange} value={question} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="answer" className="form-label">Answer</label>
                                    <textarea className="form-control" id="answer" rows="15" name="answer" onChange={OnChange} value={answer} onClick={handleTextAreaClick}></textarea>
                                </div>

                                <div className="mb-3">
                                    <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-body-tertiary overflow-auto table-overflow my-2">
                    {!allquestions || allquestions.length === 0 ? <p className='p-2'>Nothing to display</p> :
                        <table className="table table-striped table-hover p-2">
                            <thead>
                                <tr>
                                    <th> Types </th>
                                    <th> Question </th>
                                    <th> Name </th>
                                </tr>
                            </thead>
                            <tbody>
                                    {allquestions.map((item, index) => {

                                        return (<tr key={index}>
                                            <td>{item.types}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.questions}</td>
                                        </tr>)
                                    })}

                            </tbody>
                        </table>
                    }

                </div>
        </>
    )
}

const mapStateToProps = state => ({
    allquestions: state.allquestions
});


const mapDispatchToProps = {
    addQuestions,
    getAllUserQuestions
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestions);

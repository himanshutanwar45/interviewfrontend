import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { addUserQuestions, getUserQuestions } from '../state/action/action'
const AddUserQues = ({ userquestions, addUserQuestions, showAlert, setProgress, getUserQuestions }) => {

    const [data, setData] = useState({ question: "", types: "" })

    const { question, types } = data


    useEffect(() => {
        setProgress(40)

        setTimeout(() => {
            getUserQuestions('MSSQL')
            setProgress(100)
        }, 500)
        // eslint-disable-next-line
    }, [])

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setData({
            types: selectedValue,
            question: question
        })
    }

    const OnChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setProgress(40)
        try {

            await addUserQuestions(types, question, (result) => {
                if (result.success === true) {
                    showAlert('success', result.error)
                    setData({
                        question: ""
                    })
                    getUserQuestions(types)
                } else {
                    showAlert('error', result.error)
                }
            })

        } catch (error) {
            throw error.message
        }
        setProgress(100)
    }

    return (
        <>
            <div className='bg-body-tertiary my-2'>
                <div className='text-center p-2 m-2' >
                    <h3>Please add the appropriate questions</h3>
                </div>
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
                        </div>


                        <div className='col-8 my-2'>
                            <div className='bg-body-tertiary'>
                                <div className="mb-3">
                                    <label htmlFor="question" className="form-label">Question</label>
                                    <input type="email" className="form-control" id="question" placeholder="Add Your Question" name="question" onChange={OnChange} value={question} />
                                </div>

                                <div className="mb-3">
                                    <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-auto table-overflow">
                    {!userquestions || userquestions.length === 0 ? <p className='p-2'>Nothing to display</p> :
                        <table className="table table-striped table-hover p-2">
                            <thead>
                                <tr>
                                    <th> Types </th>
                                    <th> Question </th>
                                    <th> Is Answered </th>
                                    <th> Link </th>
                                </tr>
                            </thead>
                            <tbody>
                                    {userquestions.map((item, index) => {

                                        return (<tr key={index}>
                                            <td>{item.types}</td>
                                            <td>{item.questions}</td>
                                            <td>{item.isAnswered}</td>
                                            <td>{item.link}</td>
                                        </tr>)
                                    })}

                            </tbody>
                        </table>
                    }

                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    userquestions: state.userquestions
});


const mapDispatchToProps = {
    addUserQuestions,
    getUserQuestions
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserQues);

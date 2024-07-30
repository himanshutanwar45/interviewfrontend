import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../state/action/action';
import ShowQuestions from './ShowQuestions';
import '../App.css';

const SQLInterview = ({ questions, fetchQuestions,setProgress }) => {

    useEffect(() => {
        setProgress(40)

        setTimeout(()=>{
            fetchQuestions('MSSQL');
            setProgress(100)
        },500)
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className='bg-body-tertiary my-2' id="content">
                <div className='col-sm-12 p-3 '>
                    {!questions || questions.length === 0 ? (
                        <p>Please wait atleat 2 mins. Backend server is free of cost.</p>
                    ) : (
                        questions.map((item) => {
                            return (
                                <ShowQuestions key={item._id} item={item}></ShowQuestions>
                            )
                        })
                    )}
                </div>
            </div>

        </>

    );
};

const mapStateToProps = state => ({
    questions: state.questions
});

const mapDispatchToProps = {
    fetchQuestions
};

export default connect(mapStateToProps, mapDispatchToProps)(SQLInterview);

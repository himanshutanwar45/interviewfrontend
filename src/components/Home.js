import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({ setProgress }) => {

    const history = useNavigate()

    useEffect(() => {
        setProgress(40)

        setTimeout(() => {
            setProgress(100)
        }, 500)
        // eslint-disable-next-line
    }, [])

    const handleClick = () => {
        history('/sqlinterviewquestions')
    }


    const handleClickAddQuestions = () => {
        history('/adduserquestions')
    }

    return (
        <>
            <div className='bg-body-tertiary my-2 text-center'>
                <h2> Everything you need to crack your  </h2>
                <div >
                    <h1 className='bg-white'>Next Tech Interview</h1>
                </div>

                <div className='d-flex flex-wrap d-flex justify-content-center p-3'>
                    <div className="card">
                        <div className="card-header">
                            Questions
                        </div>
                        <div className="card-body">
                            <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Interview Prep</button>
                        </div>
                    </div>
                </div>

                <div>
                    <h2>Our Users Have Cracked interview at</h2>
                    <img src="./Invia.png" alt="Invia"></img>
                </div>
            </div>

            <div className='bg-body-tertiary my-2 text-center'>
                <h2>Add your questions here</h2>
                <div className='d-flex flex-wrap justify-content-center p-3'>
                    <div className="card">
                        <div className="card-header">
                            Add Questions
                        </div>
                        <div className="card-body">
                            {localStorage.getItem('auth-Token')?<button type="button" className="btn btn-outline-primary" onClick={handleClickAddQuestions}>Add Questions</button>:
                            <p> Login to add you SQL questions </p>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home

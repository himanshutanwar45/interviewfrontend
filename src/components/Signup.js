import React, { useState } from 'react';
import { connect } from 'react-redux';
import {signUpUsers} from '../state/action/action';

const Signup = ({signRef, signClose, setProgress, signUpUsers, showAlert }) => {

    const [credentials, setCredentials] = useState({ name: "", eemail: "", epassword: "", conpass: "" })

    const { name, eemail, epassword, conpass } = credentials

    const OnChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setProgress(40)
        try {
            await signUpUsers(name,eemail,epassword,conpass,(result)=>{
                if (result.success===true){

                    showAlert('success',result.error)
                    
                    setCredentials({
                        name: "", eemail: "", epassword: "", conpass: ""
                    })
                }
                else{
                    showAlert('error',result.error)
                    
                }
            })
            

            //signClose.current.click();


        } catch (error) {
            throw error.message
        }

        setProgress(100)
    }

    return (
        <>
            <button ref={signRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">SignUp</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Name" name="name" onChange={OnChange} value={name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="eemail" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="eemail" placeholder="Email" name="eemail" onChange={OnChange} value={eemail} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="epassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="epassword" placeholder="Password" name="epassword" onChange={OnChange} value={epassword} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="conpass" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" id="conpass" placeholder="Confirm Passsword" name="conpass" onChange={OnChange} value={conpass} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={signClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    addusers: state.addusers
});

const mapDispatchToProps = {
    signUpUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);



import {
    FETCH_ALL_QUESTION,
    ADD_NEW_QUESTIONS,
    LOGIN_USER,
    ADD_USERS,
    ADD_USERS_QUESTIONS,
    GET_USERS_QUESIONS,
    GET_ALL_USERS_QUESIONS,
    FETCH_ERRORS
} from './actionTypes'

const host = process.env.REACT_APP_HOST;
const content_type = "application/json"
const authToken = localStorage ? localStorage.getItem("auth-Token") : null;

//Route 1 ::::::: FETCH ALL QUESTION
export const fetchQuestions = (types) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/questions/getquestions`, {
            method: "POST",
            headers: {
                'content-type': content_type
                
            },

            body: JSON.stringify({ types }),
        });

        const json = await response.json();
        dispatch({ type: FETCH_ALL_QUESTION, payload: json })
    } catch (error) {
        dispatch({ type: FETCH_ERRORS, payload: error.message });
    }
}


//Route 2 ::::::::::::Add New Questions
export const addQuestions = (types, question, answer) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/questions/addquestions`, {
            method: "POST",
            headers: {
                'content-type': content_type,
                'auth-token':authToken
            },

            body: JSON.stringify({ types, question, answer }),
        })

        const json = await response.json()
        dispatch({ type: ADD_NEW_QUESTIONS, payload: json })
        return json;
    } catch (error) {
        dispatch({ type: FETCH_ERRORS, payload: error.message });
    }
}

//Route 3 ::::::::::::Login Users
export const loginUser = (email, password, callback) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                'content-type': content_type
            },
            body: JSON.stringify({ email, password }),

        });

        const json = await response.json();
        dispatch({ type: LOGIN_USER, payload: json });

        if (typeof callback === 'function') {
            callback(json);
        }
    
    } catch (error) {
        dispatch({ type: FETCH_ERRORS, payload: error.message })
    }
}


//Route 4 ::::::::::::Login Users
export const signUpUsers = (name, eemail, epassword, conpass,callback) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                'content-type': content_type,
                'auth-token':authToken
            },
            body: JSON.stringify({ name, eemail, epassword, conpass })

        });

        const json = await response.json();
        dispatch({ type: ADD_USERS, payload: json });
        if (typeof callback === 'function') {
            callback(json);
        }
    } catch (error) {
        dispatch({ type: FETCH_ERRORS, payload: error.message })
    }
}


//Route 5 ::::::::::::Add Users Questions
export const addUserQuestions = (types,question,callback) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/questions/adduserquestions`, {
            method: "POST",
            headers: {
                'content-type': content_type,
                'auth-token':authToken
            },
            body: JSON.stringify({ types,question })

        });

        const json = await response.json();
        dispatch({ type: ADD_USERS_QUESTIONS, payload: json });
        if (typeof callback === 'function') {
            callback(json);
        }
    } catch (error) {
        dispatch({ type: FETCH_ERRORS, payload: error.message })
    }
}

//Route 6 ::::::::::::Get Users Questions
export const getUserQuestions = (types,question) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/questions/getuserquestions`, {
            method: "POST",
            headers: {
                'content-type': content_type,
                'auth-token':authToken
            },
            body: JSON.stringify({ types,question })

        });

        const json = await response.json();
        dispatch({ type: GET_USERS_QUESIONS, payload: json });
        // if (typeof callback === 'function') {
        //     callback(json);
        // }
    } catch (error) {
        dispatch({ type: FETCH_ERRORS, payload: error.message })
    }
}


//Route  ::::::::::::Get Users Questions
export const getAllUserQuestions = (types) => async (dispatch) => {
    try {
        const response = await fetch(`${host}/api/questions/getalluserquestions`, {
            method: "POST",
            headers: {
                'content-type': content_type,
                'auth-token':authToken
            },
            body: JSON.stringify({ types })

        });

        const json = await response.json();
        dispatch({ type: GET_ALL_USERS_QUESIONS, payload: json });
        // if (typeof callback === 'function') {
        //     callback(json);
        // }
    } catch (error) {
        dispatch({ type: FETCH_ERRORS, payload: error.message })
    }
}
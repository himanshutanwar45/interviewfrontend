
import {
    FETCH_ALL_QUESTION, 
    ADD_NEW_QUESTIONS,
    LOGIN_USER,
    ADD_USERS,
    ADD_USERS_QUESTIONS,
    GET_USERS_QUESIONS,
    GET_ALL_USERS_QUESIONS,
    FETCH_ERRORS
} from '../action/actionTypes'

const initialState = {
    questions: [],
    addanswer:[],
    loginTouser:[],
    addusers:[],
    adduserquestion:[],
    userquestions:[],
    allquestions:[],
    error: null
};


const reducers = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_QUESTION:
            return { ...state, questions: action.payload, error: null };
        
        case ADD_NEW_QUESTIONS:
            return {...state, addanswer:action.payload, error:null}

        case LOGIN_USER:
            return {...state,loginTouser:action.payload,error:null}

        case ADD_USERS:
            return {...state,addusers:action.payload,error:null}

        case ADD_USERS_QUESTIONS:
            return {...state,adduserquestion:action.payload,error:null}

        case GET_USERS_QUESIONS:
            return {...state,userquestions:action.payload,error:null}

        case GET_ALL_USERS_QUESIONS:
            return {...state,allquestions:action.payload,error:null}
            

        case FETCH_ERRORS:
            return { ...state, error: action.payload,questions:[] ,addanswer: [], loginTouser: [], addusers: [],userquestions:[],adduserquestion:[],allquestions:[]};

        default:
            return state;
    }
}

export default reducers;
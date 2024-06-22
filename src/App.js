import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import SQLinterview from './components/SQLinterview'
import AddQuestions from './components/AddQuestions';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import Home from './components/Home';
import AddUserQues from './components/AddUserQues';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [progress, setProgress] = useState(0)

  const [notify, setNotify] = useState([])

  const showAlert = (type, message) => {

    switch (type) {
      case 'info':
        return setNotify(toast.info(message))

      case 'error':
        return setNotify(toast.error(message))

      case 'success':
        return setNotify(toast.success(message))

      case 'warning':
        return setNotify(toast.warn(message))

      default:
        return setNotify(toast(message))
    }



  }

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <ToastContainer notify={notify} closeOnClick stacked draggable ></ToastContainer>
        <Routes>
          <Route exact path='/' element={<Home setProgress={setProgress}></Home>}></Route>
          <Route exact path="/sqlinterviewquestions" element={<SQLinterview setProgress={setProgress}></SQLinterview>}></Route>
          <Route exact path="/addsqlquestions" element={<AddQuestions setProgress={setProgress} showAlert={showAlert}></AddQuestions>}></Route>
          <Route exact path="/adduserquestions" element={<AddUserQues setProgress={setProgress} showAlert={showAlert}></AddUserQues>}></Route>
          <Route exact path='/login' element={<Login setProgress={setProgress} showAlert={showAlert}></Login>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

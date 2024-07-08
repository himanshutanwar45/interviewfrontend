import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    let fullName = localStorage ? localStorage.getItem("name") : null;
    let history = useNavigate()
    const handledLogout = () => {
        localStorage.removeItem('auth-Token')
        localStorage.removeItem('name')
        localStorage.removeItem('userId')
        localStorage.removeItem('isAdmin')
        history('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary z-3 position-sticky fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Interview</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Interview Questions
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/sqlinterviewquestions">SQL</Link></li>
                                </ul>
                            </li>

                            {localStorage.getItem('isAdmin') === "false" || !localStorage.getItem('isAdmin')  ? <></> : <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Add Questions
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/addsqlquestions">Add SQL Questions</Link></li>
                                </ul>
                            </li>
                            }

                        </ul>

                        {/* {!localStorage.getItem('auth-Token') ?
                            <form className="d-flex" role="search">

                                <Link className="btn btn-outline-primary" type="submit" to="/login" >Login</Link>
                            </form> :
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <p className="my-2"><strong>{fullName}</strong></p>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle active" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                            <path d="M 9.6660156 2 L 9.2148438 4.4765625 L 9.2285156 4.4707031 L 9.3574219 4.4296875 C 9.3071239 4.442262 9.2639589 4.4626482 9.2148438 4.4765625 C 8.2970203 4.7365804 7.576324 5.2179722 6.9589844 5.7324219 L 6.9257812 5.7617188 L 6.9238281 5.7617188 L 4.5351562 5.0039062 L 2.2382812 8.9863281 L 4.1113281 10.748047 L 4.1191406 10.703125 L 4.1289062 10.658203 C 3.9908562 11.210378 4 11.7 4 12 C 4 12.3 3.9990261 12.795912 4.1191406 13.396484 L 4.1074219 13.332031 L 2.2246094 14.992188 L 4.5527344 19.027344 L 6.9433594 18.158203 L 6.9628906 18.177734 L 7.0449219 18.232422 C 7.6875911 18.660868 8.4330772 19.088227 9.2070312 19.419922 L 9.2109375 19.421875 L 9.6582031 22 L 14.333984 22 L 14.785156 19.523438 L 14.771484 19.529297 L 14.642578 19.570312 C 14.692876 19.557738 14.736041 19.537352 14.785156 19.523438 C 15.70298 19.26342 16.423675 18.782028 17.041016 18.267578 L 17.074219 18.238281 L 17.076172 18.238281 L 19.476562 19.001953 L 21.765625 14.882812 L 19.892578 13.230469 L 19.880859 13.296875 L 19.871094 13.341797 C 20.009129 12.789573 20 12.3 20 12 C 20 11.7 20.0091 11.210382 19.871094 10.658203 L 19.876953 10.683594 L 21.775391 9.0078125 L 19.447266 4.9726562 L 17.056641 5.8417969 L 17.037109 5.8222656 L 16.955078 5.7675781 C 16.312365 5.3391322 15.566923 4.9117728 14.792969 4.5800781 L 14.789062 4.578125 L 14.341797 2 L 9.6660156 2 z M 11.333984 4 L 12.658203 4 L 13.009766 6.0214844 L 14.029297 6.4277344 L 14.005859 6.4199219 C 14.611316 6.6794033 15.240023 7.0391194 15.785156 7.3984375 L 16.542969 8.1582031 L 18.552734 7.4257812 L 19.224609 8.5917969 L 17.722656 9.9179688 L 17.919922 11.103516 L 17.929688 11.142578 C 17.991611 11.390399 18 11.7 18 12 C 18 12.3 17.991597 12.609601 17.929688 12.857422 L 17.923828 12.880859 L 17.707031 13.96875 L 19.234375 15.318359 L 18.523438 16.599609 L 16.523438 15.962891 L 15.746094 16.740234 C 15.202979 17.191429 14.762748 17.47777 14.158203 17.628906 L 14.091797 17.646484 L 13.015625 18.076172 L 12.666016 20 L 11.341797 20 L 10.990234 17.978516 L 9.9707031 17.572266 L 9.9941406 17.580078 C 9.3886846 17.320609 8.7599774 16.960881 8.2148438 16.601562 L 7.4570312 15.841797 L 5.4472656 16.574219 L 4.7753906 15.408203 L 6.2929688 14.068359 L 6.0800781 13.003906 C 6.0001926 12.604479 6 12.3 6 12 C 6 11.7 6.0083605 11.390399 6.0703125 11.142578 L 6.0761719 11.119141 L 6.2890625 10.052734 L 4.7617188 8.6132812 L 5.4648438 7.3964844 L 7.4765625 8.0371094 L 8.2539062 7.2597656 C 8.7970213 6.8085705 9.2372522 6.5222299 9.8417969 6.3710938 L 9.9082031 6.3535156 L 10.984375 5.9238281 L 11.333984 4 z M 12 8 C 9.7901961 8 8 9.7901961 8 12 C 8 14.209804 9.7901961 16 12 16 C 14.209804 16 16 14.209804 16 12 C 16 9.7901961 14.209804 8 12 8 z M 12 10 C 13.190196 10 14 10.809804 14 12 C 14 13.190196 13.190196 14 12 14 C 10.809804 14 10 13.190196 10 12 C 10 10.809804 10.809804 10 12 10 z"></path>
                                        </svg>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" type="submit" to='/login' onClick={handledLogout}>Logout</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        } */}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

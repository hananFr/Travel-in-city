import React from 'react';
import { Link, NavLink } from 'react-router-dom';


function Navbar(props) {

    const closeOrOpen = () => {
        if(document.getElementById('id_main').hidden === true){
            document.getElementById('id_main').hidden = false
        }else{
            document.getElementById('id_main').hidden = true
        }
    }


    const { user } = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
            <ul className="nav p-0">
                <li className="nav-item logo float-right align-items-start pl-0 ml-md-2 ml-lg-4   mt-0">
                    <NavLink className="nav-link active" to='/'><img src="logo.jpg" alt="logo_pic" height="90" className="p-0 m-0" /></NavLink>
                </li>
                <li className="nav-item col-12 align-items-end d-flex d-md-block">

                    <div className="panel-group" id='accordion'>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <a href='#panel' onClick={ closeOrOpen} className=" py-0 text-warning"  id="triggerId" data-toggle='collapse' data-parent='#accordion'
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </a >


                                <div id='panel' style={{zIndex: 1, position: 'absolute'}} className="bg-light w-100 collapse collapse-panel  justify-content-center text-right">
                                    <Link className="d-block text-warning" to={`/my-cards/category/schools`}>בתי ספר</Link>
                                    <Link className="d-block text-warning" to={`/my-cards/category/groups`}>קבוצות</Link>
                                    <Link className="d-block text-warning" to={`/my-cards/category/couples`}>טיולי זוגות</Link>
                                    <Link className="d-block text-warning" to={`/my-cards/category/families`}>משפחות</Link>


                                    <NavLink className="d-block text-warning" to="/my-cards">
                                        טיולים                                      </NavLink>



                                    {user && user.admin && (
                                        <NavLink className="d-block text-warning" to="/create-card">
                                            הוספת טיול חדש
                                        </NavLink>
                                    )}

                                    {user && user.admin && (
                                        <NavLink className="d-block dropdown-item text-warning" to="/get-users">
                                            משתמשים
                                        </NavLink>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </li>


            </ul>

            <ul className="nav d-none d-lg-flex mr-auto mt-auto ml-5">
                {!user && (
                    <React.Fragment>
                        <li className="nav-item align-items-end d-flex">
                            <NavLink className="nav-link py-0 text-primary" to='/signin'>התחבר</NavLink>
                        </li>
                    </React.Fragment>
                )}
                {user && user.admin && (
                    <React.Fragment>
                        <li className="nav-item align-items-end d-flex">
                            <NavLink className="nav-link py-0 text-primary" to="/signup">רשום בלוגר</NavLink>
                        </li>
                    </React.Fragment>
                )}
                {user && (
                    <React.Fragment>
                        <li className="nav-item align-items-end d-flex">
                            <NavLink className="nav-link py-0 text-primary" to={`/edit-profile/${user._id}`}>ערוך פרופיל</NavLink>
                        </li>
                    </React.Fragment>
                )}

                {user && (
                    <React.Fragment>
                        <li className='nav-item align-items-end d-flex'> <NavLink className="nav-link nav-item py-0" to="/logout"> התנתק</NavLink></li>
                    </React.Fragment>
                )}
            </ul>

        </nav>

    )
}


export default Navbar
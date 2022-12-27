import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


function Navbar() {
    const dispatch = useDispatch();
    const userName = useSelector(state => {
        console.log(state.user.currentUser.userName)
        return state.user.currentUser.userName;
    })
    const [find,setFind] = useState()
    return (
        <div className="row">
            <div className='col-12'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to={'/Home'}>Logo</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to={'add-blog'}>Add new blog <span
                                    className="sr-only">(current)</span></Link>
                            </li>

                        </ul>
                        <input className=" mr-sm-2" type="search" placeholder="Search"
                               aria-label="Search"
                               onChange={(e)=>{
                                   setFind(e.target.value)

                               }}
                        />
                        <button onClick={ (value)=>{
                            // value= {name_product: find}
                            // dispatch(findBlogs(value))
                            console.log(value)
                        }
                        } className="btn btn-outline-success my-2 my-sm-0" type="submit">Search
                        </button>
                        <div>
                            <div className="nav-item dropdown  mr-5">
                                <a className="nav-link dropdown-toggle userColor" href="#" role="button" data-toggle="dropdown"
                                   aria-expanded="false">
                                    {userName}
                                </a>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to={'/Home/my-blogs'}> My Blogs</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link onClick={() => {
                                        localStorage.clear()
                                    }} className="dropdown-item" to={'/'}>Logout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
// import React from 'react';
//
// function Navbar() {
//     return (
//         <div>
//             <h1>Navbar</h1>
//         </div>
//     );
// }
//
// export default Navbar;